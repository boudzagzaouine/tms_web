import { ProductServiceService } from './../../../shared/services/api/product-service.service';
import { ProductService } from './../../../shared/services/api/product.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Product } from './../../../shared/models/product';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { CatalogServiceService } from './../../../shared/services/api/catalog-service.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { CatalogService } from './../../../shared/models/catalog-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-service',
  templateUrl: './catalog-service.component.html',
  styleUrls: ['./catalog-service.component.css']
})
export class CatalogServiceComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectCatalogServices: Array<CatalogService> = [];
  searchQuery = '';
  codeSearch: string;
  productSearch: Product;
  catalogServiceList: Array<CatalogService> = [];
  productList: Array<Product> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste de Catalogue Service';
  catalogServiceExportList: Array<CatalogService> = [];
  items: MenuItem[];
  home: MenuItem;

  constructor(
    private catalogServiceService: CatalogServiceService,
    private productService:ProductServiceService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Catalogue Service' ,routerLink:'/core/settings/path'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = CatalogService.name;
    this.cols = [
      {
        field: 'product',
        child: 'code',
        header: 'Service',
        type: 'object'
      },

      { field: 'purchaseAmountHt', header: 'Prix Achat ', type: 'number' },
      { field: 'purchaseVat',child:'value', header: 'TVA', type: 'object' },

      { field: 'saleAmountHt', header: 'Prix Vente', type: 'number' },
      { field: 'saleVat',child:'value', header: 'TVA', type: 'object' },

    ];

     this.loadData();


  }

  loadData() {


    this.spinner.show();
    this.catalogServiceService
      .sizeSearch(this.searchQuery)
      .subscribe(data => {
        this.collectionSize = data;
      });
    this.catalogServiceService
      .findPagination(this.page, this.size, this.searchQuery)
      .subscribe(
        data => {
          this.catalogServiceList = data;
          console.log(data);

          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

         // this.toastr.error(error.err.message + 'Erreur de connexion');
        },
        () => this.spinner.hide()
      );
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;    this.loadData();
  }
  onExportExcel(event) {
    this.catalogServiceService.find(this.searchQuery).subscribe(
      data => {
        this.catalogServiceExportList = data;
        if (event != null) {
          this.globalService.generateExcel(
            event,
            this.catalogServiceExportList,
            this.className,
            this.titleList
          );
        } else {
          this.globalService.generateExcel(
            this.cols,
            this.catalogServiceExportList,
            this.className,
            this.titleList
          );
        }
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  onExportPdf(event) {
    this.catalogServiceService.find(this.searchQuery).subscribe(
      data => {
        this.catalogServiceExportList = data;
        this.globalService.generatePdf(
          event,
          this.catalogServiceExportList,
          this.className,
          this.titleList
        );
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  onSearchClicked() {
    const buffer = new EmsBuffer();


    if (
      this.productSearch != null &&
      this.productSearch.code !== ''
    ) {
      buffer.append(`product.code~${this.productSearch.code}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }



  onProductSearch(event: any) {
    this.productService
      .find('code~' + event.query)
      .subscribe(data => (this.productList = data));
  }

  reset() {
    this.productSearch = null;


    this.page = 0;
    this.searchQuery='';

    this.loadData();
  }

  onObjectEdited(event) {
    this.editMode = event.operationMode;
    this.selectCatalogServices = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }
  }

  onDeleteAll() {
    if (this.selectCatalogServices.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer ?',
        accept: () => {
          const ids = this.selectCatalogServices.map(x => x.id);
          this.catalogServiceService.deleteAllByIds(ids).subscribe(
            data => {
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

              // this.toastr.success(
              //   'Elément Supprimer avec Succés',
              //   'Suppression'
              // );

              this.loadData();
            },
            error => {
              this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

              //this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          );
        }
      });
    } else if (this.selectCatalogServices.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }



  onShowDialog(event) {
    this.showDialog = event;

    this.loadData();
  }

}
