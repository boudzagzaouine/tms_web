import { Component, Input, OnInit } from '@angular/core';
import { PurchaseOrder } from './../../../shared/models';

@Component({
  selector: 'app-generate-Bon',
  templateUrl: './generate-Bon.component.html',
  styleUrls: ['./generate-Bon.component.scss']
})
export class GenerateBonComponent implements OnInit {

  @Input() selectedpurchaseOrder = new PurchaseOrder();
  yDate = new Date();
  constructor() { }

  ngOnInit() {

    
  }

}
