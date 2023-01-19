import { EmsBuffer } from './../../../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../../../shared/services/api/global.service';
import { ProductServiceService } from './../../../../../shared/services/api/product-service.service';
import { AccountServiceService } from './../../../../../shared/services/api/account-service.service';
import { Product } from './../../../../../shared/models/product';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Company } from './../../../../../shared/models/company';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from './../../../../../shared/models/account-service';

@Component({
  selector: 'app-company-service',
  templateUrl: './company-service.component.html',
  styleUrls: ['./company-service.component.css']
})
export class CompanyServiceComponent implements OnInit {

  @Input() selectedCompany: Company = new Company();
  @Output() accountServiceListEdited = new EventEmitter<AccountService[]>();
  page = 0;
  size = 10;
  collectionSize: number;

  selectAccountServices: Array<AccountService> = [];
  searchQuery = "";
  codeSearch: string;


  accountServiceList: Array<AccountService> = [];


  productSearch: Product;
  productList: Array<Product> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = "Liste des Services";
  accountServiceExportList: Array<AccountService> = [];
  items: MenuItem[];
  home: MenuItem;
  idAcountService: number = 0;
  constructor(
    private accountServiceService: AccountServiceService,

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

    this.className = AccountService.name;
    this.cols = [

      {
        field: "product",
        child: "code",
        header: "Service",
        type: "object",
      },
      {
        field: "address",
        child: "code",
        header: "Adresse",
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
    this.accountServiceService
      .sizeSearch(this.searchQuery)
      .subscribe((data) => {
        this.collectionSize = data;
      });
    this.accountServiceService
      .findPagination(this.page, this.size, this.searchQuery)
      .subscribe(
        (data) => {
          this.accountServiceList = data;
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
    this.accountServiceService.find(this.searchQuery).subscribe(
      (data) => {
        this.accountServiceExportList = data;
        if (event != null) {
          this.globalService.generateExcel(
            event,
            this.accountServiceExportList,
            this.className,
            this.titleList
          );
        } else {
          this.globalService.generateExcel(
            this.cols,
            this.accountServiceExportList,
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
    this.accountServiceService.find(this.searchQuery).subscribe(
      (data) => {
        this.accountServiceExportList = data;
        this.globalService.generatePdf(
          event,
          this.accountServiceExportList,
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

    this.selectAccountServices = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {

      this.showDialog = true;
    }
  }

  onDeleteAll() {
    if (this.selectAccountServices.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Supprimer ?",
        accept: () => {
          const ids = this.selectAccountServices.map((x) => x.id);
          this.accountServiceService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectAccountServices.length < 1) {
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

  onLineEdited(accountServiceEdited: AccountService) {
    const acountService = this.accountServiceList.find(
      (f) => f.product.id == accountServiceEdited.product.id

    );
    if (acountService == null) {
      this.idAcountService--;
      accountServiceEdited.id = this.idAcountService;
      this.accountServiceList.push(accountServiceEdited);
      this.accountServiceListEdited.emit(this.accountServiceList);
    }else {
      if(this.editMode==1){
        this.toastr.error("Erreur", 'Elément Existe Déja');
      }
    }


  }

}
