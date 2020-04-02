import { SaleOrderLineService } from './../../../shared/services/api/sale-order-line.service';
import { TurnLineService } from './../../../shared/services/api/turn-line.service';
import { TurnLine } from './../../../shared/models/turn-line';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { SaleOrderLine } from './../../../shared/models/sale-order-line';
import { SaleOrder } from './../../../shared/models/sale-order';
import { SaleOrderService } from './../../../shared/services/api/sale-order.service';
import { AccountService } from './../../../shared/services/api/account.service';
import { TurnService } from './../../../shared/services/api/turn.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
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
  accountSearch: string;
  accountList: Account[] = [];

  page = 0;
  size = 10;
  collectionSize: number;

  saleOrders: Array<any> = [];
  saleOrdersLoading: SaleOrder[] = [];
  saleOrderLines: SaleOrderLine[] = [];
  turnLines: TurnLine[] = [];

  vehicleCatList: VehicleCategory[] = [];
  transportList: Array<any> = [];
  vehicleList: Array<any> = [];
  driverList: Array<any> = [];
  turnAdded: Turn = new Turn();

  searchQuery = '';
  isFormSubmitted=false;

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
    private turnLineService: TurnLineService,
    private saleOrderLineService:SaleOrderLineService,
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

     this.accountService.findAll().subscribe(data => {
       this.accountList = data;
     });
    this.items = [
      {
        label: 'Commande'
      },
      {
        label: '...........'
      },
      {
        label: 'Information'
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

    //this.prepareSaleOrderStock();

   // this.insertSaleOrderStock();


  this.saveTurn()
    console.log('turn stock');
    console.log(this.turnAdded.turnLine);


  }


  loadData(search: string = '') {

    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();

    this.saleOrderService.find(search).subscribe(
      data => {
        console.log(data);
        this.saleOrders = data;
        this.saleOrders = this.saleOrders.filter(s => (s.orderStatus.code === 'préparer'
        || s.orderStatus.code === 'En attente' ||
        s.orderStatus.code === 'En cours'));
      console.log('chargement data Commande ');
        console.log("data sal order ");
        console.log(this.saleOrders);


        this.spinner.hide();
      },
      error => { this.spinner.hide() },
      () => this.spinner.hide()
    );
  }


  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
     // buffer.append(`code~${this.codeSearch},orderStatus.id^2;5;9`);
    }
    if (this.accountSearch != null && this.accountSearch !== '') {
      buffer.append(`account.code~${this.accountSearch}`);
     // buffer.append(`code~${this.codeSearch},orderStatus.id^2;5;9`);
    }


    this.searchQuery = buffer.getValue();
    console.log(this.searchQuery);

    this.loadData(this.searchQuery);

  }
  reset() {
    this.codeSearch = '';
    this.searchQuery = '';
    this.saleOrders = null;
    this.accountSearch=null;
  }

  insertTurnLine() {
    this.saleOrdersLoading.forEach(value => {
      value.lines.forEach(valueLine => {
         this.turnLines.push(
           new TurnLine(
           valueLine.product,
             valueLine.quantity,
          valueLine.salePrice,
             valueLine.uom,
             valueLine.totalPriceHT,
             valueLine.totalPriceTTC,
             valueLine.vat,
             valueLine.productPack,
             valueLine,
             value,
             this.turnAdded
           )
         );
       });
       console.log('chargement sale order stock');
       console.log(this.turnLines);
     });


    this.turnLineService.saveAll(this.turnLines).subscribe(
      data => {
       // this.turnAdded.turnLine = data;
        this.toastr.success('Elément turnLine  est Enregistré Avec Succès ', 'Edition');
        console.log("turnn line");
        console.log(this.turnLines);


       // this.saveTurn();
      },
      error => {
        this.toastr.error(error.error.message);
        console.log('error Line');
        console.log(error);
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  saveTurn() {

    this.isFormSubmitted = true;
    if (this.turnForm.invalid) {
      return;
    }

    const formValue = this.turnForm.value;

    this.turnAdded.vehicle = formValue['fVehicule'];
    this.turnAdded.dateDelivery = formValue['fDateLivraison'];
    this.turnAdded.transport = formValue['fTransport'];
    this.turnAdded.drivers = formValue['fDrivers'];

     this.tunrService.set(this.turnAdded).subscribe(
       data => {
         this.turnAdded=data;
         this.toastr.success('Elément Turn est Enregistré Avec Succès TURN', 'Edition');
         this.insertTurnLine();
         this.updateSaleOrderLine();
         console.log("turnn");
         console.log(this.turnAdded);
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





updateSaleOrderLine(){


  this.saleOrdersLoading.forEach(value => {
    value.lines.forEach(valueLine => {
       this.saleOrderLines.push(valueLine);
     });
    });

this.saleOrderLineService.setAll(this.saleOrderLines).subscribe(
  data => {

    this.toastr.success('Elément orderline est Enregistré Avec Succès orderline', 'Edition');

  },
  error => {
  this.toastr.error(error.error.message);
    this.spinner.hide();
  },

 () => this.spinner.hide()
);

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

  // loaddata() {
  //   this.saleOrderService
  //     //.find('orderStatus.code~' + 'En attente')
  //     .findAll().subscribe(data => {

  //       this.saleOrders = data;
  //       this.saleOrders = this.saleOrders.filter(s => (s.orderStatus.code === 'préparer'
  //         || s.orderStatus.code === 'En attente' ||
  //         s.orderStatus.code === 'En cours'));
  //       console.log('chargement data Commande ');
  //       console.log(this.saleOrders);
  //     },
  //       error => {

  //         this.toastr.error(error.error.message);
  //         console.log(error);

  //         this.spinner.hide();
  //       },

  //       () => this.spinner.hide()
  //     );
 // }

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
      //this.loaddata();
    }
  }
}
