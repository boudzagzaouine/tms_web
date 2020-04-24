import { User } from './../../../shared/models/user';
import { UserService } from './../../../shared/services/api/user.service';
import { AuthenticationService } from './../../../shared/services/api/authentication.service';
import { Columns } from './../../../shared/models/column';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { InsuranceTermService } from './../../../shared/services';
import { EmsBuffer } from './../../../shared/utils';
import { InsuranceTerm } from './../../../shared/models';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-insurance-term',
  templateUrl: './insurance-term.component.html',
  styleUrls: ['./insurance-term.component.css'],
  providers: [ConfirmationService]

})
export class InsuranceTermComponent implements OnInit {

  @ViewChild('myTable', { static: false }) myTable: ElementRef;

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;

  _selectedColumns: any[];
  exportColumns: any[];
  cols: any[];
  columnsAdded: Array<Columns> = [];

  itemsBtnExport: MenuItem[];

  insuranceTermList: Array<InsuranceTerm> = [];
  selectedInsuranceTerms: Array<InsuranceTerm> = [];

  //displayDialog: boolean;
  selectedInsuranceTerm = new InsuranceTerm();
  insuranceTermForm: FormGroup;
  isFormSubmitted = false;
  newInsuranceTerm: boolean;
  showDialog  :boolean;
  user = new User();
  visibilityBtnUpdate = false;
  visibilityBtnDelete = false;
  editMode :Boolean;
  editModeTitle: String;


  constructor(private insuranceTermService: InsuranceTermService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private authUser: AuthenticationService,
    private userservice: UserService) { }


  ngOnInit() {

    this.itemsBtnExport = [
      {
        label: 'PDF', icon: 'pi pi-file-pdf', command: () => { this.exportPdf(); }
      },
      {
        label: 'Excel', icon: 'pi pi-file-excel', command: () => { this.exportexcell(); }
      },

    ];
    // columns for table
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },
      { field: 'roofed', header: 'valeur' },
    ];
    // end
    //load columns of table
    this.user = this.authUser.getCurrentUser();
    if (this.user.columns != null && this.user.columns !== '') {
      this.columnsAdded = JSON.parse(this.user.columns);
      const columnsMapped = this.columnsAdded.filter(
        tab => tab.classe === InsuranceTerm.name)
        .map(col => ({ field: col.field, header: col.header }));
      if (this.columnsAdded.length >= 1) {
        this._selectedColumns = columnsMapped;
      } else {
        this._selectedColumns = this.cols;
      }
    } else {
      this._selectedColumns = this.cols;
    }

    this.exportColumns = this._selectedColumns.map(col => ({ title: col.header, dataKey: col.field }));
  //  this.initForm();


  }



  // return columns selected in toggle
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    // restore original order
    this._selectedColumns = val;
    this.exportColumns = this._selectedColumns.map(col => ({ title: col.header, dataKey: col.field }));
  }
  // end

  ///
  loadData(search: string = '') {
     console.log(this.editMode);

    this.spinner.show();
    this.insuranceTermService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.insuranceTermService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.insuranceTermList = data;

        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  /// end search
  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }


  /// export  method
  exportPdf() {
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, this.insuranceTermList);
        doc.save('TermeAssurance.pdf');
      });
    });
  }
  exportexcell(): void {
    const element = document.getElementById('myTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // générer un classeur et ajouter la feuille de calcul
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //      enregistrer dans le fichier
    XLSX.writeFile(wb, 'TermeAssurance.xlsx');
  }
  // end method export

  showDialogToEdit() {
   // this.displayDialog = true;
      this.showDialog=true;
      console.log(this.showDialog);

    if (!this.editMode) {
      this.editModeTitle = 'Ajouter';
      this.selectedInsuranceTerm = new InsuranceTerm();

    } else if (this.editMode) {

      if (this.selectedInsuranceTerms.length === 1) {
        this.editModeTitle = 'Modifier';
        this.selectedInsuranceTerm = this.selectedInsuranceTerms[0];
      } else if (this.selectedInsuranceTerms.length < 1) {
        this.toastr.warning('aucun ligne sélectionnée');
      }
    }
   //this.initForm();

  }




  onRowSelect(event) {
    if (this.selectedInsuranceTerms.length == 1) {
      this.visibilityBtnUpdate = true;
      this.visibilityBtnDelete = true;
    } else if (this.selectedInsuranceTerms.length > 1) {
      this.visibilityBtnUpdate = false;
    }
  }

  onRowUnselect(event) {
    if (this.selectedInsuranceTerms.length == 1) {
      this.visibilityBtnUpdate = true;
    } else if (this.selectedInsuranceTerms.length < 1) {
      this.visibilityBtnUpdate = false;
      this.visibilityBtnDelete = false;
    }
  }

  onSaveVue(event) {

    this.columnsAdded = [];
    for (let i = 0; i < this.selectedColumns.length; i++) {
      let c = new Columns();
      c.position = i;
      c.field = this.selectedColumns[i].field;
      c.header = this.selectedColumns[i].header;
      c.classe = InsuranceTerm.name;
      c.visible = true;
      this.columnsAdded.push(c);
    }
    let myJSON = JSON.stringify(this.columnsAdded);
    this.user = this.authUser.getCurrentUser();
    this.user.columns = myJSON;
    this.authUser.setuser(this.user);
    this.userservice.set(this.user).subscribe(
      data => {
        this.toastr.success('La vue  Ajouter avec Succés', 'Edition');
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()

    );
  }
  onDeleteAll() {

    if (this.selectedInsuranceTerms.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedInsuranceTerms.map(x => x.id);
          this.insuranceTermService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          );
        }
      });
    } else if (this.selectedInsuranceTerms.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }



  }

  onHideDialog(event){
    this.showDialog = event;
    this.loadData();
  }

}
