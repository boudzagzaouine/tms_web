import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { TurnService } from './../../../shared/services/api/turn.service';
import { DriverService } from './../../../shared/services/api/driver.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { BadgeTypeService } from './../../../shared/services/api/badge-type.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { Vehicle } from './../../../shared/models/vehicle';
import { Turn } from './../../../shared/models/turn';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turn-list',
  templateUrl: './turn-list.component.html',
  styleUrls: ['./turn-list.component.css']
})
export class TurnListComponent implements OnInit {


  page = 0;
  size = 10;
  collectionSize: number;

  selectedTurn: Turn;
  searchQuery = '';
  dateDelivery: Date;
  matSearch: string;
  categorySearch: string;
  vehicleSearch: string;

  turnList: Array<Turn> = [];
  vehicleCategoryList: Array<string> = [];
  driverList: Array<string> = [];

  constructor(private turnService: TurnService,
    private vehicleCategoryService: VehicleCategoryService,
    private driverService: DriverService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() { }


  loadData(search: string = '') {

    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();
    this.turnService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.turnService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.turnList = data;
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
    if (this.dateDelivery != null && this.dateDelivery !== undefined) {
      buffer.append(`dateDelivery~${this.dateDelivery}`);
    }

    if (this.vehicleSearch != null && this.vehicleSearch !== '') {
      buffer.append(`vehicle.code~${this.vehicleSearch}`);
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

 
  reset() {
    this.dateDelivery = null;
    this.matSearch = null;
    this.categorySearch = null;
    this.vehicleSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.turnService.delete(id).subscribe(
          data=>{
            this.toastr.success('Elément est Supprimé Avec Succès', 'Supprssion');
            this.loadData();
          },
         err=>{
          this.toastr.error(err.arror.message);

         }
        );
      }
    });
  }

  onSelectVehcileCategory() {
    console.log(this.categorySearch);

  }


}
