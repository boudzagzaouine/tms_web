import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-fuel',
  templateUrl: './menu-fuel.component.html',
  styleUrls: ['./menu-fuel.component.css']
})
export class MenuFuelComponent implements OnInit {

  items: MenuItem[];

  home: MenuItem;

  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Carburant' ,routerLink:'/core/settings/menu-fuel'},

  ];

  this.home = {icon: 'pi pi-home'};

  }


}
