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
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { VehicleService } from './../../../shared/services';
import { Component, OnInit } from '@angular/core';


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
  codeSearch: string;
  matSearch: string;
  categorySearch: VehicleCategory;
  badgeTypeSearch: BadgeType;
  transportSearch: Transport;
  contratTypeSearch: ContractType;
  selectedVehicles: Array<Vehicle> = [];
  vehicleList: Array<Vehicle> = [];
  vehicleCodeList: Array<Vehicle> = [];
  vehicleCategoryList: Array<VehicleCategory> = [];
  badgeTypeList: Array<BadgeType> = [];
  transportList: Array<Transport> = [];
  contratTypeList: Array<ContractType> = [];
  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;

  vehicleExportList: {

    'Code': string,
    'Immatriculation': string,
    'Catégorie véhicule': string,
    'Type de bage': string,
    'Date du contrôle technique': Date,
    'Montant du contrôle technique': string,
    'Date De Paiment de la vignette': string,
    'Montant vignette': string,
    'Carte grise': string,
    'Numéro chassis': string,
    'Nombre de cylindres': string,
    'Puissance fiscal': string,
    'Carrosserie': string,
    'Type de consommation': string,
    'Huile moteur': string,
    'Pont arriere': string,
    'Direction': string,
    'Radiateur': string,
    'Filtre à air': string,
    'Boite a vitesse': string,
    'Filtre dissicateur': string,
    'Type de contrat': string,
    'Date aquisition': string,
    'Montant': string,
    'Transport': string,

  }[] = [];


  constructor(private vehicleService: VehicleService,
    private vehicleCategoryService: VehicleCategoryService,
    private globalService : GlobalService,
    private badgeTypeService: BadgeTypeService,
    private contratTypeService: ContractTypeService,
    private transportService: TransportServcie,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {

    this.className = Vehicle.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'registrationNumber', header: 'Immatriculation' },
      { field: 'vehicleCategory', child: 'code', header: 'Catégorie véhicule' },
      { field: 'badgeType', child: 'code', header: 'Type de bage' },
      //  child:[{

      //   field:'code'},
      // ]},
      { field: 'technicalVisit', header: 'Date du contrôle technique' },
       { field: 'valueTechnicalVisit', header: 'Montant du contrôle technique' },
       { field: 'vignette', header: 'Date De Paiment de la vignette' },
       { field: 'valueVignette', header: 'Montant vignette' },
       { field: 'grayCard', header: 'Carte grise' },
     { field: 'chassisNumber', header: ' Numéro chassis' },
       { field: 'numberCylinder', header: 'Nombre de cylindres' },
       { field: 'fiscalPower', header: 'Puissance fiscal' },
       { field: 'body', header: 'Carrosserie' },
       { field: 'consumptionType', child: 'code', header: 'Type de consommation' },
       { field: 'engineOil', header: 'Huile moteur' },
       { field: 'rearDeck', header: 'Pont arriere' },
       { field: 'direction', header: 'Direction' },
       { field: 'radiator', header: 'Radiateur' },
      { field: 'airFilter', header: 'Filtre à air' },
       { field: 'gearBox', header: 'Boite a vitesse' },
       { field: 'desiccantFilter', header: 'Filtre dissicateur' },
       { field: 'contractType', child: 'code', header: 'Type de contrat' },
       { field: 'aquisitionDate', header: 'Date aquisition' },
       { field: 'amount', header: 'Montant' },
      { field: 'transport', child: 'code', header: 'Transport' },



    ];
    this.vehicleCategoryService.findAll().subscribe(
      data => {
        this.vehicleCategoryList = data;
      }
    );

    this.badgeTypeService.findAll().subscribe(
      data => {
        this.badgeTypeList = data;
      }
    );

    this.contratTypeService.findAll().subscribe(
      data => {
        this.contratTypeList = data;
      }
    );

    this.transportService.findAll().subscribe(
      data => {
        this.transportList = data;
      }
    );
  }


  loadData(search: string = '') {
    this.spinner.show();
    this.vehicleService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.vehicleService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.vehicleList = data;

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  onExportExcelGlobal() {
    console.log("methode insurance");

    this.vehicleService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleExportList = data.map(
          m => ({
            'Code': m.code,
            'Immatriculation': m.registrationNumber,
            'Catégorie véhicule': m.vehicleCategory.code,
            'Type de bage': m.badgeType.code,
            'Date du contrôle technique': m.technicalVisit,
            'Montant du contrôle technique': m.valueTechnicalVisit,
            'Date De Paiment de la vignette': m.vignette,
            'Montant vignette': m.valueVignette,
            'Carte grise': m.grayCard,
            'Numéro chassis': m.chassisNumber,
            'Nombre de cylindres': m.numberCylinder,
            'Puissance fiscal': m.fiscalPower,
            'Carrosserie': m.body,
            'Type de consommation': m.consumptionType.code,
            'Huile moteur': m.engineOil,
            'Pont arriere': m.rearDeck,
            'Direction': m.direction,
            'Radiateur': m.radiator,
            'Filtre à air': m.airFilter,
            'Boite a vitesse': m.gearBox,
            'Filtre dissicateur': m.desiccantFilter,
            'Type de contrat': m.contractType.code,
            'Date aquisition': m.aquisitionDate,
            'Montant': m.amount,
            'Transport': m.transport.code,
          }));
        this.globalService.exportExcelGlobal(this.vehicleExportList, this.className);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }


  onExportPdfGlobal(event) {
    this.vehicleService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleExportList = data;
        this.globalService.exportPdf(event,this.vehicleExportList,this.className);
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
      buffer.append(`contratType.code~${this.contratTypeSearch.code}`);
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
    this.vehicleService.find('code~' + event.query).subscribe(
      data => this.vehicleCodeList = data.map(f => f.code)
    );
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
          this.vehicleService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          );
        }
      });
    } else if (this.selectedVehicles.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

}
