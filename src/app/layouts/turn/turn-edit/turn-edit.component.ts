import { TurnService } from "./../../../shared/services/api/turn.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { SaleOrderStockService } from "./../../../shared/services/api/sale-order-stock.service";
import { SaleOrderStock } from "./../../../shared/models/sale-order-stock";
import { DriverService } from "./../../../shared/services/api/driver.service";
import { VehicleService } from "./../../../shared/services/api/vehicle.service";
import { TransportServcie } from "./../../../shared/services/api/transport.service";
import { VehicleCategoryService } from "./../../../shared/services/api/vehicle-category.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Turn } from "./../../../shared/models/turn";
import { VehicleCategory } from "./../../../shared/models/vehicle-category";
import { DeliveryLine } from "./../../../shared/models/delivery-line";
import { DeliveryService } from "./../../../shared/services/api/Delivery.service";
import { Delivery } from "./../../../shared/models/delivery";
import { MenuItem } from "primeng/api";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
@Component({
  selector: "app-turn-edit",
  templateUrl: "./turn-edit.component.html",
  styleUrls: ["./turn-edit.component.css"]
})
export class TurnEditComponent implements OnInit {
  activeIndex: number = 0;
  items: MenuItem[];
  deliveries: Delivery[] = [];
  delivriesLoading: Delivery[] = [];
  delivrieLines: DeliveryLine[] = [];
  saleOrdersStock: SaleOrderStock[] = [];
  saleOrdersStockcopy: SaleOrderStock[] = [];

  vehicleCatList: VehicleCategory[] = [];
  transportList: Array<any> = [];
  vehicleList: Array<any> = [];
  driverList: Array<any> = [];
  turnAdded: Turn = new Turn();

  turnForm: FormGroup;
  constructor(
    private deliveryService: DeliveryService,
    private vehicleCategoryService: VehicleCategoryService,
    private transportService: TransportServcie,
    private vehicleService: VehicleService,
    private driverService: DriverService,
    private saleOrderStockService: SaleOrderStockService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private tunrService: TurnService
  ) {}

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
    this.items = [
      {
        label: "........."
      },
      {
        label: "..........."
      },
      {
        label: "........."
      },
      {
        label: ".............."
      }
    ];

    this.loaddata();
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
      fTypeVehicule: new FormControl("", Validators.required)
    });
  }

  onSubmit() {

    this.charger();

    this.saleorderstock();
    console.log('turn stock');
    console.log(this.turnAdded.saleOrderStocks);


  }


charger(){
  const formValue = this.turnForm.value;

    this.turnAdded.vehicle = formValue["fVehicule"];
    this.turnAdded.dateDelivery = formValue["fDateLivraison"];
    this.turnAdded.transport = formValue["fTransport"];
    this.turnAdded.drivers = formValue["fDrivers"];

    this.delivriesLoading.forEach(value => {
      value.lines.forEach(valueLine => {
        this.saleOrdersStock.push(
          new SaleOrderStock(
            valueLine.delivery,
            valueLine.product,
            valueLine.owner,
            valueLine.dlc,
            valueLine.productPack,
            valueLine.uom,
            valueLine.orderedQuantity,
            valueLine,
            valueLine.warehouse

          )
        );
      });
      console.log(this.saleOrdersStock);
    });
}
saleorderstock(){

  this.saleOrderStockService.saveAll(this.saleOrdersStock).subscribe(
    data => {
      this.turnAdded.saleOrderStocks = data;
      this.toastr.success("Elément est Enregistré Avec Succès SOS", "Edition");
      this.saveturn();
    },
    error => {
             this.toastr.error(error.error.message);
             console.log('error sos');
            console.log(error);
            this.spinner.hide();
           },
          () => this.spinner.hide()
        );


  // this.saleOrdersStock.forEach(value => {
  //   this.saleOrderStockService.set(value).subscribe(
  //     data => {
  //       this.saleOrdersStockcopy.push(data);
  //       this.turnAdded.saleOrderStocks.push(data);
  //       this.toastr.success("Elément est Enregistré Avec Succès SOS", "Edition");
  //       console.log("data stock");
  //       console.log(this.saleOrdersStockcopy);
  //     },
  //     error => {
  //       this.toastr.error(error.error.message);
  //       console.log('error sos');
  //       console.log(error);
  //       this.spinner.hide();
  //     },
  //     () => this.spinner.hide()
  //   );
  //});

}

saveturn(){


     this.tunrService.set(this.turnAdded).subscribe(
       data => {
         this.toastr.success("Elément est Enregistré Avec Succès TURN", "Edition");
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

    this.vehicleService
      .find("vehicleCategory.code~" + codeCat.code)
      .subscribe(data => {
        this.vehicleList = data;
      });
  }

  loaddata() {
    this.deliveryService
      .find("orderStatus.code~" + "En attente")
      .subscribe(data => {
        this.deliveries = data;
        console.log(data);
      });
  }

  TotalQnt(d: Delivery) {
    let sum: number = 0;
    d.lines.forEach(function(value) {
      sum = +(<number>value.orderedQuantity);
    });
    console.log("total quantite");

    console.log(sum);

    return sum;
  }

  // TotalTtc(d: Delivery) {
  //   let sum: number = 0;
  //   d.lines.forEach(function(value) {
  //     sum = +value.totalPriceTTC;
  //   });
  //   console.log(sum);

  //   return sum;
  // }

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
