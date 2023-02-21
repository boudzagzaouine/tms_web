import { CompanyService } from './../../../../../shared/services/api/company.service';
import { Company } from './../../../../../shared/models/company';
import { TransportAccountServiceService } from './../../../../../shared/services/api/transport-account-service.service';
import { TransportAccountService } from './../../../../../shared/models/transport-account-service';
import { EmsBuffer } from './../../../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../../../shared/services/api/global.service';
import { ProductServiceService } from './../../../../../shared/services/api/product-service.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Product } from './../../../../../shared/models/product';
import { Transport } from './../../../../../shared/models/transport';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transport-account-service',
  templateUrl: './transport-account-service.component.html',
  styleUrls: ['./transport-account-service.component.css']
})
export class TransportAccountServiceComponent implements OnInit {

  @Input() selectedTransport: Transport = new Transport();
  @Output() transportAccountServiceListEdited = new EventEmitter<TransportAccountService[]>();
  page = 0;
  size = 10;
  collectionSize: number;

  selectTransportAccountServices: Array<TransportAccountService> = [];
  searchQuery = "";
  codeSearch: string;


  transportAccountServiceList: Array<TransportAccountService> = [];


  productSearch: Product;
  productList: Array<Product> = [];
  companySearch: Company;
  companyList: Array<Company> = [];
  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = "Liste des Catalogues Services Client";
  transportAccountServiceExportList: Array<TransportAccountService> = [];
  items: MenuItem[];
  home: MenuItem;
  idAcountService: number = 0;
  constructor(
    private transportAccountServiceService: TransportAccountServiceService,

    private productService: ProductServiceService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private companyService:CompanyService
  ) {}

  ngOnInit() {
    console.log(this.selectedTransport);

    this.load();
    this.items = [
      { label: "Paramétrage" },
      { label: "Catégorie Transport", routerLink: "/core/settings/path" },
    ];

    this.home = { icon: "pi pi-home" };

    this.className = TransportAccountService.name;
    this.cols = [

      {
        field: "company",
        child: "name",
        header: "Societe",
        type: "object",
      },
      {
        field: "address",
        child: "code",
        header: "Adresse",
        type: "object",
      },

      {
        field: "product",
        child: "code",
        header: "Service",
        type: "object",
      },


      { field: "purchaseAmountHt", header: "Prix HT ", type: "number" },
      {
        field: "purchaseVat",
        child: "value",
        header: "TVA",
        type: "object",
      },
      { field: "purchaseAmountTtc", header: "Prix TTC", type: "number" },
      {
        field: "transport",
        child: "name",
        header: "Prestataire",
        type: "object",
      },
    ];
    if (
      this.selectedTransport.id != null ||
      this.selectedTransport.id != undefined
    ) {
      this.searchQuery = "transport.id:" + this.selectedTransport.id;
      this.loadData();
    }
  }

  loadData() {
    this.spinner.show();
    this.transportAccountServiceService
      .sizeSearch(this.searchQuery)
      .subscribe((data) => {
        this.collectionSize = data;
      });
    this.transportAccountServiceService
      .findPagination(this.page, this.size, this.searchQuery)
      .subscribe(
        (data) => {
          this.transportAccountServiceList = data;
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
      this.selectedTransport.id != null ||
      this.selectedTransport.id != undefined
    ) {
      this.searchQuery = "transport.id:" + this.selectedTransport.id;
      console.log("load data");

      this.loadData();
    }
  }
  onExportExcel(event) {
    this.transportAccountServiceService.find(this.searchQuery).subscribe(
      (data) => {
        this.transportAccountServiceExportList = data;
        if (event != null) {
          this.globalService.generateExcel(
            event,
            this.transportAccountServiceExportList,
            this.className,
            this.titleList
          );
        } else {
          this.globalService.generateExcel(
            this.cols,
            this.transportAccountServiceExportList,
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
    this.transportAccountServiceService.find(this.searchQuery).subscribe(
      (data) => {
        this.transportAccountServiceExportList = data;
        this.globalService.generatePdf(
          event,
          this.transportAccountServiceExportList,
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

    buffer.append(`transport.id:${this.selectedTransport.id}`);



    if (this.productSearch != null && this.productSearch.code !== "") {
      buffer.append(`product.code~${this.productSearch.code}`);
    }
    if (this.productSearch != null && this.productSearch.code !== "") {
      buffer.append(`company.code~${this.companySearch.code}`);
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
  onCompanySearch(event: any) {
    this.companyService
      .find("code~" + event.query)
      .subscribe((data) => (this.companyList = data));
  }

  reset() {
    this.productSearch = null;
    this.page = 0;
    this.searchQuery = "transport.id:" + this.selectedTransport.id;
    this.loadData();
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    console.log(this.editMode);

    this.selectTransportAccountServices = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {

      this.showDialog = true;
    }
  }

  onDeleteAll() {
    if (this.selectTransportAccountServices.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Supprimer ?",
        accept: () => {
          const ids = this.selectTransportAccountServices.map((x) => x.id);
          this.transportAccountServiceService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectTransportAccountServices.length < 1) {
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
      this.selectedTransport.id != null ||
      this.selectedTransport.id != undefined
    ) {
      this.searchQuery = "transport.id:" + this.selectedTransport.id;
      console.log("load data");

      this.loadData();
    }
  }

  onLineEdited(transportAccountServiceEdited: TransportAccountService) {
    const acountService = this.transportAccountServiceList.find(
      (f) => f.product.id == transportAccountServiceEdited.product.id

    );
    if (acountService == null) {
      this.idAcountService--;
      transportAccountServiceEdited.id = this.idAcountService;
      this.transportAccountServiceList.push(transportAccountServiceEdited);
      this.transportAccountServiceListEdited.emit(this.transportAccountServiceList);
    }else {
      if(this.editMode==1){
        this.toastr.error("Erreur", 'Elément Existe Déja');
      }
    }


  }

}
