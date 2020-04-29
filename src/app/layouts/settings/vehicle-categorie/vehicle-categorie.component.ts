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
  cols: any[];
  vehicleCategorieList: Array<VehicleCategory> = [];
  selectedVehicleCategories: Array<VehicleCategory> = [];
  showDialog: boolean;
  editMode: number;
  className: String;

  constructor(private vehicleCategorieService: VehicleCategoryService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = VehicleCategory.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'length', header: 'Longueur' },
      { field: 'width', header: 'Largeur' },
      { field: 'depth', header: 'Profondeur' },
      { field: 'height', header: 'Hauteur' },
      { field: 'tonnage', header: 'Tonnage' },
      { field: 'emptyWeight', header: 'Poids à Vide' },
      { field: 'totalWeight', header: 'Poids Total' },
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

  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  /// end search
  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
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
