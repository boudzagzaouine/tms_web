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

  searchProductQuery = '';
  searchMaintenanceQuery = '';
  className: string;
  cols: any[];
  collectionProductSize: number=0;
  collectionMaintenanceSize: number=0;

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

   this.searchMaintenanceQuery='notificationType.id:1';
   this.searchProductQuery='notificationType.id:2';

    this.loadProductData();
    }


   
    loadProductData(search: string = '') {
      this.spinner.show();
      
      this.notificationService.sizeSearch(search).subscribe(
        data => {
          this.collectionProductSize = data;
        }
      );
      this.notificationService.findPagination(this.pageProduct, this.sizeProduct, search).subscribe(
        data => {
         
          this.notificationProductList = data.filter(f=> f.notificationType.id== 2);
          console.log(this.notificationProductList);
          
         // this.collectionProductSize=this.notificationProductList.length;
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
      this.loadProductData(this.searchProductQuery);
    }
    







    loadMaintenanceData(search : string = '') {
      console.log(search);

      this.spinner.show();
      this.notificationService.sizeSearch(search).subscribe(
        data => {
          this.collectionMaintenanceSize = data;
        }
      );
      this.notificationService.findPagination(this.pageMaintenance, this.sizeMaintenance, search).subscribe(
        data => {
         
          this.notificationMaintenanceList = data;

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
      this.loadMaintenanceData(this.searchMaintenanceQuery);

    }





}
