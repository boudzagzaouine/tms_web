import { AccountService } from '../../../shared/services/api/account.service';
import { ContractAccountService } from '../../../shared/services/api/contract-account.service';
import { ContractAccount } from '../../../shared/models/contract-account';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../../shared/services/api/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EmsBuffer } from '../../../shared/utils/ems-buffer';
import { Account } from '../../../shared/models/account';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-account',
  templateUrl: './contract-account.component.html',
  styleUrls: ['./contract-account.component.css']
})
export class ContractAccountComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  nameSearch: string;

  selectContractAccounts: Array<ContractAccount> = [];
  contractAccountList: Array<ContractAccount> = [];
  codeContractaccountList: Array<Account> = [];
  nameAccountList: Array<Account> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  contractAccountExportList: Array<ContractAccount> = [];
  titleList = 'Liste des Contracts Client';
  subscriptions= new Subscription();
  items: MenuItem[];
  home: MenuItem;

  constructor(private accountService: AccountService,
    private contractAccountService: ContractAccountService,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Client' ,routerLink:'/core/settings/accounts'},

  ];
  this.home = {icon: 'pi pi-home'};

    this.className = ContractAccount.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'date', header: 'Date', type: 'date' },
      { field: 'account', child: 'name', header: 'Client', type: 'object' },
      { field: 'contractType', header: 'Type Contrat', type: 'string' },

      { field: 'vehicleCategory', child: 'code', header: 'Categorie vehicle', type: 'object' },
      { field: 'quantity', header: 'Quantite', type: 'number' },

      { field: 'senderAddress', child: 'city', header: 'Ville Expediteur', type: 'object' },
      { field: 'receiverAdresse', child: 'city', header: 'Ville Destinataire', type: 'object' },

      { field: 'startDate', header: 'Date Debut', type: 'date' },
      { field: 'endDate', header: 'Date Fin', type: 'date' },

      { field: 'packageType', header: 'Type de embalage', type: 'string' },
      { field: 'priceHT', header: 'Prix', type: 'string' },



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
    this.subscriptions.add(this.contractAccountService.findPagination(this.page, this.size, this.searchQuery).subscribe(
      data => {
        this.contractAccountList = data;
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
    this.subscriptions.add(this.contractAccountService.find('code~' + event.query).subscribe(
      data => this.codeContractaccountList = data.map(f => f.code)
    ));
  }
  onNameSearch(event: any) {
    this.subscriptions.add(this.accountService.find('name~' + event.query).subscribe(
      data => this.nameAccountList = data.map(f => f.name)
    ));
  }

  onExportExcel(event) {

    this.subscriptions.add(this.accountService.find(this.searchQuery).subscribe(
      data => {
        this.contractAccountExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.contractAccountExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.contractAccountExportList, this.className, this.titleList);

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
        this.contractAccountExportList = data;
        this.globalService.generatePdf(event, this.contractAccountExportList, this.className, this.titleList);
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
      buffer.append(`account.name~${this.nameSearch}`);
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
    this.selectContractAccounts = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectContractAccounts.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer?',
        accept: () => {
          const ids = this.selectContractAccounts.map(x => x.id);
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
    } else if (this.selectContractAccounts.length < 1) {
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
