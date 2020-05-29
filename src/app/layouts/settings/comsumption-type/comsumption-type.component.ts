import { ContractTypeService } from './../../../shared/services/api/contract-type.service';
import { ContractType } from './../../../shared/models/contract-type';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConsumptionTypeService } from './../../../shared/services/api/consumption-type.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { ConsumptionType } from './../../../shared/models/consumption-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comsumption-type',
  templateUrl: './comsumption-type.component.html',
  styleUrls: ['./comsumption-type.component.css'],
  providers: [ConfirmationService]
})
export class ComsumptionTypeComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch: string;
  codeList: Array<ConsumptionType> = [];
  cols: any[];
  consumptionTypeList: Array<ConsumptionType> = [];
  selectedonsumptionTypes: Array<ConsumptionType> = [];
  showDialog: boolean;
  editMode: number;
  className: String;

  constructor(private consumptionTypeService: ConsumptionTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = ConsumptionTypeService.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },

    ];

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.consumptionTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.consumptionTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.consumptionTypeList = data;
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
    if (this.descriptionSearch != null && this.descriptionSearch !== '') {
      buffer.append(`description~${this.descriptionSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onCodeSearch(event: any) {
    this.consumptionTypeService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    );
  }  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.descriptionSearch = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {
    this.editMode = event.operationMode;
    this.selectedonsumptionTypes = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedonsumptionTypes.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedonsumptionTypes.map(x => x.id);
          this.consumptionTypeService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedonsumptionTypes.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

}
