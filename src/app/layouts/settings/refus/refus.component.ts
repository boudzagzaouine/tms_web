import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { OrderTransportRejectTypeService } from './../../../shared/services/api/order-transport-reject-type.service';
import { Subscription } from 'rxjs';
import { OrderTransportRejectType } from './../../../shared/models/order-transport-reject-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refus',
  templateUrl: './refus.component.html',
  styleUrls: ['./refus.component.css']
})
export class RefusComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<OrderTransportRejectType> = [];
  cols: any[];
  orderTransportRejectTypeList: Array<OrderTransportRejectType> = [];
  selectedOrderTransportRejectTypes: Array<OrderTransportRejectType> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des refus';
  orderTransportRejectTypeExportList: Array<OrderTransportRejectType> = [];
  subscriptions= new Subscription();

  constructor(private orderTransportRejectTypeService: OrderTransportRejectTypeService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.className = OrderTransportRejectType.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },

    ];
    this.searchQuery = 'type:2';

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.orderTransportRejectTypeService.find(this.searchQuery).subscribe(
      data => {
        this.orderTransportRejectTypeExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.orderTransportRejectTypeExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.orderTransportRejectTypeExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.orderTransportRejectTypeService.find(this.searchQuery).subscribe(
      data => {
        this.orderTransportRejectTypeExportList = data;
        this.globalService.generatePdf(event, this.orderTransportRejectTypeExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }
  loadData(search: string = '') {
    search = search?  search :'type:2';
    this.spinner.show();
    this.subscriptions.add(this.orderTransportRejectTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.orderTransportRejectTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.orderTransportRejectTypeList = data;

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
    buffer.append(`type~${2}`);

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
    this.subscriptions.add(this.orderTransportRejectTypeService.find('type:2'+',code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    ));
  }
  reset() {
    this.codeSearch = null;
    this.descriptionSearch = null;
    this.page = 0;
    this.searchQuery = 'type:2';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedOrderTransportRejectTypes = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedOrderTransportRejectTypes.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedOrderTransportRejectTypes.map(x => x.id);
          this.subscriptions.add(this.orderTransportRejectTypeService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedOrderTransportRejectTypes.length < 1) {
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
