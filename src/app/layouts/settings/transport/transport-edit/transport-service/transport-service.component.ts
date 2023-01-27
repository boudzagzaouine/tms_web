import { EmsBuffer } from './../../../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../../../shared/services/api/global.service';
import { ProductServiceService } from './../../../../../shared/services/api/product-service.service';
import { TransportServiceService } from './../../../../../shared/services/api/transport-service.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Product } from './../../../../../shared/models/product';
import { TransportService } from './../../../../../shared/models/transport-service';
import { Transport } from './../../../../../shared/models/transport';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transport-service',
  templateUrl: './transport-service.component.html',
  styleUrls: ['./transport-service.component.css']
})
export class TransportServiceComponent implements OnInit {

  @Input() selectedTransport: Transport = new Transport();
  @Output() transportServiceListEdited = new EventEmitter<TransportService[]>();
  page = 0;
  size = 10;
  collectionSize: number;

  selectTransportServices: Array<TransportService> = [];
  searchQuery = "";
  codeSearch: string;


  transportServiceList: Array<TransportService> = [];


  productSearch: Product;
  productList: Array<Product> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = "Liste des Services";
  transportServiceExportList: Array<TransportService> = [];
  items: MenuItem[];
  home: MenuItem;
  idAcountService: number = 0;
  constructor(
    private transportServiceService: TransportServiceService,

    private productService: ProductServiceService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    console.log(this.selectedTransport);

    this.load();
    this.items = [
      { label: "Paramétrage" },
      { label: "Catégorie Transport", routerLink: "/core/settings/path" },
    ];

    this.home = { icon: "pi pi-home" };

    this.className = TransportService.name;
    this.cols = [

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
    this.transportServiceService
      .sizeSearch(this.searchQuery)
      .subscribe((data) => {
        this.collectionSize = data;
      });
    this.transportServiceService
      .findPagination(this.page, this.size, this.searchQuery)
      .subscribe(
        (data) => {
          this.transportServiceList = data;
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
    this.transportServiceService.find(this.searchQuery).subscribe(
      (data) => {
        this.transportServiceExportList = data;
        if (event != null) {
          this.globalService.generateExcel(
            event,
            this.transportServiceExportList,
            this.className,
            this.titleList
          );
        } else {
          this.globalService.generateExcel(
            this.cols,
            this.transportServiceExportList,
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
    this.transportServiceService.find(this.searchQuery).subscribe(
      (data) => {
        this.transportServiceExportList = data;
        this.globalService.generatePdf(
          event,
          this.transportServiceExportList,
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
    this.searchQuery = "transport.id:" + this.selectedTransport.id;
    this.loadData();
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    console.log(this.editMode);

    this.selectTransportServices = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {

      this.showDialog = true;
    }
  }

  onDeleteAll() {
    if (this.selectTransportServices.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Supprimer ?",
        accept: () => {
          const ids = this.selectTransportServices.map((x) => x.id);
          this.transportServiceService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectTransportServices.length < 1) {
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

  onLineEdited(transportServiceEdited: TransportService) {
    const acountService = this.transportServiceList.find(
      (f) => f.product.id == transportServiceEdited.product.id

    );
    if (acountService == null) {
      this.idAcountService--;
      transportServiceEdited.id = this.idAcountService;
      this.transportServiceList.push(transportServiceEdited);
      this.transportServiceListEdited.emit(this.transportServiceList);
    }else {
      if(this.editMode==1){
        this.toastr.error("Erreur", 'Elément Existe Déja');
      }
    }


  }
}
