import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './../../../shared/services/api/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SinisterService } from './../../../shared/services/api/sinister.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Sinister } from './../../../shared/models/sinister';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sinister',
  templateUrl: './sinister.component.html',
  styleUrls: ['./sinister.component.css']
})
export class SinisterComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  nameSearch: string;

  selectSinisters: Array<Sinister> = [];
  sinisterList: Array<Sinister> = [];
  codesinisterList: Array<Sinister> = [];
  nameSinisterList: Array<Sinister> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  sinisterExportList: Array<Sinister> = [];
  titleList = 'Liste des Sinistres';
  subscriptions= new Subscription();
  items: MenuItem[];
  home: MenuItem;

  constructor(private sinisterService: SinisterService,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Sinistre' ,routerLink:'/core/settings/sinisters'},

  ];
  this.home = {icon: 'pi pi-home'};

    this.className = Sinister.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },
      { field: 'vehicle', child: 'code', header: 'Véhicule', type: 'object' },
      { field: 'driver', child: 'code', header: 'Chauffeur', type: 'object' },
      { field: 'supplier', child: 'contact',child2:"name", header: 'Assureur', type: 'object2' },
      { field: 'sinisterType', child: 'code', header: 'Véhicule', type: 'object' },
      { field: 'date', header: 'date', type: 'date' },
      { field: 'venue', header: 'Lieu', type: 'string' },
      { field: 'repayment', header: 'Remboursement', type: 'string' },

    ];


    this.loadData();

  }

  loadData() {


    this.spinner.show();
    this.subscriptions.add(this.sinisterService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;


      }
    ));
    this.subscriptions.add(this.sinisterService.findPagination(this.page, this.size, this.searchQuery).subscribe(
      data => {
        this.sinisterList = data;
        console.log(data);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        //this.toastr.error(error.err.message + 'Erreur de connexion');
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.page = event.first / this.size;
    this.loadData();
  }
  onCodeSearch(event: any) {
    this.subscriptions.add(this.sinisterService.find('code~' + event.query).subscribe(
      data => this.codesinisterList = data.map(f => f.code)
    ));
  }
  onNameSearch(event: any) {
    this.subscriptions.add(this.sinisterService.find('name~' + event.query).subscribe(
      data => this.nameSinisterList = data.map(f => f.name)
    ));
  }

  onExportExcel(event) {

    this.subscriptions.add(this.sinisterService.find(this.searchQuery).subscribe(
      data => {
        this.sinisterExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.sinisterExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.sinisterExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdf(event) {
    this.subscriptions.add( this.sinisterService.find(this.searchQuery).subscribe(
      data => {
        this.sinisterExportList = data;
        this.globalService.generatePdf(event, this.sinisterExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }


  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }
    if (this.nameSearch != null && this.nameSearch !== '') {
      buffer.append(`name~${this.nameSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();

  }



  reset() {

    this.page = 0;
    this.searchQuery = '';
    this.codeSearch='';
    this.nameSearch='';
    this.loadData();
  }


  onTanrsportAdd(event) {
    this.loadData();
  }

  onObjectEdited(event) {
    console.log("edit mode ");

console.log(event.operationMode);

    this.editMode = event.operationMode;
    this.selectSinisters = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else if(this.editMode ===1) {
      console.log(  this.selectSinisters);
    this.router.navigate(['/core/settings/sinister-edit']);

     // this.showDialog = true;
    }else if(this.editMode ===2) {
      this.router.navigate(['/core/settings/sinister-edit',  this.selectSinisters[0].id]);

    }

  }

  onDeleteAll() {

    if (this.selectSinisters.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer?',
        accept: () => {
          const ids = this.selectSinisters.map(x => x.id);
          this.subscriptions.add(this.sinisterService.deleteAllByIds(ids).subscribe(
            data => {
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

             // this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
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
    } else if (this.selectSinisters.length < 1) {
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
