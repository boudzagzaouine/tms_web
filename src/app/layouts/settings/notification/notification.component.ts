import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { OrderStatus } from './../../../shared/models';
import { Representative } from './../../../shared/models/Representative';
import { NotificationService } from './../../../shared/services/api/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Notification } from './../../../shared/models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  
  pageProduct = 0;
  sizeProduct = 10;
  pageMaintenance= 0;
  sizeMaintenance = 10;

  searchQuery = '';
  className: string;
  cols: any[];
  collectionSize: number;
  notificationProductList: Array<Notification> = [];
  notificationMaintenanceList: Array<Notification> = [];

  items: MenuItem[];
  home: MenuItem;

  constructor(private notificationService:NotificationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }

    ngOnInit() {
      this.items = [
        {label: 'Paramétrage'},
        {label: 'Notification' ,routerLink:'/core/settings/notification'},
    
    ];
    
    this.home = {icon: 'pi pi-home'};

    //   this.className = Notification.name;
    // this.cols = [
    //   { field: 'notificationState', child:'code',childid:'id' ,header: 'Statut', type: 'object' },
    //   { field: 'code', header: 'Code', type: 'string' },
    //   { field: 'type',header: 'Type', type: 'string' },

    // ];
    this.loadMaintenanceData();
    this.loadProductData();
    }


    // typeOf(event) {
    //   let res: number;
  
    //   if (event === "object") {
    //     res = 1;
    //   } else if (event === "number" || event === "string") {
    //     res = 2;
    //   } else if (event === "date") {
    //     res = 3;
    //   } else if (event === "boolean") {
    //     res = 4;
    //   }
  
    //   return res;
    // }

    loadProductData(search: string = '') {
      this.spinner.show();
      this.notificationService.sizeSearch(search).subscribe(
        data => {
          this.collectionSize = data;
        }
      );
      this.notificationService.findPagination(this.pageProduct, this.sizeProduct, search).subscribe(
        data => {
         
          this.notificationProductList = data.filter(f=> f.notificationType.id== 2);
  
          this.spinner.hide();
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

          //this.toastr.error(error.error.message, 'Erreur');
          this.spinner.hide();
        },
        () => this.spinner.hide()
      );
    }
    loadProductDataLazy(event) {
      this.sizeProduct = event.rows;
      this.pageProduct = event.first / this.sizeProduct;
      this.loadProductData(this.searchQuery);
    }
    







    loadMaintenanceData(search: string = '') {
      this.spinner.show();
      this.notificationService.sizeSearch(search).subscribe(
        data => {
          this.collectionSize = data;
        }
      );
      this.notificationService.findPagination(this.pageMaintenance, this.sizeMaintenance, search).subscribe(
        data => {
         
          this.notificationMaintenanceList = data.filter(f=> f.notificationType.id== 1);
  
          this.spinner.hide();
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

          //this.toastr.error(error.error.message, 'Erreur');
          this.spinner.hide();
        },
        () => this.spinner.hide()
      );
    }
    loadMaintenanceDataLazy(event) {

      this.sizeMaintenance = event.rows;
      this.pageMaintenance = event.first / this.sizeMaintenance;
      this.loadMaintenanceData(this.searchQuery);

    }





}
