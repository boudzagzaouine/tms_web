import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { VatService } from './../../../shared/services/api/vat.service';
import { Subscription } from 'rxjs';
import { Vat } from './../../../shared/models/vat';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.css']
})
export class VatComponent implements OnInit {


  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<Vat> = [];
  cols: any[];
  vatList: Array<Vat> = [];
  selectedVats: Array<Vat> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste TVA';
  vatExportList: Array<Vat> = [];
  subscriptions= new Subscription();

  constructor(private vatService: VatService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.className = Vat.name;
    this.cols = [
      { field: 'value', header: 'Valeur', type: 'number' },


    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.vatService.find(this.searchQuery).subscribe(
      data => {
        this.vatExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.vatExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.vatExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdf(event) {
    this.subscriptions.add(this.vatService.find(this.searchQuery).subscribe(
      data => {
        this.vatExportList = data;
        this.globalService.generatePdf(event, this.vatExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }
  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.vatService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.vatService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.vatList = data;

        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

      //  this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`value~${this.codeSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onCodeSearch(event: any) {
    this.subscriptions.add(this.vatService.find('value~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.value)
    ));
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
    this.selectedVats = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedVats.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedVats.map(x => x.id);
          this.subscriptions.add(this.vatService.deleteAllByIds(ids).subscribe(
            data => {
              //this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

              this.loadData();
            },
            error => {
              this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

             // this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedVats.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {

    this.showDialog = event;

    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
