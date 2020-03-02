import { DeliveryLine } from './../../../shared/models/delivery-line';

import { DeliveryService } from './../../../shared/services/api/Delivery.service';
import { Delivery } from './../../../shared/models/delivery';
import { MenuItem, MessageService, SelectItem, TreeNode, FilterUtils } from 'primeng/api';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { flatMap } from 'rxjs/operators';
@Component({
  selector: 'app-turn-edit',
  templateUrl: './turn-edit.component.html',
  styleUrls: ['./turn-edit.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None

})
export class TurnEditComponent implements OnInit {

  activeIndex: number = 0;
  items: MenuItem[];
  deliveries: Delivery[] = [];
  delivriesLoading: Array<any> = [];
  cols: any[];
  chargement: TreeNode[] = [];

  constructor(private deliveryService: DeliveryService) { }


  ngOnInit() {
    this.items = [{
      label: 'Commandes',
    },
    {
      label: '',
    },
    {
      label: 'Paiment',
    },
    {
      label: 'Confirmation',
    }
    ];

    this.deliveryService.findAll().subscribe(
      data => {
        this.deliveries = data;
        console.log(data);

      }

    );



  }

  loaddata() {

    console.log(this.delivriesLoading);

  }

  TotalQnt(d: Delivery) {
    let sum: number = 0;
    d.lines.forEach(function (value) {
      sum += value.quantityServed;
    });
    console.log(sum);

    return sum;
  }

  TotalTtc(d: Delivery) {
    let sum: number = 0;
    d.lines.forEach(function (value) {
      sum += value.totalPriceTTC;
    });
    console.log(sum);

    return sum;
  }

  private previous() {
    this.activeIndex--;

  }

  private next() {
    this.activeIndex++;

    if (this.activeIndex == 1) {
      this.loaddata();
    }

  }

}
