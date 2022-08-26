import { Router } from '@angular/router';
import { Planning } from './../../../shared/models/planning';
import { GlobalService } from './../../../shared/services/api/global.service';
import { SupplierService } from './../../../shared/services/api/supplier.service';
import { Supplier } from './../../../shared/models/supplier';
import { Component, OnInit } from '@angular/core';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmsBuffer } from '../../../shared/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {


  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  nameSearch: string;

  selectSuppliers: Array<Supplier> = [];
  suppplierList: Array<Supplier> = [];
  codesuppplierList: Array<Supplier> = [];
  nameSuppplierList: Array<Supplier> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  supplierExportList: Array<Supplier> = [];
  titleList = 'Liste des Fournisseurs';
  subscriptions= new Subscription();
  items: MenuItem[];
  home: MenuItem;

  constructor(private supplierService: SupplierService,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router:Router) { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Fournisseur' ,routerLink:'/core/settings/suppliers'},

  ];
  this.home = {icon: 'pi pi-home'};

    this.className = Supplier.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'contact', child: 'name', header: 'Nom', type: 'object' },
      { field: 'contact', child: 'tel1', header: 'Telephone 1', type: 'object' },
       { field: 'contact', child: 'email', header: 'Email', type: 'object' },
      { field: 'address', child: 'line1', header: 'Addresse 1', type: 'object' },
     { field: 'address', child: 'line2', header: 'Addresse 2', type: 'object' },
     { field: 'address', child: 'zip', header: 'Code postale', type: 'object' },
     { field: 'address', child: 'city', header: 'Ville', type: 'object' },
     { field: 'address', child: 'country', header: 'Pays', type: 'object' },


    ];


    this.loadData();

  }

  loadData() {
    this.spinner.show();
    this.subscriptions.add(this.supplierService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.supplierService.findPagination(this.page, this.size, this.searchQuery).subscribe(
      data => {
        this.suppplierList = data;
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
    this.subscriptions.add(this.supplierService.find('code~' + event.query).subscribe(
      data => this.codesuppplierList = data.map(f => f.code)
    ));
  }
  onNameSearch(event: any) {
    this.subscriptions.add(this.supplierService.find('contact.name~' + event.query).subscribe(
      data => this.nameSuppplierList = data.map(f => f.contact.name)
    ));
  }

  onExportExcel(event) {

    this.subscriptions.add(this.supplierService.find(this.searchQuery).subscribe(
      data => {
        this.supplierExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.supplierExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.supplierExportList, this.className, this.titleList);

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
    this.subscriptions.add( this.supplierService.find(this.searchQuery).subscribe(
      data => {
        this.supplierExportList = data;
        this.globalService.generatePdf(event, this.supplierExportList, this.className, this.titleList);
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
      buffer.append(`contact.name~${this.nameSearch}`);
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

    this.editMode = event.operationMode;
    this.selectSuppliers = event.object;
    console.log(  this.editMode);

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else if(this.editMode ===1) {
      console.log(  this.selectSuppliers);
    this.router.navigate(['/core/settings/supplier-edit']);

     // this.showDialog = true;
    }else if(this.editMode ===2) {
      this.router.navigate(['/core/settings/supplier-edit',  this.selectSuppliers[0].id]);

    }

  }

  onDeleteAll() {

    if (this.selectSuppliers.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer?',
        accept: () => {
          const ids = this.selectSuppliers.map(x => x.id);
          this.subscriptions.add(this.supplierService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectSuppliers.length < 1) {
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
