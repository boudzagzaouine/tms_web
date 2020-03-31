import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { SaleOrderLine } from './../../../shared/models/sale-order-line';
import { SaleOrder } from './../../../shared/models/sale-order';
import { SaleOrderService } from './../../../shared/services/api/sale-order.service';
import { AccountService } from './../../../shared/services/api/account.service';
import { TurnService } from './../../../shared/services/api/turn.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SaleOrderStockService } from './../../../shared/services/api/sale-order-stock.service';
import { SaleOrderStock } from './../../../shared/models/sale-order-stock';
import { DriverService } from './../../../shared/services/api/driver.service';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Turn } from './../../../shared/models/turn';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { MenuItem } from 'primeng/api';
import { Component, OnInit, EventEmitter, Output, OnChanges, DoCheck } from '@angular/core';
@Component({
  selector: 'app-turn-edit',
  templateUrl: './turn-edit.component.html',
  styleUrls: ['./turn-edit.component.css']
})
export class TurnEditComponent implements OnInit, DoCheck {
  activeIndex: number = 0;
  items: MenuItem[];

  codeSearch: string;
  accountSearch: Account;
  accountList: Account[] = [];


  saleOrders: Array<any> = [];
  saleOrdersLoading: SaleOrder[] = [];
  saleOrderLines: SaleOrderLine[] = [];
  saleOrdersStock: SaleOrderStock[] = [];
  saleOrdersStockcopy: SaleOrderStock[] = [];

  vehicleCatList: VehicleCategory[] = [];
  transportList: Array<any> = [];
  vehicleList: Array<any> = [];
  driverList: Array<any> = [];
  turnAdded: Turn = new Turn();

  searchQuery = '';


  turnForm: FormGroup;
  catVehiculeQnt: boolean = false;
  totalqntV: number = 0;
  totalQnt: number = 0;
  constructor(
    private saleOrderService: SaleOrderService,
    private vehicleCategoryService: VehicleCategoryService,
    private transportService: TransportServcie,
    private vehicleService: VehicleService,
    private driverService: DriverService,
    private saleOrderStockService: SaleOrderStockService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private tunrService: TurnService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.initForm();

    this.vehicleCategoryService.findAll().subscribe(data => {
      this.vehicleCatList = data;
    });

    this.transportService.findAll().subscribe(data => {
      this.transportList = data;
    });

    this.driverService.findAll().subscribe(data => {
      this.driverList = data;
    });

    // this.accountService.findAll().subscribe(data => {
    //   this.accountList = data;
    // });
    this.items = [
      {
        label: 'Livraison'
      },
      {
        label: '...........'
      },
      {
        label: '.........'
      }
    ];

   // this.loaddata();
  }

  ngDoCheck() {

    this.totalQnt = 0;
    if (this.saleOrdersLoading.length > 0) {
      for (let i = 0; i < this.saleOrdersLoading.length; i++) {
        for (let j = 0; j < this.saleOrdersLoading[i].lines.length; j++) {
          if (this.saleOrdersLoading[i].orderStatus.code === 'préparer') {
            this.totalQnt += (this.saleOrdersLoading[i].lines[j].quantityPrepare * this.saleOrdersLoading[i].lines[j].productPack.weight);
          } else if (this.saleOrdersLoading[i].orderStatus.code === 'En attente') {
            this.totalQnt += (this.saleOrdersLoading[i].lines[j].quantity * this.saleOrdersLoading[i].lines[j].productPack.weight);
          } else if (this.saleOrdersLoading[i].orderStatus.code === 'En cours') {
            this.totalQnt += (this.saleOrdersLoading[i].lines[j].quantityReserved * this.saleOrdersLoading[i].lines[j].productPack.weight);
          }

        }
      }
    }
  }
  initForm() {
    this.turnForm = new FormGroup({
      fDateLivraison: new FormControl(
        this.turnAdded.dateDelivery,
        Validators.required
      ),
      fVehicule: new FormControl(this.turnAdded.vehicle, Validators.required),
      fTransport: new FormControl(
        this.turnAdded.transport,
        Validators.required
      ),
      fDrivers: new FormControl(this.turnAdded.drivers, Validators.required),
      fTypeVehicule: new FormControl('', Validators.required)
    });
  }

  onSubmit() {

    this.prepareSaleOrderStock();

    this.insertSaleOrderStock();
    console.log('turn stock');
    console.log(this.turnAdded.saleOrderStocks);


  }


  loadData() {

    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();

    this.saleOrderService.find(this.searchQuery).subscribe(
      data => {
        console.log(data);
        this.saleOrders = data;
        this.saleOrders=this.saleOrders.filter(s => (s.orderStatus.code === 'préparer'
          || s.orderStatus.code === 'En attente' ||
          s.orderStatus.code === 'En cours'));
        this.spinner.hide();
      },
      error => { this.spinner.hide() },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {

    this.loadData();
  }

  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }


    this.searchQuery = buffer.getValue();
    this.loadData();

  }
  reset() {
    this.codeSearch = '';
    this.searchQuery = '';
    this.saleOrders=null;
  }



  prepareSaleOrderStock() {
    // const formValue = this.turnForm.value;

    // this.turnAdded.vehicle = formValue['fVehicule'];
    // this.turnAdded.dateDelivery = formValue['fDateLivraison'];
    // this.turnAdded.transport = formValue['fTransport'];
    // this.turnAdded.drivers = formValue['fDrivers'];

    // this.saleOrdersLoading.forEach(value => {
    //   value.lines.forEach(valueLine => {
    //     this.saleOrdersStock.push(
    //       new SaleOrderStock(
    //         valueLine.delivery,
    //         valueLine.product,
    //         valueLine.owner,
    //         valueLine.dlc,
    //         valueLine.productPack,
    //         valueLine.uom,
    //         valueLine.orderedQuantity,
    //         valueLine,
    //         valueLine.warehouse

    //       )
    //     );
    //   });
    //   console.log('chargement sale order stock');
    //   console.log(this.saleOrdersStock);
    // });
  }
  insertSaleOrderStock() {

    this.saleOrderStockService.saveAll(this.saleOrdersStock).subscribe(
      data => {
        this.turnAdded.saleOrderStocks = data;
        this.toastr.success('Elément est Enregistré Avec Succès SOS', 'Edition');
        this.saveTurn();
      },
      error => {
        this.toastr.error(error.error.message);
        console.log('error sos');
        console.log(error);
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  saveTurn() {
    this.tunrService.set(this.turnAdded).subscribe(
      data => {
        this.toastr.success('Elément est Enregistré Avec Succès TURN', 'Edition');
      },
      error => {
        this.toastr.error(error.error.message);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );
    console.log('final turn');
    console.log(this.turnAdded);
  }






  onSelectChangeCatVehicle(event) {
    let codeCat = event.value;
    let sum: number = 0;

    this.vehicleService
      .find('vehicleCategory.code~' + codeCat.code)
      .subscribe(data => {
        this.vehicleList = data;
      });
    this.totalqntV = codeCat.tonnage;
    if (this.totalQnt > codeCat.tonnage) {

      this.catVehiculeQnt = true;
    }
    else {
      this.catVehiculeQnt = false;
    }



  }

  loaddata() {
    this.saleOrderService
      //.find('orderStatus.code~' + 'En attente')
      .findAll().subscribe(data => {

        this.saleOrders = data;
        this.saleOrders = this.saleOrders.filter(s => (s.orderStatus.code === 'préparer'
          || s.orderStatus.code === 'En attente' ||
          s.orderStatus.code === 'En cours'));
        console.log('chargement data Commande ');
        console.log(this.saleOrders);
      },
        error => {

          this.toastr.error(error.error.message);
          console.log(error);

          this.spinner.hide();
        },

        () => this.spinner.hide()
      );
  }

  TotalQnt(d: SaleOrder) {
    let sum = 0;
   // this.totalQnt = 0;
    for (let i = 0; i < d.lines.length; i++) {
      if (d.orderStatus.code === 'préparer') {
        sum += (d.lines[i].quantityPrepare * d.lines[i].productPack.weight);
      } else if (d.orderStatus.code === 'En attente') {
        sum += (d.lines[i].quantity * d.lines[i].productPack.weight);
      } else if (d.orderStatus.code === 'En cours') {
        sum += (d.lines[i].quantityReserved * d.lines[i].productPack.weight);
      }


    }

    return sum;
  }




  previous() {
    this.activeIndex--;
  }

  next() {
    this.activeIndex++;

    if (this.activeIndex == 1) {
      this.loaddata();
    }
  }
}
