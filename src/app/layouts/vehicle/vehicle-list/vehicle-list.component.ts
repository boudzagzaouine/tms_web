import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { ContractTypeService } from './../../../shared/services/api/contract-type.service';
import { ContractType } from './../../../shared/models/contract-type';
import { Transport } from './../../../shared/models/transport';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { BadgeType } from './../../../shared/models/badge-Type';
import { Router } from '@angular/router';
import { Vehicle } from './../../../shared/models/vehicle';
import { ToastrService } from 'ngx-toastr';
import { BadgeTypeService } from './../../../shared/services/api/badge-type.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { VehicleService } from './../../../shared/services';
import { Component, OnInit } from '@angular/core';
import { Patrimony } from './../../../shared/models/patrimony';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  providers: [ConfirmationService]
})
export class VehicleListComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: Vehicle;
  matSearch: string;
  categorySearch: VehicleCategory;
  badgeTypeSearch: BadgeType;
  transportSearch: Transport;
  contratTypeSearch: ContractType;
  selectedVehicles: Array<Vehicle> = [];
  vehicleList: Array<Vehicle> = [];
  vehicleCodeList: Array<Patrimony> = [];
  vehicleCategoryList: Array<VehicleCategory> = [];
  badgeTypeList: Array<BadgeType> = [];
  transportList: Array<Transport> = [];
  contratTypeList: Array<ContractType> = [];
  className: string;
  titleList = 'Liste Des Véhicules';
  cols: any[];
  editMode: number;
  showDialog: boolean;
  vehicleExportList: Array<Vehicle> = [];
  subscriptions= new Subscription ();
  items: MenuItem[];
    
  home: MenuItem;

  constructor(private vehicleService: VehicleService,
    private patrimonyService: PatrimonyService,
    private vehicleCategoryService: VehicleCategoryService,
    private globalService: GlobalService,
    private badgeTypeService: BadgeTypeService,
    private contratTypeService: ContractTypeService,
    private transportService: TransportServcie,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,

    private router: Router) { }

  ngOnInit() {

    this.items = [
      {label: 'Véhicule'},
      {label: 'Lister',routerLink:'/core/vehicles/list'},
   
  ];
  
    this.home = {icon: 'pi pi-home'};
    
    this.className = Vehicle.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'registrationNumber', header: 'Immatriculation', type: 'string' },
      { field: 'vehicleCategory', child: 'code', header: 'Catégorie véhicule', type: 'object' },
      { field: 'badgeType', child: 'code', header: 'Type de bage', type: 'object' },
      { field: 'technicalVisit', header: 'Date du contrôle technique', type: 'date' },
      { field: 'valueTechnicalVisit', header: 'Montant du contrôle technique', type: 'number' },
      { field: 'vignette', header: 'Date De Paiment de la vignette', type: 'date' },
      { field: 'valueVignette', header: 'Montant vignette', type: 'number' },
      { field: 'grayCard', header: 'Carte grise', type: 'string' },
      { field: 'chassisNumber', header: ' Numéro chassis', type: 'string' },
      { field: 'numberCylinder', header: 'Nombre de cylindres', type: 'string' },
      { field: 'fiscalPower', header: 'Puissance fiscal', type: 'string' },
      { field: 'body', header: 'Carrosserie', type: 'string' },
      { field: 'consumptionType', child: 'code', header: 'Type de consommation', type: 'object' },
      { field: 'engineOil', header: 'Huile moteur', type: 'string' },
      { field: 'rearDeck', header: 'Pont arriere', type: 'string' },
      { field: 'direction', header: 'Direction', type: 'string' },
      { field: 'radiator', header: 'Radiateur', type: 'string' },
      { field: 'airFilter', header: 'Filtre à air', type: 'string' },
      { field: 'gearBox', header: 'Boite a vitesse', type: 'string' },
      { field: 'desiccantFilter', header: 'Filtre dissicateur', type: 'string' },
      { field: 'contractType', child: 'code', header: 'Type de contrat', type: 'object' },
      { field: 'aquisitionDate', header: 'Date aquisition', type: 'date' },
      { field: 'amount', header: 'Montant', type: 'number' },
      { field: 'transport', child: 'code', header: 'Transport', type: 'object' },

    ];
    this.subscriptions.add( this.vehicleCategoryService.findAll().subscribe(
      data => {
        this.vehicleCategoryList = data;
      }
    ));

    this.subscriptions.add(this.badgeTypeService.findAll().subscribe(
      data => {
        this.badgeTypeList = data;
      }
    ));

    this.subscriptions.add(this.contratTypeService.findAll().subscribe(
      data => {
        this.contratTypeList = data;
      }
    ));

    this.subscriptions.add(this.transportService.findAll().subscribe(
      data => {
        this.transportList = data;
      }
    ));
  }


  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.vehicleService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.vehicleService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.vehicleList = data;

        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');

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


  onExportExcel(event) {

    this.subscriptions.add(this.vehicleService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleExportList = data;

        if (event != null) {
          this.globalService.generateExcel(event, this.vehicleExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.vehicleExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }


  onExportPdf(event) {
    this.subscriptions.add(this.vehicleService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleExportList = data;
        this.globalService.generatePdf(event, this.vehicleExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }

  onSearchClicked() {


    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch.code !== '') {
      buffer.append(`registrationNumber~${this.codeSearch.registrationNumber}`);
    }

    if (this.matSearch != null && this.matSearch !== '') {
      buffer.append(`registrationNumber~${this.matSearch}`);
    }

    if (this.categorySearch != null && this.categorySearch.code !== '') {
      buffer.append(`vehicleCategory.code~${this.categorySearch.code}`);
    }

    if (this.badgeTypeSearch != null && this.badgeTypeSearch.code !== '') {
      buffer.append(`badgeType.code~${this.badgeTypeSearch.code}`);
    }
    if (this.transportSearch != null && this.transportSearch.code !== '') {
      buffer.append(`transport.code~${this.transportSearch.code}`);
    }

    if (this.contratTypeSearch != null && this.contratTypeSearch.code !== '') {
      buffer.append(`contractType.code~${this.contratTypeSearch.code}`);
    }


    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }


  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedVehicles = event.object;

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/vehicles/edit', this.selectedVehicles[0].id]);
    }

  }

  onVehicleCodeSearch(event: any) {
    this.subscriptions.add(this.patrimonyService.find('code~' + event.query).subscribe(
      data => this.vehicleCodeList = data.filter(f=> f.patrimony_type=='vehicule')
    ));
  }

  reset() {
    this.codeSearch = null;
    this.matSearch = null;
    this.categorySearch = null;
    this.badgeTypeSearch = null;
    this.transportSearch = null;
    this.contratTypeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }


  onDeleteAll() {

    if (this.selectedVehicles.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedVehicles.map(x => x.id);
          this.subscriptions.add(this.vehicleService.deleteAllByIds(ids).subscribe(
            data => {
             this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedVehicles.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

}
