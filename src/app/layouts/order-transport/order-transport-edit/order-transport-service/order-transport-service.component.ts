import { Address } from './../../../../shared/models/address';
import { AddressService } from './../../../../shared/services/api/address.service';
import { OrderTransportService } from './../../../../shared/services/api/order-transport.service';
import { OrderTransport } from './../../../../shared/models/order-transport';
import { AccountPricingServiceService } from './../../../../shared/services/api/account-pricing-service.service';
import { CatalogService } from "./../../../../shared/models/catalog-service";
import { VatService } from "./../../../../shared/services/api/vat.service";
import { Vat } from "./../../../../shared/models/vat";
import { AccountService } from "./../../../../shared/services/api/account.service";
import { CatalogServiceService } from "./../../../../shared/services/api/catalog-service.service";
import { TransportAccountServiceService } from "./../../../../shared/services/api/transport-account-service.service";
import { TransportAccountService } from "./../../../../shared/models/transport-account-service";
import { TransportServiceService } from "./../../../../shared/services/api/transport-service.service";
import { Transport } from "./../../../../shared/models/transport";
import { Account } from "./../../../../shared/models/account";
import { Company } from "./../../../../shared/models/company";
import { TransportPlanServiceCatalogService } from "./../../../../shared/services/api/transport-Plan-service-catalog.service";
import { ProductServiceService } from "../../../../shared/services/api/product-service.service";
import { AuthenticationService } from "../../../../shared/services/api/authentication.service";
import { Subscription } from "rxjs";
import { Product } from "../../../../shared/models/product";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TransportPlanServiceCatalog } from "../../../../shared/models/transport-plan-service-catalog";
import { TransportServcie } from "./../../../../shared/services/api/transport.service";

@Component({
  selector: 'app-order-transport-service',
  templateUrl: './order-transport-service.component.html',
  styleUrls: ['./order-transport-service.component.css']
})
export class OrderTransportServiceComponent implements OnInit {

  @Input() selectedAccount: Account = new Account();

  @Input() selectedTransportServiceCatalog: TransportPlanServiceCatalog =
    new TransportPlanServiceCatalog();
  @Input() editMode = false;
  @Output() transportProductEdited =
    new EventEmitter<TransportPlanServiceCatalog>();
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier un Catalogue ";
  transportProductForm: FormGroup;
  transportProductCode: string;
  productList: Product[] = [];
  vats: Vat[];
  accountList: Account[] = [];
  transportList: Transport[] = [];
  addressList: Address[] = [];

  subscriptions = new Subscription();
selectDefaulVat:Vat = new Vat();
selectOrderTransport :OrderTransport= new OrderTransport();
  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,
    private productService: ProductServiceService,
    private vatService: VatService,
    private accountService: AccountService,
    private transportService: TransportServcie,
    private accountPricingServiceService: AccountPricingServiceService,
    private catalogServiceService: CatalogServiceService,
    private orderTransportService:OrderTransportService,
    private addressService:AddressService,
  ) {}

  ngOnInit() {

    this.selectOrderTransport=this.orderTransportService.getOrderTransport();

    this.subscriptions.add(
      this.vatService.findAll().subscribe((data: Vat[]) => {
        this.vats = data;
        this.selectDefaulVat=this.vats.filter(f=>f.id==4)[0];
      })
    );
    this.subscriptions.add(
      this.accountService
        .find("company.id:" + this.selectedAccount.company.id)
        .subscribe((data: Account[]) => {
          this.accountList = data;
        })
    );

    this.subscriptions.add(
      this.transportService.findAll().subscribe((data: Transport[]) => {
        this.transportList = data;
      })
    );

    this.displayDialog = true;
    console.log(this.editMode);

    if (!this.editMode) {
      this.title = "Ajouter un Catalogue";
     this.selectedTransportServiceCatalog = new TransportPlanServiceCatalog();
    }
    this.initForm();
  }

  initForm() {
    this.transportProductForm = this.formBuilder.group({
      product: this.formBuilder.control(
        this.selectedTransportServiceCatalog.product,
        Validators.required
      ),
      quantity: this.formBuilder.control(
        this.selectedTransportServiceCatalog.quantity? this.selectedTransportServiceCatalog.quantity:1
      ),
      dateService: this.formBuilder.control(
        new Date(this.selectedTransportServiceCatalog.dateService)
      ),

      account: this.formBuilder.control(
        this.selectedTransportServiceCatalog.account
      ),

      address: this.formBuilder.control(
        this.selectedTransportServiceCatalog.address
      ),

      salePriceHT: this.formBuilder.control(
        this.selectedTransportServiceCatalog.salePriceHT
      ),
      saleVat: this.formBuilder.control(
        this.selectedTransportServiceCatalog.saleVat
      ),
      salePriceTTC: this.formBuilder.control(
        this.selectedTransportServiceCatalog.salePriceTTC
      ),

      totalSalePriceHT: this.formBuilder.control(
        this.selectedTransportServiceCatalog.totalSalePriceHT
      ),
      totalSalePriceVat: this.formBuilder.control(
        this.selectedTransportServiceCatalog.totalSalePriceVat
      ),

      totalSalePriceTTC: this.formBuilder.control(
        this.selectedTransportServiceCatalog.totalSalePriceTTC
      ),
    });
  }

  onAddressSearch(event) {
    this.addressService
      .find("delivery:true,code~" + event.query)
      .subscribe((data) => (this.addressList = data));
  }

  onSelectAddress(event) {
    this.selectedTransportServiceCatalog.address = event;


  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.transportProductForm.invalid) {
      return;
    }

    this.selectedTransportServiceCatalog.salePriceHT =
      this.transportProductForm.value["salePriceHT"];
    this.selectedTransportServiceCatalog.salePriceTTC =
      this.transportProductForm.value["salePriceTTC"];


      this.selectedTransportServiceCatalog.dateService =
      this.transportProductForm.value["dateService"];

      this.selectedTransportServiceCatalog.quantity =
      this.transportProductForm.value["quantity"];
         this.selectedTransportServiceCatalog.totalSalePriceHT =
      this.transportProductForm.value["totalSalePriceHT"];
      this.selectedTransportServiceCatalog.totalSalePriceVat =
      this.transportProductForm.value["totalSalePriceVat"];
      this.selectedTransportServiceCatalog.totalSalePriceTTC =
      this.transportProductForm.value["totalSalePriceTTC"];

    this.selectedTransportServiceCatalog.owner =
      this.authentificationService.getDefaultOwner();
    console.log(this.selectedTransportServiceCatalog);

    this.transportProductEdited.emit(this.selectedTransportServiceCatalog);
    this.displayDialog = false;
  }

  productSearch(evt) {
    this.productService.find(`code~${evt.query}`).subscribe((data) => {
      this.productList = data;
    });
  }

  onAccountSearch(event) {
    let search;
    if (!isNaN(event.query)) {
      search = "code~" + event.query;
    } else {
      search = "name~" + event.query;
    }
    this.accountService
      .find(search)
      .subscribe((data) =>{console.log(data);
       (this.accountList = data)});


  }

  onSelectAccount(event) {
    this.selectedTransportServiceCatalog.account = event;

  }
  onSelectProduct(event) {
    this.selectedTransportServiceCatalog.product = event as Product;


    if( ( this.selectOrderTransport?.loadingType?.id ==2 &&
      this.selectOrderTransport.groupageUnique==true)||
      ( this.selectOrderTransport?.loadingType?.id ==1)){
        this.selectedTransportServiceCatalog.account=this.selectedAccount;

    }
    this.onSearchSalePriceServiceByAccount();

  }


  onSearchSalePriceServiceByAccount() {

    let requete;
    requete =
      "company.id:" +
      this.selectedAccount.company.id +
      ",product.id:" +
      this.selectedTransportServiceCatalog.product.id+
      ",account.id:"+this.selectedAccount.id;
    this.accountPricingServiceService
      .find(
      requete
      )
      .subscribe((data) => {
        console.log(data);
        if (data[0]) {
          console.log("accountService");
          console.log(data);
          this.initSale(
            data[0].saleAmountHt,
            data[0].saleAmountTtc,
            data[0].saleVat
          );
          this.onQuantityChange();
        } else {
          this.onSearchSalePriceServiceByCompany();
        }
      });
  }
 onSearchSalePriceServiceByCompany() {
    let requete;
    requete =
      "company.id:" +
      this.selectedAccount.company.id +
      ",product.id:" +
      this.selectedTransportServiceCatalog.product.id
 console.log(requete);
    this.accountPricingServiceService
      .find(
      requete
      )
      .subscribe((data) => {
        console.log(data);
              data= data.filter(f=> f.account==null);
        console.log(data);

        if (data[0]) {
          console.log("companyService");
          this.initSale(
            data[0].saleAmountHt,
            data[0].saleAmountTtc,
            data[0].saleVat
          );
          this.onQuantityChange();
        } else {
          console.log("prixService");
          this.onSearchSalePriceServiceInCatalog();
        }
      });
  }

    onSearchSalePriceServiceInCatalog() {
    this.catalogServiceService
      .find("product.id:" + this.selectedTransportServiceCatalog.product.id)
      .subscribe((data) => {
        if (data[0]) {
          this.initSale(
            data[0].saleAmountHt,
            data[0].saleAmountTtc,
            data[0].saleVat
          );
          this.onQuantityChange();
        } else {
          this.initSale(0, 0, this.vats.filter(f=>f.id==4)[0]);
          this.onQuantityChange();

        }
      });
  }

  initSale(saleAmountht: number, saleAmountTtc: number, saleVat: Vat) {
    console.log(saleVat);

this.transportProductForm.patchValue({
  salePriceHT: saleAmountht,
  salePriceTTC: saleAmountTtc,
  saleVat: saleVat
});
    // this.selectedTransportServiceCatalog.salePriceHT = saleAmountht;
    // this.selectedTransportServiceCatalog.salePriceTTC = saleAmountTtc;
    // this.selectedTransportServiceCatalog.saleVat = saleVat;
    ///this.initForm();
  }

  onSelectSaleVat(event) {
    let saleVat =  event.value;
    this.selectedTransportServiceCatalog.saleVat = saleVat;
    console.log(this.selectedTransportServiceCatalog.saleVat);
    this.onPriceSaleChange(1);
  }

  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;
  }

onQuantityChange(){
  let salePriceHT = +this.transportProductForm.value["salePriceHT"];
 let amountTva=0;
 let salePriceTTC=0;
  if (this.selectedTransportServiceCatalog.product == null) {
    return;
}

const qty = +this.transportProductForm.value['quantity'];
this.selectedTransportServiceCatalog.saleVat=this.transportProductForm.value['saleVat']
const vat =
    this.selectedTransportServiceCatalog.saleVat !== null &&
    this.selectedTransportServiceCatalog.saleVat !== null
        ? this.selectedTransportServiceCatalog.saleVat.value
        : 0;
        console.log(salePriceHT + "" + vat);

         amountTva =Number(((salePriceHT/100) * vat).toFixed(2));
        console.log(amountTva);

        salePriceTTC = salePriceHT + amountTva;
        this.selectedTransportServiceCatalog.salePriceHT=salePriceHT;
        this.selectedTransportServiceCatalog.salePriceVat=amountTva;
        this.selectedTransportServiceCatalog.salePriceTTC=salePriceTTC;
       this.selectedTransportServiceCatalog.totalSalePriceHT=Number((salePriceHT * qty).toFixed(2))?Number((salePriceHT * qty).toFixed(2)):0;
       this.selectedTransportServiceCatalog.totalSalePriceTTC=Number((salePriceTTC * qty).toFixed(2))?Number((salePriceTTC * qty).toFixed(2)):0;
       this.selectedTransportServiceCatalog.totalSalePriceVat=Number((( this.selectedTransportServiceCatalog.totalSalePriceHT*qty/100) * vat).toFixed(2))?Number(((salePriceHT*qty/100) * vat).toFixed(2)):0;

this.transportProductForm.patchValue({
  totalSalePriceHT: this.selectedTransportServiceCatalog.totalSalePriceHT,
  totalSalePriceTTC: this.selectedTransportServiceCatalog.totalSalePriceTTC,
  totalSalePriceVat: this.selectedTransportServiceCatalog.totalSalePriceVat
});

}
  onPriceSaleChange(n: Number) {
    let salePriceHt = +this.transportProductForm.value["salePriceHT"];
    let salePriceTTC = +this.transportProductForm.value["salePriceTTC"];
    let saleVat = this.transportProductForm.value["saleVat"].value;
    let qty = +this.transportProductForm.value['quantity'];
    let amountTva =0;
    if (salePriceHt === undefined || salePriceHt == null) {
      salePriceHt = 0;
    }
    if (salePriceTTC === undefined || salePriceTTC == null) {
      salePriceTTC = 0;
    }
    if (saleVat === undefined || saleVat == null) {
      saleVat = 0;
    }

    if (n === 1) {
       amountTva = Number(((salePriceHt / 100) * saleVat).toFixed(2));
      salePriceTTC = salePriceHt + amountTva;
      this.selectedTransportServiceCatalog.salePriceHT=salePriceHt;
      this.selectedTransportServiceCatalog.salePriceVat=amountTva;
      this.selectedTransportServiceCatalog.salePriceTTC=salePriceTTC;
      this.selectedTransportServiceCatalog.totalSalePriceHT=Number((salePriceHt * qty).toFixed(2))?Number((salePriceHt * qty).toFixed(2)):0;
      this.selectedTransportServiceCatalog.totalSalePriceTTC=Number((salePriceTTC * qty).toFixed(2))?Number((salePriceTTC * qty).toFixed(2)):0;
      this.selectedTransportServiceCatalog.totalSalePriceVat=Number((( this.selectedTransportServiceCatalog.totalSalePriceHT*qty/100) * saleVat).toFixed(2))?Number(((salePriceHt*qty/100) * saleVat).toFixed(2)):0;
      this.transportProductForm.patchValue({
          salePriceTTC: this.selectedTransportServiceCatalog.salePriceTTC,
          totalSalePriceHT: this.selectedTransportServiceCatalog.totalSalePriceHT,
          totalSalePriceTTC: this.selectedTransportServiceCatalog.totalSalePriceTTC,
          totalSalePriceVat: this.selectedTransportServiceCatalog.totalSalePriceVat

      });

    }
    if (n === 2) {

      salePriceHt =salePriceTTC / (1 + saleVat / 100);
       amountTva = Number(((salePriceHt / 100) * saleVat).toFixed(2));
      this.selectedTransportServiceCatalog.salePriceVat=amountTva;
      this.transportProductForm.patchValue({
        salePriceHT: salePriceHt.toFixed(2),
        totalSalePriceHT: (salePriceHt * qty).toFixed(2),
        totalSalePriceTTC: (salePriceTTC * qty).toFixed(2)
      });
    } console.log(this.selectedTransportServiceCatalog);
    this.selectedTransportServiceCatalog.totalSalePriceVat=Number(((salePriceHt*qty/100) * saleVat).toFixed(2));
  }


}
