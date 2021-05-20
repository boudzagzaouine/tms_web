import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Product } from './../../../shared/models';
import { FuelPump } from './../../../shared/models/fuel-pump';
import { Pump } from './../../../shared/models/pump';
import { FuelPumpService } from './../../../shared/services/api/fuel-pump.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { ProductService } from './../../../shared/services/api/product.service';
import { PumpService } from './../../../shared/services/api/pump.service';
import { EmsBuffer } from './../../../shared/utils';

@Component({
  selector: 'app-fuel-pumps',
  templateUrl: './fuel-pumps.component.html',
  styleUrls: ['./fuel-pumps.component.css']
})
export class FuelPumpsComponent implements OnInit {

 page = 0;
  size = 10;
  collectionSize: number;
  productSearch: Product;
  pumpSearch: Pump;
  searchQuery = '';
  codeSearch: string;
  selectFuelPumps: Array<FuelPump> = [];
  fuelPumpList: Array<FuelPump> = [];
  pumpList: Array<Pump> = [];
  productList: Array<Product> = [];
  cols: any[];
  colsPdf: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  fuelPumpExportList: Array<FuelPump> = [];
  titleList= 'Liste Station des pompes';
  subscriptions= new Subscription();
  items: MenuItem[];
  home: MenuItem;

  constructor(private fuelPumpService: FuelPumpService,
    private pumpService: PumpService,
    private productService: ProductService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.items = [
      {label: 'Paramétrage'},
      {label: 'Station de pompe' ,routerLink:'/core/settings/fuel-pumps'},
  
  ];
  
  this.home = {icon: 'pi pi-home'};

    this.className = FuelPump.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'product', child: 'code', header: 'Produit', type: 'object' },
      { field: 'pump', child: 'code', header: 'Pompe', type: 'object' },
      { field: 'quantity', header: 'Quantité', type: 'string' },

    ];

    this.loadData();

    this.subscriptions.add( this.pumpService.findAll().subscribe(
      data => {
        this.pumpList = data;
      }
    ));

    this.subscriptions.add( this.productService.findAll().subscribe(
      data => {
        this.productList = data;
      }
    ));

  }

  onExportExcel(event) {

    this.subscriptions.add(this.fuelPumpService.find(this.searchQuery).subscribe(
      data => {
        this.fuelPumpExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.fuelPumpExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.fuelPumpExportList, this.className, this.titleList);

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
    this.subscriptions.add(this.fuelPumpService.find(this.searchQuery).subscribe(
      data => {
        this.fuelPumpExportList = data;
        this.globalService.generatePdf(event, this.fuelPumpExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }

  loadData() {


    this.spinner.show();
    this.subscriptions.add( this.fuelPumpService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.fuelPumpService.findPagination(this.page, this.size, this.searchQuery).subscribe(
      data => {
        this.fuelPumpList = data;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.page = event.first / this.size;
    this.loadData();
  }

  onSearchClicked() {
console.log("search");

    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }

    if (this.pumpSearch != null && this.pumpSearch.code !== '') {


      console.log(this.pumpSearch.code);
      
      buffer.append(`pump.code~${this.pumpSearch.code}`);
    }
    if (this.productSearch != null && this.productSearch.code !== '') {
      console.log(this.productSearch.code);

      buffer.append(`product.code~${this.productSearch.code}`);
    }


    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();

  }

  reset() {
    this.productSearch = null;
    this.pumpSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }


  onTanrsportAdd(event) {
    this.loadData();
  }

  onObjectEdited(event) {
    this.editMode = event.operationMode;
    this.selectFuelPumps = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectFuelPumps.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer ? ',
        accept: () => {
          const ids = this.selectFuelPumps.map(x => x.id);
          this.subscriptions.add(this.fuelPumpService.deleteAllByIds(ids).subscribe(
            data => {
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

              //this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
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
    } else if (this.selectFuelPumps.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  onProductSearch(event: any) {
    this.productService.find('code~' + event.query).subscribe(
      data => this.productList = data
    );
  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
