import { ProductTypeService } from './../../../shared/services/api/product-type.service';
import { ProductType } from './../../../shared/models/product-type';
import { Product } from './../../../shared/models/product';
import { ProductService } from './../../../shared/services/api/product.service';
import { SupplierService } from './../../../shared/services/api/supplier.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from './../../../shared/models/supplier';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: Product;
  ProductTypeSearch: ProductType;
  ProductTypeList: Array<ProductType> = [];
  selectProducts: Array<Product> = [];
  productList: Product[];
  codesuppplierList: Array<Product> = [];
  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  productExportList: Array<Product> = [];
  titleList = 'Liste des Produits';
  subscriptions = new Subscription();

  constructor(private productService: ProductService,
    private productTypeService: ProductTypeService,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private messageService: MessageService,

    private confirmationService: ConfirmationService) { }

  ngOnInit() {


    this.className = Supplier.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },

      { field: 'desc', header: 'Description', type: 'string' },

      {
        field: 'productType',
        child: 'code',
        header: 'Type',
        type: 'object'
      },
      {
        field: 'uomByProductUomBase',
        header: 'unité de mesure',
        child: 'code',
        type: 'object'
      },

      {
        field: 'vat',
        child: 'value',
        header: 'TVA',
        type: 'object'
      },

      {
        field: 'purshasePriceUB',
        header: 'Prix d achat HT',
        type: 'number'
      },

      {
        field: 'purshasePriceTTCUB',
        header: 'Prix d achat TTC',
        type: 'number'
      },
      {
        field: 'minStock',
        header: 'Quantité minimale',
        type: 'number'
      },
      {
        field: 'stockQuantity',
        header: 'Quantité Stock',
        type: 'number'
      },

    ];


    this.loadData();

  }

  loadData(search: string = '') {


    this.spinner.show();
    this.subscriptions.add( this.productService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.productService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.productList = data;

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       //this.toastr.error('Erreur de connexion');
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }
  onNameSearch(event: any) {
    this.subscriptions.add(this.productService.find('code~' + event.query).subscribe(
      data => this.codesuppplierList = data
    ));
  }
  oncodeProductTypeSearch(event: any) {
    this.subscriptions.add(this.productTypeService.find('code~' + event.query).subscribe(
      data => this.ProductTypeList = data
    ));
  }

  onExportExcel(event) {

    this.subscriptions.add(this.productService.find(this.searchQuery).subscribe(
      data => {
        this.productExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.productExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.productExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdf(event) {
    this.subscriptions.add( this.productService.find(this.searchQuery).subscribe(
      data => {
        this.productExportList = data;
        this.globalService.generatePdf(event, this.productExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

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
    if (this.ProductTypeSearch != null && this.ProductTypeSearch.code !== '') {
      buffer.append(`productType.code~${this.ProductTypeSearch.code}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }



  reset() {
    this.codeSearch = null;
    this.ProductTypeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }


  onTanrsportAdd(event) {
    this.loadData();
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectProducts = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectProducts.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectProducts.map(x => x.id);
          this.subscriptions.add(this.productService.deleteAllByIds(ids).subscribe(
            data => {
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

             // this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

              //this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectProducts.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
