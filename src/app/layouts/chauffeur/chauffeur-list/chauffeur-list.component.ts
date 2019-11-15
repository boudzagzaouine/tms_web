import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { NgxSpinnerService } from 'ngx-spinner';
import { Driver } from './../../../shared/models/driver';
import { DriverService } from './../../../shared/services/api/driver.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chauffeur-list',
  templateUrl: './chauffeur-list.component.html',
  styleUrls: ['./chauffeur-list.component.css']
})
export class ChauffeurListComponent implements OnInit {


  page = 0; size = 10;
  cinSearch: string;
  codeSearch: string;
  contratSearch: string;

  drivers: Array<Driver> = [];


  constructor(private driverService: DriverService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loadData();
  }

  loadDataLazy(event){
    this.page = event.first * this.size;
    console.log('lazy load data');

    this.loadData();
  }



  loadData(search: string = '') {

    console.log('loading data');

    this.spinner.show();
    this.driverService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.drivers = data;
        console.log("data" + this.drivers);

        this.spinner.hide();
      },
      error => {this.spinner.hide()},
      () => this.spinner.hide()
    );
  }


  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.cinSearch != null && this.cinSearch !== '') {
      buffer.append(`cin~${this.cinSearch}`);
    }

    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }


    this.page = 0;
    const searchQuery = buffer.getValue();
    console.log("search " + searchQuery);

    this.loadData(searchQuery);

  }


}
