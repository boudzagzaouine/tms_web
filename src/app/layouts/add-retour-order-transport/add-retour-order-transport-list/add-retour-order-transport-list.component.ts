import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Agency } from './../../../shared/models/agency';
import { OrderTransport } from './../../../shared/models/order-transport';
import { User } from './../../../shared/models/user';
import { AgencyService } from './../../../shared/services/api/agency.service';
import { AuthenticationService } from './../../../shared/services/api/authentication.service';
import { OrderTransportInfoService } from './../../../shared/services/api/order-transport-info.service';
import { OrderTransportService } from './../../../shared/services/api/order-transport.service';
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
  orderTransportList: Array<OrderTransport> = [];
  className: string;
  agency: Agency = new Agency()
  subscriptions = new Subscription();
  cols: any[];
  //currentUser: User;
  items: MenuItem[];

  home: MenuItem;
  constructor(
    private spinner: NgxSpinnerService,
    private orderTransportInfoService: OrderTransportInfoService,
    private authenticationService: AuthenticationService,
    private agencyservice: AgencyService,
    private orderTransportService: OrderTransportService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'OrderTransport' },
      { label: 'Lister' },]

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
    const currentUser: User = this.authenticationService.getCurrentUser();
    if (currentUser.userGroup.id = 4) {

      console.log('user===> :  ' + currentUser.id);
      this.agencyservice.find("responsable.id:" + currentUser.id).subscribe(
        data => {
          this.agency = data[0]
          console.log('agency===> :  ' + this.agency.code);
        }
      )
    }
    this.loadData();
  }

  loadData(search: string = '') {
    if (search != '') {
      search += ',turnStatus.id:5,turnType.id:1,trajet.villeDestination.id:25';
    } else {
      search += 'turnStatus.id:5,turnType.id:1,trajet.villeDestination.id:25';

    }
    this.spinner.show();
    this.subscriptions.add(this.orderTransportService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.orderTransportService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.orderTransportList = data;
         console.log('sizeorder===>'+this.orderTransportList.length);

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



  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
