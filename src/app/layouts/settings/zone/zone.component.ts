import { GlobalService } from './../../../shared/services/api/global.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ZoneServcie } from './../../../shared/services/api/zone.service';
import { Zone } from './../../../shared/models/Zone';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  nameSearch: Zone;
  descriptionSearch = '';
  nameList: Array<Zone> = [];
  cols: any[];
  zoneList: Array<Zone> = [];
  selectedZones: Array<Zone> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  zoneExportList: Array<Zone> = [];
  titleList = 'Liste des zones';
  subscriptions= new Subscription();

  constructor(private zoneService: ZoneServcie,
    private spinner: NgxSpinnerService,
    private globalService :GlobalService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = Zone.name;
    this.cols = [
      { field: 'code', header: 'Code' , type:'string'},
      { field: 'description', header: 'Description' ,type:'string'},


    ];

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add( this.zoneService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.zoneService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.zoneList = data;

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


  onExportExcel(event) {

    this.subscriptions.add(this.zoneService.find(this.searchQuery).subscribe(
      data => {
        this.zoneExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.zoneExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.zoneExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdfGlobal(event) {
    this.subscriptions.add(this.zoneService.find(this.searchQuery).subscribe(
      data => {
        this.zoneExportList = data;
        this.globalService.generatePdf(event, this.zoneExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }



  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.nameSearch != null && this.nameSearch.code !== '') {
      buffer.append(`code~${this.nameSearch.code}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onNameSearch(event: any) {
    this.subscriptions.add(this.zoneService.find('code~' + event.query).subscribe(
      data => this.nameList = data
    ));
  }
  reset() {
    this.nameSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedZones = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedZones.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedZones.map(x => x.id);
          this.subscriptions.add(this.zoneService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedZones.length < 1) {
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
