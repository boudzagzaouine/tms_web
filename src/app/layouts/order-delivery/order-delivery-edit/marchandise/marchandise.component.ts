import { OrderDelivery } from './../../../../shared/models/order-delivery';
import { SelectButtonModule } from 'primeng/selectbutton';
import { OrderDeliveryService } from './../../../../shared/services/api/order-delivery.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marchandise',
  templateUrl: './marchandise.component.html',
  styleUrls: ['./marchandise.component.css']
})
export class MarchandiseComponent implements OnInit {

  index: number = 0;
  showPanelOrderTypeAller :Boolean = false;
  showPanelOrderTypeRetour :Boolean = false;
  selectedOrderDelivery : OrderDelivery = new OrderDelivery();
  constructor(private OrderDeliveryService : OrderDeliveryService) { }

  ngOnInit() {

this.selectedOrderDelivery = this.OrderDeliveryService.getOrderDelivery();
    if (this.selectedOrderDelivery.turnType.id == 1) {
      this.showPanelOrderTypeAller = true;
      this.showPanelOrderTypeRetour = false;
    } else if (this.selectedOrderDelivery.turnType.id == 2) {
      this.showPanelOrderTypeRetour = true;
      this.showPanelOrderTypeAller = false;
    } else {
      this.showPanelOrderTypeRetour = true;
      this.showPanelOrderTypeAller = true;
    }


  }

}
