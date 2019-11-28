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

  selectedInsurance: Insurance;
  searchQuery: string;
  codeSearch: string;
  insuranceTermSearch: string;
  supplierSearch: string;
  contractTypeSearch: string;
  items: MenuItem[];

  insuranceList: Array<Insurance> = [];
  insuranceTermList: Array<string> = [];
  supplierList: Array<string> = [];
  contractTypeList: Array<string> = [];

  constructor(
    private insuranceService: InsuranceService,
    private insuranceTermService: InsuranceTermService,
    private supplierService: SupplierService,
    private contractTypeService: ContractTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.insuranceService.insuranceListChanged.subscribe(
      data => {
        this.insuranceList = data;
      }
    );

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedInsurance.id) }
    ];
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

    if (this.contractTypeSearch != null && this.contractTypeSearch !== '') {
      buffer.append(`contractType.code~${this.contractTypeSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

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

  onContractTypeSearch(event: any) {
    this.contractTypeService.find('code~' + event.query).subscribe(
      data => this.contractTypeList = data.map(f => f.code)
    );
  }

  reset() {
    this.codeSearch = null;
    this.contractTypeSearch = null;
    this.supplierSearch = null;
    this.insuranceTermSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.insuranceService.delete(id);
      }
    });
  }

  onEdit() {
    this.toastr.info('selected ');
  }
}
