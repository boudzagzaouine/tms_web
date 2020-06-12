import { GlobalService } from './../../../shared/services/api/global.service';
import { Insurance } from './../../../shared/models/insurance';
import { CommissionTypeService } from './../../../shared/services/api/commisionType.service';
import { CommissionType } from './../../../shared/models/commissionType';
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

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  descriptionSearch = '';
  codeList: Array<InsuranceTerm> = [];
  codeSearch: string;
  insuranceTermList: Array<InsuranceTerm> = [];
  selectedCommissionTerms: Array<InsuranceTerm> = [];
  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;

  insuranceTermExportList: {

    'Code': string,
    'Description': string,
    'plafonné': string,
  }[] = [];

  constructor(private insuranceTermService: InsuranceTermService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = InsuranceTerm.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },
      { field: 'roofed', header: 'plafonné' },

    ];

    this.loadData();

  }

  loadData(search: string = '') {
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

  onExportExcelGlobal() {
    console.log("methode insurance");

    this.insuranceTermService.find(this.searchQuery).subscribe(
      data => {
        this.insuranceTermExportList = data.map(
          m => ({
            'Code': m.code,
            'Description': m.description,
            'plafonné': m.roofed ? 'Oui' : 'Non',
          }));
        this.globalService.exportExcelGlobal(this.insuranceTermExportList, this.className);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }

  onExportPdfGlobal(event) {
    this.insuranceTermService.find(this.searchQuery).subscribe(
      data => {
        this.insuranceTermExportList = data;
        this.globalService.exportPdf( event,this.insuranceTermExportList, this.className);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }

  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }
    if (this.descriptionSearch != null && this.descriptionSearch !== '') {
      buffer.append(`description~${this.descriptionSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }

  onCodeSearch(event: any) {
    this.insuranceTermService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    );
  }

  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedCommissionTerms = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedCommissionTerms.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedCommissionTerms.map(x => x.id);
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
    } else if (this.selectedCommissionTerms.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

}
