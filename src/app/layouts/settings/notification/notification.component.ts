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
  
  page = 0;
  size = 10;
  searchQuery = '';
  className: string;
  cols: any[];
  collectionSize: number;
  notificationList: Array<Notification> = [];
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

      this.className = Notification.name;
    this.cols = [
      { field: 'notificationState', child:'code',childid:'id' ,header: 'Statut', type: 'object' },
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'type',header: 'Type', type: 'string' },

    ];
    this.loadData();
    }


    typeOf(event) {
      let res: number;
  
      if (event === "object") {
        res = 1;
      } else if (event === "number" || event === "string") {
        res = 2;
      } else if (event === "date") {
        res = 3;
      } else if (event === "boolean") {
        res = 4;
      }
  
      return res;
    }

    loadData(search: string = '') {
      this.spinner.show();
      this.notificationService.sizeSearch(search).subscribe(
        data => {
          this.collectionSize = data;
        }
      );
      this.notificationService.findPagination(this.page, this.size, search).subscribe(
        data => {
         
          this.notificationList = data;
  
          this.spinner.hide();
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

          //this.toastr.error(error.error.message, 'Erreur');
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
    

}
