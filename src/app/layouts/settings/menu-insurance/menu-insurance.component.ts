import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-insurance',
  templateUrl: './menu-insurance.component.html',
  styleUrls: ['./menu-insurance.component.css']
})
export class MenuInsuranceComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;


  constructor() { }

  ngOnInit() {


  }

}
