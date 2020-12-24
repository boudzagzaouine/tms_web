import { GlobalService } from './../../../shared/services/api/global.service';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { TransportCategoryVehicleService } from './../../../shared/services/api/transport-category-vehicle.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { TransportCategoryVehicle } from './../../../shared/models/transport-category-vehicle';
import { Component, OnInit } from '@angular/core';
import { Transport } from './../../../shared/models/transport';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transport-category-vehicle',
  templateUrl: './transport-category-vehicle.component.html',
  styleUrls: ['./transport-category-vehicle.component.css']
})
export class TransportCategoryVehicleComponent implements OnInit {
  page = 0;
  size = 10;
  collectionSize: number;
  transportSearch: Transport;
  vehicleCategorySearch: VehicleCategory;
  searchQuery = '';
  codeSearch: string;
  selectTransportCatVehicles: Array<TransportCategoryVehicle> = [];
  transportCatVehicleList: Array<TransportCategoryVehicle> = [];
  categorieVehicleList: Array<VehicleCategory> = [];
  transportList: Array<Transport> = [];
  cols: any[];
  colsPdf: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  transportCategoryVehicleExportList: Array<VehicleCategory> = [];
  titleList= 'Liste des catégories de transport';
  subscriptions= new Subscription();
  items: MenuItem[];
  home: MenuItem;

  constructor(private transportCategoryVehicleService: TransportCategoryVehicleService,
    private vehicleCategoryService: VehicleCategoryService,
    private transportService: TransportServcie,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Catégorie Transport' ,routerLink:'/core/settings/transport-category-vehicle'},
  
  ];
  
  this.home = {icon: 'pi pi-home'};

    this.className = TransportCategoryVehicle.name;
    this.cols = [
      { field: 'vehicleCategory', child: 'code', header: 'Catégorie de véhicule', type: 'object' },
      { field: 'transport', child: 'code', header: 'Transport', type: 'object' },
      { field: 'quantity', header: 'Quantité', type: 'string' },

    ];

    this.loadData();

    this.subscriptions.add( this.vehicleCategoryService.findAll().subscribe(
      data => {
        this.categorieVehicleList = data;
      }
    ));

    this.subscriptions.add( this.transportService.findAll().subscribe(
      data => {
        this.transportList = data;
      }
    ));

  }

  onExportExcel(event) {

    this.subscriptions.add(this.transportCategoryVehicleService.find(this.searchQuery).subscribe(
      data => {
        this.transportCategoryVehicleExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.transportCategoryVehicleExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.transportCategoryVehicleExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdf(event) {
    this.subscriptions.add(this.transportCategoryVehicleService.find(this.searchQuery).subscribe(
      data => {
        this.transportCategoryVehicleExportList = data;
        this.globalService.generatePdf(event, this.transportCategoryVehicleExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }

  loadData() {


    this.spinner.show();
    this.subscriptions.add( this.transportCategoryVehicleService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.transportCategoryVehicleService.findPagination(this.page, this.size, this.searchQuery).subscribe(
      data => {
        this.transportCatVehicleList = data;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.page = event.first / this.size;
    this.loadData();
  }

  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }

    if (this.vehicleCategorySearch != null && this.vehicleCategorySearch.code !== '') {
      buffer.append(`vehicleCategory.code~${this.vehicleCategorySearch.code}`);
    }
    if (this.transportSearch != null && this.transportSearch.code !== '') {
      buffer.append(`transport.code~${this.transportSearch.code}`);
    }


    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();

  }

  reset() {
    this.transportSearch = null;
    this.vehicleCategorySearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }


  onTanrsportAdd(event) {
    this.loadData();
  }

  onObjectEdited(event) {
    this.editMode = event.operationMode;
    this.selectTransportCatVehicles = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectTransportCatVehicles.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer ? ',
        accept: () => {
          const ids = this.selectTransportCatVehicles.map(x => x.id);
          this.subscriptions.add(this.transportCategoryVehicleService.deleteAllByIds(ids).subscribe(
            data => {
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

              //this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
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
    } else if (this.selectTransportCatVehicles.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  onTransportSearch(event: any) {
    this.transportService.find('code~' + event.query).subscribe(
      data => this.transportList = data
    );
  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
