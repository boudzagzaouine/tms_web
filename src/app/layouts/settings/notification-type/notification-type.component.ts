import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { NotificationType } from './../../../shared/models/notificationType';
import { GlobalService } from './../../../shared/services/api/global.service';
import { NotificationTypeService } from './../../../shared/services/api/notificationType.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';

@Component({
  selector: 'app-notification-type',
  templateUrl: './notification-type.component.html',
  styleUrls: ['./notification-type.component.scss']
})
export class NotificationTypeComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<NotificationType> = [];
  cols: any[];
  notificationTypeList: Array<NotificationType> = [];
  selectedNotificationTypes: Array<NotificationType> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des types de notification';
  NotificationTypeExportList: Array<NotificationType> = [];
  subscriptions= new Subscription();

  constructor(private notificationTypeService: NotificationTypeService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = NotificationType.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'email', header: 'Email', type: 'string' },

    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.notificationTypeService.find(this.searchQuery).subscribe(
      data => {
        this.NotificationTypeExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.NotificationTypeExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.NotificationTypeExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.notificationTypeService.find(this.searchQuery).subscribe(
      data => {
        this.NotificationTypeExportList = data;
        this.globalService.generatePdf(event, this.NotificationTypeExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.notificationTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.notificationTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.notificationTypeList = data;

        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
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
    this.subscriptions.add(this.notificationTypeService.find('code~' + event.query).subscribe(
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
    this.selectedNotificationTypes = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedNotificationTypes.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedNotificationTypes.map(x => x.id);
          this.subscriptions.add(this.notificationTypeService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedNotificationTypes.length < 1) {
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
