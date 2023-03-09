import { EmsBuffer } from './../../../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../../../shared/services/api/global.service';
import { ProductServiceService } from './../../../../../shared/services/api/product-service.service';
import { AccountPricingServiceService } from '../../../../../shared/services/api/account-pricing-service.service';
import { Product } from './../../../../../shared/models/product';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Company } from './../../../../../shared/models/company';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountPricingService } from '../../../../../shared/models/account-pricing-service';

@Component({
  selector: 'app-company-service',
  templateUrl: './company-service.component.html',
  styleUrls: ['./company-service.component.css']
})
export class CompanyServiceComponent implements OnInit {

  @Input() selectedCompany: Company = new Company();
  @Output() accountPricingServiceListEdited = new EventEmitter<AccountPricingService[]>();
  page = 0;
  size = 10;
  collectionSize: number;

  selectAccountPricingServices: Array<AccountPricingService> = [];
  searchQuery = "";
  codeSearch: string;


  accountPricingServiceList: Array<AccountPricingService> = [];


  productSearch: Product;
  productList: Array<Product> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = "Liste des Services";
  accountPricingServiceExportList: Array<AccountPricingService> = [];
  items: MenuItem[];
  home: MenuItem;
  idAcountService: number = 0;
  constructor(
    private accountPricingServiceService: AccountPricingServiceService,

    private productService: ProductServiceService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    console.log(this.selectedCompany);

    this.load();
    this.items = [
      { label: "Paramétrage" },
      { label: "Catégorie Transport", routerLink: "/core/settings/path" },
    ];

    this.home = { icon: "pi pi-home" };

    this.className = AccountPricingService.name;
    this.cols = [

      {
        field: "product",
        child: "code",
        header: "Service",
        type: "object",
      },
      {
        field: "account",
        child: "name",
        header: "Compte",
        type: "object",
      },

      { field: "saleAmountHt", header: "Prix HT ", type: "number" },
      {
        field: "saleVat",
        child: "value",
        header: "TVA",
        type: "object",
      },
      { field: "saleAmountTtc", header: "Prix TTC", type: "number" },
      {
        field: "company",
        child: "name",
        header: "Société",
        type: "object",
      },
    ];
    if (
      this.selectedCompany.id != null ||
      this.selectedCompany.id != undefined
    ) {
      this.searchQuery = "company.id:" + this.selectedCompany.id;
      this.loadData();
    }
  }

  loadData() {
    this.spinner.show();
    this.accountPricingServiceService
      .sizeSearch(this.searchQuery)
      .subscribe((data) => {
        this.collectionSize = data;
      });
    this.accountPricingServiceService
      .findPagination(this.page, this.size, this.searchQuery)
      .subscribe(
        (data) => {
          this.accountPricingServiceList = data;
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur",
          });
        },
        () => this.spinner.hide()
      );
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    if (
      this.selectedCompany.id != null ||
      this.selectedCompany.id != undefined
    ) {
      this.searchQuery = "company.id:" + this.selectedCompany.id;
      console.log("load data");

      this.loadData();
    }
  }
  onExportExcel(event) {
    this.accountPricingServiceService.find(this.searchQuery).subscribe(
      (data) => {
        this.accountPricingServiceExportList = data;
        if (event != null) {
          this.globalService.generateExcel(
            event,
            this.accountPricingServiceExportList,
            this.className,
            this.titleList
          );
        } else {
          this.globalService.generateExcel(
            this.cols,
            this.accountPricingServiceExportList,
            this.className,
            this.titleList
          );
        }
        this.spinner.hide();
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "Erreur",
        });
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  onExportPdf(event) {
    this.accountPricingServiceService.find(this.searchQuery).subscribe(
      (data) => {
        this.accountPricingServiceExportList = data;
        this.globalService.generatePdf(
          event,
          this.accountPricingServiceExportList,
          this.className,
          this.titleList
        );
        this.spinner.hide();
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "Erreur",
        });

        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  onSearchClicked() {
    const buffer = new EmsBuffer();

    buffer.append(`company.id:${this.selectedCompany.id}`);



    if (this.productSearch != null && this.productSearch.code !== "") {
      buffer.append(`product.code~${this.productSearch.code}`);
    }



    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }

  onProductSearch(event: any) {
    this.productService
      .find("code~" + event.query)
      .subscribe((data) => (this.productList = data));
  }

  reset() {
    this.productSearch = null;
    this.page = 0;
    this.searchQuery = "company.id:" + this.selectedCompany.id;
    this.loadData();
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    console.log(this.editMode);

    this.selectAccountPricingServices = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {

      this.showDialog = true;
    }
  }

  onDeleteAll() {
    if (this.selectAccountPricingServices.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Supprimer ?",
        accept: () => {
          const ids = this.selectAccountPricingServices.map((x) => x.id);
          this.accountPricingServiceService.deleteAllByIds(ids).subscribe(
            (data) => {
              this.messageService.add({
                severity: "success",
                summary: "Suppression",
                detail: "Elément Supprimer avec Succés",
              });

              // this.toastr.success(
              //   'Elément Supprimer avec Succés',
              //   'Suppression'
              // );

              this.loadData();
            },
            (error) => {
              this.messageService.add({
                severity: "error",
                summary: "Erreur",
                detail: "Erreur",
              });

              //this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          );
        },
      });
    } else if (this.selectAccountPricingServices.length < 1) {
      this.toastr.warning("aucun ligne sélectionnée");
    }
  }

  load() {


    this.productService.findAll().subscribe((data) => {
      this.productList = data;
    });
  }

  onShowDialog(event) {
    console.log(event);

    this.showDialog = event;

    if (
      this.selectedCompany.id != null ||
      this.selectedCompany.id != undefined
    ) {
      this.searchQuery = "company.id:" + this.selectedCompany.id;
      console.log("load data");

      this.loadData();
    }
  }

  onLineEdited(accountPricingServiceEdited: AccountPricingService) {
    const acountService = this.accountPricingServiceList.find(
      (f) => f.product.id == accountPricingServiceEdited.product.id

    );
    if (acountService == null) {
      this.idAcountService--;
      accountPricingServiceEdited.id = this.idAcountService;
      this.accountPricingServiceList.push(accountPricingServiceEdited);
      this.accountPricingServiceListEdited.emit(this.accountPricingServiceList);
    }else {
      if(this.editMode==1){
        this.toastr.error("Erreur", 'Elément Existe Déja');
      }
    }


  }

}
