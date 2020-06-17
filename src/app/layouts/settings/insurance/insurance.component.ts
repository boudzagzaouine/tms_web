import { GlobalService } from './../../../shared/services/api/global.service';
import { PatrimonyType } from './../../../shared/models/patrimony-type';
import { Vehicle } from './../../../shared/models/vehicle';
import { InsuranceEditComponent } from './../../insurance/insurance-edit/insurance-edit.component';
import { InsuranceType } from './../../../shared/models/insurance-Type';
import { InsuranceTypeService } from './../../../shared/services/api/insurance-type.service';
import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { Router } from '@angular/router';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { ContractTypeService } from './../../../shared/services/api/contract-type.service';
import { SupplierService } from './../../../shared/services/api/supplier.service';
import { InsuranceTermService } from '../../../shared/services';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Component, OnInit } from '@angular/core';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InsuranceService } from './../../../shared/services';
import { Insurance } from './../../../shared/models/insurance';
import { Patrimony } from './../../../shared/models/patrimony';


@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectedInsurance: Array<Insurance> = [];
  searchQuery: string = '';
  codeSearch: string;
  insuranceTypeSearch: InsuranceType;
  insuranceTermSearch: string;
  supplierSearch: string;
  patrimonySearch: string;
  items: MenuItem[];
  insuranceTypeList: Array<InsuranceType> = [];
  insuranceList: Array<Insurance> = [];
  insuranceCodeList: Array<string> = [];
  insuranceTermList: Array<string> = [];
  supplierList: Array<string> = [];
  patrimonyList: Array<Patrimony> = [];
  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  insuranceExportList: {
    'Code': string,
    'Patrimoine': string,
    'Fournisseur': string,
    'Type assurance': string,
    'Date Début': string,
    'Date Fin': string,
  }[] = [];
  constructor(
    private insuranceService: InsuranceService,
    private insuranceTermService: InsuranceTermService,
    private globalService: GlobalService,
    private supplierService: SupplierService,
    private vehicleService: VehicleService,
    private InsurancetypeService: InsuranceTypeService,
    private patrimonyService: PatrimonyService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {

    this.className = Insurance.name;
    this.cols = [
      { field: 'code', header: 'Numéro assurance' ,type:'string' },
      { field: 'patrimony', child: 'code', header: 'Patrimoine' ,type:'object' },
      { field: 'supplier', child: 'code', header: 'Fournisseur' ,type:'object'},
      { field: 'insuranceType', child: 'code', header: 'Type assurance' ,type:'object'},
      { field: 'startDate', header: 'Date Début' ,type:'date' },
      { field: 'endDate', header: 'Date Fin' ,type:'date'},
    ];
    this.loadData();

    this.InsurancetypeService.findAll().subscribe(
      data => {
        this.insuranceTypeList = data;
      }
    );
    this.patrimonyService.findAll().subscribe(
      data => {
        this.patrimonyList = data;
        console.log(data);

      }
    );
  }
  onExportExcelGlobal(event) {
    console.log("on expoer insurance");

    this.insuranceService.find(this.searchQuery).subscribe(
      data => {
        this.insuranceExportList = data.map(
          m => ({
            'Code': m.code,
            'Patrimoine': m.patrimony.code,
            'Fournisseur': m.supplier.code,
            'Type assurance': m.insuranceType.code,
            'Date Début': m.startDate,
            'Date Fin': m.endDate,
          }));
        this.globalService.exportExcelGlobal(this.insuranceExportList, this.className);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }
  onExportPdfGlobal(event) {
    console.log("on expoer insurance");

    this.insuranceService.find(this.searchQuery).subscribe(
      data => {
        this.insuranceExportList = data;
        this.globalService.exportPdf(event, this.insuranceExportList, this.className);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }

  loadData(search: string = '') {

    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();
    this.insuranceService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.insuranceService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log("List");
        this.insuranceList = data;
        console.log(data);

        this.spinner.hide();
      },
      error => { this.spinner.hide() },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    this.page = event.first / this.size;
    console.log('first : ' + event.first);
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }

    if (this.insuranceTypeSearch != null && this.insuranceTypeSearch.code !== '') {
      buffer.append(`insuranceType.code~${this.insuranceTypeSearch.code}`);
    }

    if (this.supplierSearch != null && this.supplierSearch !== '') {
      buffer.append(`supplier.code~${this.supplierSearch}`);
    }

    if (this.patrimonySearch != null && this.patrimonySearch !== '') {
      buffer.append(`patrimony.code~${this.patrimonySearch}`);
    }




    this.page = 0;
    this.searchQuery = buffer.getValue();

    this.loadData(this.searchQuery);

  }
  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedInsurance = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }
  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }
  onInsuranceTermSearch(event: any) {
    this.insuranceTermService.find('code~' + event.query).subscribe(
      data => this.insuranceTermList = data.map(f => f.code)
    );
  }
  onCodeSearch(event: any) {
    this.insuranceService.find('code~' + event.query).subscribe(
      data => this.insuranceCodeList = data.map(f => f.code)
    );
  }

  onSupplierearch(event: any) {
    this.supplierService.find('code~' + event.query).subscribe(
      data => this.supplierList = data.map(f => f.code)
    );
  }
  onPatrimonySearch(event: any) {
    this.patrimonyService.find('code~' + event.query).subscribe(
      data =>{

        this.patrimonyList = data.map(f => f.code)
      //  console.log(data);

      }
    );
  }


  reset() {
    this.codeSearch = null;
    this.patrimonySearch = null;
    this.supplierSearch = null;
    this.insuranceTypeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onDeleteAll() {

    if (this.selectedInsurance.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedInsurance.map(x => x.id);
          this.insuranceService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedInsurance.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }
}
