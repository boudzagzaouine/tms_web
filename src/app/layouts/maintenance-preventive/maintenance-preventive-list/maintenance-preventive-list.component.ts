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
  titleList = 'Liste Des Plan Maintenance';

  maintenanceList: Array<MaintenancePlan> = [];
  maintenancecodeSearch: string;
  maintenancePreventiveExportList:Array<MaintenancePlan> = [];

  constructor(private patrimonyService: PatrimonyService,
    private maintenanceStatService: MaintenanceStateService,
    private maintenanceTypeService: MaintenanceTypeService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private maintenancePreventiveService: MaintenancePlanService,
    private globalService: GlobalService,

    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {


    this.className = MaintenancePlan.name;
    this.cols = [
      { field: 'code', header: 'Titre', type: 'string' },
      { field: 'maintenanceType', child: 'code', header: 'Type Maintenance', type: 'object' },
       { field: 'programType', child: 'code', header: 'Type De Programme', type: 'object' },
      { field: 'maintenanceState', child: 'code', header: 'Statut' , type: 'object'},
       { field: 'patrimony', child: 'code', header: 'Patrimoine', type: 'object' },

    ];

    this.maintenanceTypeService.findAll().subscribe((data) => {
      this.maintenanceTypeList = data;
    });

    this.maintenanceStatService.findAll().subscribe((data) => {
      this.maintenanceStateList = data;
    });


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
    console.log('evnt' + event.first);
    this.page = event.first / this.size;
    console.log('lazy load data');
    this.loadData(this.searchQuery);

  }

  loadData(search: string = '') {

    console.log('loading data');
    this.spinner.show();
    this.maintenancePreventiveService.sizeSearch(search).subscribe(
      data => {
        console.log('data size : ' + data);

        this.collectionSize = data;
      }
    );


    this.maintenancePreventiveService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.maintenancePreventiveList = data;
        console.log(this.maintenancePreventiveList);

        this.spinner.hide();
      },
      error => { this.spinner.hide(); },
      () => this.spinner.hide()
    );
  }

  onPatrimonySearch(event: any) {
    this.patrimonyService.find('code~' + event.query).subscribe(
      data => {

        this.patrimonyList = data.map(f => f.code)
        //  console.log(data);

      }
    );
  }

  onMaintenanceSearch(event: any) {
    this.maintenancePreventiveService.find('code~' + event.query).subscribe(
      data => {

        this.maintenanceList = data.map(f => f.code)
        //  console.log(data);

      }
    );
  }

  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.patrimonySearch != null && this.patrimonySearch !== '') {
      buffer.append(`patrimony.code~${this.patrimonySearch}`);
    }

    if (this.maintenancecodeSearch != null && this.maintenancecodeSearch !== '') {
      buffer.append(`code~${this.maintenancecodeSearch}`);
    }
    if (this.typeMaintenanceSearch != null && this.typeMaintenanceSearch.code != null && this.typeMaintenanceSearch.code !== '') {
      buffer.append(`maintenanceType.code~${this.typeMaintenanceSearch.code}`);
    }
    if (this.statusMaintenanceSearch != null && this.statusMaintenanceSearch.code != null && this.statusMaintenanceSearch.code !== '') {
      buffer.append(`maintenanceState.code~${this.statusMaintenanceSearch.code}`);
    }
    this.page = 0;
    const searchQuery = buffer.getValue();
    console.log('search ' + searchQuery);
    this.loadData(searchQuery);
  }

  reset() {
    this.maintenancecodeSearch = null;
    this.typeMaintenanceSearch = null;
    this.statusMaintenanceSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }




  onDeleteAll() {

    if (this.selectMaintenancePlans.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
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
