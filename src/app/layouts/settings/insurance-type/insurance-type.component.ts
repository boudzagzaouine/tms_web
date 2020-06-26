import { GlobalService } from './../../../shared/services/api/global.service';
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
  searchQuery= '';
  codeSearch: string;
  descriptionSearch: string;
  codeList: Array<InsuranceType> = [];
  collectionSize: number;
  selectedInsuranceTypes: Array<InsuranceType> = [];
  insuranceTypeList: Array<InsuranceType> = [];
  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  title = 'Modifier Type Assurance';
  insuranceTypeExportList: Array<InsuranceType> = [];
  titleList = 'Liste des types assurance';

  constructor(private insuranceTypeService: InsuranceTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private globalService: GlobalService) { }

  ngOnInit() {
    this.className = InsuranceType.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },
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
    this.loadData(this.searchQuery);
  }

  onExportExcel(event) {

    this.insuranceTypeService.find(this.searchQuery).subscribe(
      data => {
        this.insuranceTypeExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.insuranceTypeExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.insuranceTypeExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }

  onExportPdf(event) {
    this.insuranceTypeService.find(this.searchQuery).subscribe(
      data => {
        this.insuranceTypeExportList = data;
        this.globalService.generatePdf(event, this.insuranceTypeExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

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
    this.insuranceTypeService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    );
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



}
