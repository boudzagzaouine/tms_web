import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OrderTransport } from './../../shared/models/order-transport';
import { OrderTransportService } from './../../shared/services/api/order-transport.service';

@Component({
  selector: 'app-add-retour-order-transport',
  templateUrl: './add-retour-order-transport.component.html',
  styleUrls: ['./add-retour-order-transport.component.css']
})
export class AddRetourOrderTransportComponent implements OnInit {
  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  orderTransportList: Array<OrderTransport> = [];
  className: string;
  subscriptions = new Subscription();
  cols: any[];

  items: MenuItem[];

  home: MenuItem;
  constructor(
    private spinner: NgxSpinnerService,
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
  }
  loadData(search: string = '') {
    if (search != '') {
      search += ',turnStatus.id:1';
    } else {
      search += 'turnStatus.id:1';

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

