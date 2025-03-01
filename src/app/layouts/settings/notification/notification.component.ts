import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { OrderStatus } from './../../../shared/models';
import { Representative } from './../../../shared/models/Representative';
import { NotificationService } from './../../../shared/services/api/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Notification } from './../../../shared/models/notification';
import { NotificationType } from './../../../shared/models/notificationType';
import { NotificationTypeService } from './../../../shared/services/api/notificationType.service';
import { EmsBuffer } from './../../../shared/utils';
import { GlobalService } from './../../../shared/services/api/global.service';
import { NotificationStateService } from './../../../shared/services/api/notificationState.service';
import { NotificationState } from './../../../shared/models/notificationState';
import { Responsability } from './../../../shared/models/responsability';
import { ResponsabilityService } from './../../../shared/services/api/responsability.service';
import { Agent } from './../../../shared/models/agent';
import { AgentService } from './../../../shared/services/api/agent.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  pageProduct = 0;
  sizeProduct = 10;
  pageMaintenance = 0;
  sizeMaintenance = 10;
  itemss: MenuItem[];

  searchProductQuery = '';
  searchMaintenanceQuery = '';
  className: string;
  cols: any[];
  collectionProductSize: number = 0;
  collectionMaintenanceSize: number = 0;
  maintenanceExportList: Array<Notification> = [];
  notificationProductList: Array<Notification> = [];
  responsabilityList: Array<Responsability> = [];

  notificationMaintenanceList: Array<Notification> = [];
  notificationStateList: Array<NotificationState> = [];
  notificationStateSearch: NotificationState;
  responsabilitySearch: Responsability;
  agentSearch: Agent;
  agentList: Array<Agent> = [];

  patrimonyTypeList: Array<{ code: string }> = [];
  typeSearch: string;
 

  titleListMaintenance :string='Liste des notification  de la Maintenance';
  items: MenuItem[];
  home: MenuItem;

  constructor(private notificationService: NotificationService,
           private notificationStateService:NotificationStateService,
           private responsabilityService :ResponsabilityService,
           private agentService :AgentService,

           private spinner: NgxSpinnerService,
           private globalService: GlobalService,
           private toastr: ToastrService,
           private messageService: MessageService,
           private confirmationService: ConfirmationService,) { }

  ngOnInit() {

    this.itemss = [
     
      {label: 'En PDF', icon: 'pi pi-file-pdf', command: () => {
          this.onExportPdf();
      }},
    
     {label: 'En EXCEL', icon: 'pi pi-file-excel', command: () => {
     this.onExportExcel();
     }},
    
  ];
  this.className = Notification.name;
  this.notificationStateService.findAll().subscribe(
    data => {
      this.notificationStateList = data;

    }
  )

  this.responsabilityService.findAll().subscribe(
    data => {
      this.responsabilityList = data;

    }
  )

  this.agentService.findAll().subscribe(
    data => {
      this.agentList = data;

    }
  )


  this.cols = [
    { field: 'code', header: 'Code', type: 'string' },
    { field: 'programeType', header: 'Type de programme', type: 'string' },

    { field: 'responsability',child:'code', header: 'Responsabilité', type: 'object' },
    { field: 'serviceProvider',child:'code', header: 'Prestataire de service', type: 'object' },
    { field: 'agent', header: 'Agent',child:'name', type: 'object' },


    { field: 'action', header: 'Type action', type: 'string' },
    { field: 'intervention', header: 'Intervention planifiée', type: 'string' },
    { field: 'patimonyCode', header: 'Patrimoine', type: 'string' },
    { field: 'patrimonyType', header: 'Type', type: 'string' },
  ];


    this.patrimonyTypeList = [
      { code: 'vehicule' }, { code: 'machine' }
    ];

    this.items = [

      { label: 'Paramétrage' },
      { label: 'Notification', routerLink: '/core/settings/notification' },

    ];

    this.home = { icon: 'pi pi-home' };

    this.searchMaintenanceQuery = 'notificationType.id:1';
    this.searchProductQuery = 'notificationType.id:2';

    this.loadProductData();
    this.loadMaintenanceData();

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

        this.notificationProductList = data;


        // this.collectionProductSize=this.notificationProductList.length;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

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








  loadMaintenanceData(search: string = '') {

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
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

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

  onSearchClicked() {


    const buffer = new EmsBuffer();


    if (this.typeSearch != null && this.typeSearch !== '') {
      buffer.append(`patrimonyType~${this.typeSearch}`);
    }
    if (this.notificationStateSearch != null && this.notificationStateSearch.code !== '') {
      buffer.append(`notificationState.code~${this.notificationStateSearch.code}`);
    }
    if (this.responsabilitySearch != null && this.responsabilitySearch.code !== '') {
      buffer.append(`responsability.code~${this.responsabilitySearch.code}`);
    } if (this.agentSearch != null && this.agentSearch.code !== '') {
      buffer.append(`agent.code~${this.agentSearch.code}`);
    }



    this.pageMaintenance = 0;
    this.searchMaintenanceQuery ='notificationType.id:1,'+ buffer.getValue();
   // console.log(this.searchMaintenanceQuery);
    
    this.loadMaintenanceData(this.searchMaintenanceQuery);

  }


  reset() {
    this.typeSearch = null;
    this.notificationStateSearch = null;
    this.responsabilitySearch=null;
    this.agentSearch=null;

    this.searchMaintenanceQuery = 'notificationType.id:1';
    this.loadMaintenanceData(this.searchMaintenanceQuery);
  }




  onExportExcel() {

    this.notificationService.find(this.searchMaintenanceQuery).subscribe(
      data => {
        this.maintenanceExportList = data;

          this.globalService.generateExcel(this.cols, this.maintenanceExportList, this.className, this.titleListMaintenance);

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }
  onExportPdf() {
   this.notificationService.find(this.searchMaintenanceQuery).subscribe(
      data => {
        this.maintenanceExportList = data;
        this.globalService.generatePdf(this.cols, this.maintenanceExportList, this.className, this.titleListMaintenance);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }



}
