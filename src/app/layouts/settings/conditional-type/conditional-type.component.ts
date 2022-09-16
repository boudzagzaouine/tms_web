import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ConditionalType } from './../../../shared/models/contional-Type';
import { ConditionalTypeService } from './../../../shared/services/api/conditional-type.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { EmsBuffer } from './../../../shared/utils';

@Component({
  selector: 'app-conditional-type',
  templateUrl: './conditional-type.component.html',
  styleUrls: ['./conditional-type.component.css']
})
export class ConditionalTypeComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<ConditionalType> = [];
  cols: any[];
  conditionalTypeList: Array<ConditionalType> = [];
  selectedConditionalTypes: Array<ConditionalType> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des types de Condition';
  conditionalTypeExportList: Array<ConditionalType> = [];
  subscriptions= new Subscription();
  items: MenuItem[];
  home: MenuItem;
  constructor(private conditionalTypeService: ConditionalTypeService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Type condition' ,routerLink:'/core/settings/conditional-type'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = ConditionalType.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },

    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.conditionalTypeService.find(this.searchQuery).subscribe(
      data => {
        this.conditionalTypeExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.conditionalTypeExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.conditionalTypeExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.conditionalTypeService.find(this.searchQuery).subscribe(
      data => {
        this.conditionalTypeExportList = data;
        this.globalService.generatePdf(event, this.conditionalTypeExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }
  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.conditionalTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.conditionalTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.conditionalTypeList = data;

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
    this.subscriptions.add(this.conditionalTypeService.find('code~' + event.query).subscribe(
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
    this.selectedConditionalTypes = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedConditionalTypes.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedConditionalTypes.map(x => x.id);
          this.subscriptions.add(this.conditionalTypeService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedConditionalTypes.length < 1) {
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
