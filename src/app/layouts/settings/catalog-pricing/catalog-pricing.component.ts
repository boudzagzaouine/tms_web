import { CatalogPricingService } from './../../../shared/services/api/agent.service copy';
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
  transportSearch: Transport;
  transportCatVehicleList: Array<CatalogPricing> = [];
  categorieVehicleList: Array<VehicleCategory> = [];
  transportList: Array<Transport> = [];

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
  defaultTransport :Transport = new Transport();

  constructor(
    private catalogPricingService: CatalogPricingService,
    private vehicleCategoryService: VehicleCategoryService,
    private villeService: VilleService,
    private transportService: TransportServcie,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,

    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.transportService.find('interneOrExterne:true').subscribe(
      data =>{
        this.defaultTransport=data[0];

        //this.loadData();

      }
    );
    this.items = [
      {label: 'Paramétrage'},
      {label: 'Catégorie Transport' ,routerLink:'/core/settings/path'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = CatalogPricing.name;
    this.cols = [
      {
        field: 'turnType',
        child: 'code',
        header: 'Type',
        type: 'object'
      },
      {
        field: 'transport',
        child: 'name',
        header: 'Transport',
        type: 'object'
      },
      {
        field: 'vehicleCategory',
        child: 'code',
        header: 'Catégorie de Véhicle',
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
      { field: 'amountHt', header: 'Montant Ht', type: 'number' },
      { field: 'amountTtc', header: 'Montant TTC', type: 'number' },
      { field: 'amountTva', header: 'Montant TVA', type: 'number' },
      { field: 'vat', child: 'value', header: 'TVA', type: 'object' }
    ];

     this.loadData();

    this.vehicleCategoryService.findAll().subscribe(data => {
      this.categorieVehicleList = data;
    });

    this.transportService.findAll().subscribe(data => {
      this.transportList = data;
    });

    this.villeService.findAll().subscribe(data => {
      this.villeSourceList = data;
    });
  }

  loadData() {
    if(this.searchQuery=='' ||this.searchQuery==null){
          this.searchQuery +='interneOrExterne:true';

    }
    console.log("search");
console.log(this.searchQuery);

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
      buffer.append(`transport.code~${this.defaultTransport.code}`);


    if (
      this.vehicleCategorySearch != null &&
      this.vehicleCategorySearch.code !== ''
    ) {
      buffer.append(`vehicleCategory.code~${this.vehicleCategorySearch.code}`);
    }
    // if (this.transportSearch != null && this.transportSearch.code !== '') {
    //   buffer.append(`transport.code~${this.transportSearch.code}`);
    // }
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
  onTransportSearch(event: any) {
    this.transportService
      .find('code~' + event.query)
      .subscribe(data => (this.transportList = data));
  }
  onVilleSouceSearch(event: any) {
    this.villeService
      .find('code~' + event.query)
      .subscribe(data => (this.villeSourceList = data));
  }

  reset() {
    this.transportSearch = null;
    this.vehicleCategorySearch = null;
    this.villeSourceSearch = null;
    this.villeDestinationSearch = null;
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
              this.searchQuery='transport.id:'+this.defaultTransport.id;

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

  onShowDialog(event) {
    this.showDialog = event;
    this.searchQuery='transport.id:'+this.defaultTransport.id;

    this.loadData();
  }

}
