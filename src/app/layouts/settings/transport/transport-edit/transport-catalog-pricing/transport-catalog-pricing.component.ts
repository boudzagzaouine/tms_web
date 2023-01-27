import { EmsBuffer } from './../../../../../shared/utils/ems-buffer';
import { VehicleTrayService } from './../../../../../shared/services/api/vehicle-tray.service';
import { TurnTypeService } from './../../../../../shared/services/api/turn-type.service';
import { LoadingTypeService } from './../../../../../shared/services/api/loading-type.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../../../shared/services/api/global.service';
import { TrajetService } from './../../../../../shared/services/api/trajet.service';
import { VehicleCategoryService } from './../../../../../shared/services/api/vehicle-category.service';
import { CatalogTransportPricingService } from './../../../../../shared/services/api/catalog-transport-pricing.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Trajet } from './../../../../../shared/models/trajet';
import { TurnType } from './../../../../../shared/models/turn-Type';
import { LoadingType } from './../../../../../shared/models/loading-type';
import { VehicleTray } from './../../../../../shared/models/vehicle-tray';
import { VehicleCategory } from './../../../../../shared/models/vehicle-category';
import { CatalogTransportPricing } from './../../../../../shared/models/CatalogTransportPricing';
import { Transport } from './../../../../../shared/models/transport';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transport-catalog-pricing',
  templateUrl: './transport-catalog-pricing.component.html',
  styleUrls: ['./transport-catalog-pricing.component.scss']
})
export class TransportCatalogPricingComponent implements OnInit {

  @Input() selectedTransport: Transport = new Transport();
  @Output() catalogTransportPricingListEdited = new EventEmitter<CatalogTransportPricing[]>();
  page = 0;
  size = 10;
  collectionSize: number;

  selectCatalogTransportPricings: Array<CatalogTransportPricing> = [];
  searchQuery = "";
  codeSearch: string;
  vehicleCategorySearch: VehicleCategory;
  vehicleTraySearch: VehicleTray;
  loadingTypeSearch: LoadingType;
  turnTypeSearch: TurnType;

  catalogTransportPricingList: Array<CatalogTransportPricing> = [];
  categorieVehicleList: Array<VehicleCategory> = [];
  turnTypeList: Array<TurnType> = [];

  vehicleTrayList: Array<VehicleTray> = [];
  loadingTypeList: Array<LoadingType> = [];

  trajetSearch: Trajet;
  trajetList: Array<Trajet> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = "Liste de Tarifs Standard";
  catalogTransportPricingExportList: Array<CatalogTransportPricing> = [];
  items: MenuItem[];
  home: MenuItem;
  idAcountPricing: number = 0;
  constructor(
    private catalogTransportPricingService: CatalogTransportPricingService,
    private vehicleCategoryService: VehicleCategoryService,
    private trajetService: TrajetService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private loadingTypeService: LoadingTypeService,
    private turnTypeService: TurnTypeService,
    private vehicleTrayService: VehicleTrayService,
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

    this.className = CatalogTransportPricing.name;
    this.cols = [
      {
        field: "loadingType",
        child: "code",
        header: "Type Chargement",
        type: "object",
      },
      {
        field: "turnType",
        child: "code",
        header: "Type",
        type: "object",
      },

      {
        field: "vehicleCategory",
        child: "code",
        header: "Catégorie de Véhicle",
        type: "object",
      },

      {
        field: "vehicleTray",
        child: "code",
        header: "Form",
        type: "object",
      },

      {
        field: "trajet",
        child: "code",
        header: "Trajet Source",
        type: "object",
      },


      { field: "purchaseAmountHt", header: "Prix HT ", type: "number" },
      {
        field: "purchaseVat",
        child: "value",
        header: "TVA",
        type: "object",
      },
      { field: "purchaseAmountHt", header: "Prix TTC", type: "number" },
    ];
    if (
      this.selectedTransport.id != null ||
      this.selectedTransport.id != undefined
    ) {
      this.searchQuery = "transport.id:" + this.selectedTransport.id;
      console.log(this.selectedTransport);

      this.loadData();
    }
  }

  loadData() {
    this.spinner.show();
    this.catalogTransportPricingService
      .sizeSearch(this.searchQuery)
      .subscribe((data) => {
        this.collectionSize = data;
      });
    this.catalogTransportPricingService
      .findPagination(this.page, this.size, this.searchQuery)
      .subscribe(
        (data) => {
          this.catalogTransportPricingList = data;
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
    this.catalogTransportPricingService.find(this.searchQuery).subscribe(
      (data) => {
        this.catalogTransportPricingExportList = data;
        if (event != null) {
          this.globalService.generateExcel(
            event,
            this.catalogTransportPricingExportList,
            this.className,
            this.titleList
          );
        } else {
          this.globalService.generateExcel(
            this.cols,
            this.catalogTransportPricingExportList,
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
    this.catalogTransportPricingService.find(this.searchQuery).subscribe(
      (data) => {
        this.catalogTransportPricingExportList = data;
        this.globalService.generatePdf(
          event,
          this.catalogTransportPricingExportList,
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

    if (this.turnTypeSearch != null && this.turnTypeSearch.code !== "") {
      buffer.append(`turnType.code~${this.turnTypeSearch.code}`);
    }
    if (this.loadingTypeSearch != null && this.loadingTypeSearch.code !== "") {
      buffer.append(`loadingType.code~${this.loadingTypeSearch.code}`);
    }
    if (
      this.vehicleCategorySearch != null &&
      this.vehicleCategorySearch.code !== ""
    ) {
      buffer.append(`vehicleCategory.code~${this.vehicleCategorySearch.code}`);
    }
    if (this.vehicleTraySearch != null && this.vehicleTraySearch.code !== "") {
      buffer.append(`vehicleTray.code~${this.vehicleTraySearch.code}`);
    }

    if (this.trajetSearch != null && this.trajetSearch.code !== "") {
      buffer.append(`trajet.code~${this.trajetSearch.code}`);
    }


    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }

  onCategoryVehicleSearch(event: any) {
    this.vehicleCategoryService
      .find("code~" + event.query)
      .subscribe(
        (data) => (this.categorieVehicleList = data.map((f) => f.code))
      );
  }

  onTrajetSearch(event: any) {
    this.trajetService
      .find("code~" + event.query)
      .subscribe((data) => (this.trajetList = data));
  }

  reset() {
    this.vehicleCategorySearch = null;
    this.trajetSearch = null;
    this.loadingTypeSearch = null;
    this.vehicleTraySearch = null;
    this.turnTypeSearch = null;
    this.page = 0;
    this.searchQuery = "transport.id:" + this.selectedTransport.id;
    this.loadData();
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    console.log(this.editMode);

    this.selectCatalogTransportPricings = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {

      this.showDialog = true;
    }
  }

  onDeleteAll() {
    if (this.selectCatalogTransportPricings.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Supprimer ?",
        accept: () => {
          const ids = this.selectCatalogTransportPricings.map((x) => x.id);
          this.catalogTransportPricingService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectCatalogTransportPricings.length < 1) {
      this.toastr.warning("aucun ligne sélectionnée");
    }
  }

  load() {
    this.turnTypeService.findAll().subscribe((data) => {
      this.turnTypeList = data;
    });
    this.loadingTypeService.findAll().subscribe((data) => {
      this.loadingTypeList = data;
    });

    this.vehicleTrayService.findAll().subscribe((data) => {
      this.vehicleTrayList = data;
    });
    this.vehicleCategoryService.findAll().subscribe((data) => {
      this.categorieVehicleList = data;
    });

    this.trajetService.findAll().subscribe((data) => {
      this.trajetList = data;
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

  onLineEdited(catalogTransportPricingEdited: CatalogTransportPricing) {
    const acountPricing = this.catalogTransportPricingList.find(
      (f) => f.turnType.id == catalogTransportPricingEdited.turnType.id &&
             f.loadingType.id == catalogTransportPricingEdited.loadingType.id &&
             f.vehicleCategory.id == catalogTransportPricingEdited.vehicleCategory.id &&
             f.vehicleTray.id == catalogTransportPricingEdited.vehicleTray.id &&
             f.trajet.id == catalogTransportPricingEdited.trajet.id 
    );
    if (acountPricing == null) {
      this.idAcountPricing--;
      catalogTransportPricingEdited.id = this.idAcountPricing;
      this.catalogTransportPricingList.push(catalogTransportPricingEdited);
      this.catalogTransportPricingListEdited.emit(this.catalogTransportPricingList);
    }else {
      if(this.editMode==1){
        this.toastr.error("Erreur", 'Elément Existe Déja');
      }
    }


  }

}
