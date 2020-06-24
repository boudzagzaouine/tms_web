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
  titleList: string = 'Liste Des Véhicule';
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
    private globalService: GlobalService,
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
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'registrationNumber', header: 'Immatriculation', type: 'string' },
      { field: 'vehicleCategory', child: 'code', header: 'Catégorie véhicule', type: 'object' },
      { field: 'badgeType', child: 'code', header: 'Type de bage', type: 'object' },
      //  child:[{

      //   field:'code'},
      // ]},
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


  onExportExcel(event) {

    this.vehicleService.find(this.searchQuery).subscribe(
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
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }


  onExportPdfGlobal(event) {
    this.vehicleService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleExportList = data;
        this.globalService.generatePdf(event, this.vehicleExportList, this.className, this.titleList);
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
