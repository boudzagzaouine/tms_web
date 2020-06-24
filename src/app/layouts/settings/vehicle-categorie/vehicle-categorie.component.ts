import { GlobalService } from './../../../shared/services/api/global.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { reject } from 'q';

@Component({
  selector: 'app-vehicle-categorie',
  templateUrl: './vehicle-categorie.component.html',
  styleUrls: ['./vehicle-categorie.component.css'],
  providers: [ConfirmationService]
})
export class VehicleCategorieComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch: string;
  codeList: Array<VehicleCategory> = [];

  cols: any[];
  vehicleCategorieList: Array<VehicleCategory> = [];
  selectedVehicleCategories: Array<VehicleCategory> = [];
  showDialog: boolean;
  editMode: number;
  className: string;

  vehicleCategoyExportList: Array<VehicleCategory> = [];
  titleList = 'Liste des catégories de  véhicule';
  constructor(private vehicleCategorieService: VehicleCategoryService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = VehicleCategory.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },
      { field: 'length', header: 'Longueur', type: 'number' },
      { field: 'width', header: 'Largeur', type: 'number' },
      { field: 'depth', header: 'Profondeur', type: 'number' },
      { field: 'height', header: 'Hauteur', type: 'number' },
      { field: 'tonnage', header: 'Tonnage', type: 'number' },
      { field: 'emptyWeight', header: 'Poids à Vide', type: 'number' },
      { field: 'totalWeight', header: 'Poids Total', type: 'number' },
    ];

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.vehicleCategorieService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.vehicleCategorieService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.vehicleCategorieList = data;

        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  onExportExcel(event) {

    this.vehicleCategorieService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleCategoyExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.vehicleCategoyExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.vehicleCategoyExportList, this.className, this.titleList);

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
    this.vehicleCategorieService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleCategoyExportList = data;
        this.globalService.generatePdf(event, this.vehicleCategoyExportList, this.className, this.titleList);
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
    if (this.descriptionSearch != null && this.descriptionSearch !== '') {
      buffer.append(`description~${this.descriptionSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onCodeSearch(event: any) {
    this.vehicleCategorieService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    );
  }
  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.descriptionSearch = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedVehicleCategories = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedVehicleCategories.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedVehicleCategories.map(x => x.id);
          this.vehicleCategorieService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedVehicleCategories.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

}
