import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-address',
  templateUrl: './menu-address.component.html',
  styleUrls: ['./menu-address.component.scss']
})
export class MenuAddressComponent implements OnInit {

  items: MenuItem[];

  home: MenuItem;

  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Adresse' ,routerLink:'/core/settings/menu-address'},

  ];

  this.home = {icon: 'pi pi-home'};

  }

}
