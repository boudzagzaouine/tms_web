import { Component, Input, OnInit } from '@angular/core';
import { PurchaseOrder } from './../../../../shared/models';
import { DieselDeclaration } from './../../../../shared/models/diesel-declaration';

@Component({
  selector: 'app-generateBon',
  templateUrl: './generateBon.component.html',
  styleUrls: ['./generateBon.component.scss']
})
export class GenerateBonComponent implements OnInit {


  @Input() selectedpurchaseOrder = new PurchaseOrder();
  @Input() selectedDieselDeclaration = new DieselDeclaration();

  constructor() { }

  ngOnInit() {
  }

}
