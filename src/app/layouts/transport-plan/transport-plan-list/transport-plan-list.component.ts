import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { TurnStatus } from './../../../shared/models/turn-status';
import { TurnStatusService } from './../../../shared/services/api/turn-status.service';
import { CompanyService } from './../../../shared/services/api/company.service';
import { Company } from './../../../shared/models/company';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { TransportPlanService } from './../../../shared/services/api/transport-plan.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TransportPlan } from './../../../shared/models/transport-plan';
import { Component, OnInit } from '@angular/core';
import { Transport } from './../../../shared/models/transport';

@Component({
  selector: 'app-transport-plan-list',
  templateUrl: './transport-plan-list.component.html',
  styleUrls: ['./transport-plan-list.component.scss']
})
export class TransportPlanListComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: TransportPlan;
  categorySearch: VehicleCategory;
  categoryList:VehicleCategory[]=[];
  transportList:Transport[]=[];
  transportSearch:Transport;
  selectedTransportPlans: Array<TransportPlan> = [];
  transportPlanList: Array<TransportPlan> = [];
  companySearch:Company;
  turnStatusSearch: TurnStatus;
  turnStatusList:TurnStatus[]=[];
  companyList:Company[]=[];
  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  TransportPlanExportList: Array<TransportPlan> = [];
  titleList = 'Liste des Plans de Transport';
  subscriptions= new Subscription();

  items: MenuItem[];

  home: MenuItem;


   dateLivraisonSearch: Date;
   dateDelivery: Date;
  constructor(private TransportPlanService: TransportPlanService,
     private vehicleCategoryService :VehicleCategoryService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private transportService:TransportServcie,
    private companyService:CompanyService,
    private turnStatusService: TurnStatusService,

    private router: Router) { }

  ngOnInit() {

    this.items = [
      {label: 'TransportPlan'},
      {label: 'Lister'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = TransportPlan.name;
    this.cols = [
      //{ field: 'code', header: 'Code', type: 'string' },
     // { field: 'date', header: 'Date', type: 'date' },

      { field: 'orderTransport', child: 'code', header: 'Ordre', type: 'object' },
       { field: 'orderTransport', child: 'company',child2:'name', header: 'Société', type: 'object2' },

      { field: 'vehicleCategory', child: 'code', header: 'Catégorie', type: 'object' },
      { field: 'transport', child: 'name', header: 'Prestataire', type: 'object' },
      { field: 'turnStatus', child: 'code', header: 'Statut', type: 'object' },

    ];

this.turnStatusService.findAll().subscribe(
  data=> {
    this.turnStatusList=data;
  }
);

this.vehicleCategoryService.findAll().subscribe(
  data=> {
    this.categoryList=data;
  }
);
  }

  onExportExcel(event) {

    this.subscriptions.add(  this.TransportPlanService.find(this.searchQuery).subscribe(
      data => {
        this.TransportPlanExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.TransportPlanExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.TransportPlanExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdf(event) {
    this.subscriptions.add( this.TransportPlanService.find(this.searchQuery).subscribe(
      data => {
        this.TransportPlanExportList = data;
        this.globalService.generatePdf(event, this.TransportPlanExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }
  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.TransportPlanService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add( this.TransportPlanService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.transportPlanList = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }


  onTransportSearch(event){
    this.subscriptions.add(this.transportService.find('name~' + event.query).subscribe(
      data => this.transportList = data
    ));
  }

  onCompanySearch(event){
    this.subscriptions.add(this.companyService.find('name~' + event.query).subscribe(
      data => this.companyList = data
    ));
  }
  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.transportSearch != null && this.transportSearch !== undefined) {
      buffer.append(`transport.name~${this.transportSearch.name}`);
    }
    if (this.companySearch != null && this.companySearch !== undefined) {
      buffer.append(`orderTransport.company.name~${this.companySearch.name}`);
    }
    if (this.categorySearch != null && this.categorySearch !== undefined) {
      buffer.append(`vehicleCategory.code~${this.categorySearch.code}`);
    }
    if (this.turnStatusSearch != null && this.turnStatusSearch !== undefined) {
      buffer.append(`turnStatus.code~${this.turnStatusSearch.code}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }


  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedTransportPlans = event.object;

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/transport-plan/edit/', this.selectedTransportPlans[0].id]);
    }

  }

  reset() {
    this.codeSearch = null;
   this.transportSearch=null;
   this.companySearch=null;
   this.turnStatusSearch=null;
   this.vehicleCategoryService=null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }




  onDeleteAll() {

    if (this.selectedTransportPlans.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedTransportPlans.map(x => x.id);
          this.subscriptions.add( this.TransportPlanService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedTransportPlans.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
