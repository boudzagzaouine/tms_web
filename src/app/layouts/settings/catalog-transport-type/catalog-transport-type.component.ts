import { GlobalService } from './../../../shared/services/api/global.service';
import { Zone } from './../../../shared/models/Zone';
import { Transport } from './../../../shared/models/transport';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { ZoneServcie } from './../../../shared/services/api/zone.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { CatalogTransportTypeServcie } from './../../../shared/services/api/Catalog-Transport-Type.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
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

  zoneSourceSearch: Zone;
  zoneDestinationSearch: Zone;
  zoneSourceList: Array<Zone> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des trajets';
  catalogTransportTypeExportList: Array<CatalogTransportType> = [];

  constructor(
    private catalogTransportTypeService: CatalogTransportTypeServcie,
    private vehicleCategoryService: VehicleCategoryService,
    private zoneService: ZoneServcie,
    private transportService: TransportServcie,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.className = CatalogTransportType.name;
    this.cols = [
      {
        field: 'transport',
        child: 'code',
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
        field: 'zoneSource',
        child: 'code',
        header: 'Zone Source',
        type: 'object'
      },
      {
        field: 'zoneDestination',
        child: 'code',
        header: 'Zone Destination',
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

    this.zoneService.findAll().subscribe(data => {
      this.zoneSourceList = data;
    });
  }

  loadData() {

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
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Erreur de connexion');
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
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }

    if (
      this.vehicleCategorySearch != null &&
      this.vehicleCategorySearch.code !== ''
    ) {
      buffer.append(`vehicleCategory.code~${this.vehicleCategorySearch.code}`);
    }
    if (this.transportSearch != null && this.transportSearch.code !== '') {
      buffer.append(`transport.code~${this.transportSearch.code}`);
    }
    if (this.zoneSourceSearch != null && this.zoneSourceSearch.code !== '') {
      buffer.append(`zoneSource.name~${this.zoneSourceSearch.code}`);
    }
    if (
      this.zoneDestinationSearch != null &&
      this.zoneDestinationSearch.code !== ''
    ) {
      buffer.append(`zoneDestination.name~${this.zoneDestinationSearch.code}`);
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
  onZoneSouceSearch(event: any) {
    this.zoneService
      .find('code~' + event.query)
      .subscribe(data => (this.zoneSourceList = data));
  }

  reset() {
    this.transportSearch = null;
    this.vehicleCategorySearch = null;
    this.zoneSourceSearch = null;
    this.zoneDestinationSearch = null;
    this.page = 0;
    this.searchQuery = '';
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
              this.toastr.success(
                'Elément Supprimer avec Succés',
                'Suppression'
              );
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
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
    this.loadData();
  }
}
