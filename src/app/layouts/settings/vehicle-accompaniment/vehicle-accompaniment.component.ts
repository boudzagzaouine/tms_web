import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { VehicleAccompanimentService } from './../../../shared/services/api/vehicle-accompaniment.service';
import { Subscription } from 'rxjs';
import { VehicleAccompaniment } from './../../../shared/models/vehicle-accompaniment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-accompaniment',
  templateUrl: './vehicle-accompaniment.component.html',
  styleUrls: ['./vehicle-accompaniment.component.scss']
})
export class VehicleAccompanimentComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<VehicleAccompaniment> = [];
  cols: any[];
  vehicleAccompanimentList: Array<VehicleAccompaniment> = [];
  selectedVehicleAccompaniments: Array<VehicleAccompaniment> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des Moyen accompagnement';
  vehicleAccompanimentExportList: Array<VehicleAccompaniment> = [];
  subscriptions= new Subscription();

  constructor(private vehicleAccompanimentService: VehicleAccompanimentService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.className = VehicleAccompaniment.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },

    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.vehicleAccompanimentService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleAccompanimentExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.vehicleAccompanimentExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.vehicleAccompanimentExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.vehicleAccompanimentService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleAccompanimentExportList = data;
        this.globalService.generatePdf(event, this.vehicleAccompanimentExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.vehicleAccompanimentService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
   // this.searchQuery='description:null'
    this.subscriptions.add(this.vehicleAccompanimentService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.vehicleAccompanimentList = data;

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
    this.subscriptions.add(this.vehicleAccompanimentService.find('code~' + event.query).subscribe(
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
    this.selectedVehicleAccompaniments = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedVehicleAccompaniments.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedVehicleAccompaniments.map(x => x.id);
          this.subscriptions.add(this.vehicleAccompanimentService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedVehicleAccompaniments.length < 1) {
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
