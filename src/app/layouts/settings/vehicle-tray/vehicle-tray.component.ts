import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { VehicleTrayService } from './../../../shared/services/api/vehicle-tray.service';
import { Subscription } from 'rxjs';
import { VehicleTray } from './../../../shared/models/vehicle-tray';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-tray',
  templateUrl: './vehicle-tray.component.html',
  styleUrls: ['./vehicle-tray.component.scss']
})
export class VehicleTrayComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<VehicleTray> = [];
  cols: any[];
  vehicleTrayList: Array<VehicleTray> = [];
  selectedVehicleTrays: Array<VehicleTray> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des types de Remorques';
  vehicleTrayExportList: Array<VehicleTray> = [];
  subscriptions= new Subscription();

  constructor(private vehicleTrayService: VehicleTrayService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.className = VehicleTray.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },

    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.vehicleTrayService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleTrayExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.vehicleTrayExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.vehicleTrayExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.vehicleTrayService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleTrayExportList = data;
        this.globalService.generatePdf(event, this.vehicleTrayExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.vehicleTrayService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
   // this.searchQuery='description:null'
    this.subscriptions.add(this.vehicleTrayService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.vehicleTrayList = data;

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
    this.subscriptions.add(this.vehicleTrayService.find('code~' + event.query).subscribe(
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
    this.selectedVehicleTrays = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedVehicleTrays.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedVehicleTrays.map(x => x.id);
          this.subscriptions.add(this.vehicleTrayService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedVehicleTrays.length < 1) {
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
