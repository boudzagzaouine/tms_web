import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-insurance',
  templateUrl: './menu-insurance.component.html',
  styleUrls: ['./menu-insurance.component.css']
})
export class MenuInsuranceComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;


  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Paramétrage'},
      {label: 'Assurance' ,routerLink:'/core/settings/menu-insurance'},
  
  ];
  
  this.home = {icon: 'pi pi-home'};

  }

}
