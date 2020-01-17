import { ConfirmationService, MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consomtion-type',
  templateUrl: './consomtion-type.component.html',
  styleUrls: ['./consomtion-type.component.css']
})
export class ConsomtionTypeComponent implements OnInit {
  page = 0;
  size = 10;
  collectionSize: number;


  searchQuery: string;
  codeSearch: string;
  items: MenuItem[];


  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete() }
    ];
  }






  onDelete() {

  }

  onEdit() {
    this.toastr.info('selected ');
  }




}
