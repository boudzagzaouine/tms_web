import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DieselDeclaration } from './../../../shared/models/diesel-declaration';
import { DieselDeclarationService } from './../../../shared/services/api/dieselDeclaration.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { EmsBuffer } from './../../../shared/utils';

@Component({
  selector: 'app-diesel-declaration',
  templateUrl: './diesel-declaration.component.html',
  styleUrls: ['./diesel-declaration.component.scss']
})
export class DieselDeclarationComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<DieselDeclaration> = [];
  cols: any[];
  DieselDeclarationList: Array<DieselDeclaration> = [];
  selectedDieselDeclarations: Array<DieselDeclaration> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des declarations gasoil';
  DieselDeclarationExportList: Array<DieselDeclaration> = [];

  constructor(private dieselDeclarationService: DieselDeclarationService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = DieselDeclaration.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      {
        field: 'vehicle',
        header: 'Véhicule',
        child: 'code',
        type: 'object'
      },
      { field: 'amount', header: 'Montant', type: 'number' },
      { field: 'mileage', header: 'KM', type: 'number' },
      { field: 'dieselDeclarationDate', header: 'Date Declaration', type: 'date' },

    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.dieselDeclarationService.find(this.searchQuery).subscribe(
      data => {
        this.DieselDeclarationExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.DieselDeclarationExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.DieselDeclarationExportList, this.className, this.titleList);

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
    this.dieselDeclarationService.find(this.searchQuery).subscribe(
      data => {
        this.DieselDeclarationExportList = data;
        this.globalService.generatePdf(event, this.DieselDeclarationExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }
  loadData(search: string = '') {
    this.spinner.show();
    this.dieselDeclarationService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
        console.log(data);
        
      }
    );
    this.dieselDeclarationService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.DieselDeclarationList = data;
        console.log(data);

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
    this.dieselDeclarationService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    );
  }
  reset() {
    this.codeSearch = null;
    this.descriptionSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedDieselDeclarations = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedDieselDeclarations.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedDieselDeclarations.map(x => x.id);
          this.dieselDeclarationService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedDieselDeclarations.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {

    this.showDialog = event;

    this.loadData();
  }

}
