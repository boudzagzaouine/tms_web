import { NgxSpinnerService } from 'ngx-spinner';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { VehicleService } from './../../../shared/services';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from './../../../shared/models';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  page = 0; size = 10;
  codeSearch: string;
  matSearch: string;
  categorySearch: string;
  badgeTypeSearch: string;

  vehicleList: Array<Vehicle> = [];

  constructor(private vehicleService: VehicleService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(search: string = '') {

    this.spinner.show()
    this.vehicleService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.vehicleList = data;
        this.spinner.hide();
      },
      error => {this.spinner.hide()},
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event){
    this.page = event.first / this.size;
    this.loadData();
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
    const searchQuery = buffer.getValue();
    this.loadData(searchQuery);

  }

  reset() {
    this.codeSearch = null;
    this.matSearch = null;
    this.categorySearch = null;
    this.badgeTypeSearch = null;
    this.page = 0;

    this.loadData();
  }

}
