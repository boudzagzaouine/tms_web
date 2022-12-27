import { TurnTypeService } from './../../../shared/services/api/turn-type.service';
import { TurnType } from './../../../shared/models/turn-Type';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { Pays } from './../../../shared/models/pays';
import { Ville } from './../../../shared/models/ville';
import { PaysService } from './../../../shared/services/api/pays.service';
import { VilleService } from './../../../shared/services/api/ville.service';
import { DefaultComponent } from './../../default/default.component';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { Transport } from './../../../shared/models/transport';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { CatalogTransportTypeServcie } from './../../../shared/services/api/Catalog-Transport-Type.service';
import { Subscription } from 'rxjs';
import { CatalogTransportType } from './../../../shared/models/CatalogTransportType';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing-standard',
  templateUrl: './pricing-standard.component.html',
  styleUrls: ['./pricing-standard.component.scss']
})
export class PricingStandardComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  villeSourceSearch: string;
   villeDistinationSearch: string;
   categorySearch: VehicleCategory;
   turnTypeSearch:TurnType;
  descriptionSearch = '';
  villeList: Array<Ville> = [];

  cols: any[];
  catalogTransportTypeList: Array<CatalogTransportType> = [];
  selectedCatalogTransportTypes: Array<CatalogTransportType> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste Tarifs Standard';
  catalogTransportTypeExportList: Array<CatalogTransportType> = [];
  subscriptions= new Subscription();
  defaultTransport : Transport = new Transport();
  vehicleCategoryList: Array<VehicleCategory> = [];
  turnTypeList:Array<TurnType>=[];
  constructor(private catalogTransportTypeService: CatalogTransportTypeServcie ,
    private globalService: GlobalService,
    private transportService: TransportServcie,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private villeService:VilleService,
    private paysService: PaysService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private turnTypeService: TurnTypeService,
    private vehicleCategoryService:VehicleCategoryService
  ) { }

  ngOnInit() {
    this.searchQuery='transport.interneOrExterne:true';

    this.transportService.find('interneOrExterne:true').subscribe(
      data =>{
  this.defaultTransport=data[0];
      }
    );


    this.primengConfig.ripple = true;
    this.className = CatalogTransportType.name;
    this.cols = [
      { field: 'turnType',child:"code", header: 'Type', type: 'object' },
      { field: 'vehicleCategory',child:"code", header: 'Catégorie', type: 'object' },
      { field: 'villeSource',child:"code", header: 'Source', type: 'object' },
      { field: 'villeDestination',child:"code", header: 'Destination', type: 'object' },
      { field: 'amountHt', header: 'Montant Ht', type: 'number' },
      { field: 'amountTtc', header: 'Montant TVA', type: 'number' },
      { field: 'amountTva', header: 'TVA', type: 'number' },
    ];


    this.vehicleCategoryService.findAll().subscribe(
      data=>{
        this.vehicleCategoryList=data;
      }
    );

    this.turnTypeService.findAll().subscribe(
      data=>{
        this.turnTypeList=data;
      }
    );
    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.catalogTransportTypeService.find(this.searchQuery).subscribe(
      data => {
        this.catalogTransportTypeExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.catalogTransportTypeExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.catalogTransportTypeExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdf(event) {
    this.subscriptions.add(this.catalogTransportTypeService.find(this.searchQuery).subscribe(
      data => {
        this.catalogTransportTypeExportList = data;
        this.globalService.generatePdf(event, this.catalogTransportTypeExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }
  loadData(search: string = '') {
    console.log("search");

console.log(search);

    this.spinner.show();
    this.subscriptions.add(this.catalogTransportTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.catalogTransportTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.catalogTransportTypeList = data;

        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

      //  this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {
    const buffer = new EmsBuffer();

     buffer.append(`transport.id:${this.defaultTransport.id}`);

    if (this.villeSourceSearch != null && this.villeSourceSearch !== '') {
      buffer.append(`villeSource.code~${this.villeSourceSearch}`);
    }
    if (this.villeDistinationSearch != null && this.villeDistinationSearch !== '') {
      buffer.append(`villeDestination.code~${this.villeDistinationSearch}`);
    }
    if (this.categorySearch != null && this.categorySearch.code !== '') {
      buffer.append(`vehicleCategory.code~${this.categorySearch.code}`);
    }
    if (this.turnTypeSearch != null && this.turnTypeSearch.code !== '') {
      buffer.append(`turnType.code~${this.turnTypeSearch.code}`);
    }
  console.log(buffer.getValue());

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onVilleSearch(event: any) {
    this.subscriptions.add(this.villeService.find('code~' + event.query).subscribe(
      data => this.villeList = data.map(f => f.code)
    ));
  }

  reset() {
    this.villeSourceSearch = null;
    this.villeDistinationSearch = null;
    this.categorySearch=null;
    this.turnTypeSearch=null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedCatalogTransportTypes = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedCatalogTransportTypes.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedCatalogTransportTypes.map(x => x.id);
          this.subscriptions.add(this.catalogTransportTypeService.deleteAllByIds(ids).subscribe(
            data => {
              //this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

              this.loadData();
            },
            error => {
              this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

             // this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedCatalogTransportTypes.length < 1) {
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
