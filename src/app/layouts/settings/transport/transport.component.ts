import { GlobalService } from './../../../shared/services/api/global.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Transport } from './../../../shared/models/transport';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  nameSearch: string;
  descriptionSearch = '';
  nameList: Array<Transport> = [];
  cols: any[];
  zoneList: Array<Transport> = [];
  selectedTransports: Array<Transport> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  transportExportList: Array<Transport> = [];
  titleList = 'List des Transports';
  constructor(private tranportService: TransportServcie,
    private spinner: NgxSpinnerService,
    private globalService : GlobalService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = Transport.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'name', header: 'Nom', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },
      { field: 'line1', header: 'Adrress 1', type: 'string' },
      { field: 'line2', header: 'Address 2', type: 'string' },
      { field: 'zip', header: 'Code Postale', type: 'string' },
      { field: 'city', header: 'Ville' },
      { field: 'address.country', header: 'Pays', type: 'string' },
    ];

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.tranportService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.tranportService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.zoneList = data;

        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  onExportExcel(event) {

    this.tranportService.find(this.searchQuery).subscribe(
      data => {
        this.transportExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.transportExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.transportExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }
  onExportPdfGlobal(event) {
    this.tranportService.find(this.searchQuery).subscribe(
      data => {
        this.transportExportList = data;
        this.globalService.generatePdf(event, this.transportExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }



  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.nameSearch != null && this.nameSearch !== '') {
      buffer.append(`name~${this.nameSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onNameSearch(event: any) {
    this.tranportService.find('name~' + event.query).subscribe(
      data => this.nameList = data.map(f => f.name)
    );
  }
  reset() {
    this.nameSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedTransports = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedTransports.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedTransports.map(x => x.id);
          this.tranportService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          );
        }
      });
    } else if (this.selectedTransports.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }


}
