import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AlimentationPump } from './../../shared/models/alimentation-pump';
import { FuelPump } from './../../shared/models/fuel-pump';
import { AlimentationPumpService } from './../../shared/services/api/alimentation-pump.service';
import { FuelPumpService } from './../../shared/services/api/fuel-pump.service';
import { GlobalService } from './../../shared/services/api/global.service';
import { EmsBuffer } from './../../shared/utils';

@Component({
  selector: 'app-alimentation-pumps',
  templateUrl: './alimentation-pumps.component.html',
  styleUrls: ['./alimentation-pumps.component.css']
})
export class AlimentationPumpsComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  fuelPumpSearch: FuelPump;
  dateSearch :Date;
  fuelPumpCodeList: Array<FuelPump> = [];
  descriptionSearch = '';
  codeList: Array<AlimentationPump> = [];
  cols: any[];
  alimentationPumpList: Array<AlimentationPump> = [];
  selectedAlimentationPumps: Array<AlimentationPump> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste Alimentation pompes';
  alimentationPumpExportList: Array<AlimentationPump> = [];
  subscriptions= new Subscription ();
  items: MenuItem[];
    
  home: MenuItem;
  constructor(private alimentationPumpService: AlimentationPumpService,
    private fuelPumpService : FuelPumpService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.items = [
      {label: 'AlimentationPump'},
      {label: 'Lister'},
   
  ];
  
  this.home = {icon: 'pi pi-home'};

   
    this.className = AlimentationPump.name;
    this.cols = [
    
      
      {
        field: 'fuelPump',child: 'code',   header: 'pompe à carburant',    type: 'object'
      },
      
      {
        field: 'quantity',   header: 'Quantité',    type: 'number'
      },
      {
        field: 'dateAlimentation',   header: 'Date Alimentation',type: 'date'
      },

    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add( this.alimentationPumpService.find(this.searchQuery).subscribe(
      data => {
        this.alimentationPumpExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.alimentationPumpExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.alimentationPumpExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.alimentationPumpService.find(this.searchQuery).subscribe(
      data => {
        this.alimentationPumpExportList = data;
        this.globalService.generatePdf(event, this.alimentationPumpExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.alimentationPumpService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add( this.alimentationPumpService.findPagination(this.page, this.size, search).subscribe(
      data => {


        this.alimentationPumpList = data;
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
    if (this.fuelPumpSearch != null && this.fuelPumpSearch.code !== '') {
      buffer.append(`fuelPump.pump.code~${this.fuelPumpSearch.code}`);
    }
   
    
    if (this.dateSearch != null) {
      console.log(this.dateSearch);

      buffer.append('receptionDate>'+ this.dateSearch.toISOString());
    }

  
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }

  onCodeSearch(event: any) {
    this.subscriptions.add( this.alimentationPumpService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    ));
  }
  
  reset() {
    this.fuelPumpSearch = null;

 this.dateSearch=null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedAlimentationPumps = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedAlimentationPumps.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedAlimentationPumps.map(x => x.id);
          this.subscriptions.add(this.alimentationPumpService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedAlimentationPumps.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }


  onFuelPumpCodeSearch(event: any) {
    this.subscriptions.add( this.fuelPumpService.find('code~' + event.query).subscribe(
      data => this.fuelPumpCodeList = data ,
    ));
  }
 

  onShowDialog(event) {

    this.showDialog = event;

    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
