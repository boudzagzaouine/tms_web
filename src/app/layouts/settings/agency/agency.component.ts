import { User } from './../../../shared/models/user';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Agency } from './../../../shared/models/agency';
import { Zone } from './../../../shared/models/Zone';
import { AgencyService } from './../../../shared/services/api/agency.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { UserService } from './../../../shared/services/api/user.service';
import { ZoneServcie } from './../../../shared/services/api/zone.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ZoneVille } from './../../../shared/models/zone-ville';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: Agency;
  zoneSearch: Zone;
  zoneList: Array<Zone>
  responsableList: Array<User>
  responsableSearch: User
  descriptionSearch = '';
  codeList: Array<Agency> = [];
  cols: any[];
  agencyList: Array<Agency> = [];
  selectedAgencys: Array<Agency> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des Agences';
  agencyExportList: Array<Agency> = [];
  subscriptions = new Subscription();

  constructor(private agencyService: AgencyService,
    private zoneService: ZoneServcie,
    private responsableService: UserService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.className = Agency.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },
      { field: 'zone', child: 'code', header: 'Zone', type: 'object' },
      { field: 'responsable', child: 'surname', header: 'Responsable', type: 'object' },

    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.agencyService.find(this.searchQuery).subscribe(
      data => {
        this.agencyExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.agencyExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.agencyExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.agencyService.find(this.searchQuery).subscribe(
      data => {
        this.agencyExportList = data;
        this.globalService.generatePdf(event, this.agencyExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.agencyService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.agencyService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.agencyList = data;

        this.spinner.hide();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

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
    if (this.codeSearch != null && this.codeSearch.code !== '') {
      buffer.append(`code~${this.codeSearch.code}`);
    }
    if (this.descriptionSearch != null && this.descriptionSearch !== '') {
      buffer.append(`description~${this.descriptionSearch}`);
    }
    if (this.zoneSearch != null && this.zoneSearch.code !== '') {
      buffer.append(`zone.code~${this.zoneSearch.code}`);
    }
    if (this.responsableSearch != null && this.responsableSearch.code !== '') {
      buffer.append(`responsable.surname~${this.responsableSearch.code}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onCodeSearch(event: any) {
    this.subscriptions.add(this.agencyService.find('code~' + event.query).subscribe(
      data => this.codeList = data
    ));
  }
  onZoneSearch(event: any) {
    this.subscriptions.add(this.zoneService.find('code~' + event.query).subscribe(
      data => this.zoneList = data
    ));
  }
  onResponsableSearch(event: any) {
    this.subscriptions.add(this.responsableService.find('surname~' + event.query).subscribe(
      data => this.responsableList = data
    ));
  }
  reset() {
    this.codeSearch = null;
    this.zoneSearch = null;
    this.responsableSearch = null;
    this.descriptionSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedAgencys = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedAgencys.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedAgencys.map(x => x.id);
          this.subscriptions.add(this.agencyService.deleteAllByIds(ids).subscribe(
            data => {
              //this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.messageService.add({ severity: 'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés' });

              this.loadData();
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

              // this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedAgencys.length < 1) {
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
