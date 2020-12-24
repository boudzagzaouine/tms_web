import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-notification',
  templateUrl: './menu-notification.component.html',
  styleUrls: ['./menu-notification.component.scss']
})
export class MenuNotificationComponent implements OnInit {

  items: MenuItem[];
    
  home: MenuItem;
  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Notification' ,routerLink:'/core/settings/menu-mail'},
  
  ];
  
  this.home = {icon: 'pi pi-home'};

  }

}
