import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Commission } from './../../shared/models/commission';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commission-driver',
  templateUrl: './commission-driver.component.html',
  styleUrls: ['./commission-driver.component.css']
})
export class CommissionDriverComponent implements OnInit {

  selectedCommission: Commission;
  items: MenuItem[];
  constructor(private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedCommission.id) }
    ];
  }

  onDelete(id: number) {

  }

  onEdit() {
    this.toastr.info('selected ');
  }

}
