import { EmittedOBject } from './emitted-object';
import { UserService } from './../../services/api/user.service';
import { AuthenticationService } from './../../services/api/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsuranceTermService } from './../../services/api/insurance-term.service';
import { User } from './../../models/user';
import { FormGroup } from '@angular/forms';
import { InsuranceTerm } from './../../models/insurance-term';
import { MenuItem, ConfirmationService, SortEvent } from 'primeng/api';
import { Columns } from './../../models/column';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})


export class DataTableComponent implements OnInit {


  @Input() page = 0;
  @Input() size;
  @Input() collectionSize: number;
  @Input() objectList: Array<any> = [];
  @Input() selectedColumns: any[];
  @Input() cols: any[];
  @Input() className: String;
  @Input() listName: String
  @Output() lazyLoadData = new EventEmitter<any>();
  @Output() objectEdited = new EventEmitter<EmittedOBject>();
  //   @Input() get selectedColumns(): any[] {
  //   return this._selectedColumns;
  // }
  // set selectedColumns(val: any[]) {
  //   this._selectedColumns = val;
  // }
  exportColumns: any[];
  columnsAdded: Array<Columns> = [];
  exportBtnItems: MenuItem[];
  selectedObjects: Array<any> = [];
  user = new User();
  updateBtnVisible = false;
  deleteBtnVisible = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authUser: AuthenticationService,
    private userservice: UserService
  ) { }

  ngOnInit() {
    this.exportBtnItems = [
      {
        label: 'PDF', icon: 'pi pi-file-pdf', command: () => { this.exportPdf(); }
      },
      {
        label: 'Excel', icon: 'pi pi-file-excel', command: () => { this.exportexcell(); }
      },
    ];

    console.log(this.className);
    console.log(this.cols);

    this.loadColumns();

  }


  loadColumns() {
    this.user = this.authUser.getCurrentUser();
    if (this.user.columns != null && this.user.columns !== '') {
      this.columnsAdded = JSON.parse(this.user.columns);
      const columnsMapped = this.columnsAdded.filter(
        tab => tab.classe === this.className)
        .map(col => ({ field: col.field, header: col.header }));
      if (columnsMapped.length >= 1) {
        this.selectedColumns = columnsMapped;


      } else {
        this.selectedColumns = this.cols;

      }
    } else {
      this.selectedColumns = this.cols;

    }
    this.exportColumns = this.selectedColumns.map(col => ({ title: col.header, dataKey: col.field }));

  }



  exportPdf() {
    this.exportColumns = this.selectedColumns.map(col => ({ title: col.header, dataKey: col.field }));

    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, this.objectList);
        doc.save(`${this.className}.pdf`);
      });
    });
  }

  exportexcell(): void {
    const element = document.getElementById('myTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // générer un classeur et ajouter la feuille de calcul
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${this.className}`);
    //      enregistrer dans le fichier
    XLSX.writeFile(wb, `${this.className}.xlsx`);
  }


  onEdit(event) {
    console.log(event);
    this.objectEdited.emit({ object: this.selectedObjects, operationMode: event });
    this.selectedObjects = [];
  }


  loadDataLazy(event) {
    // this.size = event.rows;
    // this.page = event.first / this.size;
    this.lazyLoadData.emit(event);
  }

  onRowSelect(event) {
    if (this.selectedObjects.length === 1) {
      this.updateBtnVisible = true;
      this.deleteBtnVisible = true;
    } else {
      this.updateBtnVisible = false;
    }
  }
  onRowUnselect(event) {
    if (this.selectedObjects.length === 1) {
      this.updateBtnVisible = true;
    } else if (this.selectedObjects.length < 1) {
      this.updateBtnVisible = false;
      this.deleteBtnVisible = false;
    }

  }

  onSaveView(event) {
    this.spinner.show();
    this.columnsAdded = [];
    for (let i = 0; i < this.selectedColumns.length; i++) {
      let c = new Columns();
      c.position = i;
      c.field = this.selectedColumns[i].field;
      c.header = this.selectedColumns[i].header;
      c.classe = this.className;
      c.visible = true;
      this.columnsAdded.push(c);
    }
    this.user = this.authUser.getCurrentUser();
    this.user.columns = JSON.stringify(this.columnsAdded);
    this.authUser.setuser(this.user);
    this.userservice.set(this.user).subscribe(
      data => {
        this.toastr.success('La vue a été enregistrée avec Succés', 'Edition');
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()

    );

  }



}
