import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-account',
  templateUrl: './menu-account.component.html',
  styleUrls: ['./menu-account.component.css']
})
export class MenuAccountComponent implements OnInit {

  items: MenuItem[];

  home: MenuItem;

  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Compte' ,routerLink:'/core/settings/account'},

  ];

  this.home = {icon: 'pi pi-home'};

  }
}
