import { GlobalService } from './../../../shared/services/api/global.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaintenanceTypeService } from './../../../shared/services/api/maintenance-type.service';
import { MaintenanceStateService } from './../../../shared/services/api/maintenance-states.service';
import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { MaintenancePlan } from './../../../shared/models/maintenance-plan';
import { MaintenanceState } from './../../../shared/models/maintenance-state';
import { MaintenanceType } from './../../../shared/models/maintenance-type';
import { MaintenancePlanService } from './../../../shared/services/api/maintenance-plan.service';
import { Component, OnInit } from '@angular/core';
import { Patrimony } from './../../../shared/models/patrimony';

@Component({
  selector: 'app-maintenance-traitement',
  templateUrl: './maintenance-traitement.component.html',
  styleUrls: ['./maintenance-traitement.component.css']
})
export class MaintenanceTraitementComponent implements OnInit {


  page = 0;
  size = 8;
  collectionSize: number;
  typeMaintenanceSearch: MaintenanceType;
  statusMaintenanceSearch: MaintenanceState;
  searchQuery = '';
  maintenancePlanList: Array<MaintenancePlan> = [];
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
  titleList = 'Liste Des Maintenance';

  maintenanceList: Array<MaintenancePlan> = [];
  maintenancecodeSearch: string;
  maintenancePlanExportList:Array<MaintenancePlan> = [];

  constructor(private patrimonyService: PatrimonyService,
    private maintenanceStatService: MaintenanceStateService,
    private maintenanceTypeService: MaintenanceTypeService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private maintenancePlanService: MaintenancePlanService,
    private globalService: GlobalService,

    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {


    this.className = MaintenancePlan.name;
    this.cols = [
      { field: 'code', header: 'Titre', type: 'string' },
      { field: 'maintenanceType', child: 'code', header: 'Type Maintenance', type: 'object' },
       { field: 'programType', child: 'code', header: 'Type De Programme', type: 'object' },
       { field: 'serviceProvider', child: 'code', header: 'Prestataire', type: 'object' },
       { field: 'responsability', child: 'code', header: 'Responsablité', type: 'object' },

       { field: 'responsability', child: 'code', header: 'Responsablité', type: 'object' },
      { field: 'maintenanceState', child: 'code', header: 'Statut' , type: 'object'},
       { field: 'interventionDate', header: 'Date intervention', type: 'date' },
       { field: 'triggerDate', header: 'Date declanchement', type: 'date' },
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
      this.router.navigate(['/core/maintenance/plan', this.selectMaintenancePlans[0].id]);


    }

  }


  onExportExcel(event) {

    this.maintenancePlanService.find(this.searchQuery).subscribe(
      data => {
        this.maintenancePlanExportList = data;

        if (event != null) {
          this.globalService.generateExcel(event, this.maintenancePlanExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.maintenancePlanExportList, this.className, this.titleList);

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
    this.maintenancePlanService.find(this.searchQuery).subscribe(
      data => {
        this.maintenancePlanExportList = data;
        this.globalService.generatePdf(event, this.maintenancePlanExportList, this.className, this.titleList);
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
    this.maintenancePlanService.sizeSearch(search).subscribe(
      data => {
        console.log('data size : ' + data);

        this.collectionSize = data;
      }
    );


    this.maintenancePlanService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.maintenancePlanList = data;
        console.log(this.maintenancePlanList);

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
    this.maintenancePlanService.find('code~' + event.query).subscribe(
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

          this.maintenancePlanService.deleteAllByIds(ids).subscribe(
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
