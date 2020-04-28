import { EmsFIlter } from './../../../shared/utils/ems-filter';
import { Filter } from './../../../shared/models/filter';
import { InsuranceTerm } from './../../../shared/models/insurance-term';
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
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-test-data-table',
  templateUrl: './test-data-table.component.html',
  styleUrls: ['./test-data-table.component.css']
})
export class TestDataTableComponent implements OnInit {


  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  cols: any[];
  insuranceTermList: Array<InsuranceTerm> = [];
  selectedInsuranceTerms: Array<InsuranceTerm> = [];
  showDialog: boolean;
  editMode: number;
  className: String;

  dataarrray = [];
  filter = new Filter();
  operatorAndOR: any[];
  operators: any[];
  constructor(private insuranceTermService: InsuranceTermService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = InsuranceTerm.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },
      { field: 'roofed', header: 'valeur' },
    ];
    this.operatorAndOR = [
      { field: '(', header: '(' },
      { field: ',', header: 'ET' },
      { field: '|', header: 'OU' },
      { field: ')', header: ')' },

    ];

    this.operators = [
      { field: '=', header: 'égale à' },
      { field: '!=', header: 'différent' },


    ];

    this.loadData();

    this.dataarrray.push(this.filter);
  }

  addForm() {

    this.filter = new Filter();
    this.dataarrray.push(this.filter);

  }
  onsubmit() {

    console.log(this.dataarrray);

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
  onsclick() {
    console.log(this.dataarrray);

    const filter = new EmsFIlter();
    for (let i = 0; i < this.dataarrray.length; i++) {
         filter.append(this.dataarrray[i].operatorAnd.field);
         filter.append(this.dataarrray[i].attribut.field);
         filter.append(this.dataarrray[i].operator.field);
         filter.append(this.dataarrray[i].value);
         filter.append(this.dataarrray[i].operatorAndd.field);
    }

    console.log(filter.getValue());

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

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedInsuranceTerms = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

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

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }


}
