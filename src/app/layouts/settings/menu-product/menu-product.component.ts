import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-product',
  templateUrl: './menu-product.component.html',
  styleUrls: ['./menu-product.component.css']
})
export class MenuProductComponent implements OnInit {
  items: MenuItem[];
    
  home: MenuItem;
  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Produit' ,routerLink:'/core/settings/menu-product'},
  
  ];
  
  this.home = {icon: 'pi pi-home'};

  }

}
