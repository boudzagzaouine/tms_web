import { TarificationTransportServiceAccount } from './../../../../shared/models/tarification-transport-service-account';
import { TransportPlanServiceCatalog } from './../../../../shared/models/transport-plan-service-catalog';
import { Vat } from './../../../../shared/models/vat';
import { Trajet } from './../../../../shared/models/trajet';
import { VatService } from './../../../../shared/services/api/vat.service';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AccountPricing } from "./../../../../shared/models/account-pricing";
import { CatalogPricingService } from "../../../../shared/services/api/catalog-pricing.service";
import { CatalogPricing } from "./../../../../shared/models/catalog-pricing";
import { TransportPlanService } from "./../../../../shared/services/api/transport-plan.service";
import { AccountPricingService } from "./../../../../shared/services/api/account-pricing.service";
import { ContractAccount } from "./../../../../shared/models/contract-account";
import { ContractAccountService } from "./../../../../shared/services/api/contract-account.service";
import { OrderTransportInfoLine } from "./../../../../shared/models/order-transport-info-line";
import { OrderTransportInfo } from "./../../../../shared/models/order-transport-info";
import { Transport } from "./../../../../shared/models/transport";
import { OrderTransport } from "./../../../../shared/models/order-transport";
import { VehicleService } from "./../../../../shared/services/api/vehicle.service";
import { ConfirmationService } from "primeng/api";
import { TransportServcie } from "./../../../../shared/services/api/transport.service";
import { VehicleCategoryService } from "./../../../../shared/services/api/vehicle-category.service";
import { VehicleCategory } from "./../../../../shared/models/vehicle-category";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Vehicle } from "./../../../../shared/models";
import { OrderTransportService } from "./../../../../shared/services/api/order-transport.service";

@Component({
  selector: "app-tarification",
  templateUrl: "./tarification.component.html",
  styleUrls: ["./tarification.component.scss"],
})
export class TarificationComponent implements OnInit {
  @Output() previousstep = new EventEmitter<boolean>();
  @Output() nextstep = new EventEmitter<boolean>();
  selectedVehicleCategory: VehicleCategory = new VehicleCategory();
  selectedContractAccount: ContractAccount = new ContractAccount();
  contractAccountList: ContractAccount[] = [];
  tarificationForm: FormGroup;

  selectedCatalogPricing: CatalogPricing = new CatalogPricing();
  selectedAccountPricing: AccountPricing = new AccountPricing();

  orderTransportInfoAllerLignes: OrderTransportInfoLine[] = [];
  orderTransportInfoRetourLignes: OrderTransportInfoLine[] = [];

  vehicleCatList: VehicleCategory[] = [];
  vehicleCatsToDeliverSort: VehicleCategory[] = [];
  vehicleCatsToDeliver: VehicleCategory[] = [];
  selectOrderTransport: OrderTransport = new OrderTransport();
  vehicleList: Vehicle[] = [];
  priceTransport: number = 0;
  priceRetour: number = 0;
  selectRadio: Boolean = true;
  marginRate: number =0;
  marginValue: number = 0;
  tarificationAccount:number=0;
  vatTarif : Vat= new Vat();
   tarificationTransportServiceAccountList : TarificationTransportServiceAccount[]=[];
   tarifExist:Boolean=false;

  constructor(
    private vehicleCategoryService: VehicleCategoryService,
    private orderTransportService: OrderTransportService,
    private vatService:VatService,
    private transportPlanService: TransportPlanService,
    private transportService: TransportServcie,
    private catalogPricingService: CatalogPricingService,
    private confirmationService: ConfirmationService,
    private contractAccountService: ContractAccountService,
    private accountPricingService: AccountPricingService,
    private vehicleService: VehicleService,
    private vateService:VatService
  ) {}

  ngOnInit() {
    this.selectOrderTransport = this.orderTransportService.getOrderTransport();
    this.orderTransportInfoAllerLignes =
      this.orderTransportService?.getorderTransportInfoAller()
        ? this.orderTransportService.getorderTransportInfoAller()
            .orderTransportInfoLines
        : [];

    this.selectedVehicleCategory = this.selectOrderTransport.vehicleCategory;
    console.log(this.selectOrderTransport);

    // this.orderTransportTransports=this.orderTransportService.getOrderTransport().orderTransportTransport;

    this.marginRate = this.selectOrderTransport.marginRate;
    this.marginValue = this.selectOrderTransport.marginValue;
    console.log(this.selectOrderTransport.priceHT);
    this.onSearchCatalogPricing();
    this.vatService.findById(5).subscribe(
      data=>{
        this.vatTarif=data;
      }
    );
    if(this.selectOrderTransport?.loadingType?.id ==2  ){
      console.log("groupage");
      this.calculatePriceGroupage();
    }
    this.initForm();

  }

  initForm() {
    this.tarificationForm = new FormGroup({
      priceHT: new FormControl(
        this.selectOrderTransport.priceHT,
        Validators.required
      ),
    });
  }

  onSearchCatalogPricing() {
    let trajet;
      trajet =

      this.catalogPricingService.find(
        "turnType.id:" +
          this.selectOrderTransport?.turnType?.id +
          ",vehicleCategory.id:" +
          this.selectOrderTransport?.vehicleCategory?.id +
          ",vehicleTray.id:" +
          this.selectOrderTransport?.vehicleTray?.id +
          ",loadingType.id:" +
          this.selectOrderTransport?.loadingType?.id +
          ",trajet.id:" +
          this.selectOrderTransport?.trajet?.id

      )
      .subscribe((data) => {
        console.log(data);
        if (data[0]) {
          this.selectedCatalogPricing = data[0];
          this.tarifExist=true;

          this.onSearchAccountPricingByAccount();
        }
        else{
          this.tarifExist=false;

        }

      });
  }

  onSearchAccountPricingByAccount() {

    this.accountPricingService
      .find(
        "company.id:" +
          this.selectOrderTransport?.account?.company?.id +
          ",turnType.id:" +
          this.selectOrderTransport?.turnType?.id +
          ",vehicleCategory.id:" +
          this.selectOrderTransport?.vehicleCategory?.id +
          ",vehicleTray.id:" +
          this.selectOrderTransport?.vehicleTray?.id +
          ",loadingType.id:" +
          this.selectOrderTransport?.loadingType?.id +
          ",trajet.id:" +
          this.selectOrderTransport?.trajet?.id+
          ",account.id:" +
          this.selectOrderTransport?.account?.id
      )
      .subscribe((data) => {
        console.log(data);
        if (data[0]) {
          this.selectedAccountPricing = data[0];
          console.log("pricAccount");
console.log( this.tarificationAccount);

          this.tarificationAccount=1;
          let purchase = this.selectedCatalogPricing.purchaseAmountHt;
          let sale = this.selectedAccountPricing.saleAmountHt;
          console.log(this.marginRate);

          this.calculatMarge(purchase,sale);


          this.tarificationForm.patchValue({
            priceHT: this.selectedAccountPricing.saleAmountHt,
          });

          this.tarificationForm.controls["priceHT"].disable();
        } else {
          this.tarificationAccount=2;
          this.onSearchAccountPricing();

        }
      });
  }
  onSearchAccountPricing() {

    this.accountPricingService
      .find(
        "company.id:" +
          this.selectOrderTransport?.account?.company?.id +
          ",turnType.id:" +
          this.selectOrderTransport?.turnType?.id +
          ",vehicleCategory.id:" +
          this.selectOrderTransport?.vehicleCategory?.id +
          ",vehicleTray.id:" +
          this.selectOrderTransport?.vehicleTray?.id +
          ",loadingType.id:" +
          this.selectOrderTransport?.loadingType?.id +
          ",trajet.id:" +
          this.selectOrderTransport?.trajet?.id
      )
      .subscribe((data) => {
        console.log(data);
        if (data[0]) {
          this.selectedAccountPricing = data[0];
          console.log("pricAccount");
console.log( this.tarificationAccount);

          this.tarificationAccount=1;
          let purchase = this.selectedCatalogPricing.purchaseAmountHt;
          let sale = this.selectedAccountPricing.saleAmountHt;
          console.log(this.marginRate);

          this.calculatMarge(purchase,sale);


          this.tarificationForm.patchValue({
            priceHT: this.selectedAccountPricing.saleAmountHt,
          });

          this.tarificationForm.controls["priceHT"].disable();
        } else {
          this.tarificationAccount=2;
          console.log( this.tarificationAccount);

          console.log("priceCatalog");

          let purchase = this.selectedCatalogPricing.purchaseAmountHt;
          let sale = this.selectedCatalogPricing.saleAmountHt;
          this.calculatMarge(purchase,sale);

        }
      });
  }

  onInputPrice(event) {
    let purchase = this.selectedCatalogPricing.purchaseAmountHt;
    let sale = event.value;



    this.calculatMarge(purchase,sale);
  }

  calculatMarge(purchaseAmount:number, saleAmount:number){

    let rate =((saleAmount - purchaseAmount) / purchaseAmount) * 100;
   let value = saleAmount - purchaseAmount;
    this.marginRate = rate ? rate : 0;
    this.marginValue =value ? value :0;

  }

  previous() {
if(this.selectOrderTransport.loadingType.id==1 ){
  this.calculatePrice();

}

      this.orderTransportService.addPrice(this.selectOrderTransport.priceHT,this.selectOrderTransport.priceTTC,this.selectOrderTransport.vat,this.selectOrderTransport.priceVat);
      this.orderTransportService.addMarginRate(this.marginRate);
    this.orderTransportService.addMarginValue(this.marginValue);

    this.previousstep.emit(true);
  }
  calculatePrice(){
    this.selectOrderTransport.priceHT =
    this.tarificationForm?.controls["priceHT"]?.value != undefined ?this.tarificationForm.controls["priceHT"].value : this.selectOrderTransport.priceHT ;
    console.log(  this.selectOrderTransport.priceHT);
console.log(this.selectedCatalogPricing);

 this.selectOrderTransport.vat=this.selectedCatalogPricing?.saleVat?this.selectedCatalogPricing?.saleVat:this.vatTarif;
 console.log(   this.selectOrderTransport.vat);

    const amountTva = (this.selectOrderTransport.priceHT / 100) *  this.selectOrderTransport?.vat?.value;
    const priceTTC = this.selectOrderTransport.priceHT + amountTva;
    this.selectOrderTransport.priceTTC=priceTTC;
    this.selectOrderTransport.priceVat=amountTva;
    console.log("helooo");
    console.log(this.selectOrderTransport.priceTTC);
    console.log(this.selectOrderTransport.priceVat);


  }

  loadForm() {}

  next() {

    if (this.tarificationForm.invalid  ) {
      return;
    }

   if( this.tarificationForm?.controls["priceHT"]?.value!=0){



    if(this.selectOrderTransport.loadingType.id==1){
      this.calculatePrice();

    }
      this.selectOrderTransport.totalPriceHT =(this.selectOrderTransport.priceHT) + (this.selectOrderTransport.totalServiceHT?this.selectOrderTransport.totalServiceHT:0);
    this.selectOrderTransport.totalPriceTTC =(this.selectOrderTransport.priceTTC )+ (this.selectOrderTransport.totalServiceTTC?this.selectOrderTransport.totalServiceTTC:0);
    this.selectOrderTransport.totalPriceVat =(this.selectOrderTransport.priceVat) + (this.selectOrderTransport.totalServiceVat?this.selectOrderTransport.totalServiceVat:0);
    this.orderTransportService.addTotalPrice(this.selectOrderTransport.totalPriceHT,this.selectOrderTransport.totalPriceTTC,this.selectOrderTransport.vat,this.selectOrderTransport.totalPriceVat);

    this.orderTransportService.addPrice(this.selectOrderTransport.priceHT,this.selectOrderTransport.priceTTC,this.selectOrderTransport.vat,this.selectOrderTransport.priceVat);
    this.orderTransportService.addMarginRate(this.marginRate);
    this.orderTransportService.addMarginValue(this.marginValue);

    //this.orderTransportService.addOrderTransportTransport(this.orderTransportTransports);
    this.nextstep.emit(true);
  }
  }


  calculatePriceGroupage(){
    console.log();
    this.selectOrderTransport.priceHT=0;
    this.selectOrderTransport.priceTTC=0;
    this.selectOrderTransport.priceVat=0;
    this.orderTransportInfoAllerLignes.forEach(element => {
  this.selectOrderTransport.priceHT+=+(element.priceHT as number)
      this.selectOrderTransport.priceTTC+=+(element.priceTTC as number)
      this.selectOrderTransport.priceVat+=+((element.priceTTC - element.priceHT) as number)
    });
  //  this.calculatePrice();
    this.calculatePriceTransport();
  }


  calculatePriceTransport(){
let accountService :TransportPlanServiceCatalog[]=[];

this.orderTransportInfoAllerLignes.forEach(oTInfoAller=>{
  accountService=[];

  accountService =this.selectOrderTransport.orderTransportServiceCatalogs.filter(otSC=>
    otSC.account.id==oTInfoAller?.account?.id && otSC?.address?.id==oTInfoAller.address.id
  );
  console.log(accountService);

  let tarificationTransportServiceAccount : TarificationTransportServiceAccount=new TarificationTransportServiceAccount();
  tarificationTransportServiceAccount.priceService=0
  tarificationTransportServiceAccount.priceTransport=0;
  tarificationTransportServiceAccount.totalPrice=0;

  tarificationTransportServiceAccount.account=oTInfoAller.account;
  tarificationTransportServiceAccount.address=oTInfoAller.address;

  if(accountService[0]){
  accountService.forEach(tS=>{
    console.log(tS);

    tarificationTransportServiceAccount.priceService+=+ tS.totalSalePriceHT

  })}
  else {
    tarificationTransportServiceAccount.priceService=0;
  }

    tarificationTransportServiceAccount.priceTransport=oTInfoAller.priceHT;
    tarificationTransportServiceAccount.totalPrice=oTInfoAller.priceHT +   tarificationTransportServiceAccount.priceService;

    this.tarificationTransportServiceAccountList.push(tarificationTransportServiceAccount)



})

  }



}
