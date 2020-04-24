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
  selectedInsuranceTerm = new InsuranceTerm();
  insuranceTermForm: FormGroup;
  isFormSubmitted = false;
  showDialog: boolean;
  visibilityBtnUpdate = false;
  visibilityBtnDelete = false;
  editMode: Boolean;
  editModeTitle: String;
  className: String;

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

  loadSelect(event) {
    this.selectedInsuranceTerms.push(event);
    console.log(this.selectedInsuranceTerms);

  }

  showDialogToEdit(event) {

    this.showDialog = true;
    this.editMode = event;
    if (!this.editMode) {
      this.editModeTitle = 'Ajouter';
      this.selectedInsuranceTerm = new InsuranceTerm();
    } else if (this.editMode) {
      console.log('leght');
   console.log(this.selectedInsuranceTerms.length);

      if (this.selectedInsuranceTerms.length === 1) {
        this.editModeTitle = 'Modifier';
        this.selectedInsuranceTerm = this.selectedInsuranceTerms[0];
       console.log("modif");
       console.log(this.selectedInsuranceTerm[0]);


      } else if (this.selectedInsuranceTerms.length < 1) {
        this.toastr.warning('aucun ligne sélectionnée');
      }

    }


  }

  onDeleteAll(event) {


    if(event === true){
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


  }

  onHideDialog(event) {
    this.showDialog = event;
    this.loadData();
  }


}
