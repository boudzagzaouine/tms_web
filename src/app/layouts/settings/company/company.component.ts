import { Router } from '@angular/router';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { CompanyService } from './../../../shared/services/api/company.service';
import { Subscription } from 'rxjs';
import { Company } from './../../../shared/models/company';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  nameSearch: string;

  descriptionSearch = '';
  codeList: Array<Company> = [];
  nameList: Array<Company> = [];

  cols: any[];
  companyList: Array<Company> = [];
  selectedCompanys: Array<Company> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des Sociétés';
  companyExportList: Array<Company> = [];
  subscriptions= new Subscription();

  constructor(private companyService: CompanyService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.className = Company.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'name', header: 'Nom', type: 'string' },
      { field: 'activityArea', header: "Secteur d'activité", type: 'string' },


      { field: 'address',  child:'name', header: 'Nom Adress', type: 'object' },
      { field: 'address',child:'line1',    header: "Premiére Ligne d'adresse Facturation", type: 'object' },
      { field: 'address',child:'line2',   header: "Deuxiéme Ligne d'adresse Facturation", type: 'object' },
      { field: 'address',child:'zip',    header: 'Code Postal Facturation', type: 'object' },
      { field: 'address',child:'city',    header: 'Pays de Facturation', type: 'object' },
      { field: 'address',child:'country', header: 'Ville de Facturation', type: 'object' },

      { field: 'tradeRegister', header: 'Registre du Commerce', type: 'string' },
      { field: 'professionalTax', header: "Tax Professionnelle", type: 'string' },
      { field: 'fiscalIdentifier', header: 'IF', type: 'string' },
      { field: 'cnssNumber', header: "CNSS", type: 'string' },
      { field: 'fiscalIdentifier', header: "Classification Fiscale", type: 'string' },








    ];

    this.loadData();

  }
  onExportExcel(event) {

    this.subscriptions.add(this.companyService.find(this.searchQuery).subscribe(
      data => {
        this.companyExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.companyExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.companyExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.companyService.find(this.searchQuery).subscribe(
      data => {
        this.companyExportList = data;
        this.globalService.generatePdf(event, this.companyExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.companyService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.companyService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.companyList = data;

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
      buffer.append(`code~${this.codeSearch}`);
    }

    if (this.nameSearch != null && this.nameSearch !== '') {
      buffer.append(`name~${this.nameSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onCodeSearch(event: any) {
    this.subscriptions.add(this.companyService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    ));
  }

  onNameSearch(event: any) {
    this.subscriptions.add(this.companyService.find('name~' + event.query).subscribe(
      data => this.nameList = data.map(f => f.name)
    ));
  }
  reset() {
    this.codeSearch = null;
    this.descriptionSearch = null;
    this.nameSearch=null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedCompanys = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else if(this.editMode ===1) {
      console.log(  this.selectedCompanys);
    this.router.navigate(['/core/settings/company-edit']);

     // this.showDialog = true;
    }else if(this.editMode ===2) {
      this.router.navigate(['/core/settings/company-edit',  this.selectedCompanys[0].id]);

    }

  }

  onDeleteAll() {

    if (this.selectedCompanys.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedCompanys.map(x => x.id);
          this.subscriptions.add(this.companyService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedCompanys.length < 1) {
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
