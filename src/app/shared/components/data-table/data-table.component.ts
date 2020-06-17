import { TransportCategoryVehicleComponent } from './../../../layouts/settings/transport-category-vehicle/transport-category-vehicle.component';
import { Observable } from 'rxjs';
import { EmittedOBject } from './emitted-object';
import { UserService } from './../../services/api/user.service';
import { AuthenticationService } from './../../services/api/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from './../../models/user';
import { MenuItem, ConfirmationService, SortEvent } from 'primeng/api';
import { Columns } from './../../models/column';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Key } from 'protractor';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})


export class DataTableComponent implements OnInit {

  @ViewChild('myTable', { static: false }) myTable: ElementRef;
  @Input()tableId;
  @Input() page = 0;
  @Input() size;
  @Input() collectionSize: number;
  @Input() objectList: Array<any> = [];
  @Input() objectExportList: Array<any> = [];
  @Input() selectedColumns: any[];
  @Input() cols: any[];
  @Input() className: String;
  @Input() listName: String;
  @Input() addBtnVisible = false;
  @Input() viewBtnVisible = false;
  @Input() updateBtnVisible = false;
  @Input() deleteBtnVisible = false;
  @Output() lazyLoadData = new EventEmitter<any>();
  @Output() objectEdited = new EventEmitter<EmittedOBject>();
  @Output() exportBtnExcelGlobal = new EventEmitter<void>();
  @Output() exportBtnPdf = new EventEmitter<any[]>();

  exportColumns: any[];
  columnsAdded: Array<Columns> = [];
  exportBtnItems: MenuItem[];
  selectedObjects: Array<any> = [];
  user = new User();
  updateBtnDisable = false;
  deleteBtnDisable = false;


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
  typeOf(event) {
    let res: number;

     if ((event) === 'object') {
       res = 1;
     } else if(event === 'number' || event === 'string' ){
      res = 2;
     }else if(event === 'date' ){
      res = 3;
     }
     else if(event === 'boolean' ){
      res = 4;
     }

    return res;
  }

  exportexcell() {

    const element = document.getElementById(this.tableId);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // générer un classeur et ajouter la feuille de calcul
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${this.className}`);
    //      enregistrer dans le fichier
    XLSX.writeFile(wb, `${this.className}.xlsx`);

  }





  exportPdf() {
    this.exportBtnPdf.emit(this.selectedColumns);
    console.log("export pdf data");
    console.log(this.selectedColumns);
  }

  exportExcelGlobal() {
    this.exportBtnExcelGlobal.emit();
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
      this.updateBtnDisable = true;
      this.deleteBtnDisable = true;
    } else {
      this.updateBtnDisable = false;
    }
  }
  onRowUnselect(event) {
    if (this.selectedObjects.length === 1) {
      this.updateBtnDisable = true;
    } else if (this.selectedObjects.length < 1) {
      this.updateBtnDisable = false;
      this.deleteBtnDisable = false;
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
