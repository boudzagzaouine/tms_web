import { LoadingTypeService } from './../../../shared/services/api/loading-type.service';
import { LoadingType } from './../../../shared/models/loading-type';
import { TurnTypeService } from './../../../shared/services/api/turn-type.service';
import { TurnType } from './../../../shared/models/turn-Type';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { OrderTransportService } from './../../../shared/services/api/order-transport.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OrderTransport } from './../../../shared/models/order-transport';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-transport-affected',
  templateUrl: './order-transport-affected.component.html',
  styleUrls: ['./order-transport-affected.component.css']
})
export class OrderTransportAffectedComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: OrderTransport;
  OrderTransportCodeList : OrderTransport[]=[];
  turnTypeList:TurnType[]=[];
   turnTypeSearch:TurnType;

   loadingTypeList:LoadingType[]=[];
   loadingTypeSearch:LoadingType;

  selectedOrderTransports: Array<OrderTransport> = [];
  orderTransportList: Array<OrderTransport> = [];
  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  OrderTransportExportList: Array<OrderTransport> = [];
  titleList = 'Liste des Ordres de Transport';
  subscriptions= new Subscription();

  items: MenuItem[];

  home: MenuItem;


   dateLivraisonSearch: Date;
  constructor(private orderTransportService: OrderTransportService,

    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private turnTypeService:TurnTypeService,
    private loadingTypeService:LoadingTypeService,
    private router: Router) { }

  ngOnInit() {

    this.items = [
      {label: 'OrderTransport'},
      {label: 'Lister'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = OrderTransport.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'date', header: 'Date', type: 'date' },
      { field: 'trajet',child: 'code', header: 'Trajet', type: 'object' },

      { field: 'turnType', child: 'code', header: 'Type', type: 'object' },
      { field: 'loadingType', child: 'code', header: 'Type de chargement', type: 'object' },
      { field: 'account', child: 'name', header: 'Compte', type: 'object' },
      { field: 'turnStatus', child: 'code', header: 'Statut', type: 'object' },


    ];

    this.turnTypeService.findAll().subscribe(
      data =>{
        this.turnTypeList=data;
      }
    );

    this.loadingTypeService.findAll().subscribe(
      data =>{
        this.loadingTypeList=data;
      }
    );

  }

  onExportExcel(event) {

    this.subscriptions.add(  this.orderTransportService.find(this.searchQuery).subscribe(
      data => {
        this.OrderTransportExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.OrderTransportExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.OrderTransportExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdf(event) {
    this.subscriptions.add( this.orderTransportService.find(this.searchQuery).subscribe(
      data => {
        this.OrderTransportExportList = data;
        this.globalService.generatePdf(event, this.OrderTransportExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }
  loadData(search: string = '') {
    if(search!=''){
   search +=',turnStatus.id!1';
    }else {
      search +='turnStatus.id!1';

    }
    this.spinner.show();
    this.subscriptions.add(this.orderTransportService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add( this.orderTransportService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.orderTransportList = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.dateLivraisonSearch != null && this.dateLivraisonSearch !== undefined) {
      buffer.append(`date>${this.dateLivraisonSearch.toISOString()}`);
    }
    if (this.codeSearch != null && this.codeSearch !== undefined) {
      buffer.append(`code~${this.codeSearch.code}`);
    }
    if (this.turnTypeSearch != null && this.turnTypeSearch !== undefined) {
      buffer.append(`turnType.code~${this.turnTypeSearch.code}`);
    }
    if (this.loadingTypeSearch != null && this.loadingTypeSearch !== undefined) {
      buffer.append(`loadingType.code~${this.loadingTypeSearch.code}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }


  onOrderTransportSearch(event){
    this.subscriptions.add(this.orderTransportService.find('turnStatus.id!1,code~' + event.query).subscribe(
      data => this.OrderTransportCodeList = data
    ));
  }
  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedOrderTransports = event.object;

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      if(this.selectedOrderTransports[0]){
        this.router.navigate(['/core/order-transport/edit/', this.selectedOrderTransports[0]?.id]);

      }else {
        this.router.navigate(['/core/order-transport/edit/']);

      }
    }

  }

  reset() {
    this.codeSearch = null;
   this.dateLivraisonSearch=null;
   this.turnTypeSearch=null;
   this.loadingTypeSearch=null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }




  onDeleteAll() {

    if (this.selectedOrderTransports.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedOrderTransports.map(x => x.id);
          this.subscriptions.add( this.orderTransportService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedOrderTransports.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
