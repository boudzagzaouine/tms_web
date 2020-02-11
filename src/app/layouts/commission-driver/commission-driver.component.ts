import { Driver } from './../../shared/models/driver';
import { EmsBuffer } from './../../shared/utils/ems-buffer';
import { CommissionDriverService } from './../../shared/services/api/commision-driver.service';
import { CommissionDriver } from './../../shared/models/commission-driver';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commission-driver',
  templateUrl: './commission-driver.component.html',
  styleUrls: ['./commission-driver.component.css']
})
export class CommissionDriverComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectedCommissionDriver: CommissionDriver;
  searchQuery: string;
  codeSearch: Driver;
  items: MenuItem[];

  commissionDriverList: Array<CommissionDriver> = [];

  constructor(private commissionDriverService: CommissionDriverService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedCommissionDriver.id) }
    ];
  }
  loadData(search: string = '') {
    console.log("load");

     this.spinner.show();
     this.commissionDriverService.sizeSearch(search).subscribe(
       data => {
         this.collectionSize = data;
          console.log( this.collectionSize);

       }
     );
     this.commissionDriverService.findPagination(this.page, this.size, search).subscribe(
       data => {


         this.commissionDriverList =data;
         console.log(data);

         console.log(this.commissionDriverList);

         this.spinner.hide();
       },
       error => {
       console.log(error);

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
    if (this.codeSearch != null && this.codeSearch.code !== '') {
      buffer.append(`driver.code~${this.codeSearch}`);
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
    this.loadData();
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.commissionDriverService.delete(id).subscribe(
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

  onCommissionDriverAdded(event) {
    this.loadData();
  }



}
