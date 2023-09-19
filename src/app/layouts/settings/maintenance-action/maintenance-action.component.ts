import { MaintenanceAction } from '../../../shared/models/maintenance-action';
import { EmsBuffer } from '../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaintenanceActionService } from '../../../shared/services/api/maintenance-action.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-maintenance-action',
  templateUrl: './maintenance-action.component.html',
  styleUrls: ['./maintenance-action.component.css'],
  providers: [ConfirmationService]

})
export class MaintenanceActionComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch: string;
  codeList: Array<MaintenanceAction> = [];
  cols: any[];
  maintenanceActionList: Array<MaintenanceAction> = [];
  selectedMaintenanceActions: Array<MaintenanceAction> = [];
  showDialog: boolean;
  editMode: number;
  className: String;

  constructor(private maintenanceActionService: MaintenanceActionService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = MaintenanceAction.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },

    ];

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.maintenanceActionService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.maintenanceActionService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.maintenanceActionList = data;

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
    if (this.descriptionSearch != null && this.descriptionSearch !== '') {
      buffer.append(`description~${this.descriptionSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }

  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.descriptionSearch = '';
    this.loadData(this.searchQuery);
  }
  onCodeSearch(event: any) {
    this.maintenanceActionService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    );
  }
  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedMaintenanceActions = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedMaintenanceActions.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer?',
        accept: () => {
          const ids = this.selectedMaintenanceActions.map(x => x.id);
          this.maintenanceActionService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedMaintenanceActions.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }



}
