import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-transport',
  templateUrl: './menu-transport.component.html',
  styleUrls: ['./menu-transport.component.scss']
})
export class MenuTransportComponent implements OnInit {

  items: MenuItem[];

  home: MenuItem;
  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Tarifs' ,routerLink:'/core/settings/menu-transport'},

  ];

  this.home = {icon: 'pi pi-home'};

  }
}
