import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ActionTypeService } from '../../../shared/services/api/action-type.service';
import { GlobalService } from '../../../shared/services/api/global.service';
import { EmsBuffer } from '../../../shared/utils';
import { ActionType } from '../../../shared/models/action-type';

@Component({
  selector: 'app-actionType',
  templateUrl: './actionType.component.html',
  styleUrls: ['./actionType.component.scss']
})
export class ActionTypeComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<ActionType> = [];
  cols: any[];
  actionTypeList: Array<ActionType> = [];
  selectedActionTypes: Array<ActionType> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des types action';
  actionTypeExportList: Array<ActionType> = [];
  subscriptions= new Subscription();

  items: MenuItem[];
  home: MenuItem;
  
  constructor(private actionTypeService: ActionTypeService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Type action' ,routerLink:'/core/settings/action-type'},
  
  ];
  
  this.home = {icon: 'pi pi-home'};

    this.className = ActionType.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },

    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.actionTypeService.find(this.searchQuery).subscribe(
      data => {
        this.actionTypeExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.actionTypeExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.actionTypeExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.actionTypeService.find(this.searchQuery).subscribe(
      data => {
        this.actionTypeExportList = data;
        this.globalService.generatePdf(event, this.actionTypeExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.actionTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.actionTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {
        //console.log(data);
        this.actionTypeList = data;

        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        ///this.toastr.error(error.error.message, 'Erreur');
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
    this.subscriptions.add(this.actionTypeService.find('code~' + event.query).subscribe(
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
    this.selectedActionTypes = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedActionTypes.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedActionTypes.map(x => x.id);
          this.subscriptions.add(this.actionTypeService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedActionTypes.length < 1) {
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
