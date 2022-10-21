import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { OrderDeliveryService } from './../../../shared/services/api/order-delivery.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OrderDelivery } from './../../../shared/models/order-delivery';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-delivery-list',
  templateUrl: './order-delivery-list.component.html',
  styleUrls: ['./order-delivery-list.component.scss']
})
export class OrderDeliveryListComponent implements OnInit {



  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: OrderDelivery;


  selectedOrderDeliverys: Array<OrderDelivery> = [];
  orderDeliveryList: Array<OrderDelivery> = [];
  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  OrderDeliveryExportList: Array<OrderDelivery> = [];
  titleList = 'Liste des OrderDeliverys';
  subscriptions= new Subscription();

  items: MenuItem[];

  home: MenuItem;


   dateLivraisonSearch: Date;
   dateDelivery: Date;
  constructor(private OrderDeliveryService: OrderDeliveryService,

    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {

    this.items = [
      {label: 'OrderDelivery'},
      {label: 'Lister'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = OrderDelivery.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'date', header: 'Date', type: 'date' },

      { field: 'turnType', child: 'code', header: 'Type', type: 'object' },
      { field: 'loadingType', header: 'Type de chargement', type: 'string' },
      { field: 'account', child: 'name', header: 'Client', type: 'object' },



    ];


  }

  onExportExcel(event) {

    this.subscriptions.add(  this.OrderDeliveryService.find(this.searchQuery).subscribe(
      data => {
        this.OrderDeliveryExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.OrderDeliveryExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.OrderDeliveryExportList, this.className, this.titleList);

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
    this.subscriptions.add( this.OrderDeliveryService.find(this.searchQuery).subscribe(
      data => {
        this.OrderDeliveryExportList = data;
        this.globalService.generatePdf(event, this.OrderDeliveryExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }
  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.OrderDeliveryService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add( this.OrderDeliveryService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.orderDeliveryList = data;
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
      buffer.append(`dateDelivery~${this.dateLivraisonSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }


  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedOrderDeliverys = event.object;

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/order-delivery/edit/', this.selectedOrderDeliverys[0].id]);
    }

  }

  reset() {
    this.codeSearch = null;

    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }




  onDeleteAll() {

    if (this.selectedOrderDeliverys.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedOrderDeliverys.map(x => x.id);
          this.subscriptions.add( this.OrderDeliveryService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedOrderDeliverys.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
