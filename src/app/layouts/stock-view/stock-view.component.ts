import { ProductTypeService } from './../../shared/services/api/product-type.service';
import { ProductType } from './../../shared/models/product-type';
import { UomService } from './../../shared/services/api/uom.service';
import { SupplierService } from './../../shared/services/api/supplier.service';
import { ProductService } from './../../shared/services/api/product.service';
import { Supplier } from './../../shared/models/supplier';
import { Product } from './../../shared/models/product';
import { EmsBuffer } from './../../shared/utils/ems-buffer';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../shared/services/api/global.service';
import { StockViewService } from './../../shared/services/api/stock-view.service';
import { StockView } from './../../shared/models/stock-view';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.scss']
})
export class StockViewComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  productSearch: Product;
  dateSearch :Date;
  supplierSearch: Supplier;
  productCodeList: Array<Product> = [];
  supplierCodeList: Array<Supplier> = [];
  productTypeSearch: ProductType;
  productTypeCodeList: Array<ProductType> = [];
  descriptionSearch = '';
  codeList: Array<StockView> = [];
  cols: any[];
  stockList: Array<StockView> = [];
  selectedStock: Array<StockView> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste du Stock';
  stockExportList: Array<StockView> = [];
  subscriptions= new Subscription ();
  items: MenuItem[];
    
  home: MenuItem;
  constructor(private stockViewService: StockViewService,
    private productService : ProductService,
  private supplierService : SupplierService,
  private productTypeService :ProductTypeService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.items = [
      {label: 'StockView'},
      {label: 'Lister'},
   
  ];
  
  this.home = {icon: 'pi pi-home'};

    this.subscriptions.add(this.productTypeService.findAll().subscribe(
      data => this.productTypeCodeList = data ,
    ));
    this.className = StockView.name;
    this.cols = [
      {
        field: 'product',child: 'code',   header: 'Code',    type: 'object'
      },

      {
        field: 'product',child: 'description',   header: 'Description',    type: 'object'
      },
  
    
      {
        field: 'quantity',   header: 'Quantité',    type: 'number'
      },
    
      {
        field: 'price',   header: 'Prix HT',    type: 'number'
      },

    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add( this.stockViewService.find(this.searchQuery).subscribe(
      data => {
        this.stockExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.stockExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.stockExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.stockViewService.find(this.searchQuery).subscribe(
      data => {
        this.stockExportList = data;
        this.globalService.generatePdf(event, this.stockExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.stockViewService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add( this.stockViewService.findPagination(this.page, this.size, search).subscribe(
      data => {


        this.stockList = data
        console.log(this.stockList);
        
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
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
    if (this.productSearch != null && this.productSearch.code !== '') {
      buffer.append(`product.code~${this.productSearch.code}`);
    }
   
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }

  onCodeSearch(event: any) {
    this.subscriptions.add( this.stockViewService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    ));
  }
  
  reset() {
    this.productSearch = null;
    this.productTypeSearch = null;
    this.supplierSearch = null;
 this.dateSearch=null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedStock = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedStock.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedStock.map(x => x.id);
          this.subscriptions.add(this.stockViewService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedStock.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }


  onProductCodeSearch(event: any) {
    this.subscriptions.add( this.productService.find('code~' + event.query).subscribe(
      data => this.productCodeList = data ,
    ));
  }
  onProductTypeCodeSearch(event: any) {
    this.subscriptions.add( this.productTypeService.find('code~' + event.query).subscribe(
      data => this.productTypeCodeList = data ,
    ));
  }
  onSupplierCodeSearch(event: any) {
    this.subscriptions.add( this.supplierService.find('code~' + event.query).subscribe(
      data => this.supplierCodeList = data ,
    ));
  }
  onShowDialog(event) {

    this.showDialog = event;

    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
