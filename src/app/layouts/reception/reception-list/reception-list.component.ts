import { ReceptionService } from './../../../shared/services/api/reception.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { SupplierService } from './../../../shared/services/api/supplier.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Supplier } from './../../../shared/models/supplier';
import { Reception } from './../../../shared/models/reception';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reception-list',
  templateUrl: './reception-list.component.html',
  styleUrls: ['./reception-list.component.css']
})
export class ReceptionListComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: Reception;
  matSearch: string;
  supplierSearch: Supplier;
  selectedReception: Array<Reception> = [];
  receptionList: Array<Reception> = [];
  receptionCodeList: Array<Reception> = [];
  supplierList: Array<Supplier> = [];
  className: string;
  titleList = 'Liste Des reception';
  cols: any[];
  editMode: number;
  showDialog: boolean;

  receptionExportList:Array<Reception> = [];


  constructor(private receptionService: ReceptionService,
    private globalService: GlobalService,
    private supplierService: SupplierService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {

    this.className = Reception.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'orderCode', header: 'BL', type: 'number' },
      { field: 'remarks', header: 'Remarque', type: 'string' },
      { field: 'supplier', child: 'code', header: 'Fournisseur', type: 'object' },
      { field: 'orderType', child: 'code', header: 'Type', type: 'object' },
      { field: 'totalPriceHT',  header: 'Total HT', type: 'number' },
      { field: 'vat', header: 'TVA', type: 'number' },
      { field: 'totalPriceTTC',  header: 'Total TTC', type: 'number' },
      { field: 'orderStatus', child: 'code', header: 'Statut', type: 'object' },
      { field: 'receptionDate', header: 'Date Reception', type: 'date' },


    ];



  }


  loadData(search: string = '') {
    this.spinner.show();
    this.receptionService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.receptionService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.receptionList = data;

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

    this.receptionService.find(this.searchQuery).subscribe(
      data => {
        this.receptionExportList = data;

        if (event != null) {
          this.globalService.generateExcel(event, this.receptionExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.receptionExportList, this.className, this.titleList);

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
    this.receptionService.find(this.searchQuery).subscribe(
      data => {
        this.receptionExportList = data;
        this.globalService.generatePdf(event, this.receptionExportList, this.className, this.titleList);
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
    if (this.codeSearch != null && this.codeSearch.code !== '') {
      buffer.append(`code~${this.codeSearch.code}`);
    }


    if (this.supplierSearch != null && this.supplierSearch.code !== '') {
      buffer.append(`Supplier.code~${this.supplierSearch.code}`);
    }


    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }

  onObjectEdited(event) {
    this.editMode = event.operationMode;
    this.selectedReception = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/reception/edit', this.selectedReception[0].id]);
    }

  }

  onReceptionCodeSearch(event: any) {
    this.receptionService.find('codeng serve' + event.query).subscribe(
      data => this.receptionCodeList = data ,
    );
  }
  onSupplierCodeSearch(event: any) {
    this.supplierService.find('code~' + event.query).subscribe(
      data => this.supplierList = data ,
    );
  }

  reset() {
    this.codeSearch = null;
    this.matSearch = null;

    this.supplierSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }


  onDeleteAll() {

    if (this.selectedReception.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedReception.map(x => x.id);
          this.receptionService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedReception.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }


}
