import { CatalogTransportPricing } from './../../../shared/models/CatalogTransportPricing';
import { CatalogTransportPricingService } from './../../../shared/services/api/catalog-transport-pricing.service';
import { PackagingType } from './../../../shared/models/packaging-type';
import { SaleOrderLineService } from "./../../../shared/services/api/sale-order-line.service";
import { TurnLineService } from "./../../../shared/services/api/turn-line.service";
import { TurnLine } from "./../../../shared/models/turn-line";
import { EmsBuffer } from "./../../../shared/utils/ems-buffer";
import { SaleOrderLine } from "./../../../shared/models/sale-order-line";
import { SaleOrder } from "./../../../shared/models/sale-order";
import { SaleOrderService } from "./../../../shared/services/api/sale-order.service";
import { AccountService } from "./../../../shared/services/api/account.service";
import { TurnService } from "./../../../shared/services/api/turn.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { SaleOrderStock } from "./../../../shared/models/sale-order-stock";
import { DriverService } from "./../../../shared/services/api/driver.service";
import { VehicleService } from "./../../../shared/services/api/vehicle.service";
import { TransportServcie } from "./../../../shared/services/api/transport.service";
import { VehicleCategoryService } from "./../../../shared/services/api/vehicle-category.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Turn } from "./../../../shared/models/turn";
import { VehicleCategory } from "./../../../shared/models/vehicle-category";
import { ConfirmationService, MenuItem } from "primeng/api";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnChanges,
  DoCheck,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
} from "@angular/core";
import { TurnType } from "./../../../shared/models/turn-Type";
import { TurnTypeService } from "./../../../shared/services/api/turn-type.service";
import { PurchaseOrderService } from "./../../../shared/services/api/purchase-order.service";
import {
  Account,
  PurchaseOrder,
  PurchaseOrderLine,
  Stock,
  Vat,
  Vehicle,
} from "./../../../shared/models";
import { ActivatedRoute } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { TurnSoPo } from "./../../../shared/models/turn-so-po";
import { TurnSoPoService } from "./../../../shared/services/api/turn-so-po.service";

import { AddressInfo } from "./../../../shared/models/adress-info";
import { PurchaseOrderLineService } from "./../../../shared/services/api/purchase-order-line.service";
import { TestBed } from "@angular/core/testing";
import { Transport } from "./../../../shared/models/transport";
import { sortEventSegs } from "@fullcalendar/angular";
import { SaleOrderStockService } from "./../../../shared/services/api/sale-order-stock.service";
import { StockService } from "./../../../shared/services/api/stock.service";
import { LoadCategorySaleOrder } from "./../../../shared/models/load-category-saleOrder";
import { Container } from "./../../../shared/models/container";
import { LocationContainerInVehicle } from "./../../../shared/models/location-container-In-Vehicle";
import { TurnTransport } from "./../../../shared/models/turn-transport";
import { HolidayService } from "./../../../shared/services/api/account-holiday.service";
import { Holiday } from "./../../../shared/models/holiday";
import { PlanningService } from "./../../../shared/services/api/planning-service";
import { Planning } from "./../../../shared/models/planning";
import { LoadingType } from "./../../../shared/models/loading-type";
import { layerGroup } from "leaflet";
import "rxjs/add/operator/finally";

@Component({
  selector: "app-turn-edit",
  templateUrl: "./turn-edit.component.html",
  styleUrls: ["./turn-edit.component.scss"],
})
export class TurnEditComponent implements OnInit {
  @Output() turnSoPoEdited = new EventEmitter<TurnSoPo>();
  page = 0;
  size = 10;
  collectionSize: number;
  codeSearch: string;
  searchQuery = "";
  turnTypeId: number = 0;
  totalqntV: number = 0;
  totalQntSO: number = 0;
  totalQntPO: number = 0;
  editModeTitle = "Ajouter une Tournée";
  editMode: boolean = false;
  catVehiculeQnt: boolean = false;
  catVehiculeQntSucces: boolean = false;
  isFormSubmitted = false;
  showDialogLine: boolean;
  showDialogMap: boolean;
  showDialogCategory: boolean;
  showvehicleToDrive: boolean = false;
  turnForm: FormGroup;
  turnAdded: Turn = new Turn();
  saleOrders: Array<any> = [];
  saleOrdersLoading: SaleOrder[] = [];
  purchaseOrders: Array<PurchaseOrder> = [];
  purchaseOrderLoading: PurchaseOrder[] = [];
  turnSoList: Array<TurnSoPo> = [];
  turnPoList: Array<TurnSoPo> = [];
  turnSoPoList: Array<TurnSoPo> = [];
  vehicleCatsToDeliver: VehicleCategory[] = [];
  vehicleCatsToDeliverSort: VehicleCategory[] = [];
  vehicleCatList: VehicleCategory[] = [];
  transportList: Array<any> = [];
  vehicleList: Array<any> = [];
  driverList: Array<any> = [];
  turnTypeList: TurnType[] = [];
  loadingTypeList: LoadingType[] = [];

  packagingTypes: Array<PackagingType> = [];
  packagingType: PackagingType = new PackagingType();
  subscrubtion = new Subscription();
  home: MenuItem;
  activeIndex: number = 0;
  items: MenuItem[];
  itemsbreadcrumb: MenuItem[];

  containerList: Container[] = [];
  sum: number = 0;

  loadCategorySos: LoadCategorySaleOrder[] = [];
  turnTransports: TurnTransport[] = [];
  selectedturnTransport: TurnTransport = new TurnTransport();

  showMap: boolean = false;

  constructor(
    private saleOrderService: SaleOrderService,
    private vehicleCategoryService: VehicleCategoryService,
    private transportService: TransportServcie,
    private vehicleService: VehicleService,
    private driverService: DriverService,
    private saleOrderLineService: SaleOrderLineService,
    private purchaseOrderLineService: PurchaseOrderLineService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private tunrService: TurnService,
    private turnTypeService: TurnTypeService,
    private purchaseOrderService: PurchaseOrderService,
    private activatedRoute: ActivatedRoute,
    private catalogTransportPricingService: CatalogTransportPricingService,
    private stockService: StockService,
    private holidayService: HolidayService,
    private planningService: PlanningService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    console.log("ngoninit");

    this.itemsbreadcrumb = [
      { label: "Tournée" },
      { label: "Editer", routerLink: "/core/turn/edit" },
    ];
    this.items = [
      { label: "Commandes" },
      { label: "Surcharge" },
      { label: "Information" },
      { label: "Validation" },
    ];
    this.home = { icon: "pi pi-home" };

    // let p1 = new PackagingType("Vrac");
    // let p2 = new PackagingType("Palette");
   // this.packagingTypes.push(p1);
    //this.packagingTypes.push(p2);
    let l1 = new LoadingType("Complet");
    let l2 = new LoadingType("Groupe");
    this.loadingTypeList.push(l1);
    this.loadingTypeList.push(l2);
    this.turnTypeService.findAll().subscribe((data) => {
      this.turnTypeList = data;
      this.turnAdded.turnType = this.turnTypeList[0];
      this.onSelectTurnType(this.turnAdded.turnType);
      this.initForm();
    });
    this.vehicleCategoryService.findAll().subscribe((data) => {
      this.vehicleCatList = data;
    });
    this.transportService.findAll().subscribe((data) => {
      this.transportList = data;
    });
    this.driverService.findAll().subscribe((data) => {
      this.driverList = data;
    });

    let id = this.activatedRoute.snapshot.params["id"];
    if (id) {
      this.editModeTitle = "Modifier Tournée";
      this.activatedRoute.params.subscribe((params) => {
        id = params["id"];
        this.subscrubtion.add(
          this.tunrService.findById(id).subscribe(
            (data) => {
              this.turnAdded = data;
              this.packagingType = this.packagingTypes.filter(
                (f) => f.code == this.turnAdded.packagingType
              )[0];
              this.turnTransports = this.turnAdded.turnTransports;
              this.turnAdded.loadingTypeO =
                this.turnAdded.loadingType == this.loadingTypeList[0].code
                  ? this.loadingTypeList[0]
                  : this.loadingTypeList[1];
              this.turnAdded.packagingTypeO =
                this.turnAdded.packagingType == this.packagingTypes[0].code
                  ? this.packagingTypes[0]
                  : this.packagingTypes[1];
              this.turnSoList = this.turnAdded.turnSoPos.filter(
                (f) => f.saleOrder != null
              );
              this.saleOrdersLoading = this.turnSoList.map((f) => f.saleOrder);
              this.turnPoList = this.turnAdded.turnSoPos.filter(
                (f) => f.purshaseOrder != null
              );
              this.purchaseOrderLoading = this.turnPoList.map(
                (f) => f.purshaseOrder
              );
              this.onSelectTurnType(this.turnAdded.turnType);
              this.editMode = true;
              this.turnTypeId = this.turnAdded.turnType.id;
              //this.onSelectChangeCatVehicle(this.turnAdded.vehicle.vehicleCategory);
              this.initForm();
            },
            (err) => {
              this.toastr.error(err.error.message);
              this.spinner.hide();
            }
          )
        );
      });
    } else {
      this.turnAdded.loadingTypeO = this.loadingTypeList[0];
      this.turnAdded.packagingTypeO = this.packagingTypes[1];
    }

    this.initForm();
  }

  initForm() {
    const d = new Date(this.turnAdded.dateDelivery);
    this.turnForm = new FormGroup({
      fDateLivraison: new FormControl(d, Validators.required),
      fVehicule: new FormControl(
        this.selectedturnTransport.vehicle,
        Validators.required
      ),
      fTransport: new FormControl(
        this.selectedturnTransport.transport,
        Validators.required
      ),
      fDrivers: new FormControl(
        this.selectedturnTransport.drivers,
        Validators.required
      ),
      fTypeVehicule: new FormControl(
        this.selectedturnTransport?.vehicleCategory,
        Validators.required
      ),
      fTurnType: new FormControl(this.turnAdded.turnType, Validators.required),
      fpackagingType: new FormControl(this.turnAdded.packagingTypeO),
      floadingType: new FormControl(this.turnAdded.loadingTypeO),
    });
  }

  chargeForm() {
    this.isFormSubmitted = true;
    if (this.turnForm.invalid) {
      return;
    }
    const formValue = this.turnForm.value;
    this.turnAdded.dateDelivery = formValue["fDateLivraison"];
    //  this.turnAdded.loadingTypeO = formValue['floadingType'];
    this.selectedturnTransport.vehicle = formValue["fVehicule"];
    this.selectedturnTransport.vehicleCategory = formValue["fTypeVehicule"];
    this.selectedturnTransport.transport = formValue["fTransport"];
    this.selectedturnTransport.drivers = formValue["fDrivers"];
    this.turnAdded.loadingType = this.turnAdded.loadingTypeO.code;
    this.turnAdded.packagingType = this.turnAdded.packagingTypeO.code;
  }

  onSubmit() {
    this.chargeForm();
    if (this.turnSoList.length > 0) {
      this.turnAdded.turnSoPos.push(...this.turnSoList);
    }
    if (this.turnPoList.length > 0) {
      this.turnAdded.turnSoPos.push(...this.turnPoList);
    }
    if (this.turnTransports.length > 0) {
      this.turnTransports.forEach((turnTrs) => {
        this.vehicleCatsToDeliver.forEach((vCat) => {
          if (vCat.code == turnTrs.vehicleCategory.code) {
            turnTrs.numberOfPalette = vCat.numberOfPalette;
          }
        });
      });

      this.turnAdded.turnTransports = this.turnTransports;
    }

    this.tunrService.set(this.turnAdded).subscribe(
      (data) => {
        this.turnAdded = data;
        this.toastr.success(
          "Elément Turn est Enregistré Avec Succès ",
          "Edition"
        );
      },
      (error) => {
        this.toastr.error(error.error.message);
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  onSelectTurnType(event) {
    this.turnTypeId = event.id == undefined ? event.value.id : event.id;
    if (this.turnTypeId == 1) {
      this.loadSaleOrderData();
    } else if (this.turnTypeId == 2) {
      this.loadPurchaseOrderData();
    } else if (this.turnTypeId == 3) {
      this.loadSaleOrderData();
      this.loadPurchaseOrderData();
    }
  }

  onSelectPackagingTypes(event) {
    this.turnAdded.packagingTypeO =
      event.value.code == this.packagingTypes[0].code
        ? this.packagingTypes[0]
        : this.packagingTypes[1];
  }
  onSelectLoadingTypes(event) {
    this.turnAdded.loadingTypeO =
      event.value.code == this.loadingTypeList[0].code
        ? this.loadingTypeList[0]
        : this.loadingTypeList[1];
  }

  loadSaleOrderData(search: string = "") {
    let searchStatut: string = "orderStatus.id:" + 9; //9
    this.spinner.show();
    this.saleOrderService.find(searchStatut).subscribe(
      (data) => {
        this.saleOrders = data;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  onMoveSoToSource(event) {
    let saleOrder: SaleOrder = event.items[0];
    this.saleOrdersLoading = this.saleOrdersLoading.filter(
      (f) => f != saleOrder
    );
    this.turnSoList = this.turnSoList.filter((p) => p.saleOrder !== saleOrder);

    this.turnAdded.totalSoQnt = this.claculatetotalQntLines(this.turnSoList);
    this.turnAdded.totalSoTTC = this.claculatetotalPriceLines(this.turnSoList);
  }

  onMoveSoToTarget(event) {
    console.log("move");

    let saleOrder: SaleOrder = event.items[0];
    if (this.turnAdded.loadingTypeO.code == "Complet") {
      if (this.turnSoList.length == 0) {
        console.log("legnnt 0");

        this.searchSoLineBySoAndStockByLine(saleOrder);
      } else {
        console.log("else legnnt 0");

        let existAccount = this.turnSoList.find((f) => {
          return f.saleOrder.account.code === saleOrder.account.code;
        });
        if (!existAccount) {
          console.log("accopunt meme ");

          this.toastr.warning("pas meme client", "avertissement");
          this.onMoveSoToSource(event);
        } else {
          console.log("else account meme ");
          this.searchSoLineBySoAndStockByLine(saleOrder);
        }
      }
    } else {
      this.searchSoLineBySoAndStockByLine(saleOrder);
    }
  }

  searchSoLineBySoAndStockByLine(so: SaleOrder) {
    so.lines = [];
    this.saleOrderLineService.find("saleOrder.id:" + so.id).subscribe({
      next: (data) => {
        so.lines.push(...data);
        so.lines.forEach((line) => {
          line.sotcks = [];
          this.stockService
            .find("saleOrderLine.id:" + line.id)
            .subscribe((data) => {
              line.sotcks.push(...data);
              // line.quantityPrepare += data
              //   .map((m) => m.quantity)
              //   .reduce((a, b) => a + b, 0);
              this.generateTurnBySo(so);
            });
        });
      },
    });
  }

  generateTurnBySo(saleOrder: SaleOrder) {
    let tunSoPo;
    tunSoPo = new TurnSoPo(
      saleOrder.code,
      saleOrder.orderStatus,
      saleOrder,
      null
    );
    saleOrder.lines.forEach((soLine) => {
      soLine.sotcks.forEach((stock) => {
        let turnline = new TurnLine(
          stock.product,
          stock.quantity,
          stock.purchasePrice,
          stock.uom,
          stock.purchasePrice * stock.quantity,
          soLine.vat,
          stock.productPack,
          soLine.orderStatus,
          soLine,
          null,
          soLine.sotcks
        );

        tunSoPo.totalPriceTTC += stock.purchasePrice * stock.quantity;
        tunSoPo.turnLines.push(turnline);
      });
      tunSoPo.totalQuantity = this.calculateQntLine(tunSoPo);
      this.turnSoList = this.turnSoList.filter(
        (f) => f.saleOrder.id != tunSoPo.saleOrder.id
      );
      this.turnSoList.push(tunSoPo);
      this.turnAdded.totalSoQnt = this.claculatetotalQntLines(this.turnSoList);
      this.turnAdded.totalSoTTC = this.claculatetotalPriceLines(
        this.turnSoList
      );
    });
    console.log(this.turnSoList);

  }

  calculateQntLine(d: TurnSoPo) {
    let sum: number = 0;
    d.turnLines.forEach((element) => {
      sum += Number(element.quantityServed * element.productPack.weight);
    });
    return sum;
  }
  claculatetotalQntLines(turnSoPo: TurnSoPo[]) {
    let total: number = 0;
    turnSoPo.forEach((element) => {
      total += element.totalQuantity;
    });
    return total;
  }

  calculatePriceLine(d: TurnSoPo) {
    let sum: number = 0;
    d.turnLines.forEach((element) => {
      console.log(element.totalPriceTTC);
      sum += Number(element.totalPriceTTC);
    });
    return sum;
  }

  claculatetotalPriceLines(turnSoPo: TurnSoPo[]) {
    let total: number = 0;
    turnSoPo.forEach((element) => {
      total += this.calculatePriceLine(element);
    });

    return total;
  }

  onLineEditedturnSo(line: TurnSoPo) {
    if (line.saleOrder != null) {
this.turnSoList.forEach((element) => {
        element.totalQuantity = this.calculateQntLine(element);
      });



      this.turnSoList = this.turnSoList.filter((l) => l.code !== line.code);
      this.turnSoList.push(line);

      console.log(this.turnSoList);

      this.turnAdded.totalSoQnt = this.claculatetotalQntLines(this.turnSoList);
      this.turnAdded.totalSoTTC = this.claculatetotalPriceLines(
        this.turnSoList
      );
    } else if (line.purshaseOrder != null) {
      this.turnPoList = this.turnPoList.filter((l) => l.code !== line.code);
      this.turnPoList.push(line);
      this.turnPoList.forEach((element) => {
        element.totalQuantity = this.calculateQntLine(element);
      });
      this.turnAdded.totalPoQnt = this.claculatetotalQntLines(this.turnPoList);
      this.turnAdded.totalPoTTC = this.claculatetotalPriceLines(
        this.turnPoList
      );
    }
  }

  loadPurchaseOrderData(search: string = "") {
    let searchStatut = "orderStatus.id!" + 1;
    this.spinner.show();
    this.purchaseOrderService.find(searchStatut).subscribe(
      (data) => {
        this.purchaseOrders = data;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  onMovePoToSource(event) {
    let purchaseOrder: PurchaseOrder = event.items[0];
    this.turnPoList = this.turnPoList.filter(
      (p) => p.code !== purchaseOrder.code
    );
    this.turnAdded.totalPoQnt = this.claculatetotalQntLines(this.turnPoList);
    this.turnAdded.totalPoTTC = this.claculatetotalPriceLines(this.turnPoList);
  }

  onMovePoToTarget(event) {
    let purchaseOrder: PurchaseOrder = event.items[0];
    this.verifiedClosingDayAccount(
      "supplier.code~" + purchaseOrder.supplier.code
    );
    let exist: Boolean = false;
    this.turnPoList.forEach((element) => {
      if (element.code == purchaseOrder.code) {
        exist = true;
      }
    });
    if (exist == false) {
      this.onChargedTurnByPo(purchaseOrder);
    } else if (exist == true) {
      this.toastr.warning("Déja Existe", "avertissement");
      this.purchaseOrderLoading.splice(this.purchaseOrderLoading.length - 1, 1);
    }
  }

  onChargedTurnByPo(puchaseOrder: PurchaseOrder) {
    let sum: number = 0;
    let purchaseOrderLines: PurchaseOrderLine[] = [];
    let tunPo = new TurnSoPo(
      puchaseOrder.code,
      puchaseOrder.orderStatus,
      null,
      puchaseOrder
    );
    this.purchaseOrderLineService
      .find("purshaseOrder.id:" + puchaseOrder.id)
      .subscribe((data) => {
        purchaseOrderLines = data;
        sum = 0;
        purchaseOrderLines.forEach((poLine) => {
          sum += Number(poLine.quantity);
          let turnline = new TurnLine(
            poLine.product,
            poLine.quantity,
            poLine.purshasePrice,
            poLine.uom,
            // poLine.totalPriceHT,
            poLine.totalPriceTTC,
            poLine.vat,
            poLine.productPack,
            poLine.orderStatus,
            null,
            poLine,
            null
          );
          tunPo.turnLines.push(turnline);
        });
        tunPo.totalQuantity = this.calculateQntLine(tunPo);
        this.turnPoList.push(tunPo);
        this.turnAdded.totalPoQnt = this.claculatetotalQntLines(
          this.turnPoList
        );
        this.turnAdded.totalPoTTC = this.claculatetotalPriceLines(
          this.turnPoList
        );
      });
  }

  verifiedClosingDayAccount(search: String) {
    let planning: Planning = new Planning();
    const formValue = this.turnForm.value;
    var days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    this.turnAdded.dateDelivery = formValue["fDateLivraison"];
    this.planningService
      .find(search + ",day~" + days[this.turnAdded.dateDelivery.getDay()])
      .subscribe((data) => {
        planning = data[0];
        if (planning != null || planning != undefined) {
          if (planning.closingDay == true) {
            this.toastr.warning("jour Fermeture", "avertissement");
          }
        }
      });
  }
  verifiedHolidayByDateTTurn() {
    let day: string;
    let month: string;
    let holidays: Holiday[] = [];
    const formValue = this.turnForm.value;
    this.turnAdded.dateDelivery = formValue["fDateLivraison"];
    day = this.turnAdded.dateDelivery.getDate().toString();
    month = (this.turnAdded.dateDelivery.getMonth() + 1).toString();
    this.holidayService
      .find("holidayDay:" + day + ",holidayMonth:" + month)
      .subscribe((data) => {
        holidays = data;
        if (holidays.length > 0) {
          this.toastr.warning("Jour Férié", "avertissement");
        }
      });
  }

  calculatePriceTurnSo() {
    let sum: number = 0;
    let totalSum: number = 0;
    let catalogTransports: CatalogTransportPricing;
    let cat: VehicleCategory[] = [];
    this.chargeForm();
    this.turnSoList.forEach((f, index) => {
      // console.log(l.saleOrderLine?.saleOrder.id);

      cat = this.loadCategorySos
        .filter((l) => {
          l.saleOrderLine?.saleOrder.id == f.saleOrder.id;
        })
        .map((m) => m.vehicleCategory);

      //     this.catalogTransportTypeService.find('vehicleCategory.id:' + cat[0].id+ ',zoneSource.code~' + 'FES' + ',zoneDestination.code~' + f.saleOrder.account.deliveryAddress.city + ',transport.id:' + this.turnAdded.transport.id).subscribe(
      //       data => {
      //         catalogTransports = data[0];
      //         if (catalogTransports != null) {
      //           sum = Number(catalogTransports.amountTtc);
      //           totalSum += sum;
      //           this.turnSoList[index].totalPriceTurn = sum;
      //           this.turnAdded.totalSoPriceTurn = totalSum;
      //         }
      //       },
      //       error => {
      //         this.toastr.error(error.error.message);
      //         this.spinner.hide();
      //       },
      //       () => this.spinner.hide()
      //     );
    });
  }

  calculatePriceTurnPo() {
    let sum: number = 0;
    let totalSum: number = 0;
    let catalogTransports: CatalogTransportPricing;
    //this.chargeForm();
    // this.turnPoList.forEach((f, index) => {
    //   this.catalogTransportTypeService.find('vehicleCategory.id:' + this.turnAdded.vehicle.vehicleCategory.id + ',zoneSource.code~' + 'FES' + ',zoneDestination.code~' + f.purshaseOrder.supplier.address.city + ',transport.id:' + this.turnAdded.transport.id).subscribe(
    //     data => {
    //       catalogTransports = data[0];
    //       if (catalogTransports != null) {
    //         sum = Number(catalogTransports.amountTtc);
    //         totalSum += sum;
    //         this.turnPoList[index].totalPriceTurn = sum;
    //         this.turnAdded.totalPoPriceTurn = totalSum;
    //       }
    //     },
    //     error => {
    //       this.toastr.error(error.error.message);
    //       this.spinner.hide();
    //     },
    //     () => this.spinner.hide()
    //   );
    // }
    //);
  }

  onSelectTransport(event) {
    let codeTrans = event.value ? event.value : event;
    const formValue = this.turnForm.value;
    let codeCat = formValue["fTypeVehicule"];
    this.vehicleService
      .find(
        "vehicleCategory.code~" + codeCat.code + ",transport.id:" + codeTrans.id
      )
      .subscribe((data) => {
        this.vehicleList = data;
      });
  }

  onSelectChangeCatVehicle(event) {
    let codeCat = event.value ? event.value : event;
    console.log(codeCat);

    //this.transportList = codeCat.transports;
    // this.turnAdded.vehicleCategory = codeCat;
    let sum: number = 0;
    this.totalqntV = codeCat.tonnage;
    if (this.turnAdded.totalSoQnt > codeCat.tonnage) {
      this.catVehiculeQnt = true;
      this.catVehiculeQntSucces = false;
    } else {
      this.catVehiculeQnt = false;
      this.catVehiculeQntSucces = true;
    }
  }

  onSelectDriver(event) {
    this.turnTransports.forEach((tr) => {
      tr.drivers.forEach((trDrv) => {
        if (trDrv.code == event.itemValue.code) {
          console.log("true driver ");
          this.toastr.warning(
            "Chauffeur " + event.itemValue.name + " Deja Affecté",
            "avertissement"
          );
        }
      });
    });
  }
  editTurnTransport() {
    let registrationNumber, categoryCode;
    let existDriver: Boolean = false;
    this.chargeForm();

    this.selectedturnTransport.drivers.forEach((drv) => {
      this.turnTransports.forEach((tr) => {
        tr.drivers.forEach((trDrv) => {
          if (trDrv.code == drv.code) {
            console.log("true driver ");
            existDriver = true;
          }
        });
      });
    });
    if (existDriver == false) {
      registrationNumber =
        this.selectedturnTransport?.vehicle?.registrationNumber;
      categoryCode = this.selectedturnTransport?.vehicle?.vehicleCategory?.code;

      this.turnTransports = this.turnTransports.filter(
        (f) => f.vehicle.registrationNumber != registrationNumber
      );
      this.turnTransports.push(this.selectedturnTransport);
      this.selectedturnTransport = new TurnTransport();
      this.turnForm.patchValue({
        fVehicule: this.selectedturnTransport.vehicle,
        fTransport: this.selectedturnTransport.transport,
        fDrivers: this.selectedturnTransport.drivers,
        fTypeVehicule: this.selectedturnTransport?.vehicleCategory,
      });
    } else if (existDriver == true) {
      this.toastr.warning("Chauffeur Deja Affecté", "avertissement");
    }
  }

  onLineEditTurnTransport(event) {
    this.selectedturnTransport = event;
    this.turnForm.patchValue({
      fVehicule: this.selectedturnTransport.vehicle,
      fTransport: this.selectedturnTransport.transport,
      fDrivers: this.selectedturnTransport.drivers,
      fTypeVehicule: this.selectedturnTransport?.vehicleCategory,
    });
  }

  resetTurnTransport() {
    this.selectedturnTransport = new TurnTransport();
    this.turnForm.patchValue({
      fVehicule: this.selectedturnTransport.vehicle,
      fTransport: this.selectedturnTransport.transport,
      fDrivers: this.selectedturnTransport.drivers,
      fTypeVehicule: this.selectedturnTransport?.vehicleCategory,
    });
  }

  previous() {
    this.activeIndex--;
  }

  next() {
    if (this.activeIndex == 0) {
      this.verifiedHolidayByDateTTurn();
      this.activeIndex++;
    } else if (this.activeIndex == 2) {
      this.calculatePriceTurnSo();
      this.calculatePriceTurnPo();
      this.activeIndex++;
    } else {
      this.activeIndex++;
    }
  }

  onShowDialogligne(line, event) {
    this.showDialogLine = true;
    this.turnSoPoEdited = line;
  }
  onShowDialogMap() {
    this.showDialogMap = true;
  }

  onShowDialogCategory() {
    this.showDialogCategory = true;
  }
  onHideDialogLigne(event) {
    this.showDialogLine = event;
  }
  onHideDialogMap(event) {
    this.showDialogMap = event;
  }

  onHideDialogCategory(event) {
    this.showDialogCategory = event;
  }
}
