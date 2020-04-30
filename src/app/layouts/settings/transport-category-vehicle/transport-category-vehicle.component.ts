import { TransportServcie } from './../../../shared/services/api/transport.service';
import { TransportCategoryVehicleService } from './../../../shared/services/api/transport-category-vehicle.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { TransportCategoryVehicle } from './../../../shared/models/transport-category-vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transport-category-vehicle',
  templateUrl: './transport-category-vehicle.component.html',
  styleUrls: ['./transport-category-vehicle.component.css']
})
export class TransportCategoryVehicleComponent implements OnInit {
  page = 0;
  size = 10;
  collectionSize: number;
transportSearch: string;
  vehicleCategorySearch: string;
searchQuery = '';
  codeSearch: string;
  selectTransportCatVehicles:Array< TransportCategoryVehicle>=[];
  transportCatVehicleList: Array<TransportCategoryVehicle> = [];
    categorieVehicleList: Array<string> = [];
  transportList: Array<string> = [];
 cols: any[];
    showDialog: boolean;
  editMode: number;
  className: String;


  constructor(private transportCategoryVehicleService: TransportCategoryVehicleService,
    private vehicleCategoryService: VehicleCategoryService,
    private transportService:TransportServcie,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {


    this.className = TransportCategoryVehicle.name;
    this.cols = [
      { field: 'vehicleCategory[0]', header: 'Catégorie Véhicule' },
      { field: 'transport', header: 'Transport' },
      { field: 'quantity', header: 'Quantité' },

    ];

    this.loadData();


  }

  loadData() {

    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();
    this.transportCategoryVehicleService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.transportCategoryVehicleService.findPagination(this.page, this.size, this.searchQuery).subscribe(
      data => {
        console.log(data);
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
    console.log('first : ' + event.first);
    this.loadData();
  }

  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }

    if (this.vehicleCategorySearch != null && this.vehicleCategorySearch !== '') {
      buffer.append(`vehicleCategory.code~${this.vehicleCategorySearch}`);
    }
    if (this.transportSearch != null && this.transportSearch !== '') {
      buffer.append(`transport.code~${this.transportSearch}`);
    }


    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();

  }

  onCategoryVehicleSearch(event: any) {
    this.vehicleCategoryService.find('code~' + event.query).subscribe(
      data => this.categorieVehicleList = data.map(f => f.code)
    );
  }
  onTransportSearch(event: any) {
    this.transportService.find('code~' + event.query).subscribe(
      data => this.transportList = data.map(f => f.code)
    );
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
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectTransportCatVehicles.map(x => x.id);
          this.transportCategoryVehicleService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectTransportCatVehicles.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }


}
