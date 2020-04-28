import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { CommissionTypeService } from './../../../shared/services/api/commisionType.service';
import { CommissionType } from './../../../shared/models/commissionType';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commission-type',
  templateUrl: './commission-type.component.html',
  styleUrls: ['./commission-type.component.css']
})
export class CommissionTypeComponent implements OnInit {
  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  cols: any[];
  commissionTypeList: Array<CommissionType> = [];
  selectedCommissions: Array<CommissionType> = [];
  showDialog: boolean;
  editMode: number;
  className: String;

  constructor(private commissionTypeService: CommissionTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = CommissionType.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },
      { field: 'percentage', header: 'Montant' },
    ];

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.commissionTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.commissionTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.commissionTypeList = data;

        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  /// end search
  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedCommissions = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedCommissions.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedCommissions.map(x => x.id);
          this.commissionTypeService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          );
        }
      });
    } else if (this.selectedCommissions.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

}
