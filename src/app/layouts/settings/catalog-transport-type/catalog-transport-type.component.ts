import { VilleService } from './../../../shared/services/api/ville.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { Ville } from './../../../shared/models/ville';
import { Transport } from './../../../shared/models/transport';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { CatalogTransportTypeServcie } from './../../../shared/services/api/Catalog-Transport-Type.service';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { CatalogTransportType } from './../../../shared/models/CatalogTransportType';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-transport-type',
  templateUrl: './catalog-transport-type.component.html',
  styleUrls: ['./catalog-transport-type.component.css']
})
export class CatalogTransportTypeComponent implements OnInit {
  page = 0;
  size = 10;
  collectionSize: number;

  selectCatalogTransportTypes: Array<CatalogTransportType> = [];
  searchQuery = '';
  codeSearch: string;
  vehicleCategorySearch: VehicleCategory;
  transportSearch: Transport;
  transportCatVehicleList: Array<CatalogTransportType> = [];
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
  catalogTransportTypeExportList: Array<CatalogTransportType> = [];
  items: MenuItem[];
  home: MenuItem;
  defaultTransport :Transport = new Transport();

  constructor(
    private catalogTransportTypeService: CatalogTransportTypeServcie,
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

    this.className = CatalogTransportType.name;
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
    this.catalogTransportTypeService
      .sizeSearch(this.searchQuery)
      .subscribe(data => {
        this.collectionSize = data;
      });
    this.catalogTransportTypeService
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
    this.catalogTransportTypeService.find(this.searchQuery).subscribe(
      data => {
        this.catalogTransportTypeExportList = data;
        if (event != null) {
          this.globalService.generateExcel(
            event,
            this.catalogTransportTypeExportList,
            this.className,
            this.titleList
          );
        } else {
          this.globalService.generateExcel(
            this.cols,
            this.catalogTransportTypeExportList,
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
    this.catalogTransportTypeService.find(this.searchQuery).subscribe(
      data => {
        this.catalogTransportTypeExportList = data;
        this.globalService.generatePdf(
          event,
          this.catalogTransportTypeExportList,
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
    this.selectCatalogTransportTypes = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }
  }

  onDeleteAll() {
    if (this.selectCatalogTransportTypes.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer ?',
        accept: () => {
          const ids = this.selectCatalogTransportTypes.map(x => x.id);
          this.catalogTransportTypeService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectCatalogTransportTypes.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  onShowDialog(event) {
    this.showDialog = event;
    this.searchQuery='transport.id:'+this.defaultTransport.id;

    this.loadData();
  }
}
