import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SubscriptionCard } from './../../../shared/models/subscription-card';
import { GlobalService } from './../../../shared/services/api/global.service';
import { SubscriptionCardService } from './../../../shared/services/api/subscription-card.service';
import { EmsBuffer } from './../../../shared/utils';

@Component({
  selector: 'app-subscriptionCard',
  templateUrl: './subscriptionCard.component.html',
  styleUrls: ['./subscriptionCard.component.css']
})
export class SubscriptionCardComponent implements OnInit {

 page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<SubscriptionCard> = [];
  cols: any[];
  subscriptionCardList: Array<SubscriptionCard> = [];
  selectedSubscriptionCards: Array<SubscriptionCard> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des cates abonnement';
  subscriptionCardExportList: Array<SubscriptionCard> = [];
  subscriptions= new Subscription();

  constructor(private subscriptionCardService: SubscriptionCardService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.className = SubscriptionCard.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },

    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.subscriptionCardService.find(this.searchQuery).subscribe(
      data => {
        this.subscriptionCardExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.subscriptionCardExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.subscriptionCardExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.subscriptionCardService.find(this.searchQuery).subscribe(
      data => {
        this.subscriptionCardExportList = data;
        this.globalService.generatePdf(event, this.subscriptionCardExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.subscriptionCardService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.subscriptionCardService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.subscriptionCardList = data;

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
    this.subscriptions.add(this.subscriptionCardService.find('code~' + event.query).subscribe(
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
    this.selectedSubscriptionCards = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedSubscriptionCards.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedSubscriptionCards.map(x => x.id);
          this.subscriptions.add(this.subscriptionCardService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedSubscriptionCards.length < 1) {
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
