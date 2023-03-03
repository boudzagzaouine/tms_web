import { Address } from './../../../shared/models/address';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './../../../shared/services/api/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddressService } from './../../../shared/services/api/address.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {
page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch: string;
  codeList: Array<Address> = [];
  cols: any[];
  addressList: Array<Address> = [];
  selectedaddresss: Array<Address> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  addressExportList: Array<Address> = [];
  titleList = 'Liste des adresses de livraison';
  subscriptions= new Subscription();

  constructor(private addressService: AddressService,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,

  ) { }

  ngOnInit() {

    this.className = AddressService.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'name', header: 'Nom', type: 'string' },
      { field: 'line1', header: 'Line 1', type: 'string' },
      { field: 'line2', header: 'Line 2', type: 'string' },
      { field: 'zip', header: 'Code Postale', type: 'string' },
      { field: 'ville', child: 'code',header: 'Ville', type: 'object' },
      { field: 'pays',child: 'code', header: 'Pays', type: 'object' },
      { field: 'account',child: 'name', header: 'Compte', type: 'object' },
      { field: 'company',child: 'name', header: 'Client', type: 'object' },


    ];

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add( this.addressService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.addressService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.addressList = data;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message, 'Erreur');
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

  onExportExcel(event) {

    this.subscriptions.add(this.addressService.find(this.searchQuery).subscribe(
      data => {
        this.addressExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.addressExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.addressExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }

  onExportPdf(event) {
    this.subscriptions.add(this.addressService.find(this.searchQuery).subscribe(
      data => {
        this.addressExportList = data;
        this.globalService.generatePdf(event, this.addressExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

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
    this.subscriptions.add(this.addressService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    ));
  } reset() {

    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.descriptionSearch = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {
    this.editMode = event.operationMode;
    this.selectedaddresss = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedaddresss.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedaddresss.map(x => x.id);
          this.subscriptions.add(this.addressService.deleteAllByIds(ids).subscribe(
            data => {
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

             // this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

              //this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedaddresss.length < 1) {
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
