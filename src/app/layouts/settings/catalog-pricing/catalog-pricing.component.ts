import { TurnType } from './../../../shared/models/turn-Type';
import { TurnTypeService } from './../../../shared/services/api/turn-type.service';
import { VehicleTrayService } from './../../../shared/services/api/vehicle-tray.service';
import { LoadingTypeService } from './../../../shared/services/api/loading-type.service';
import { LoadingType } from './../../../shared/models/loading-type';
import { VehicleTray } from './../../../shared/models/vehicle-tray';
import { CatalogPricingService } from '../../../shared/services/api/catalog-pricing.service';
import { CatalogPricing } from './../../../shared/models/catalog-pricing';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { VilleService } from './../../../shared/services/api/ville.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Ville } from './../../../shared/models/ville';
import { Transport } from './../../../shared/models/transport';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-pricing',
  templateUrl: './catalog-pricing.component.html',
  styleUrls: ['./catalog-pricing.component.css']
})
export class CatalogPricingComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectCatalogPricings: Array<CatalogPricing> = [];
  searchQuery = '';
  codeSearch: string;
  vehicleCategorySearch: VehicleCategory;
  vehicleTraySearch: VehicleTray;
  loadingTypeSearch:LoadingType;
  turnTypeSearch:TurnType;

  transportCatVehicleList: Array<CatalogPricing> = [];
  categorieVehicleList: Array<VehicleCategory> = [];
  turnTypeList: Array<TurnType> = [];

  vehicleTrayList:Array<VehicleTray>=[];
  loadingTypeList:Array<LoadingType>=[];

  villeSourceSearch: Ville;
  villeDestinationSearch: Ville;
  villeSourceList: Array<Ville> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste de Tarifs';
  catalogPricingExportList: Array<CatalogPricing> = [];
  items: MenuItem[];
  home: MenuItem;

  constructor(
    private catalogPricingService: CatalogPricingService,
    private vehicleCategoryService: VehicleCategoryService,
    private villeService: VilleService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private loadingTypeService:LoadingTypeService,
    private turnTypeService: TurnTypeService,
    private vehicleTrayService:VehicleTrayService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {

    this.load();
    this.items = [
      {label: 'Paramétrage'},
      {label: 'Catégorie Transport' ,routerLink:'/core/settings/path'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = CatalogPricing.name;
    this.cols = [
      {
        field: 'loadingType',
        child: 'code',
        header: 'Type Chargement',
        type: 'object'
      },
       {
        field: 'vehicleCategory',
        child: 'code',
        header: 'Catégorie de Véhicle',
        type: 'object'
      },

      {
        field: 'vehicleTray',
        child: 'code',
        header: 'Form',
        type: 'object'
      },
      {
        field: 'turnType',
        child: 'code',
        header: 'Type',
        type: 'object'
      },



      {
        field: 'villeSource',
        child: 'code',
        header: 'Ville Source',
        type: 'object'
      },

      {
        field: 'villeDestination',
        child: 'code',
        header: 'Ville Destination',
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
    this.catalogPricingService
      .sizeSearch(this.searchQuery)
      .subscribe(data => {
        this.collectionSize = data;
      });
    this.catalogPricingService
      .findPagination(this.page, this.size, this.searchQuery)
      .subscribe(
        data => {
          this.transportCatVehicleList = data;
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
    this.page = event.first / this.size;
    this.loadData();
  }
  onExportExcel(event) {
    this.catalogPricingService.find(this.searchQuery).subscribe(
      data => {
        this.catalogPricingExportList = data;
        if (event != null) {
          this.globalService.generateExcel(
            event,
            this.catalogPricingExportList,
            this.className,
            this.titleList
          );
        } else {
          this.globalService.generateExcel(
            this.cols,
            this.catalogPricingExportList,
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
    this.catalogPricingService.find(this.searchQuery).subscribe(
      data => {
        this.catalogPricingExportList = data;
        this.globalService.generatePdf(
          event,
          this.catalogPricingExportList,
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

    if (this.turnTypeSearch != null && this.turnTypeSearch.code !== '') {
      buffer.append(`turnType.code~${this.turnTypeSearch.code}`);
    }
    if (this.loadingTypeSearch != null && this.loadingTypeSearch.code !== '') {
      buffer.append(`loadingType.code~${this.loadingTypeSearch.code}`);
    }
    if (this.vehicleCategorySearch != null && this.vehicleCategorySearch.code !== '') {
      buffer.append(`vehicleCategory.code~${this.vehicleCategorySearch.code}`);
    }
    if (this.vehicleTraySearch != null && this.vehicleTraySearch.code !== '') {
      buffer.append(`vehicleTray.code~${this.vehicleTraySearch.code}`);
    }

    if (this.villeSourceSearch != null && this.villeSourceSearch.code !== '') {
      buffer.append(`villeSource.code~${this.villeSourceSearch.code}`);
    }
    if (
      this.villeDestinationSearch != null &&
      this.villeDestinationSearch.code !== ''
    ) {
      buffer.append(`villeDestination.code~${this.villeDestinationSearch.code}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }

  onCategoryVehicleSearch(event: any) {
    this.vehicleCategoryService
      .find('code~' + event.query)
      .subscribe(data => (this.categorieVehicleList = data.map(f => f.code)));
  }

  onVilleSouceSearch(event: any) {
    this.villeService
      .find('code~' + event.query)
      .subscribe(data => (this.villeSourceList = data));
  }

  reset() {
    this.vehicleCategorySearch = null;
    this.villeSourceSearch = null;
    this.villeDestinationSearch = null;
    this.loadingTypeSearch = null;
  this.vehicleTraySearch=null;
  this.turnTypeSearch=null;

    this.page = 0;
    this.searchQuery='';

    this.loadData();
  }

  onObjectEdited(event) {
    this.editMode = event.operationMode;
    this.selectCatalogPricings = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }
  }

  onDeleteAll() {
    if (this.selectCatalogPricings.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer ?',
        accept: () => {
          const ids = this.selectCatalogPricings.map(x => x.id);
          this.catalogPricingService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectCatalogPricings.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  load(){

    this.turnTypeService.findAll().subscribe(data => {
      this.turnTypeList = data;
    });
    this.loadingTypeService.findAll().subscribe(data => {
      this.loadingTypeList = data;
    });

    this.vehicleTrayService.findAll().subscribe(data => {
      this.vehicleTrayList = data;
    });
    this.vehicleCategoryService.findAll().subscribe(data => {
      this.categorieVehicleList = data;
    });

    this.villeService.findAll().subscribe(data => {
      this.villeSourceList = data;
    });
  }

  onShowDialog(event) {
    this.showDialog = event;

    this.loadData();
  }

}
