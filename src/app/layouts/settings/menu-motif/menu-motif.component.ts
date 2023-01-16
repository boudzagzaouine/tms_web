import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-motif',
  templateUrl: './menu-motif.component.html',
  styleUrls: ['./menu-motif.component.css']
})
export class MenuMotifComponent implements OnInit {

  items: MenuItem[];

  home: MenuItem;
  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Motif' ,routerLink:'/core/settings/menu-motif'},

  ];

  this.home = {icon: 'pi pi-home'};

  }


}
