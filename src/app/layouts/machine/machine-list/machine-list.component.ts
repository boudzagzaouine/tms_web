import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { Transport } from './../../../shared/models/transport';
import { ContractType } from './../../../shared/models/contract-type';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { ContractTypeService } from './../../../shared/services/api/contract-type.service';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MachineService } from './../../../shared/services/api/machine.service';
import { Machine } from './../../../shared/models/machine';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Component, OnInit } from '@angular/core';
import { Patrimony } from './../../../shared/models/patrimony';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: Machine;
  desSearch: Machine;
  codeList: Array<Machine> = [];
  desList: Array<Machine> = [];
  refSearch: string;
  transportSearch: Transport;
  contratTypeSearch: ContractType;
  transportList: Array<Transport> = [];
  contratTypeList: Array<ContractType> = [];
  selectedMachines: Array<Machine> = [];
  maachineList: Array<Machine> = [];
  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  machineCodeList: Array<Patrimony> = [];
  machineDesList: Array<Machine> = [];
  machineExportList: Array<Machine> = [];
  titleList = 'Liste des Machines';
  subscriptions= new Subscription();

  items: MenuItem[];

  home: MenuItem;
  constructor(private machineService: MachineService,
    private contratTypeService: ContractTypeService,
    private patrimonyService : PatrimonyService,

    private globalService: GlobalService,
    private transportService: TransportServcie,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {

    this.items = [
      {label: 'Machine'},
      {label: 'Lister'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = Machine.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'ref', header: 'Référence', type: 'string' },
      { field: 'name', header: 'Désignation', type: 'string' },
      { field: 'resource', child: 'name', header: 'Machine Mére', type: 'object' },
      { field: 'consumptionType', child: 'code', header: 'Type de consommation', type: 'object' },
      { field: 'contractType', child: 'code', header: 'Type de contrat', type: 'object' },
      { field: 'aquisitionDate', header: 'Date aquisition', type: 'date' },
      { field: 'amount', header: 'Montant', type: 'number' },
      { field: 'transport', child: 'code', header: 'Transport', type: 'object' },


    ];

    this.subscriptions.add(this.contratTypeService.findAll().subscribe(
      data => {
        this.contratTypeList = data;
      }
    ));

    this.subscriptions.add(this.transportService.findAll().subscribe(
      data => {
        this.transportList = data;
      }
    ));
  }

  onExportExcel(event) {

    this.subscriptions.add(  this.machineService.find(this.searchQuery).subscribe(
      data => {
        this.machineExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.machineExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.machineExportList, this.className, this.titleList);

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
    this.subscriptions.add( this.machineService.find(this.searchQuery).subscribe(
      data => {
        this.machineExportList = data;
        this.globalService.generatePdf(event, this.machineExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.machineService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add( this.machineService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.maachineList = data;
        this.spinner.hide();
      },
      error => {
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
      buffer.append(`name~${this.codeSearch.name}`);
    }

    if (this.desSearch != null && this.desSearch.name !== '') {
      buffer.append(`name~${this.desSearch.name}`);
    }

    if (this.refSearch != null && this.refSearch !== '') {
      buffer.append(`ref~${this.refSearch}`);
    }

    if (this.transportSearch != null && this.transportSearch.code !== '') {
      buffer.append(`transport.code~${this.transportSearch.code}`);
    }

    if (this.contratTypeSearch != null && this.contratTypeSearch.code !== '') {
      buffer.append(`contractType.code~${this.contratTypeSearch.code}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onCodeSearch(event: any) {
    this.subscriptions.add( this.machineService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    ));
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedMachines = event.object;

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/machine/edit', this.selectedMachines[0].id]);
    }

  }

  reset() {
    this.codeSearch = null;
    this.transportSearch = null;
    this.contratTypeSearch = null;
    this.desSearch=null;
    this.refSearch=null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onMachineCodeSearch(event: any) {
    this.subscriptions.add(this.patrimonyService.find('code~' + event.query).subscribe(
      data => this.machineCodeList = data .filter(f=> f.patrimony_type=='machine'),
    ));
  }

  onMachineDesSearch(event: any) {
    this.subscriptions.add(this.machineService.find('name~' + event.query).subscribe(
      data => this.machineDesList = data ));
  }

  onDeleteAll() {

    if (this.selectedMachines.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer?',
        accept: () => {
          const ids = this.selectedMachines.map(x => x.id);
          this.subscriptions.add( this.machineService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedMachines.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
