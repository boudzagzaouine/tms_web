import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { ContactService } from './../../../shared/services/api/contact.service';
import { Subscription } from 'rxjs';
import { Contact } from './../../../shared/models/contact';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = 'delivery:true';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<Contact> = [];
  cols: any[];
  contactList: Array<Contact> = [];
  selectedContacts: Array<Contact> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des contacts';
  contactExportList: Array<Contact> = [];
  subscriptions= new Subscription();

  constructor(private contactService: ContactService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.className = Contact.name;
    this.cols = [
      { field: 'Nom', header: 'Name', type: 'string' },
      { field: 'tel1', header: 'Téléphone', type: 'string' },
      { field: 'contactFunction',child:'code' ,header: 'Fonction', type: 'object' },
      { field: 'address',child:'name' ,header: 'Adresse', type: 'object' },


    ];

    this.reset();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.contactService.find(this.searchQuery).subscribe(
      data => {
        this.contactExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.contactExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.contactExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.contactService.find(this.searchQuery).subscribe(
      data => {
        this.contactExportList = data;
        this.globalService.generatePdf(event, this.contactExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }
  loadData(search: string = '') {
    // if(search!=''){
    //   search +=',delivery:true';
    // }else{
    //   search +='delivery:true';
    // }

    this.spinner.show();
    this.subscriptions.add(this.contactService.sizeSearch(search).subscribe(
      data => {
        console.log(data);

        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.contactService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.contactList = data;

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
      buffer.append(`name~${this.codeSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onCodeSearch(event: any) {
    this.subscriptions.add(this.contactService.find('delivery:true,name~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.name)
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
    this.selectedContacts = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedContacts.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedContacts.map(x => x.id);
          this.subscriptions.add(this.contactService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedContacts.length < 1) {
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
