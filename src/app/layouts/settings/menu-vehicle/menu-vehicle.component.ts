import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-vehicle',
  templateUrl: './menu-vehicle.component.html',
  styleUrls: ['./menu-vehicle.component.css']
})
export class MenuVehicleComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Paramétrage'},
      {label: 'Véhicule' ,routerLink:'/core/settings/menu-vehicle'},
  
  ];
  
  this.home = {icon: 'pi pi-home'};

  }

}
