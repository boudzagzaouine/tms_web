import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Address } from './../../../shared/models/address';
import { Agency } from './../../../shared/models/agency';
import { LoadingType } from './../../../shared/models/loading-type';
import { OrderTransport } from './../../../shared/models/order-transport';
import { User } from './../../../shared/models/user';
import { Ville } from './../../../shared/models/ville';
import { AddressService } from './../../../shared/services/api/address.service';
import { AgencyService } from './../../../shared/services/api/agency.service';
import { AuthenticationService } from './../../../shared/services/api/authentication.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { LoadingTypeService } from './../../../shared/services/api/loading-type.service';
import { OrderTransportService } from './../../../shared/services/api/order-transport.service';
import { VilleService } from './../../../shared/services/api/ville.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
@Component({
  selector: 'app-add-retour-order-transport-list',
  templateUrl: './add-retour-order-transport-list.component.html',
  styleUrls: ['./add-retour-order-transport-list.component.css']
})
export class AddRetourOrderTransportListComponent implements OnInit {
  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: OrderTransport;
  OrderTransportCodeList: OrderTransport[] = [];
  loadingTypeSearch: LoadingType;
  loadingTypeList: LoadingType[] = [];
  titleList = 'Liste des orders de transport';
  orderTransportList: Array<OrderTransport> = [];
  className: string;
  editMode: number;
  selectedOrderTransports: Array<OrderTransport> = [];
  currentUser: User
  villedestination: Ville = new Ville()
  adressdestination: Address = new Address()
  agency: Agency = new Agency()
  orderTransportExportList: Array<OrderTransport> = [];
  subscriptions = new Subscription();
  cols: any[];
  items: MenuItem[];

  home: MenuItem;
  constructor(
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private adressService: AddressService,
    private villeService: VilleService,
    private router: Router,
    private loadingTypeService: LoadingTypeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private agencyservice: AgencyService,

    private orderTransportService: OrderTransportService) {

  }

  ngOnInit(): void {
   
    this.items = [
      { label: 'OrderTransport' },
      { label: 'Lister', routerLink: "/core/settings/add-order-retour/list" },]

    this.home = { icon: 'pi pi-home' };
    this.className = OrderTransport.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'date', header: 'Date', type: 'date' },
      { field: 'trajet', child: 'code', header: 'Trajet', type: 'object' },

      { field: 'turnType', child: 'code', header: 'Type', type: 'object' },
      { field: 'loadingType', child: 'code', header: 'Type de chargement', type: 'object' },
      { field: 'account', child: 'name', header: 'Compte', type: 'object' },
      { field: 'turnStatus', child: 'code', header: 'Statut', type: 'object' },


    ];
    this.loadingTypeService.findAll().subscribe(
      data => {
        this.loadingTypeList = data;
      }
    );

    this.getVilleDestination();
   // this.loadData();
  }
  getVilleDestination() {
    this.currentUser = this.authenticationService.getCurrentUser();
    if (this.currentUser.userGroup.id === 4) {
      this.subscriptions.add(this.agencyservice.find("responsable.id:" + this.currentUser.id).subscribe(
        data => {

          this.agency = data[0]
          this.adressService.findById(this.agency.address.id).subscribe(
            data => {
              this.adressdestination = data
              this.villeService.findById(this.adressdestination.ville.id).subscribe(
                data => {
                  this.villedestination = data
                  this.loadData();
                }
              )
            }
          )
        },
      )
      );
    }
  }


  loadData(search: string = '') {
    if (this.villedestination != null && this.villedestination.id > 0) {
      this.spinner.show();
      search != '' ? search += ',turnStatus.id!3;4;2,turnType.id:1,trajet.villeDestination.id:' + this.villedestination.id :
        search += 'turnStatus.id!3;4;2,turnType.id:1,trajet.villeDestination.id:' + this.villedestination.id


      this.subscriptions.add(this.orderTransportService.sizeSearch(search).subscribe(
        data => {
          this.collectionSize = data;
          
        }
      ));
      this.subscriptions.add(this.orderTransportService.findPagination(this.page, this.size, search).subscribe(
        data => {

          this.orderTransportList = data;
          console.log('sizeorder===>' + this.orderTransportList.length);

          this.spinner.hide();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });
          this.spinner.hide();
        },
        () => this.spinner.hide()
      ));
   
    }
  }

  loadDataLazy(event) {

    console.log('lazi');
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }
  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedOrderTransports = event.object;

    if (this.editMode != 3) {
      this.router.navigate(['/core/order-transport/edit', this.selectedOrderTransports[0].id]);
    }

  }
  onSearchClicked() {

    const buffer = new EmsBuffer();

    if (this.codeSearch != null && this.codeSearch !== undefined) {
      buffer.append(`code~${this.codeSearch.code}`);
    }
    if (this.loadingTypeSearch != null && this.loadingTypeSearch !== undefined) {
      buffer.append(`loadingType.code~${this.loadingTypeSearch.code}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }


  onOrderTransportSearch(event) {
    this.subscriptions.add(this.orderTransportService.find('turnStatus.id!3;4;1,turnType.id:1,code~' + event.query).subscribe(
      data => this.OrderTransportCodeList = data
    ));
  }
  onExportExcel(event) {

    this.subscriptions.add(this.orderTransportService.find(this.searchQuery).subscribe(
      data => {
        this.orderTransportExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.orderTransportExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.orderTransportExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdfGlobal(event) {
    this.subscriptions.add(this.orderTransportService.find(this.searchQuery).subscribe(
      data => {
        this.orderTransportList = data;
        this.globalService.generatePdf(event, this.orderTransportExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }


  reset() {
    this.codeSearch = null;
    this.loadingTypeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
