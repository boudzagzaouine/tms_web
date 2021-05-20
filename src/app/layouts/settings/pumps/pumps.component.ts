import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Pump } from './../../../shared/models/pump';
import { GlobalService } from './../../../shared/services/api/global.service';
import { PumpService } from './../../../shared/services/api/pump.service';
import { EmsBuffer } from './../../../shared/utils';

@Component({
  selector: 'app-pumps',
  templateUrl: './pumps.component.html',
  styleUrls: ['./pumps.component.css']
})
export class PumpsComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<Pump> = [];
  cols: any[];
  pumpList: Array<Pump> = [];
  selectedPumps: Array<Pump> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des Pompes carburant';
  pumpExportList: Array<Pump> = [];
  subscriptions= new Subscription();
  items: MenuItem[];
  home: MenuItem;
  constructor(private pumpService: PumpService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.items = [
      {label: 'Paramétrage'},
      {label: 'Pompe à carburant' ,routerLink:'/core/settings/pumps'},
  
  ];
  
  this.home = {icon: 'pi pi-home'};

    this.primengConfig.ripple = true;
    this.className = Pump.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },
      { field: 'capacity', header: 'Capacité', type: 'number' },

    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.pumpService.find(this.searchQuery).subscribe(
      data => {
        this.pumpExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.pumpExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.pumpExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.pumpService.find(this.searchQuery).subscribe(
      data => {
        this.pumpExportList = data;
        this.globalService.generatePdf(event, this.pumpExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.pumpService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.pumpService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.pumpList = data;

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
    this.subscriptions.add(this.pumpService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
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
    this.selectedPumps = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedPumps.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedPumps.map(x => x.id);
          this.subscriptions.add(this.pumpService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedPumps.length < 1) {
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
