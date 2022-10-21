import { LocationContainerInVehicle } from './../../../../shared/models/location-container-In-Vehicle';
import { Stock } from './../../../../shared/models/stock';
import { LoadCategorySaleOrder } from './../../../../shared/models/load-category-saleOrder';
import { CatalogTransportTypeServcie } from './../../../../shared/services/api/Catalog-Transport-Type.service';
import { TransportServcie } from './../../../../shared/services/api/transport.service';
import { Transport } from './../../../../shared/models/transport';
import { SaleOrder } from './../../../../shared/models/sale-order';
import { CatalogTransportType } from './../../../../shared/models/CatalogTransportType';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { TurnSoPo } from './../../../../shared/models/turn-so-po';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Turn } from './../../../../shared/models/turn';

@Component({
  selector: 'app-turn-category',
  templateUrl: './turn-category.component.html',
  styleUrls: ['./turn-category.component.scss']
})
export class TurnCategoryComponent implements OnInit {

  @Output() showDialog = new EventEmitter<boolean>();
  @Input () turnSoList: Array<TurnSoPo> = [];

  @Input ()   turnAdded: Turn = new Turn();
  displayDialog: boolean;
  vehicleCatsToDeliver: VehicleCategory[] = [];
  vehicleCatsToDeliverSort: VehicleCategory[] = [];
  vehicleCatList: VehicleCategory[] = [];
  loadCategorySos: LoadCategorySaleOrder[] = [];

  constructor(private vehicleCategoryService :VehicleCategoryService,
              private transportService : TransportServcie,
              private catalogTransportTypeService:CatalogTransportTypeServcie) { }

  ngOnInit() {
    this.displayDialog = true;

    this.vehicleCategoryService.findAll().subscribe((data) => {
      this.vehicleCatList = data;
          this.vehicleCategoryToDeliver();
    });

  }

  vehicleCategoryToDeliver() {
    let qntSo =
      this.turnAdded.totalSoQnt > this.turnAdded.totalPoQnt
        ? this.turnAdded.totalSoQnt
        : this.turnAdded.totalPoQnt;
    this.vehicleCatsToDeliverSort = this.vehicleCatList.sort(function (a, b) {
      return Number(a.tonnage) - Number(b.tonnage);
    });
    this.vehicleCatsToDeliver = [];
    console.log(qntSo);

    this.onSearchVehicleCategoryToDeliverByTonnage(qntSo);
  }
  onSearchVehicleCategoryToDeliverByTonnage(qte) {
    let vehicleCat: VehicleCategory = new VehicleCategory();
    let valide = 0;
    let lastIndex = this.vehicleCatsToDeliverSort.length - 1;
    let pourcentage = 0;
    console.log(this.vehicleCatsToDeliverSort);

    if (this.vehicleCatsToDeliverSort[lastIndex]?.tonnage >= qte) {
      vehicleCat = this.vehicleCatsToDeliverSort.filter(
        (f) => f.tonnage >= qte
      )[0];
      pourcentage = (qte / vehicleCat.tonnage) * 100;
      vehicleCat.pourcentageToDeliver = Number(pourcentage.toFixed(2));
      this.vehicleCatsToDeliver.push(vehicleCat);
      valide = 1;
      this.vehicleCatsToDeliver =
        this.onSearchVehicleToDeliveByCategorySelected();
    } else if (this.vehicleCatsToDeliverSort[lastIndex].tonnage <= qte) {
      vehicleCat = this.vehicleCatsToDeliverSort[lastIndex];
      pourcentage = 100;
      vehicleCat.pourcentageToDeliver = Number(pourcentage.toFixed(2));
      this.vehicleCatsToDeliver.push(vehicleCat);
      this.onSearchVehicleCategoryToDeliverByTonnage(qte - vehicleCat.tonnage);
    }
  }
  onSearchVehicleToDeliveByCategorySelected() {
    let catalog: CatalogTransportType = new CatalogTransportType();
    let vehicleCats: VehicleCategory[] = [];
    let saleorders: SaleOrder[] = [];
    let transports: Transport[] = [];
    saleorders = this.turnSoList.map((m) => m.saleOrder);

    this.vehicleCatsToDeliver.forEach((cat) => {
      cat.transports = [];
      this.transportService.findAll().subscribe((data) => {
        transports = data;
        transports.forEach((tr) => {
          tr.catalogTransportTypes = [];
          tr.priceTurn = 0;
          saleorders.forEach((so) => {
            this.catalogTransportTypeService
              .find(
                "vehicleCategory.id:" +
                  cat.id +
                  ",zoneSource.code~" +
                  "fes" +
                  ",zoneDestination.code~" +
                  so.account.deliveryAddress.city +
                  ",transport.id:" +
                  tr.id
              )
              .subscribe((data) => {
                if (data[0] != null || data[0] != undefined) {
                  catalog = data[0];
                  tr.catalogTransportTypes.push(catalog);
                  tr.priceTurn += Number(catalog.amountTtc);
                }
              });
          });
          cat.transports = cat.transports.filter((f) => f.id !== tr.id);
          cat.transports.push(tr);
        });
      });

      vehicleCats.push(cat);
    });

    this.loadingContainer();

    this.vehicleCatsToDeliver.forEach((vtd) => {
      this.loadCategorySos.forEach((lCS) => {
        if (vtd.code == lCS.vehicleCategory.code) {
          vtd.numberOfPalette = lCS.totalPalet;
        }
      });
    });

    return vehicleCats;
  }



  loadingTruckByContainer(
    saleOrder: SaleOrder,
    stock: Stock,
    indiceLenght: number,
    indiceWidth: number,
    indiceV: number
  ) {
    let locationContainer: LocationContainerInVehicle =
      new LocationContainerInVehicle();
    if (
      this.loadCategorySos[indiceV].locationContainer == null &&
      this.loadCategorySos[indiceV].locationContainer == undefined
    ) {
      this.loadCategorySos[indiceV].locationContainer = [];
    }
    locationContainer.length = stock.container.containerType.length;
    locationContainer.width = stock.container.containerType.width;
    locationContainer.saleOrder = saleOrder;
    locationContainer.i = indiceLenght;
    locationContainer.j = indiceWidth;
    locationContainer.containers = stock.container;
    //this.loadCategorySos[indiceV].saleOrderLine=
    this.loadCategorySos[indiceV].weight +=
      stock.quantity * stock.productPack.weight;
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
    this.vehicleCatsToDeliver.forEach((element) => {
      loadCategorySo = new LoadCategorySaleOrder();
      loadCategorySo.vehicleCategory = element;
      this.loadCategorySos.push(loadCategorySo);
    });

    lenghtOfTruck = this.loadCategorySos[indice].vehicleCategory.length;
    widthOfTruck = this.loadCategorySos[indice].vehicleCategory.width;
    this.turnSoList.forEach((turnSO) => {
      turnSO.turnLines.forEach((line) => {
        line.stocks.forEach((stock) => {
          existContainer = -1;

          this.loadCategorySos[indice].locationContainer.forEach((load) => {
            if (load.containers.id == stock.container.id) {
              existContainer = 0;
            }
          });

          if (existContainer != 0) {
            weightV =
              this.loadCategorySos[indice].weight == 0
                ? stock.quantity * stock.productPack.weight
                : this.loadCategorySos[indice].weight;
            sumWeight =
              this.loadCategorySos[indice].weight +
              stock.quantity * stock.productPack.weight;

            if (
              sumWeight >
                this.loadCategorySos[indice].vehicleCategory.tonnage ||
              lenghtOfTruck < stock.container.containerType?.length
            ) {
              if (
                this.loadCategorySos[indice + 1] != undefined ||
                this.loadCategorySos[indice + 1] != null
              ) {
                indice = indice + 1;
                indiceLenght = 0;
                indiceWidth = 0;
                totalPalet = 0;
                lenghtOfTruck =
                  this.loadCategorySos[indice].vehicleCategory.length;
                widthOfTruck =
                  this.loadCategorySos[indice].vehicleCategory.width;
                indiceVehicleError == false;
              } else {
                indiceVehicleError == true;
              }
            }

            if (indiceVehicleError == false) {
              console.log("indice" + indice);
              console.log(" line : " + line.saleOrderLine.id);
              console.log(" stock : " + stock.id);
              console.log(" container : " + stock.container.id);
              console.log(
                " qnt : " + stock.quantity * stock.productPack.weight
              );

              if (lenghtOfTruck >= stock.container.containerType?.length) {
                console.log(
                  "lenghttruck > containeir lenght : " +
                    lenghtOfTruck +
                    ">=" +
                    stock.container.containerType.length
                );
                if (widthOfTruck >= stock.container.containerType.width) {
                  lenghtOfTruck =
                    lenghtOfTruck - stock.container.containerType.length;
                  widthOfTruck =
                    widthOfTruck - stock.container.containerType.width;
                  this.loadingTruckByContainer(
                    turnSO.saleOrder,
                    stock,
                    indiceLenght,
                    indiceWidth,
                    indice
                  );
                  indiceWidth = indiceWidth + 1;
                } else if (widthOfTruck < stock.container.containerType.width) {
                  console.log(
                    "widthOfTruck > containeir width" +
                      widthOfTruck +
                      "<" +
                      stock.container.containerType.width
                  );
                  indiceLenght = indiceLenght + 1;
                  indiceWidth = 0;
                  widthOfTruck =
                    this.loadCategorySos[indice].vehicleCategory.width;
                  lenghtOfTruck =
                    lenghtOfTruck - stock.container.containerType.length;
                  widthOfTruck =
                    widthOfTruck - stock.container.containerType.width;
                  this.loadingTruckByContainer(
                    turnSO.saleOrder,
                    stock,
                    indiceLenght,
                    indiceWidth,
                    indice
                  );
                  indiceWidth = 1;
                }

                this.loadCategorySos[indice].totalPalet += 1;
              }
            }
          }
        });
      });
    });

    // this.generateContainer()
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

  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }
}
