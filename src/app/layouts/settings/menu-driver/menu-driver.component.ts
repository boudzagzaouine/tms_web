import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-driver',
  templateUrl: './menu-driver.component.html',
  styleUrls: ['./menu-driver.component.css']
})
export class MenuDriverComponent implements OnInit {

  items: MenuItem[];
    
  home: MenuItem;

  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Conducteur' ,routerLink:'/core/settings/menu-driver'},
  
  ];
  
  this.home = {icon: 'pi pi-home'};

  }


}
