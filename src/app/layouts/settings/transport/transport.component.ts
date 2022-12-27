import { Router } from '@angular/router';
import { GlobalService } from './../../../shared/services/api/global.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Transport } from './../../../shared/models/transport';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  nameSearch: string;
  codeSearch: string;
  descriptionSearch = '';
  nameList: Array<Transport> = [];
  codeList: Array<Transport> = [];
  cols: any[];
  zoneList: Array<Transport> = [];
  selectedTransports: Array<Transport> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  transportExportList: Array<Transport> = [];
  titleList = 'liste des Transporteurs';
  subscriptions= new Subscription();
  items: MenuItem[];
  home: MenuItem;
  constructor(private tranportService: TransportServcie,
    private spinner: NgxSpinnerService,
    private globalService : GlobalService,
    private messageService: MessageService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private router :Router
  ) { }


  ngOnInit() {
    ///this.searchQuery = 'interneOrExterne:false';
    this.items = [
      {label: 'Paramétrage'},
      {label: 'Transporteur' ,routerLink:'/core/settings/transport'},

  ];
  this.home = {icon: 'pi pi-home'};


    this.className = Transport.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'name', header: 'Nom', type: 'string' },
      { field: 'siret', header: 'Siret', type: 'string' },
      { field: 'address', child: 'line1', header: 'Addresse 1', type: 'object' },
      { field: 'address', child: 'line2', header: 'Addresse 2', type: 'object' },
      { field: 'address', child: 'zip', header: 'Code postale', type: 'object' },
      { field: 'address', child: 'city', header: 'Ville', type: 'object' },
      { field: 'address', child: 'country', header: 'Pays', type: 'object' },
    ];
   // this.searchQuery = 'interneOrExterne:false'

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.tranportService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.tranportService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.zoneList = data;

        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        //this.toastr.error(error.error.message, 'Erreur');
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

    this.subscriptions.add(this.tranportService.find(this.searchQuery).subscribe(
      data => {
        this.transportExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.transportExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.transportExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.tranportService.find(this.searchQuery).subscribe(
      data => {
        this.transportExportList = data;
        this.globalService.generatePdf(event, this.transportExportList, this.className, this.titleList);
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
    // buffer.append(`interneOrExterne:false`);
    if (this.nameSearch != null && this.nameSearch !== '') {
      buffer.append(`name~${this.nameSearch}`);
    }
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }


    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onCodeSearch(event: any) {
    this.subscriptions.add( this.tranportService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    ));
  }

  onNameSearch(event: any) {
    this.subscriptions.add( this.tranportService.find('name~' + event.query).subscribe(
      data => this.nameList = data.map(f => f.name)
    ));
  }
  reset() {
    this.nameSearch = null;
    this.codeSearch=null;
    this.page = 0;
    // this.searchQuery = 'interneOrExterne:false';
    //this.searchQuery = 'interneOrExterne:false'
    this.loadData();
  }

  onObjectEdited(event) {

    // this.editMode = event.operationMode;
    // this.selectedTransports = event.object;
    // if (this.editMode === 3) {
    //   this.onDeleteAll();
    // } else {
    //   this.showDialog = true;
    // }



    console.log("edit mode ");

    console.log(event.operationMode);

        this.editMode = event.operationMode;
        this.selectedTransports = event.object;
        if (this.editMode === 3) {
          this.onDeleteAll();
        } else if(this.editMode ===1) {
          console.log(  this.selectedTransports);
        this.router.navigate(['/core/settings/transport-edit']);

         // this.showDialog = true;
        }else if(this.editMode ===2) {
          this.router.navigate(['/core/settings/transport-edit',  this.selectedTransports[0].id]);

        }

  }

  onDeleteAll() {

    if (this.selectedTransports.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer ?',
        accept: () => {
          const ids = this.selectedTransports.map(x => x.id);
          this.subscriptions.add( this.tranportService.deleteAllByIds(ids).subscribe(
            data => {
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});
             // this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
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
    } else if (this.selectedTransports.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {
    this.showDialog = event;
    //this.searchQuery = 'interneOrExterne:false'

    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
