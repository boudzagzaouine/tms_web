import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-company',
  templateUrl: './menu-company.component.html',
  styleUrls: ['./menu-company.component.scss']
})
export class MenuCompanyComponent implements OnInit {

  items: MenuItem[];

  home: MenuItem;

  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Société' ,routerLink:'/core/settings/company'},

  ];

  this.home = {icon: 'pi pi-home'};

  }

}
