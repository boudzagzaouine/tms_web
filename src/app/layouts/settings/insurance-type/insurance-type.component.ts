import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsuranceTypeService } from './../../../shared/services/api/insurance-type.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { InsuranceType } from './../../../shared/models/insurance-Type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-type',
  templateUrl: './insurance-type.component.html',
  styleUrls: ['./insurance-type.component.css']
})
export class InsuranceTypeComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectedInsuranceType: InsuranceType;
  searchQuery: string;
  codeSearch: string;
  items: MenuItem[];
  insertOrUpdate:String;
  insuranceTypeList: Array<InsuranceType> = [];

  constructor(private insuranceTypeService: InsuranceTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedInsuranceType.id) }
    ];
  }


  loadData(search: string = '') {

    this.spinner.show();
    this.insuranceTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.insuranceTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.insuranceTypeList = data;
        this.spinner.hide();
      },
      error => {


        this.spinner.hide();
      },
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

    this.page = 0;
    this.searchQuery = buffer.getValue();
    console.log(this.searchQuery);

    this.loadData(this.searchQuery);

  }

  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.insuranceTypeService.delete(id).subscribe(
          data => {
            this.toastr.success("Elément Supprimer avec Succés","Suppression");
            this.loadData();
          },
          error=>{
           this.toastr.error(error.error.message);

         }
        );
      }
    });
  }

  onEdit() {
    this.toastr.info('selected ');
  }

  onInsuranceTypeAdded(event) {
    this.loadData();
  }

}
