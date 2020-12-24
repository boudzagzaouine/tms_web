import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-maintenance',
  templateUrl: './menu-maintenance.component.html',
  styleUrls: ['./menu-maintenance.component.css']
})
export class MenuMaintenanceComponent implements OnInit {
  items: MenuItem[];
    
  home: MenuItem;
  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Maintenance' ,routerLink:'/core/settings/menu-maintenance'},
  
  ];
  
  this.home = {icon: 'pi pi-home'};


  }

}
