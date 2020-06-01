import { MaintenanceLineRef } from '../../../shared/models/maintenance-line-ref';
import { EmsBuffer } from '../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaintenanceLineRefService } from '../../../shared/services/api/maintenance-line-ref.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-maintenance-line-ref',
  templateUrl: './maintenance-line-ref.component.html',
  styleUrls: ['./maintenance-line-ref.component.css'],
  providers: [ConfirmationService]

})
export class MaintenanceLineRefComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch: string;
  codeList: Array<MaintenanceLineRef> = [];
  cols: any[];
  maintenanceTypeList: Array<MaintenanceLineRef> = [];
  selectedMaintenanceLineRefs: Array<MaintenanceLineRef> = [];
  showDialog: boolean;
  editMode: number;
  className: String;

  constructor(private maintenanceTypeService: MaintenanceLineRefService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = MaintenanceLineRef.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },

    ];

    this.loadData();

  }

  loadData(search: string = '') {
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
    this.maintenanceTypeService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    );
  }
  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedMaintenanceLineRefs = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedMaintenanceLineRefs.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedMaintenanceLineRefs.map(x => x.id);
          this.maintenanceTypeService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedMaintenanceLineRefs.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }



}
