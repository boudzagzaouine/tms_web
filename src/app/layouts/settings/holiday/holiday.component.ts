import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Holiday } from './../../../shared/models/holiday';
import { HolidayService } from './../../../shared/services/api/account-holiday.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { EmsBuffer } from './../../../shared/utils';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectHolidays: Array<Holiday> = [];
  HolidayList: Array<Holiday> = [];

  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<Holiday> = [];


  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste jours Férier  ';
  HolidayExportList: Array<Holiday> = [];
  items: MenuItem[];
  home: MenuItem;
  constructor(
    private HolidayService: HolidayService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Jour férier' ,routerLink:'/core/settings/holiday'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = Holiday.name;
    this.cols = [
      {
        field: 'code',
        header: 'Code',
        type: 'string'
      },
      {
        field: 'description',
        header: 'Description',
        type: 'string'
      },

      {
        field: 'holidayDay',
        header: 'Jour',
        type: 'string'
      },
      {
        field: 'holidayMonth',
        header: 'Mois',
        type: 'string'
      }
    ];

    this.loadData();


  }

  loadData() {

    this.spinner.show();
    this.HolidayService
      .sizeSearch(this.searchQuery)
      .subscribe(data => {
        this.collectionSize = data;
      });
    this.HolidayService
      .findPagination(this.page, this.size, this.searchQuery)
      .subscribe(
        data => {
          this.HolidayList = data;
          console.log(data);

          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

         // this.toastr.error(error.err.message + 'Erreur de connexion');
        },
        () => this.spinner.hide()
      );
  }
  loadDataLazy(event) {
    this.page = event.first / this.size;
    this.loadData();
  }

  onCodeSearch(event: any) {
  this.HolidayService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    )
  }
  onExportExcel(event) {
    this.HolidayService.find(this.searchQuery).subscribe(
      data => {
        this.HolidayExportList = data;
        if (event != null) {
          this.globalService.generateExcel(
            event,
            this.HolidayExportList,
            this.className,
            this.titleList
          );
        } else {
          this.globalService.generateExcel(
            this.cols,
            this.HolidayExportList,
            this.className,
            this.titleList
          );
        }
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  onExportPdf(event) {
    this.HolidayService.find(this.searchQuery).subscribe(
      data => {
        this.HolidayExportList = data;
        this.globalService.generatePdf(
          event,
          this.HolidayExportList,
          this.className,
          this.titleList
        );
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }



  reset() {

    this.page = 0;
    this.searchQuery = '';
    this.codeSearch = '';
    this.descriptionSearch = '';
    this.loadData();
  }

  onObjectEdited(event) {
    this.editMode = event.operationMode;
    this.selectHolidays = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }
  }



  onDeleteAll() {
    if (this.selectHolidays.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer ?',
        accept: () => {
          const ids = this.selectHolidays.map(x => x.id);
          this.HolidayService.deleteAllByIds(ids).subscribe(
            data => {
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

              // this.toastr.success(
              //   'Elément Supprimer avec Succés',
              //   'Suppression'
              // );
              this.loadData();
            },
            error => {
              this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

              //this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          );
        }
      });
    } else if (this.selectHolidays.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

}
