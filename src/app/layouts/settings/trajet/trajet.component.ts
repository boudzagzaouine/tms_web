import { TrajetService } from './../../../shared/services/api/trajet.service';
import { TurnType } from './../../../shared/models/turn-Type';
import { TurnTypeService } from './../../../shared/services/api/turn-type.service';
import { VehicleTrayService } from './../../../shared/services/api/vehicle-tray.service';
import { LoadingTypeService } from './../../../shared/services/api/loading-type.service';
import { LoadingType } from './../../../shared/models/loading-type';
import { VehicleTray } from './../../../shared/models/vehicle-tray';
import { Trajet } from './../../../shared/models/trajet';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { VilleService } from './../../../shared/services/api/ville.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Ville } from './../../../shared/models/ville';
import { Transport } from './../../../shared/models/transport';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trajet',
  templateUrl: './trajet.component.html',
  styleUrls: ['./trajet.component.scss']
})
export class TrajetComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectTrajets: Array<Trajet> = [];
  searchQuery = '';
  codeSearch: string;
  codeList: Array<Trajet> = [];


  TrajetList: Array<Trajet> = [];

  villeSourceSearch: Ville;
  villeDestinationSearch: Ville;
  villeSourceList: Array<Ville> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste de Trajets';
  TrajetExportList: Array<Trajet> = [];
  items: MenuItem[];
  home: MenuItem;

  constructor(
    private trajetService: TrajetService,
    private villeService: VilleService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {

    this.load();
    this.items = [
      {label: 'Paramétrage'},
      {label: 'Trajet' ,routerLink:'/core/settings/trajet'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = Trajet.name;
    this.cols = [


      {
        field: 'code',
        header: 'Code',
        type: 'string'
      },
      {
        field: 'paysSource',
        child: 'code',
        header: 'Pays Source',
        type: 'object'
      },
      {
        field: 'villeSource',
        child: 'code',
        header: 'Ville Source',
        type: 'object'
      },

      {
        field: 'paysDestination',
        child: 'code',
        header: 'Pays Destination',
        type: 'object'
      },
      {
        field: 'villeDestination',
        child: 'code',
        header: 'Ville Destination',
        type: 'object'
      },

    ];

     this.loadData();


  }

  loadData() {


    this.spinner.show();
    this.trajetService
      .sizeSearch(this.searchQuery)
      .subscribe(data => {
        this.collectionSize = data;
      });
    this.trajetService
      .findPagination(this.page, this.size, this.searchQuery)
      .subscribe(
        data => {
          this.TrajetList = data;
          console.log(data);

          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

         // this.toastr.error(error.err.message + 'Erreur de connexion');
        },
        () => this.spinner.hide()
      );
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
        this.loadData();
  }
  onExportExcel(event) {
    this.trajetService.find(this.searchQuery).subscribe(
      data => {
        this.TrajetExportList = data;
        if (event != null) {
          this.globalService.generateExcel(
            event,
            this.TrajetExportList,
            this.className,
            this.titleList
          );
        } else {
          this.globalService.generateExcel(
            this.cols,
            this.TrajetExportList,
            this.className,
            this.titleList
          );
        }
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  onExportPdf(event) {
    this.trajetService.find(this.searchQuery).subscribe(
      data => {
        this.TrajetExportList = data;
        this.globalService.generatePdf(
          event,
          this.TrajetExportList,
          this.className,
          this.titleList
        );
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  onSearchClicked() {
    const buffer = new EmsBuffer();

    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }

    if (this.villeSourceSearch != null && this.villeSourceSearch.code !== '') {
      buffer.append(`villeSource.code~${this.villeSourceSearch.code}`);
    }
    if (
      this.villeDestinationSearch != null &&
      this.villeDestinationSearch.code !== ''
    ) {
      buffer.append(`villeDestination.code~${this.villeDestinationSearch.code}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }


  onCodeSearch(event: any) {
   this.trajetService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    );
  }
  onVilleSouceSearch(event: any) {
    this.villeService
      .find('code~' + event.query)
      .subscribe(data => (this.villeSourceList = data));
  }

  reset() {
    this.villeSourceSearch = null;
    this.villeDestinationSearch = null;
    this.codeSearch = null;


    this.page = 0;
    this.searchQuery='';

    this.loadData();
  }

  onObjectEdited(event) {
    this.editMode = event.operationMode;
    this.selectTrajets = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }
  }

  onDeleteAll() {
    if (this.selectTrajets.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer ?',
        accept: () => {
          const ids = this.selectTrajets.map(x => x.id);
          this.trajetService.deleteAllByIds(ids).subscribe(
            data => {
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

              // this.toastr.success(
              //   'Elément Supprimer avec Succés',
              //   'Suppression'
              // );

              this.loadData();
            },
            error => {
              this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

              //this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          );
        }
      });
    } else if (this.selectTrajets.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  load(){



    this.villeService.findAll().subscribe(data => {
      this.villeSourceList = data;
    });
  }

  onShowDialog(event) {
    this.showDialog = event;

    this.loadData();
  }

}
