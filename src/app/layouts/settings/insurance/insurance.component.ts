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
  searchQuery: string;
  codeSearch: string;
  insuranceTermSearch: string;
  supplierSearch: string;
  vehicleSearch: string;
  items: MenuItem[];

  insuranceList: Array<Insurance> = [];
  insuranceTermList: Array<string> = [];
  supplierList: Array<string> = [];
  vehicleList: Array<string> = [];

  className: String;
  cols: any[];
  editMode: number;
  showDialog: boolean;

  constructor(
    private insuranceService: InsuranceService,
    private insuranceTermService: InsuranceTermService,
    private supplierService: SupplierService,
    private vehicleService: VehicleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {

    this.className = Insurance.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'patrimony', header: 'Équipement' },
      { field: 'supplier', header: 'Fournisseur' },
      { field: 'insuranceType', header: "Type d'assurance" },
      { field: 'startDate', header: 'Date Début' },
      { field: 'endDate', header: 'Date Fin' },
    ];
    this.loadData();
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
        console.log(data);
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

    if (this.insuranceTermSearch != null && this.insuranceTermSearch !== '') {
      buffer.append(`insuranceTerm.code~${this.insuranceTermSearch}`);
    }

    if (this.supplierSearch != null && this.supplierSearch !== '') {
      buffer.append(`supplier.code~${this.supplierSearch}`);
    }

    if (this.vehicleSearch != null && this.vehicleSearch !== '') {
      buffer.append(`vehicleCode~${this.vehicleSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();

    this.loadData(this.searchQuery);

  }
  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedInsurance = event.object;

    if (this.editMode === 4) {
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

  onSupplierearch(event: any) {
    this.supplierService.find('code~' + event.query).subscribe(
      data => this.supplierList = data.map(f => f.code)
    );
  }

  onVehicleSearch(event: any) {
    this.vehicleService.find('code~' + event.query).subscribe(
      data => this.vehicleList = data.map(f => f.code)

    );

  }

  reset() {
    this.codeSearch = null;
    this.vehicleSearch = null;
    this.supplierSearch = null;
    this.insuranceTermSearch = null;
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
