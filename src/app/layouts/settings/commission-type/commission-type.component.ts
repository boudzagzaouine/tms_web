import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { CommissionTypeService } from './../../../shared/services/api/commisionType.service';
import { CommissionType } from './../../../shared/models/commissionType';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commission-type',
  templateUrl: './commission-type.component.html',
  styleUrls: ['./commission-type.component.css']
})
export class CommissionTypeComponent implements OnInit {
  page = 0;
  size = 10;
  collectionSize: number;

  selectedCommmissionType: CommissionType;
 searchQuery: string;
  codeSearch: string;
  items: MenuItem[];
  commissionTypeList: Array<CommissionType> = [];

  constructor(private commissionTypeService:CommissionTypeService,
     private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedCommmissionType.id) }
    ];

  }


  loadData(search: string = '') {

    this.spinner.show();
    this.commissionTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
        console.log(this.collectionSize);

      }
    );
    this.commissionTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.commissionTypeList = data;
        console.log(this.commissionTypeList);

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
      buffer.append(`z~${this.codeSearch}`);
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
        this.commissionTypeService.delete(id).subscribe(
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

  onCommissionTypeAdded(event) {
    this.loadData();
  }

}
