import { MaintenanceType } from './../../../shared/models/maintenance-type';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaintenanceTypeService } from './../../../shared/services/api/maintenance-type.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-maintenance-type',
  templateUrl: './maintenance-type.component.html',
  styleUrls: ['./maintenance-type.component.css'],
  providers: [ConfirmationService]

})
export class MaintenanceTypeComponent implements OnInit {
  page = 0;
  size = 10;
  collectionSize: number;

  selectedMaintenanceType: MaintenanceType;
  searchQuery = '';
  codeSearch: string;
  items: MenuItem[];

  maintenanceTypeList: Array<MaintenanceType> = [];

  constructor(private maintenanceTypeService: MaintenanceTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedMaintenanceType.id) }
    ];

  }

  loadData(search: string = '') {
    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();
    this.maintenanceTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.maintenanceTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.maintenanceTypeList = data;
        this.spinner.hide();
      },
      error => {
        console.log(error);

        this.spinner.hide();
      },
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

    this.page = 0;
    this.searchQuery = buffer.getValue();
    console.log(this.searchQuery);

    this.loadData(this.searchQuery);

  }

  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }
  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.maintenanceTypeService.delete(id).subscribe(

          data => {
            this.toastr.success("Elément est Supprimé avec Succès","Suppression");
            this.loadData();
          },
          error=>{
           this.toastr.error(error.error.message);

         }
        );
      }
    });
  }

  onEdit() {
    this.toastr.info('selected ');
  }
  onMaintenanceTypeAdd(event) {
    this.loadData();
  }
}
