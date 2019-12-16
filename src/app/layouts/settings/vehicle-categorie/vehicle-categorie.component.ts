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
  styleUrls: ['./vehicle-categorie.component.css']
})
export class VehicleCategorieComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectedVehicleCategorie: VehicleCategory;
  searchQuery = '';
  codeSearch: string;
  items: MenuItem[];

  vehicleCategorieList: Array<VehicleCategory> = [];


  constructor(
    private vehicleCategoryService: VehicleCategoryService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedVehicleCategorie.id) }
    ];
  }


  loadData() {

    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();
    this.vehicleCategoryService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.vehicleCategoryService.findPagination(this.page, this.size, this.searchQuery).subscribe(
      data => {
        console.log(data);
        this.vehicleCategorieList = data;
        this.spinner.hide();
      },
      error => { this.spinner.hide() },
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

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();

  }

  reset() {
    this.codeSearch = null;

    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.vehicleCategoryService.delete(id).subscribe(
          data =>{
               this.toastr.success("Elément est Supprimé Avec Succès","Suppression")
        this.loadData();
          },
          error=>{
            this.toastr.error(error.erroe.message)

          }

        );
      }

    });
  }

  onEdit() {
    this.toastr.info('selected ');
  }

  onVehicleCategorieAdd(event) {
    this.loadData();
  }
}
