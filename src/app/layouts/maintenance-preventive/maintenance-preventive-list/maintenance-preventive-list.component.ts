import { MaintenancePlan } from './../../../shared/models/maintenance-plan';
import { MaintenancePlanService } from './../../../shared/services/api/maintenance-plan.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './../../../shared/services/api/global.service';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaintenanceTypeService } from './../../../shared/services/api/maintenance-type.service';
import { MaintenanceStateService } from './../../../shared/services/api/maintenance-states.service';
import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { Patrimony } from './../../../shared/models/patrimony';
import { MaintenanceState } from './../../../shared/models/maintenance-state';
import { MaintenanceType } from './../../../shared/models/maintenance-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintenance-preventive-list',
  templateUrl: './maintenance-preventive-list.component.html',
  styleUrls: ['./maintenance-preventive-list.component.css']
})
export class MaintenancePreventiveListComponent implements OnInit {

  page = 0;
  size = 8;
  collectionSize: number;
  typeMaintenanceSearch: MaintenanceType;
  statusMaintenanceSearch: MaintenanceState;
  searchQuery = '';
  maintenancePreventiveList: Array<MaintenancePlan> = [];
  maintenanceTypeList: Array<MaintenanceType> = [];
  maintenanceStateList: Array<MaintenanceState> = [];
  maintenanceStatusList: Array<MaintenanceState> = [];
  selectMaintenancePlans: Array<MaintenancePlan> = [];
  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  patrimonyList: Array<Patrimony> = [];
  patrimonySearch: string;
  titleList = 'Liste Des Plan Maintenances';

  maintenanceList: Array<MaintenancePlan> = [];
  maintenanceDesList: Array<MaintenancePlan> = [];

  maintenancecodeSearch: string;
  maintenanceDescriptionSearch: string;

  maintenancePreventiveExportList:Array<MaintenancePlan> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private maintenancePreventiveService: MaintenancePlanService,
    private globalService: GlobalService,

    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {


    this.className = MaintenancePlan.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },

    ];



  }


  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectMaintenancePlans = event.object;

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/maintenance-plan/edit', this.selectMaintenancePlans[0].id]);


    }

  }


  onExportExcel(event) {

    this.maintenancePreventiveService.find(this.searchQuery).subscribe(
      data => {
        this.maintenancePreventiveExportList = data;

        if (event != null) {
          this.globalService.generateExcel(event, this.maintenancePreventiveExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.maintenancePreventiveExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }


  onExportPdf(event) {
    this.maintenancePreventiveService.find(this.searchQuery).subscribe(
      data => {
        this.maintenancePreventiveExportList = data;
        this.globalService.generatePdf(event, this.maintenancePreventiveExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
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

  loadData(search: string = '') {

    this.spinner.show();
    this.maintenancePreventiveService.sizeSearch(search).subscribe(
      data => {

        this.collectionSize = data;
      }
    );

    this.maintenancePreventiveService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.maintenancePreventiveList = data;

        this.spinner.hide();
      },
      error => { this.spinner.hide(); },
      () => this.spinner.hide()
    );
  }


  onMaintenanceSearch(event: any) {
    this.maintenancePreventiveService.find('code~' + event.query).subscribe(
      data => {

        this.maintenanceList = data.map(f => f.code)

      }
    );
  }

  onMaintenanceDesSearch(event: any) {
    this.maintenancePreventiveService.find('description~' + event.query).subscribe(
      data => {

        this.maintenanceDesList = data.map(f => f.description)

      }
    );
  }

  onSearchClicked() {

    const buffer = new EmsBuffer();


    if (this.maintenancecodeSearch != null && this.maintenancecodeSearch !== '') {
      buffer.append(`code~${this.maintenancecodeSearch}`);
    }

    if (this.maintenanceDescriptionSearch != null && this.maintenanceDescriptionSearch !== '') {
      buffer.append(`description~${this.maintenanceDescriptionSearch}`);
    }
    this.page = 0;
    const searchQuery = buffer.getValue();
    this.loadData(searchQuery);
  }

  reset() {
    this.maintenancecodeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }




  onDeleteAll() {

    if (this.selectMaintenancePlans.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer?',
        accept: () => {
          const ids = this.selectMaintenancePlans.map(x => x.id);

          this.maintenancePreventiveService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectMaintenancePlans.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }



}
