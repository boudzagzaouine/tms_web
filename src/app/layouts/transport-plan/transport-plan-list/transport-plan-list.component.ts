import { TransportPlanHistory } from './../../../shared/models/transport-plan-history';
import { log } from 'console';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { TurnStatus } from './../../../shared/models/turn-status';
import { TurnStatusService } from './../../../shared/services/api/turn-status.service';
import { CompanyService } from './../../../shared/services/api/company.service';
import { Company } from './../../../shared/models/company';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from './../../../shared/services/api/global.service';
import { TransportPlanService } from './../../../shared/services/api/transport-plan.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TransportPlan } from './../../../shared/models/transport-plan';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Transport } from './../../../shared/models/transport';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-transport-plan-list',
  templateUrl: './transport-plan-list.component.html',
  styleUrls: ['./transport-plan-list.component.scss']
})
export class TransportPlanListComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: TransportPlan;
  categorySearch: VehicleCategory;
  categoryList:VehicleCategory[]=[];
  transportList:Transport[]=[];
  transportSearch:Transport;
  selectedTransportPlans: Array<TransportPlan> = [];
  transportPlanList: Array<TransportPlan> = [];
  companySearch:Company;
  turnStatusSearch: TurnStatus;
  turnStatusList:TurnStatus[]=[];
  companyList:Company[]=[];
  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  TransportPlanExportList: Array<TransportPlan> = [];
  titleList = 'Liste des Plans de Transport';
  subscriptions= new Subscription();
  selectTransportPlanHistory = new TransportPlanHistory();
  items: MenuItem[];
  showDialogReject:Boolean;
  home: MenuItem;
  fileUrl;

   dateLivraisonSearch: Date;
   dateDelivery: Date;
  constructor(private transportPlanService: TransportPlanService,
     private vehicleCategoryService :VehicleCategoryService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private transportService:TransportServcie,
    private companyService:CompanyService,
    private turnStatusService: TurnStatusService,
    private sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit() {

    this.items = [
      {label: 'TransportPlan'},
      {label: 'Lister'},

  ];

  this.home = {icon: 'pi pi-home'};

    this.className = TransportPlan.name;
    this.cols = [
      //{ field: 'code', header: 'Code', type: 'string' },
     // { field: 'date', header: 'Date', type: 'date' },

      { field: 'orderTransport', child: 'code', header: 'Ordre', type: 'object' },
       { field: 'account', child: 'name', header: 'Compte', type: 'object' },
       { field: 'dateDepart', header: 'Date', type: 'date' },

      { field: 'vehicleCategory', child: 'code', header: 'Catégorie', type: 'object' },
      { field: 'transport', child: 'name', header: 'Prestataire', type: 'object' },
      { field: 'turnStatus', child: 'code', header: 'Statut', type: 'object' },

    ];

this.turnStatusService.findAll().subscribe(
  data=> {
    this.turnStatusList=data;
  }
);

this.vehicleCategoryService.findAll().subscribe(
  data=> {
    this.categoryList=data;
  }
);
  }

  onExportExcel(event) {

    this.subscriptions.add(  this.transportPlanService.find(this.searchQuery).subscribe(
      data => {
        this.TransportPlanExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.TransportPlanExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.TransportPlanExportList, this.className, this.titleList);

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
    this.subscriptions.add( this.transportPlanService.find(this.searchQuery).subscribe(
      data => {
        this.TransportPlanExportList = data;
        this.globalService.generatePdf(event, this.TransportPlanExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.transportPlanService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add( this.transportPlanService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.transportPlanList = data;
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


  onTransportSearch(event){
    this.subscriptions.add(this.transportService.find('name~' + event.query).subscribe(
      data => this.transportList = data
    ));
  }

  onCompanySearch(event){
    this.subscriptions.add(this.companyService.find('name~' + event.query).subscribe(
      data => this.companyList = data
    ));
  }
  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.transportSearch != null && this.transportSearch !== undefined) {
      buffer.append(`transport.name~${this.transportSearch.name}`);
    }
    if (this.companySearch != null && this.companySearch !== undefined) {
      buffer.append(`orderTransport.company.name~${this.companySearch.name}`);
    }
    if (this.categorySearch != null && this.categorySearch !== undefined) {
      buffer.append(`vehicleCategory.code~${this.categorySearch.code}`);
    }
    if (this.turnStatusSearch != null && this.turnStatusSearch !== undefined) {
      buffer.append(`turnStatus.code~${this.turnStatusSearch.code}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }


  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedTransportPlans = event.object;
console.log(this.selectedTransportPlans);

    if (this.editMode === 3) {
      this.onDeleteAll();
    }else if(this.editMode === 4){
      this.generateExportInvoiceState();
    } else if(this.editMode === 5){
      this.confirmationService.confirm({
        message: 'Voulez-vous vraiment Annuler Plan Transport ?',
        accept: () => {
          this.selectTransportPlanHistory = new TransportPlanHistory();
          this.selectTransportPlanHistory.orderTransport =
            this.selectedTransportPlans[0].orderTransport;
            this.selectTransportPlanHistory.transportPlan=this.selectedTransportPlans[0];
          this.selectTransportPlanHistory.transport =
          this.selectedTransportPlans[0].transport;
          this.selectTransportPlanHistory.vehicleCategory =
          this.selectedTransportPlans[0].vehicleCategory;
          this.selectTransportPlanHistory.marginRate =
          this.selectedTransportPlans[0].marginRate;
          this.selectTransportPlanHistory.margineService =
          this.selectedTransportPlans[0].margineService;
          this.selectTransportPlanHistory.salePrice =
          this.selectedTransportPlans[0].salePrice;

          this.selectTransportPlanHistory.purchasePrice =
          this.selectedTransportPlans[0].purchasePrice;

            this.selectTransportPlanHistory.trajet =
            this.selectedTransportPlans[0]?.trajet;

          this.selectTransportPlanHistory.type = 3;
          this.showDialogReject = true;


        }
      });
    }else {
      console.log("modif");

      this.showDialog = true;
      this.router.navigate(['/core/transport-plan/edit/', this.selectedTransportPlans[0]?.id]);
    }

  }
  onShowDialog(event) {
    this.showDialogReject = event;
    this.loadData();
  }

  public downloadAsPDF() {
    console.log("ooo");

    // var data = document.getElementById('pdfTable');
    // html2canvas(data).then((canvas) => {
    //   // Few necessary setting options
    //   var imgWidth = 200;
    //   //var pageHeight = 1000;
    //   var imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   //var heightLeft = imgHeight;

    //   const contentDataURL = canvas.toDataURL('image/jpeg');
    //   let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    //   var position = 10;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //   pdf.save('aplllication.pdf'); // Generated PDF

    // });






    const htmlToPrint =
    '' +
    '<style type="text/css">' +
    '.pageFooter {' +
    '    display: table-footer-group;' +
    '    counter-increment: page;' +
    '}' +
    '.pageFooter:after {' +
    '   content: "Page " counter(page)' +
    '}' +
    '</style>';
  var printContents = document.getElementById('pdfTable').innerHTML;
  var popupWin = window.open(
    'Angular Large Table to pdf',
    '_blank',
    'width=768,height=auto'
  );

  popupWin.document.write(
    '<html><head>' +
      '<link rel="stylesheet" href="' +
      'https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"/>' +
      '<style type="text/css">' +
      '.thClass{'+
        'background: rgb(31, 96, 160);'+
        'color: white;'+
        'text-align: center;'+
       ' border-right: 4px white solid;'+

      '}'+
      '.pageFooter {' +
      '    display: table-footer-group;' +
      '    counter-increment: page;' +
      '}' +
      '.pageFooter:after {' +
      '   content: "Page " counter(page)' +
      '}' +
      '</style>' +
      '</head><body onload="window.print();window.close()">' +
      printContents +
      '</body></html>'
  );
  popupWin.document.close();

  }

  reset() {
    this.codeSearch = null;
   this.transportSearch=null;
   this.companySearch=null;
   this.turnStatusSearch=null;
   this.vehicleCategoryService=null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

generateExportInvoiceState(){
  const bufferSearch = new EmsBuffer();
 this.selectedTransportPlans.forEach(element => {
  bufferSearch.append(element.id.toString())
 });
 console.log(bufferSearch.getValue());


this.transportPlanService.exportInvoiceState(bufferSearch.getValue()).subscribe(
  (data : any) =>{
 console.log(data);
 var file = new Blob([data as  BlobPart], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          var a = document.createElement('a');
          a.href = fileURL;
          a.target = '_blank';
          a.download = 'reports.pdf';
          document.body.appendChild(a);
          a.click();

  }
);



}


  onDeleteAll() {

    if (this.selectedTransportPlans.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedTransportPlans.map(x => x.id);
          this.subscriptions.add( this.transportPlanService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedTransportPlans.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
