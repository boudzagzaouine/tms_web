import { Supplier } from './../../../shared/models/supplier';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SupplierService } from './../../../shared/services/api/supplier.service';
import { PurchaseOrderService } from './../../../shared/services/api/purchase-order.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { SupplierInvoiceService } from './../../../shared/services/api/supplier-invoice.service';
import { Subscription } from 'rxjs';
import { PurchaseOrder } from './../../../shared/models/purchase-order';
import { SupplierInvoice } from './../../../shared/models/supplier-invoice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-invoice-list',
  templateUrl: './supplier-invoice-list.component.html',
  styleUrls: ['./supplier-invoice-list.component.scss']
})
export class SupplierInvoiceListComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: SupplierInvoice;
  supplierInvoiceCode:string ;
  dateSearch: Date[];
  matSearch: string;
  supplierSearch: Supplier;
  orderSearch: PurchaseOrder;
  selectedSupplierInvoice: Array<SupplierInvoice> = [];
  supplierInvoiceList: Array<SupplierInvoice> = [];
  supplierInvoiceCodeList: Array<SupplierInvoice> = [];
  supplierList: Array<Supplier> = [];
  orderList: Array<PurchaseOrder> = [];
  className: string;
  titleList = 'Liste Des Factures';
  cols: any[];
  editMode: number;
  showDialog: boolean;
  supplierInvoiceExportList: Array<SupplierInvoice> = [];
  subscrubtion = new Subscription();


  constructor(private supplierInvoiceService: SupplierInvoiceService,
    private globalService: GlobalService,
    private purchaseOrderService: PurchaseOrderService,
    private supplierService: SupplierService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {

    this.className = SupplierInvoice.name;
    this.cols = [
      { field: 'code', header: 'Numéro', type: 'string' },
      { field: 'supplierInvoiceCode', header: 'Code Facture Achat', type: 'string' },
      { field: 'supplier', child: 'code', header: 'Fournisseur', type: 'object' },
      { field: 'invoiceStatus', child: 'code', header: 'statut Paiement', type: 'object' },
      { field: 'totalPriceHT', header: 'Total HT', type: 'number' },
      { field: 'totalPriceTTC', header: 'Total TTC', type: 'number' },
      { field: 'amountPayed', header: 'Montant Payé', type: 'number' },
      { field: 'invoiceDate', header: 'Date SupplierInvoice', type: 'date' },
    ];



  }


  loadData(search: string = '') {
    this.spinner.show();
    this.subscrubtion.add(this.supplierInvoiceService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscrubtion.add(this.supplierInvoiceService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.supplierInvoiceList = data;

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


  onExportExcel(event) {

    this.subscrubtion.add(this.supplierInvoiceService.find(this.searchQuery).subscribe(
      data => {
        this.supplierInvoiceExportList = data;

        if (event != null) {
          this.globalService.generateExcel(event, this.supplierInvoiceExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.supplierInvoiceExportList, this.className, this.titleList);

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
    this.subscrubtion.add(this.supplierInvoiceService.find(this.searchQuery).subscribe(
      data => {
        this.supplierInvoiceExportList = data;
        this.globalService.generatePdf(event, this.supplierInvoiceExportList, this.className, this.titleList);
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


    if (this.supplierInvoiceCode != null && this.supplierInvoiceCode !== '') {
      buffer.append(`supplierInvoiceCode~${this.supplierInvoiceCode}`);
    }



    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }

  onObjectEdited(event) {
    this.editMode = event.operationMode;
    this.selectedSupplierInvoice = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/supplier-invoice/edit', this.selectedSupplierInvoice[0].id]);
    }

  }

  selectDateSupplierInvoice(event) {

    console.log(event);
    console.log(this.dateSearch[0]);

  }

  onSupplierInvoiceCodeSearch(event: any) {
    this.subscrubtion.add(this.supplierInvoiceService.find('code~' + event.query).subscribe(
      data => this.supplierInvoiceCodeList = data ,
    ));
  }
  onSupplierCodeSearch(event: any) {
    this.subscrubtion.add(this.supplierService.find('contact.name~' + event.query).subscribe(
      data => this.supplierList = data ,
    ));
  }
  onOrderCodeSearch(event: any) {
    this.subscrubtion.add(this.purchaseOrderService.find('code~' + event.query).subscribe(
      data => this.orderList = data ,
    ));
  }

  reset() {
    this.dateSearch = null;
    this.codeSearch = null;
    this.matSearch = null;
    this.orderSearch = null;
    this.supplierSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }


  onDeleteAll() {

    if (this.selectedSupplierInvoice.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedSupplierInvoice.map(x => x.id);
          this.subscrubtion.add(this.supplierInvoiceService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedSupplierInvoice.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  ngOnDestroy() {
    this.subscrubtion.unsubscribe();
  }
}
