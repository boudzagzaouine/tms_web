import { OrderTransportRejectTypeService } from './../../../shared/services/api/order-transport-reject-type.service';
import { OrderTransportRejectType } from './../../../shared/models/order-transport-reject-type';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Router } from '@angular/router';
import { TurnStatusService } from './../../../shared/services/api/turn-status.service';
import { CompanyService } from './../../../shared/services/api/company.service';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { TransportPlanHistoryService } from './../../../shared/services/api/transport-plan-history.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TurnStatus } from './../../../shared/models/turn-status';
import { Company } from './../../../shared/models/company';
import { TransportPlanHistory } from './../../../shared/models/transport-plan-history';
import { Component, OnInit } from '@angular/core';
import { Transport } from './../../../shared/models/transport';
@Component({
  selector: 'app-transport-plan-list-cancel',
  templateUrl: './transport-plan-list-cancel.component.html',
  styleUrls: ['./transport-plan-list-cancel.component.scss']
})
export class TransportPlanListCancelComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: TransportPlanHistory;
  categorySearch: VehicleCategory;
  categoryList:VehicleCategory[]=[];
  transportList:Transport[]=[];
  transportSearch:Transport;
  selectedTransportPlanHistorys: Array<TransportPlanHistory> = [];
  transportPlanHistoryList: Array<TransportPlanHistory> = [];
  companySearch:Company;
  turnStatusSearch: TurnStatus;
  turnStatusList:TurnStatus[]=[];
  companyList:Company[]=[];
  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  TransportPlanHistoryExportList: Array<TransportPlanHistory> = [];
  titleList = 'liste des Plan transport annulés';
  subscriptions= new Subscription();

  items: MenuItem[];

  home: MenuItem;
  rejectTypeSearch: OrderTransportRejectType;
  rejectTypeList:OrderTransportRejectType[]=[];

   dateLivraisonSearch: Date;
   dateDelivery: Date;
  constructor(private transportPlanHistoryService: TransportPlanHistoryService,

    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private transportService:TransportServcie,
    private companyService:CompanyService,
    private turnStatusService: TurnStatusService,
    private vehicleCategoryService:VehicleCategoryService,
    private orderTransportRejectTypeService:OrderTransportRejectTypeService,

    private router: Router) { }

  ngOnInit() {

    this.items = [
      {label: 'Refus'},
      {label: 'Lister'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = TransportPlanHistory.name;
    this.cols = [
      //{ field: 'code', header: 'Code', type: 'string' },
     // { field: 'date', header: 'Date', type: 'date' },

      { field: 'orderTransport', child: 'code', header: 'Ordre', type: 'object' },
       { field: 'account', child:'name', header: 'Compte', type: 'object' },

      { field: 'vehicleCategory', child: 'code', header: 'Catégorie', type: 'object' },
      { field: 'transport', child: 'name', header: 'Prestataire', type: 'object' },
      { field: 'trajet', child: 'code', header: 'Trajet', type: 'object' },
      { field: 'purchasePrice', header: 'Prix Achat HT', type: 'number' },
      { field: 'salePrice', header: 'Prix Vente HT', type: 'number' },
      { field: 'marginRate', header: ' Taux Marge', type: 'number' },
      { field: 'margineService', header: 'Taux Service', type: 'number' },

      { field: 'orderTransportRejectType', child: 'code', header: 'Type Refus', type: 'object' },

      { field: 'remark', header: 'Remarque', type: 'string' },

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

this.orderTransportRejectTypeService.find('type:3').subscribe(
  data=> {
    this.rejectTypeList=data;
  }
);

this.searchQuery = 'type:3';
  }

  onExportExcel(event) {

    this.subscriptions.add(  this.transportPlanHistoryService.find(this.searchQuery).subscribe(
      data => {
        this.TransportPlanHistoryExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.TransportPlanHistoryExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.TransportPlanHistoryExportList, this.className, this.titleList);

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
    this.subscriptions.add( this.transportPlanHistoryService.find(this.searchQuery).subscribe(
      data => {
        this.TransportPlanHistoryExportList = data;
        this.globalService.generatePdf(event, this.TransportPlanHistoryExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.transportPlanHistoryService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add( this.transportPlanHistoryService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.transportPlanHistoryList = data;
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
    buffer.append(`type:${3}`);

    if (this.transportSearch != null && this.transportSearch !== undefined) {
      buffer.append(`transport.name~${this.transportSearch.name}`);
    }
    if (this.companySearch != null && this.companySearch !== undefined) {
      buffer.append(`orderTransport.company.name~${this.companySearch.name}`);
    }
    if (this.categorySearch != null && this.categorySearch !== undefined) {
      buffer.append(`vehicleCategory.code~${this.categorySearch.code}`);
    }
    if (this.rejectTypeSearch != null && this.rejectTypeSearch !== undefined) {
      buffer.append(`orderTransportRejectType.code~${this.rejectTypeSearch.code}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }


  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedTransportPlanHistorys = event.object;

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/transport-plan/edit/', this.selectedTransportPlanHistorys[0].id]);
    }

  }

  reset() {
    this.codeSearch = null;
   this.transportSearch=null;
   this.companySearch=null;
   this.turnStatusSearch=null;
   this.categorySearch=null;
   this.rejectTypeSearch=null;
    this.page = 0;
    this.searchQuery = 'type:3';
    this.loadData(this.searchQuery);
  }




  onDeleteAll() {

    if (this.selectedTransportPlanHistorys.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer?',
        accept: () => {
          const ids = this.selectedTransportPlanHistorys.map(x => x.id);
          this.subscriptions.add( this.transportPlanHistoryService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedTransportPlanHistorys.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
