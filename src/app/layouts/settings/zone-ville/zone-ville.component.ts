import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ZoneServcie } from '../../../shared/services/api/zone.service';
import { Ville } from './../../../shared/models/ville';
import { Zone } from './../../../shared/models/Zone';
import { ZoneVille } from './../../../shared/models/zone-ville';
import { GlobalService } from './../../../shared/services/api/global.service';
import { VilleService } from './../../../shared/services/api/ville.service';
import { ZoneVilleService } from './../../../shared/services/api/zone-ville.service';
import { EmsBuffer } from './../../../shared/utils';

@Component({
  selector: 'app-zone-ville',
  templateUrl: './zone-ville.component.html',
  styleUrls: ['./zone-ville.component.css']
})
export class ZoneVilleComponent implements OnInit {
  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  zoneSearch: Zone;
  villeSearch: Ville;

  descriptionSearch = '';
  zoneList: Array<Zone> = [];
  villeList: Array<Ville> = [];
  cols: any[];
  zoneVilleList: Array<ZoneVille> = [];
  selectedZoneVilles: Array<ZoneVille> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  zoneVilleExportList: Array<ZoneVille> = [];
  titleList = 'Liste des zone-ville';
  subscriptions = new Subscription();
  items: MenuItem[];
  home: MenuItem;
  constructor(private zoneService: ZoneServcie,

    private zoneVilleService: ZoneVilleService,
    private villeService: VilleService,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.items = [
      { label: 'Paramétrage' },
      { label: 'ZoneVille', routerLink: '/core/settings/zone-ville' },
    ];
    this.home = { icon: 'pi pi-home' };


    this.className = ZoneVille.name;
    this.cols = [
      { field: 'zone', child: 'code', header: 'Zone', type: 'object' },
      { field: 'ville', child: 'code', header: 'Ville', type: 'object' },


    ];

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.zoneVilleService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.zoneVilleService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.zoneVilleList = data;


        this.spinner.hide();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

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

    this.subscriptions.add(this.zoneVilleService.find(this.searchQuery).subscribe(
      data => {
        this.zoneVilleExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.zoneVilleExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.zoneVilleExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdfGlobal(event) {
    this.subscriptions.add(this.zoneVilleService.find(this.searchQuery).subscribe(
      data => {
        this.zoneVilleExportList = data;
        this.globalService.generatePdf(event, this.zoneVilleExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }



  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.zoneSearch != null && this.zoneSearch.code !== '') {
      buffer.append(`zone.code~${this.zoneSearch.code}`);
    }
    if (this.villeSearch != null && this.villeSearch.code !== '') {
      buffer.append(`ville.code~${this.villeSearch.code}`);
     // console.log("villesearch :" +this.villeSearch.code);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onZoneSearch(event: any) {
    this.subscriptions.add(this.zoneService.find('code~' + event.query).subscribe(
      data => this.zoneList = data
    ));
  }
  onVilleSearch(event: any) {
    this.subscriptions.add(this.villeService.find('code~' + event.query).subscribe(
      data => {
        this.villeList = data
        console.log('ville : '+data[0].code);
      }
    )
    );
  }
  reset() {
    this.zoneSearch = null;
    this.villeSearch = null
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedZoneVilles = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedZoneVilles.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer?',
        accept: () => {
          const ids = this.selectedZoneVilles.map(x => x.id);
          this.subscriptions.add(this.zoneVilleService.deleteAllByIds(ids).subscribe(
            data => {
              this.messageService.add({ severity: 'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés' });
              //this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });
              // this.toastr.error(error.error.message, 'Erreur');
            }, () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedZoneVilles.length < 1) {
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
