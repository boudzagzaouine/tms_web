import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SupplierService } from './../../../shared/services/api/supplier.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { PurchaseOrderService } from './../../../shared/services/api/purchase-order.service';
import { Supplier } from './../../../shared/models/supplier';
import { PurchaseOrder } from './../../../shared/models/purchase-order';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: PurchaseOrder;
  matSearch: string;
  supplierSearch: Supplier;
  selectedOrders: Array<PurchaseOrder> = [];
  orderList: Array<PurchaseOrder> = [];
  orderCodeList: Array<PurchaseOrder> = [];
  supplierList: Array<Supplier> = [];
  className: string;
  titleList = 'Liste Des Commandes';
  cols: any[];
  editMode: number;
  showDialog: boolean;
  orderExportList:Array<PurchaseOrder> = [];
  subscrubtion = new Subscription();


  constructor(private purchaseOrderService: PurchaseOrderService,
    private globalService: GlobalService,
    private supplierService: SupplierService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {

    this.className = PurchaseOrder.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'supplier', child: 'code', header: 'Fournisseur', type: 'object' },
      { field: 'orderType', child: 'code', header: 'Type', type: 'object' },
      { field: 'totalPriceHT', header: 'Prix HT', type: 'number' },
      { field: 'vat', header: 'TVA', type: 'number' },
      { field: 'totalPriceTTC', header: 'Prix TTC', type: 'number' },


    ];



  }


  loadData(search: string = '') {
    this.spinner.show();
    this.subscrubtion.add(this.purchaseOrderService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscrubtion.add(this.purchaseOrderService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.orderList = data;

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }


  onExportExcel(event) {

    this.subscrubtion.add(this.purchaseOrderService.find(this.searchQuery).subscribe(
      data => {
        this.orderExportList = data;

        if (event != null) {
          this.globalService.generateExcel(event, this.orderExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.orderExportList, this.className, this.titleList);

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
    this.subscrubtion.add(this.purchaseOrderService.find(this.searchQuery).subscribe(
      data => {
        this.orderExportList = data;
        this.globalService.generatePdf(event, this.orderExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }

  onSearchClicked() {


    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch.code !== '') {
      buffer.append(`code~${this.codeSearch.code}`);
    }


    if (this.supplierSearch != null && this.supplierSearch.code !== '') {
      buffer.append(`supplier.code~${this.supplierSearch.code}`);
    }


    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }


  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedOrders = event.object;

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/order/edit', this.selectedOrders[0].id]);
    }

  }

  onPurchaseOrderCodeSearch(event: any) {
    this.subscrubtion.add( this.purchaseOrderService.find('code~' + event.query).subscribe(
      data => this.orderCodeList = data ,
    ));
  }
  onSupplierCodeSearch(event: any) {
    this.subscrubtion.add(this.supplierService.find('code~' + event.query).subscribe(
      data => this.supplierList = data ,
    ));
  }

  reset() {
    this.codeSearch = null;
    this.matSearch = null;

    this.supplierSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }


  onDeleteAll() {

    if (this.selectedOrders.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedOrders.map(x => x.id);
          this.subscrubtion.add(this.purchaseOrderService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedOrders.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  ngOnDestroy() {
    this.subscrubtion.unsubscribe();
  }

}
