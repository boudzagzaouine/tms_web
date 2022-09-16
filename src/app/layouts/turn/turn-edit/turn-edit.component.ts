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
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Component, OnInit, EventEmitter, Output, OnChanges, DoCheck } from '@angular/core';
import { TurnType } from './../../../shared/models/turn-Type';
import { TurnTypeService } from './../../../shared/services/api/turn-type.service';
import { PurchaseOrderService } from './../../../shared/services/api/purchase-order.service';
import { Account, PurchaseOrder, PurchaseOrderLine, Stock, Vat, Vehicle } from './../../../shared/models';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TurnSoPo } from './../../../shared/models/turn-so-po';
import { TurnSoPoService } from './../../../shared/services/api/turn-so-po.service';
import { CatalogTransportTypeServcie } from './../../../shared/services/api/Catalog-Transport-Type.service';
import { CatalogTransportType } from './../../../shared/models/CatalogTransportType';
import { AddressInfo } from './../../../shared/models/adress-info';
import { PurchaseOrderLineService } from './../../../shared/services/api/purchase-order-line.service';
import { TestBed } from '@angular/core/testing';
import { Transport } from './../../../shared/models/transport';
import { sortEventSegs } from '@fullcalendar/angular';
import { SaleOrderStockService } from './../../../shared/services/api/sale-order-stock.service';
import { StockService } from './../../../shared/services/api/stock.service';
import { LoadCategorySaleOrder } from './../../../shared/models/load-category-saleOrder';
import { Container } from './../../../shared/models/container';
import { LocationContainerInVehicle } from './../../../shared/models/location-container-In-Vehicle';
import { TurnTransport } from './../../../shared/models/turn-transport';
import { HolidayService } from './../../../shared/services/api/account-holiday.service';
import { Holiday } from './../../../shared/models/holiday';
import { PlanningService } from './../../../shared/services/api/planning-service';
import { Planning } from './../../../shared/models/planning';
import { PackagingType } from './../../../shared/models/packagingType';
import { LoadingType } from './../../../shared/models/loading-type';

@Component({
  selector: 'app-turn-edit',
  templateUrl: './turn-edit.component.html',
  styleUrls: ['./turn-edit.component.scss']
})
export class TurnEditComponent implements OnInit {

  @Output() turnSoPoEdited = new EventEmitter<TurnSoPo>();
  page = 0;
  size = 10;
  collectionSize: number;
  codeSearch: string;
  searchQuery = '';
  turnTypeId: number = 0
  totalqntV: number = 0;
  totalQntSO: number = 0;
  totalQntPO: number = 0;
  editModeTitle = 'Ajouter une Tournée';
  editMode: boolean = false;
  catVehiculeQnt: boolean = false;
  catVehiculeQntSucces: boolean = false;
  isFormSubmitted = false;
  showDialogLine: boolean;
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
  packagingType: PackagingType = new PackagingType(null);
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
    private catalogTransportTypeService: CatalogTransportTypeServcie,
    private stockService: StockService,
    private holidayService: HolidayService,
    private planningService: PlanningService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    let p1 = new PackagingType('Vrac'); let p2 = new PackagingType('Palette');
    this.packagingTypes.push(p1); this.packagingTypes.push(p2);
    let l1 = new LoadingType('Complet'); let l2 = new LoadingType('Groupe');
    this.loadingTypeList.push(l1); this.loadingTypeList.push(l2);

    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.editModeTitle = 'Modifier Tournée';
      this.activatedRoute.params.subscribe(params => {
        id = params['id'];
        this.subscrubtion.add(this.tunrService.findById(id).subscribe(data => {
          this.turnAdded = data;
          this.packagingType = this.packagingTypes.filter(f => f.code == this.turnAdded.packagingType)[0];
          this.turnTransports = this.turnAdded.turnTransports;
          this.turnAdded.loadingTypeO = this.turnAdded.loadingType == this.loadingTypeList[0].code ? this.loadingTypeList[0] : this.loadingTypeList[1];
          this.turnAdded.packagingTypeO = this.turnAdded.packagingType == this.packagingTypes[0].code ? this.packagingTypes[0] : this.packagingTypes[1];

          this.turnSoList = this.turnAdded.turnSoPos.filter(f => f.saleOrder != null);
          this.saleOrdersLoading = this.turnSoList.map(f => f.saleOrder)
          this.turnPoList = this.turnAdded.turnSoPos.filter(f => f.purshaseOrder != null);
          this.purchaseOrderLoading = this.turnPoList.map(f => f.purshaseOrder)
          this.onSelectTurnType(this.turnAdded.turnType);
          this.editMode = true;
          this.turnTypeId = this.turnAdded.turnType.id;
          //this.onSelectChangeCatVehicle(this.turnAdded.vehicle.vehicleCategory);
          this.initForm();
        },
          err => {
            this.toastr.error(err.error.message);
            this.spinner.hide();
          }));
      });

    } else {
      this.turnAdded.loadingTypeO = this.loadingTypeList[0];
      this.turnAdded.packagingTypeO = this.packagingTypes[1];
    }

    this.itemsbreadcrumb = [
      { label: 'Tournée' },
      { label: 'Editer', routerLink: '/core/vehicles/edit' },
    ];

    this.items = [{ label: 'Commandes' }, { label: 'Surcharge' }, { label: 'Information' }, { label: 'Validation' }];
    this.home = { icon: 'pi pi-home' };

    this.turnTypeService.findAll().subscribe(data => {
      this.turnTypeList = data;


      this.turnAdded.turnType = this.turnTypeList[0];
      this.onSelectTurnType(this.turnTypeList[0])
      this.initForm();
    });

    this.vehicleCategoryService.findAll().subscribe(data => {
      this.vehicleCatList = data;
    });



    this.driverService.findAll().subscribe(data => {
      this.driverList = data;
    });


    this.initForm();
  }

  initForm() {
    const d = new Date(this.turnAdded.dateDelivery);
    this.turnForm = new FormGroup({
      fDateLivraison: new FormControl(d, Validators.required),
      fVehicule: new FormControl(this.selectedturnTransport.vehicle, Validators.required),
      fTransport: new FormControl(this.selectedturnTransport.transport, Validators.required),
      fDrivers: new FormControl(this.selectedturnTransport.drivers, Validators.required),
      fTypeVehicule: new FormControl(this.selectedturnTransport?.vehicleCategory, Validators.required),
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
    this.turnAdded.dateDelivery = formValue['fDateLivraison'];
    //  this.turnAdded.loadingTypeO = formValue['floadingType'];
    this.selectedturnTransport.vehicle = formValue['fVehicule'];
    this.selectedturnTransport.vehicleCategory = formValue['fTypeVehicule'];
    this.selectedturnTransport.transport = formValue['fTransport'];
    this.selectedturnTransport.drivers = formValue['fDrivers'];
    this.turnAdded.loadingType = this.turnAdded.loadingTypeO.code;
    this.turnAdded.packagingType = this.turnAdded.packagingTypeO.code;

  }

  onSubmit() {
    this.chargeForm();
    if (this.turnSoList.length > 0) { this.turnAdded.turnSoPos.push(...this.turnSoList); }
    if (this.turnPoList.length > 0) { this.turnAdded.turnSoPos.push(...this.turnPoList); }
    if (this.turnTransports.length > 0) {
      this.turnTransports.forEach(turnTrs => {
        this.vehicleCatsToDeliver.forEach(vCat => {
          if (vCat.code == turnTrs.vehicleCategory.code) {
            turnTrs.numberOfPalette = vCat.numberOfPalette;
          }
        });

      });

      this.turnAdded.turnTransports = this.turnTransports;
    }


    this.tunrService.set(this.turnAdded).subscribe(
      data => {
        this.turnAdded = data;
        this.toastr.success('Elément Turn est Enregistré Avec Succès ', 'Edition');
      },
      error => {
        this.toastr.error(error.error.message);
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  onSelectTurnType(event) {


    this.turnTypeId = event.value.id;

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
    this.turnAdded.packagingTypeO = event.value.code == this.packagingTypes[0].code ? this.packagingTypes[0] : this.packagingTypes[1];
  }
  onSelectLoadingTypes(event) {
    this.turnAdded.loadingTypeO = event.value.code == this.loadingTypeList[0].code ? this.loadingTypeList[0] : this.loadingTypeList[1];

  }


  loadSaleOrderData(search: string = '') {
    let searchStatut: string = 'orderStatus.id:' + 9; //9
    this.spinner.show();
    this.saleOrderService.find(searchStatut).subscribe(
      data => {
        this.saleOrders = data;
        this.spinner.hide();
      },
      error => { this.spinner.hide() },
      () => this.spinner.hide()
    );
  }

  onMoveSoToSource(event) {
    console.log("source");
    console.log(event);

    let saleOrder: SaleOrder = event.items[0];
    this.turnSoList = this.turnSoList.filter(p => p.code !== saleOrder.code);
    this.turnAdded.totalSoQnt = this.claculatetotalQntLines(this.turnSoList);
    this.turnAdded.totalSoTTC = this.claculatetotalPriceLines(this.turnSoList);
  }

  onMoveSoToTarget(event) {
    console.log("target");

    console.log(event);

    let saleOrder: SaleOrder = event.items[0];
    let existSo: Boolean = false;
    let existAccount: Boolean = false;
   // this.verifiedClosingDayAccount('account.id:' + saleOrder.account.id);

    if (this.turnAdded.loadingTypeO.code == 'Complet') {
      if (this.turnSoList.length == 0) {
        this.searchSoLineBySo(saleOrder, this.turnAdded.loadingTypeO.code);
      } else {
        this.turnSoList.forEach(element => {
          if (element.code == saleOrder.code) { existSo = true; }
          if (element.saleOrder.account.code == saleOrder.account.code) { existAccount == true }
        });
        if (existSo == false) { this.searchSoLineBySo(saleOrder, this.turnAdded.loadingTypeO.code); }
        else if (existSo == true) { this.toastr.warning('Déja Existe', 'avertissement'); }
        if (existAccount == false) {
          this.toastr.warning('pas meme client', 'avertissement');
          this.saleOrdersLoading = this.saleOrdersLoading.filter(f => f.account.code != saleOrder.account.code)
          this.turnSoList = this.turnSoList.filter(f => { f.saleOrder.account.code != saleOrder.account.code })
          this.onMoveSoToSource(event);
        }
      }
    } else {
      this.turnSoList.forEach(element => {

        if (element.code == saleOrder.code) { existSo = true; }
      });
      if (existSo == false) { this.searchSoLineBySo(saleOrder, this.turnAdded.loadingTypeO.code); }
      else if (existSo == true) { this.toastr.warning('Déja Existe', 'avertissement'); }
    }
  }

  searchSoLineBySo(so: SaleOrder, type: string) {
    so.lines = [];
    console.log(so


      );

    this.saleOrderLineService.find('saleOrder.id:' + so.id).subscribe(
      data => {
        so.lines.push(...data);
        so.lines.forEach(line => {
          line.sotcks = [];
          this.stockService.find('saleOrderLine.id:' + line.id).subscribe(
            data => {
              line.sotcks.push(...data);


              line.quantityPrepare += data.map(m => m.quantity).reduce((a, b) => a + b, 0);
              this.onChargedTurnBySo(so, type);
            });
        });
      });
  }

  onChargedTurnBySo(saleOrder: SaleOrder, type: string) {

    let tunSoPo = new TurnSoPo(
      saleOrder.code,
      saleOrder.totalPriceHT,
      saleOrder.totalPriceTTC,
      saleOrder.orderStatus,
      saleOrder,
      null,
    )
    saleOrder.lines.forEach((soLine) => {
      soLine.sotcks.forEach(stock => {
        let turnline = new TurnLine(
          stock.product,
          stock.quantity,
          stock.purchasePrice,
          stock.uom,
          (stock.purchasePrice * stock.quantity),
          soLine.vat,
          stock.productPack,
          soLine.orderStatus,
          soLine,
          null,
          soLine.sotcks,
        );
        tunSoPo.totalPriceTTC += (stock.purchasePrice * stock.quantity);
       console.log( tunSoPo.totalPriceTTC);

        tunSoPo.turnLines.push(turnline);
      });
    });
    tunSoPo.totalQuantity = this.calculateQntLine(tunSoPo);
    this.turnSoList = this.turnSoList.filter(f => f.saleOrder.id != tunSoPo.saleOrder.id);
    this.turnSoList.push(tunSoPo);
    this.turnAdded.totalSoQnt = this.claculatetotalQntLines(this.turnSoList);
    this.turnAdded.totalSoTTC = this.claculatetotalPriceLines(this.turnSoList);
 console.log(this.turnAdded.totalSoTTC);
  }

  calculateQntLine(d: TurnSoPo) {
    let sum: number = 0;
    d.turnLines.forEach(element => {


      sum += Number(element.quantityServed * element.productPack.weight);
    });
    return sum;
  }



  onLineEditedturnSo(line: TurnSoPo) {
    if (line.saleOrder != null) {
      this.turnSoList = this.turnSoList.filter(
        (l) => l.code !== line.code
      );
      this.turnSoList.push(line);
      this.turnSoList.forEach(element => {
        element.totalQuantity = this.calculateQntLine(element);
      });
      this.turnAdded.totalSoQnt = this.claculatetotalQntLines(this.turnSoList);
      this.turnAdded.totalSoTTC = this.claculatetotalPriceLines(this.turnSoList);
    }
    else if (line.purshaseOrder != null) {
      this.turnPoList = this.turnPoList.filter(
        (l) => l.code !== line.code
      );
      this.turnPoList.push(line);
      this.turnPoList.forEach(element => {
        element.totalQuantity = this.calculateQntLine(element);
      });
      this.turnAdded.totalPoQnt = this.claculatetotalQntLines(this.turnPoList);
      this.turnAdded.totalPoTTC = this.claculatetotalPriceLines(this.turnPoList);

    }

    this.vehicleCategoryToDeliver();
  }



  loadPurchaseOrderData(search: string = '') {
    let searchStatut = 'orderStatus.id!' + 1;
    this.spinner.show();
    this.purchaseOrderService.find(searchStatut).subscribe(
      data => {
        this.purchaseOrders = data;
        this.spinner.hide();
      },
      error => { this.spinner.hide() },
      () => this.spinner.hide()
    );
  }

  onMovePoToSource(event) {
    let purchaseOrder: PurchaseOrder = event.items[0];
    this.turnPoList = this.turnPoList.filter(
      p => p.code !== purchaseOrder.code);
    this.turnAdded.totalPoQnt = this.claculatetotalQntLines(this.turnPoList);
    this.turnAdded.totalPoTTC = this.claculatetotalPriceLines(this.turnPoList);
  }

  onMovePoToTarget(event) {
    let purchaseOrder: PurchaseOrder = event.items[0];
    this.verifiedClosingDayAccount('supplier.code~' + purchaseOrder.supplier.code);
    let exist: Boolean = false;
    this.turnPoList.forEach(element => { if (element.code == purchaseOrder.code) { exist = true; } });
    if (exist == false) { this.onChargedTurnByPo(purchaseOrder); }
    else if (exist == true) {
      this.toastr.warning('Déja Existe', 'avertissement');
      this.purchaseOrderLoading.splice(this.purchaseOrderLoading.length - 1, 1);
    }
  }


  onChargedTurnByPo(puchaseOrder: PurchaseOrder) {
    let sum: number = 0;
    let purchaseOrderLines: PurchaseOrderLine[] = [];
    let tunPo = new TurnSoPo(
      puchaseOrder.code,
      puchaseOrder.totalPriceHT,
      puchaseOrder.totalPriceTTC,
      puchaseOrder.orderStatus,
      null,
      puchaseOrder,
    )
    this.purchaseOrderLineService.find('purshaseOrder.id:' + puchaseOrder.id).subscribe(
      data => {
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
        this.turnAdded.totalPoQnt = this.claculatetotalQntLines(this.turnPoList);
        this.turnAdded.totalPoTTC = this.claculatetotalPriceLines(this.turnPoList);

      }
    );

  }


  vehicleCategoryToDeliver() {
    let qntSo = this.turnAdded.totalSoQnt > this.turnAdded.totalPoQnt ? this.turnAdded.totalSoQnt : this.turnAdded.totalPoQnt;
    this.vehicleCatsToDeliverSort = this.vehicleCatList.sort(function (a, b) {
      return (Number(a.tonnage) - Number(b.tonnage))
    })
    this.vehicleCatsToDeliver = [];
    this.onSearchVehicleCategoryToDeliverByTonnage(qntSo);
  }
  onSearchVehicleCategoryToDeliverByTonnage(qte) {
    let vehicleCat: VehicleCategory = new VehicleCategory();
    let valide = 0;
    let lastIndex = this.vehicleCatsToDeliverSort.length - 1;
    let pourcentage = 0;
    if (this.vehicleCatsToDeliverSort[lastIndex].tonnage >= qte) {
      vehicleCat = this.vehicleCatsToDeliverSort.filter(f => f.tonnage >= qte)[0];
      pourcentage = (qte / vehicleCat.tonnage) * 100;
      vehicleCat.pourcentageToDeliver = Number(pourcentage.toFixed(2));
      this.vehicleCatsToDeliver.push(vehicleCat);
      valide = 1;
      this.vehicleCatsToDeliver = this.onSearchVehicleToDeliveByCategorySelected();
    } else if (this.vehicleCatsToDeliverSort[lastIndex].tonnage <= qte) {
      vehicleCat = this.vehicleCatsToDeliverSort[lastIndex];
      pourcentage = 100;
      vehicleCat.pourcentageToDeliver = Number(pourcentage.toFixed(2));
      this.vehicleCatsToDeliver.push(vehicleCat);
      this.onSearchVehicleCategoryToDeliverByTonnage(qte - vehicleCat.tonnage)
    }
  }
  onSearchVehicleToDeliveByCategorySelected() {
    let catalog: CatalogTransportType = new CatalogTransportType();
    let vehicleCats: VehicleCategory[] = [];
    let saleorders: SaleOrder[] = [];
    let transports: Transport[] = [];
    saleorders = this.turnSoList.map(m => m.saleOrder);

    this.vehicleCatsToDeliver.forEach(cat => {
      cat.transports = [];
      this.transportService.findAll().subscribe(data => {
        transports = data;
        transports.forEach((tr) => {
          tr.catalogTransportTypes = [];
          tr.priceTurn = 0;
          saleorders.forEach(so => {
            this.catalogTransportTypeService.find('vehicleCategory.id:' + cat.id + ',zoneSource.code~' + 'fes' + ',zoneDestination.code~' + so.account.deliveryAddress.city + ',transport.id:' + tr.id).subscribe(
              data => {
                if (data[0] != null || data[0] != undefined) {
                  catalog = data[0];
                  tr.catalogTransportTypes.push(catalog);
                  tr.priceTurn += Number(catalog.amountTtc);
                }
              }
            );
          });
          cat.transports = cat.transports.filter(f => f.id !== tr.id);
          cat.transports.push(tr);
        });

      });

      vehicleCats.push(cat);

    });

    this.loadingContainer();

    this.vehicleCatsToDeliver.forEach(vtd => {
      this.loadCategorySos.forEach(lCS => {

        if (vtd.code == lCS.vehicleCategory.code) {
          vtd.numberOfPalette = lCS.totalPalet;
        }

      });


    });


    return vehicleCats;
  }







  // onSearchContainerBySo() {
  //   let surcharge: number = 0;
  //   let stocks: Stock[] = [];
  //   let containers: Container[] = [];
  //   surcharge = this.claculatetotalQntLines(this.turnSoList);
  //   this.turnSoList.forEach(so => {
  //     so.turnLines.forEach(soline => {
  //       soline.saleOrderLine.sotcks = [];
  //       this.stockService.find('saleOrderLine.id:' + soline.saleOrderLine.id).subscribe(
  //         data => {
  //           stocks = data;
  //           soline.saleOrderLine.sotcks.push(...stocks);
  //         });
  //     });
  //      containers=soline.saleOrderLine.sotcks
  //   });
  //   return this.turnSoList;
  // }

  // generateContainer(vehicleCat :VehicleCategory) {
  //   let load: LocationContainerInVehicle[] =[];
  //   let creatloadClone: LocationContainerInVehicle[] = [];
  //   let creatload: LocationContainerInVehicle = new LocationContainerInVehicle();
  //   console.log(vehicleCat);

  //   this.loadCategorySos.forEach(f => {
  //     if(f.vehicleCategory.id ==vehicleCat.id){
  //     load.push(...f.locationContainer);}
  //   })

  //   load.forEach(l => {
  //     if (creatload.i != l.i) {
  //       creatload = new LocationContainerInVehicle();
  //       creatload.i = l.i;
  //       console.log(creatload.i);
  //       creatload.saleOrder = l.saleOrder;
  //       creatload.locationContainer.push(...load.filter(f => f.i == creatload.i));
  //       creatloadClone.push(creatload);
  //       console.log(creatload.i);
  //     }
  //   });


  //   console.log(creatloadClone);




  //   return creatloadClone;
  // }

  loadingTruckByContainer(saleOrder: SaleOrder, stock: Stock, indiceLenght: number, indiceWidth: number, indiceV: number) {
    let locationContainer: LocationContainerInVehicle = new LocationContainerInVehicle();
    if (this.loadCategorySos[indiceV].locationContainer == null && this.loadCategorySos[indiceV].locationContainer == undefined) {
      this.loadCategorySos[indiceV].locationContainer = [];
    }
    locationContainer.length = stock.container.containerType.length;
    locationContainer.width = stock.container.containerType.width;
    locationContainer.saleOrder = saleOrder;
    locationContainer.i = indiceLenght;
    locationContainer.j = indiceWidth;
    locationContainer.containers = stock.container;
    //this.loadCategorySos[indiceV].saleOrderLine=
    this.loadCategorySos[indiceV].weight += stock.quantity * stock.productPack.weight;
    // this.loadCategorySos[indiceV].locationContainer = this.loadCategorySos[indiceV].locationContainer.filter(f => { f.containers.id != locationContainer.containers.id });
    this.loadCategorySos[indiceV].locationContainer.push(locationContainer);
  }

  loadingContainer() {
    let loadCategorySo: LoadCategorySaleOrder = new LoadCategorySaleOrder();
    let lenghtOfTruck: number = 0;
    let widthOfTruck: number = 0;
    let indice: number = 0;
    let indiceLenght: number = 0;
    let indiceWidth: number = 0;
    let existContainer: number = -1;
    let sumWeight: number = 0;
    let weightV: number = 0;
    let indiceVehicleError: boolean = false;
    let totalPalet: number = 0;
    this.loadCategorySos = [];
    this.vehicleCatsToDeliver.forEach(element => {
      loadCategorySo = new LoadCategorySaleOrder();
      loadCategorySo.vehicleCategory = element;
      this.loadCategorySos.push(loadCategorySo);
    });



    lenghtOfTruck = this.loadCategorySos[indice].vehicleCategory.length;
    widthOfTruck = this.loadCategorySos[indice].vehicleCategory.width;
    this.turnSoList.forEach(turnSO => {

      turnSO.turnLines.forEach(line => {

        line.stocks.forEach(stock => {
          existContainer = -1;

          this.loadCategorySos[indice].locationContainer.forEach(load => {
            if (load.containers.id == stock.container.id) { existContainer = 0; }
          });


          if (existContainer != 0) {

            weightV = (this.loadCategorySos[indice].weight == 0 ? (stock.quantity * stock.productPack.weight) : this.loadCategorySos[indice].weight);
            sumWeight = this.loadCategorySos[indice].weight + (stock.quantity * stock.productPack.weight);
            if (sumWeight > this.loadCategorySos[indice].vehicleCategory.tonnage || lenghtOfTruck < stock.container.containerType.length) {

              if (this.loadCategorySos[indice + 1] != undefined || this.loadCategorySos[indice + 1] != null) {

                indice = indice + 1; indiceLenght = 0; indiceWidth = 0; totalPalet = 0;
                lenghtOfTruck = this.loadCategorySos[indice].vehicleCategory.length;
                widthOfTruck = this.loadCategorySos[indice].vehicleCategory.width;
                indiceVehicleError == false
              } else {
                indiceVehicleError == true;
              }
            }

            if (indiceVehicleError == false) {
              console.log("indice" + indice);
              console.log(" line : " + line.saleOrderLine.id);
              console.log(" stock : " + stock.id);
              console.log(" container : " + stock.container.id);
              console.log(" qnt : " + stock.quantity * stock.productPack.weight);

              if (lenghtOfTruck >= stock.container.containerType.length) {
                console.log("lenghttruck > containeir lenght : " + lenghtOfTruck + '>=' + stock.container.containerType.length);
                if (widthOfTruck >= stock.container.containerType.width) {
                  lenghtOfTruck = lenghtOfTruck - stock.container.containerType.length;
                  widthOfTruck = widthOfTruck - stock.container.containerType.width;
                  this.loadingTruckByContainer(turnSO.saleOrder, stock, indiceLenght, indiceWidth, indice);
                  indiceWidth = indiceWidth + 1;
                }
                else if (widthOfTruck < stock.container.containerType.width) {
                  console.log("widthOfTruck > containeir width" + widthOfTruck + '<' + stock.container.containerType.width);
                  indiceLenght = indiceLenght + 1;
                  indiceWidth = 0;
                  widthOfTruck = this.loadCategorySos[indice].vehicleCategory.width;
                  lenghtOfTruck = lenghtOfTruck - stock.container.containerType.length;
                  widthOfTruck = widthOfTruck - stock.container.containerType.width;
                  this.loadingTruckByContainer(turnSO.saleOrder, stock, indiceLenght, indiceWidth, indice);
                  indiceWidth = 1;
                }

                this.loadCategorySos[indice].totalPalet += 1;

              }

            }
          }
        });
      });
    });
    console.log(this.loadCategorySos);


    // this.generateContainer()
  }


  verifiedClosingDayAccount(search: String) {
    let planning: Planning = new Planning();
    const formValue = this.turnForm.value;
    var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    this.turnAdded.dateDelivery = formValue['fDateLivraison'];
    this.planningService.find(search + ',day~' + days[this.turnAdded.dateDelivery.getDay()]).subscribe(
      data => {
        planning = data[0];
        if (planning != null || planning != undefined) {

          if (planning.closingDay == true) {
            this.toastr.warning('jour Fermeture', 'avertissement');
          }
        }
      });
  }
  verifiedHolidayByDateTTurn() {
    let day: string;
    let month: string;
    let holidays: Holiday[] = [];
    const formValue = this.turnForm.value;
    this.turnAdded.dateDelivery = formValue['fDateLivraison'];
    day = this.turnAdded.dateDelivery.getDate().toString();
    month = (this.turnAdded.dateDelivery.getMonth() + 1).toString();
    this.holidayService.find('holidayDay:' + day + ',holidayMonth:' + month).subscribe(
      data => {
        holidays = data;
        if (holidays.length > 0) {
          this.toastr.warning('Jour Férié', 'avertissement');
        }
      }
    );
  }


  calculatePriceTurnSo() {
    let sum: number = 0;
    let totalSum: number = 0;
    let catalogTransports: CatalogTransportType;
    let cat: VehicleCategory[] = [];
    this.chargeForm();
    this.turnSoList.forEach((f, index) => {
      // console.log(l.saleOrderLine?.saleOrder.id);

      cat = this.loadCategorySos.filter(l => {l.saleOrderLine?.saleOrder.id == f.saleOrder.id}).map(m => m.vehicleCategory);
      console.log(cat);

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
     }
     );
  }








  calculatePriceTurnPo() {
    let sum: number = 0;
    let totalSum: number = 0;
    let catalogTransports: CatalogTransportType;
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
    let codeCat = formValue['fTypeVehicule'];
    this.vehicleService
      .find('vehicleCategory.code~' + codeCat.code + ',transport.id:' + codeTrans.id)
      .subscribe(data => {
        this.vehicleList = data;
      });
  }

  onSelectChangeCatVehicle(event) {

    let codeCat = event.value ? event.value : event;
    console.log(codeCat);

    this.transportList = codeCat.transports;
    // this.turnAdded.vehicleCategory = codeCat;
    let sum: number = 0;
    this.totalqntV = codeCat.tonnage;
    if (this.turnAdded.totalSoQnt > codeCat.tonnage) {
      this.catVehiculeQnt = true;
      this.catVehiculeQntSucces = false;
    }
    else {
      this.catVehiculeQnt = false;
      this.catVehiculeQntSucces = true;

    }
  }

  onSelectDriver(event) {
    console.log(event.itemValue.code);



    this.turnTransports.forEach(tr => {
      tr.drivers.forEach(trDrv => {
        if (trDrv.code == event.itemValue.code) {
          console.log("true driver ");
          this.toastr.warning('Chauffeur ' + event.itemValue.name + ' Deja Affecté', 'avertissement');
        }
      }
      );
    });




  }
  editTurnTransport() {
    let registrationNumber, categoryCode;
    let existDriver: Boolean = false;
    this.chargeForm();

    this.selectedturnTransport.drivers.forEach(drv => {

      this.turnTransports.forEach(tr => {
        tr.drivers.forEach(trDrv => {
          if (trDrv.code == drv.code) {
            console.log("true driver ");
            existDriver = true;
          }
        }
        );
      });
    });
    if (existDriver == false) {
      registrationNumber = this.selectedturnTransport?.vehicle?.registrationNumber;
      categoryCode = this.selectedturnTransport?.vehicle?.vehicleCategory?.code;


      this.turnTransports = this.turnTransports.filter(f => (f.vehicle.registrationNumber != registrationNumber));
      this.turnTransports.push(this.selectedturnTransport);
      this.selectedturnTransport = new TurnTransport();
      this.turnForm.patchValue({
        fVehicule: this.selectedturnTransport.vehicle,
        fTransport: this.selectedturnTransport.transport,
        fDrivers: this.selectedturnTransport.drivers,
        fTypeVehicule: this.selectedturnTransport?.vehicleCategory,
      });

    } else if (existDriver == true) {
      this.toastr.warning('Chauffeur Deja Affecté', 'avertissement');

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
  claculatetotalQntLines(turnSoPo: TurnSoPo[]) {

    let sum: number = 0;
    let total: number = 0;
    turnSoPo.forEach(element => {
      total += element.totalQuantity;
    });
    return total;
  }
  calculatePriceLine(d: TurnSoPo) {
    let sum: number = 0;
    d.turnLines.forEach(element => {

      sum += Number(element.totalPriceTTC);
    });
    return sum;
  }

  claculatetotalPriceLines(turnSoPo: TurnSoPo[]) {
    let sum: number = 0;
    let total: number = 0;
    turnSoPo.forEach(element => {
      total += this.calculatePriceLine(element);

    });
    console.log(total);

    return total;
  }



  previous() {
    this.activeIndex--;
  }
  next() {
    if (this.activeIndex == 0) {
      this.vehicleCategoryToDeliver();
      this.verifiedHolidayByDateTTurn();
      this.activeIndex++;
    }
    else if (this.activeIndex == 2) {
      this.calculatePriceTurnSo();
      this.calculatePriceTurnPo();
      this.activeIndex++;
    }
    else {
      this.activeIndex++;
    }
  }

  onShowDialogligne(line, event) {
    this.showDialogLine = true;
    this.turnSoPoEdited = (line);
  }
  onHideDialogLigne(event) {
    this.showDialogLine = event;
  }



}
