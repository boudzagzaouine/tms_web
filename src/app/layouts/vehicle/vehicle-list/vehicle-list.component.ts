import { BadgeTypeService } from './../../../shared/services/api/badge-type.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { VehicleService } from './../../../shared/services';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from './../../../shared/models';


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

  selectedVehicle: Vehicle;
  searchQuery = '';
  codeSearch: string;
  matSearch: string;
  categorySearch: string;
  badgeTypeSearch: string;

  vehicleList: Array<Vehicle> = [];
  vehicleCategoryList: Array<string> = [];
  badgeTypeList: Array<string> = [];

  constructor(private vehicleService: VehicleService,
    private vehicleCategoryService: VehicleCategoryService,
    private badgeTypeService: BadgeTypeService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() { }


  loadData(search: string = '') {

    console.log(`search query : ${this.searchQuery}`);

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
      error => { this.spinner.hide() },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    this.page = event.first / this.size;
    console.log('first : ' + event.first);
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }

    if (this.matSearch != null && this.matSearch !== '') {
      buffer.append(`registrationNumber~${this.matSearch}`);
    }

    if (this.categorySearch != null && this.categorySearch !== '') {
      buffer.append(`vehicleCategory.code~${this.categorySearch}`);
    }

    if (this.badgeTypeSearch != null && this.badgeTypeSearch !== '') {
      buffer.append(`badgeType.code~${this.badgeTypeSearch}`);
    }


    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }

  onVehicleCategorySearch(event: any) {
    this.vehicleCategoryService.find('code~' + event.query).subscribe(
      data => this.vehicleCategoryList = data.map(f => f.code)
    );
  }

  onBadgeTypeSearch(event: any) {
    this.badgeTypeService.find('code~' + event.query).subscribe(
      data => this.badgeTypeList = data.map(f => f.code)
    );
  }

  reset() {
    this.codeSearch = null;
    this.matSearch = null;
    this.categorySearch = null;
    this.badgeTypeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.vehicleService.delete(id);
      }
    });
  }

  onSelectVehcileCategory() {
    console.log(this.categorySearch);

  }

}
