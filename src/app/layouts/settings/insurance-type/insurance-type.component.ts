import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsuranceTypeService } from './../../../shared/services/api/insurance-type.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { InsuranceType } from './../../../shared/models/insurance-Type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-type',
  templateUrl: './insurance-type.component.html',
  styleUrls: ['./insurance-type.component.css']
})
export class InsuranceTypeComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectedInsuranceTypes: Array<InsuranceType>=[];
  searchQuery: string;
  codeSearch: string;
  items: MenuItem[];
  insertOrUpdate:String;
  insuranceTypeList: Array<InsuranceType> = [];
  showDialog: boolean;
  editMode: number;
  className: String;
  cols: any[];
  constructor(private insuranceTypeService: InsuranceTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.className = InsuranceType.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },

    ];

    this.loadData();
  }


  loadData(search: string = '') {

    this.spinner.show();
    this.insuranceTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.insuranceTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.insuranceTypeList = data;
        this.spinner.hide();
      },
      error => {


        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    this.page = event.first / this.size;
    console.log('first : ' + event.first);
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    console.log(this.searchQuery);

    this.loadData(this.searchQuery);

  }

  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedInsuranceTypes = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedInsuranceTypes.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedInsuranceTypes.map(x => x.id);
          this.insuranceTypeService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedInsuranceTypes.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

  onEdit() {
    this.toastr.info('selected ');
  }

  onInsuranceTypeAdded(event) {
    this.loadData();
  }

}
