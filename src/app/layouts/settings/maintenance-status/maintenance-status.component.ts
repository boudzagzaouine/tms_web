import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { MaintenanceState } from './../../../shared/models/maintenance-state';
import { MaintenanceStateService } from './../../../shared/services/api/maintenance-states.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintenance-status',
  templateUrl: './maintenance-status.component.html',
  styleUrls: ['./maintenance-status.component.css'],
  providers: [ConfirmationService]

})
export class MaintenanceStatusComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectedMaintenanceState: MaintenanceState;
  searchQuery: string;
  codeSearch: string;
  items: MenuItem[];

  maintenanceStateList: Array<MaintenanceState> = [];

  constructor(private maintenanceStateService: MaintenanceStateService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.maintenanceStateService.maintenanceStateListChanged.subscribe(
      data => {
        this.maintenanceStateList = data;
      }
    );

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedMaintenanceState.id) }
    ];
  }
  loadData(search: string = '') {
    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();
    this.maintenanceStateService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.maintenanceStateService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.maintenanceStateList = data;
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
        this.maintenanceStateService.delete(id);
      }
    });
  }

  onEdit() {
    this.toastr.info('selected ');
  }
}
