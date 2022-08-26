import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-sinister',
  templateUrl: './menu-sinister.component.html',
  styleUrls: ['./menu-sinister.component.scss']
})
export class MenuSinisterComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;


  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Paramétrage'},
      {label: 'Sinistre' ,routerLink:'/core/settings/menu-sinister'},

  ];

  this.home = {icon: 'pi pi-home'};

  }


}
