import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-service',
  templateUrl: './menu-service.component.html',
  styleUrls: ['./menu-service.component.scss']
})
export class MenuServiceComponent implements OnInit {

  items: MenuItem[];

  home: MenuItem;
  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Produit' ,routerLink:'/core/settings/menu-product'},

  ];

  this.home = {icon: 'pi pi-home'};

  }

}
