import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { UserService } from './../../../shared/services/api/user.service';
import { Subscription } from 'rxjs';
import { User } from './../../../shared/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  nameSearch: string;
  nameList: Array<User> = [];
  cols: any[];
  userList: Array<User> = [];
  selectedUsers: Array<User> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des Utilisateurs';
  userExportList: Array<User> = [];
  subscriptions= new Subscription();

  constructor(private userService: UserService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.className = User.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'name', header: 'Nom', type: 'string' },
      { field: 'surname', header: 'Prénom', type: 'string' },
      { field: 'email', header: 'Email', type: 'string' },
      { field: 'tel', header: 'Téléphone', type: 'string' },
      { field: 'userGroup',child:'code' ,header: 'Group', type: 'object' },


    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.userService.find(this.searchQuery).subscribe(
      data => {
        this.userExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.userExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.userExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.userService.find(this.searchQuery).subscribe(
      data => {
        this.userExportList = data;
        this.globalService.generatePdf(event, this.userExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.userService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.userService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.userList = data;

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
    if (this.nameSearch != null && this.nameSearch !== '') {
      buffer.append(`name~${this.nameSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onNameSearch(event: any) {
    this.subscriptions.add(this.userService.find('name~' + event.query).subscribe(
      data => this.nameList = data.map(f => f.name)
    ));
  }
  reset() {
    this.nameSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedUsers = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedUsers.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedUsers.map(x => x.id);
          this.subscriptions.add(this.userService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedUsers.length < 1) {
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
