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
  subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,
    private transportProductService: TransportPlanServiceCatalogService,
    private productService: ProductServiceService,
    private vatService: VatService,
    private accountService: AccountService,
    private transportService: TransportServcie,
    private transportServiceService: TransportServiceService,
    private transportAccountServiceService: TransportAccountServiceService,
    private catalogSeviceService: CatalogServiceService,
    private accountPricingServiceService: AccountPricingServiceService,
    private catalogServiceService: CatalogServiceService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.vatService.findAll().subscribe((data: Vat[]) => {
        this.vats = data;
      })
    );
console.log(this.selectedAccount);

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

      console.log("new");
     // this.selectedTransportServiceCatalog = new TransportPlanServiceCatalog();
    } else {
      this.title = "Modifier un catalogue";
    }
    this.initForm();
    console.log(this.selectedTransportServiceCatalog);
  }

  initForm() {
    this.transportProductForm = this.formBuilder.group({
      product: this.formBuilder.control(
        this.selectedTransportServiceCatalog.product,
        Validators.required
      ),


      quantity: this.formBuilder.control(
        this.selectedTransportServiceCatalog.quantity
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

      totalSalePriceTTC: this.formBuilder.control(
        this.selectedTransportServiceCatalog.totalSalePriceTTC
      ),
    });
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

      this.selectedTransportServiceCatalog.quantity =
      this.transportProductForm.value["quantity"];
         this.selectedTransportServiceCatalog.totalSalePriceHT =
      this.transportProductForm.value["totalSalePriceHT"];
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


  onSelectProduct(event) {
    this.selectedTransportServiceCatalog.product = event as Product;
    this.selectedTransportServiceCatalog.account=this.selectedAccount;

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

 console.log(requete);

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
        } else {
          this.initSale(0, 0, null);
        }
      });
  }

  initSale(saleAmountht: number, saleAmountTtc: number, saleVat: Vat) {
    console.log(saleVat);

    this.selectedTransportServiceCatalog.salePriceHT = saleAmountht;
    this.selectedTransportServiceCatalog.salePriceTTC = saleAmountTtc;

    this.selectedTransportServiceCatalog.saleVat = saleVat;
    this.initForm();
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
const vat =
    this.selectedTransportServiceCatalog.saleVat !== null &&
    this.selectedTransportServiceCatalog.saleVat !== null
        ? this.selectedTransportServiceCatalog.saleVat.value
        : 0;
        console.log(salePriceHT + "" + vat);

         amountTva =Number(((salePriceHT/100) * vat).toFixed(2));
        console.log(amountTva);

        salePriceTTC = salePriceHT + amountTva;
        this.selectedTransportServiceCatalog.salePriceVat=amountTva;
        this.selectedTransportServiceCatalog.totalSalePriceVat=Number(((salePriceHT*qty/100) * vat).toFixed(2));

this.transportProductForm.patchValue({
  totalSalePriceHT: (salePriceHT * qty).toFixed(2),
  totalSalePriceTTC: (salePriceTTC * qty).toFixed(2)
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
      this.selectedTransportServiceCatalog.salePriceVat=amountTva;

      this.transportProductForm.patchValue({
          salePriceTTC: salePriceTTC.toFixed(2),
          totalSalePriceHT: (salePriceHt * qty).toFixed(2),
          totalSalePriceTTC: (salePriceTTC * qty).toFixed(2)
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
