import { CompanyService } from './../../../shared/services/api/company.service';
import { Company } from './../../../shared/models/company';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Account } from './../../../shared/models';
import { AccountService } from './../../../shared/services/api/account.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { EmsBuffer } from './../../../shared/utils';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  nameSearch: string;
  companySearch:string;

  selectAccounts: Array<Account> = [];
  accountList: Array<Account> = [];
  codeaccountList: Array<Account> = [];
  nameAccountList: Array<Account> = [];
  companyList:Array<Company>=[];
  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  accountExportList: Array<Account> = [];
  titleList = 'Liste des Comptes';
  subscriptions= new Subscription();
  items: MenuItem[];
  home: MenuItem;

  constructor(private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private companyService : CompanyService,
    private router: Router) { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Client' ,routerLink:'/core/settings/accounts'},

  ];
  this.home = {icon: 'pi pi-home'};

    this.className = Account.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'name', header: 'Nom', type: 'string' },
      { field: 'telephone', header: 'Telephone', type: 'string' },
    { field: 'company', child: 'name', header: 'Société', type: 'object' },
    { field: 'deliveryDate', header: 'heure preferentielle de livraison', type: 'time' },

     // { field: 'contact', child: 'name', header: 'Nom', type: 'object' },
    //   { field: 'contact', child: 'tel1', header: 'Telephone 1', type: 'object' },
    //    { field: 'contact', child: 'email', header: 'Email', type: 'object' },
    //   { field: 'deliveryAddress', child: 'line1', header: 'Addresse 1', type: 'object' },
    //  { field: 'deliveryAddress', child: 'line2', header: 'Addresse 2', type: 'object' },
    //  { field: 'deliveryAddress', child: 'zip', header: 'Code postale', type: 'object' },
    //  { field: 'deliveryAddress', child: 'city', header: 'Ville', type: 'object' },
    //  { field: 'deliveryAddress', child: 'country', header: 'Pays', type: 'object' },

    ];


    this.loadData();

  }

  loadData() {


    this.spinner.show();
    this.subscriptions.add(this.accountService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;


      }
    ));
    this.subscriptions.add(this.accountService.findPagination(this.page, this.size, this.searchQuery).subscribe(
      data => {
        this.accountList = data;
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
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData();
  }
  onCodeSearch(event: any) {
    this.subscriptions.add(this.accountService.find('code~' + event.query).subscribe(
      data => this.codeaccountList = data.map(f => f.code)
    ));
  }
  onNameSearch(event: any) {
    this.subscriptions.add(this.accountService.find('name~' + event.query).subscribe(
      data => this.nameAccountList = data.map(f => f.name)
    ));
  }
  onCompanySearch(event:any){
    this.subscriptions.add(this.companyService.find('name~' + event.query).subscribe(
      data => this.companyList = data.map(f => f.name)
    ));
  }

  onExportExcel(event) {

    this.subscriptions.add(this.accountService.find(this.searchQuery).subscribe(
      data => {
        this.accountExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.accountExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.accountExportList, this.className, this.titleList);

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
    this.subscriptions.add( this.accountService.find(this.searchQuery).subscribe(
      data => {
        this.accountExportList = data;
        this.globalService.generatePdf(event, this.accountExportList, this.className, this.titleList);
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
    if (this.companySearch != null && this.companySearch !== '') {
      buffer.append(`company.name~${this.companySearch}`);
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
    this.companySearch='';

    this.loadData();
  }


  onTanrsportAdd(event) {
    this.loadData();
  }

  onObjectEdited(event) {
    console.log("edit mode ");

console.log(event.operationMode);

    this.editMode = event.operationMode;
    this.selectAccounts = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else if(this.editMode ===1) {
      console.log(  this.selectAccounts);
    this.router.navigate(['/core/settings/account-edit']);

     // this.showDialog = true;
    }else if(this.editMode ===2) {
      this.router.navigate(['/core/settings/account-edit',  this.selectAccounts[0].id]);

    }

  }

  onDeleteAll() {

    if (this.selectAccounts.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer?',
        accept: () => {
          const ids = this.selectAccounts.map(x => x.id);
          this.subscriptions.add(this.accountService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectAccounts.length < 1) {
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
