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
  selector: "app-transport-plan-service-edit",
  templateUrl: "./transport-plan-service-edit.component.html",
  styleUrls: ["./transport-plan-service-edit.component.scss"],
})
export class TransportPlanServiceEditComponent implements OnInit {
  @Input() selectedAccount: Account = new Account();
  @Input() type:number // 1 add Or  2 edit
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
        .find("company.id:" + this.selectedAccount?.company?.id)
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
      transport: this.formBuilder.control(
        this.selectedTransportServiceCatalog.transport
      ),

      account: this.formBuilder.control(
        this.selectedTransportServiceCatalog.account
      ),
      invoice: this.formBuilder.control(
        this.selectedTransportServiceCatalog.invoice
      ),

      purchasePriceHT: this.formBuilder.control(
        this.selectedTransportServiceCatalog.purchasePriceHT
      ),
      purchaseVat: this.formBuilder.control(
        this.selectedTransportServiceCatalog.purchaseVat
      ),
      purchasePriceTTC: this.formBuilder.control(
        this.selectedTransportServiceCatalog.purchasePriceTTC
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
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.transportProductForm.invalid) {
      return;
    }

    // this.selectedTransportServiceCatalog.Day = this.transportProductForm.value['day'];
    // this.selectedTransportServiceCatalog.code = this.transportProductCode;
    this.selectedTransportServiceCatalog.purchasePriceHT =
      this.transportProductForm.value["purchasePriceHT"];
    this.selectedTransportServiceCatalog.purchasePriceTTC =
      this.transportProductForm.value["purchasePriceTTC"];

    this.selectedTransportServiceCatalog.salePriceHT =
      this.transportProductForm.value["salePriceHT"];
    this.selectedTransportServiceCatalog.salePriceTTC =
      this.transportProductForm.value["salePriceTTC"];

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
  onSelectInvoice(event) {
    console.log(event.checked);

    this.selectedTransportServiceCatalog.invoice = event.checked;
  }
  onSelectAccount(event) {
    this.selectedTransportServiceCatalog.account = event.value;
    this.onSearchSalePriceServiceByAccount();

    this.onSearchPurchasePriceServiceByAccount();
    // this.transportServiceService
    //   .find("product.id:" + this.selectedTransportServiceCatalog.product.id)
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }
  onSelectProduct(event) {
    //this.selectedProduct = event as Product;
    this.selectedTransportServiceCatalog.product = event as Product;
    this.onSearchPurchasePriceServiceByAccount();

    this.onSearchSalePriceServiceByAccount();
    // this.selectedTransportServiceCatalog.purchaseVat =
    //   this.selectedTransportServiceCatalog.product.purchaseVat;
  }

  onSelectTransport(event) {
    this.selectedTransportServiceCatalog.transport = event.value;

    this.onSearchPurchasePriceServiceByAccount();
  }

  onSearchPurchasePriceServiceByAccount(){
    let requete;
    requete =
    "company.id:" +
        this.selectedAccount.company.id +
        ",transport.id:" +
        this.selectedTransportServiceCatalog.transport.id +
        ",product.id:" +
        this.selectedTransportServiceCatalog.product.id
        if(this.selectedTransportServiceCatalog?.account?.id != null || this.selectedTransportServiceCatalog?.account?.id !=undefined){
          requete+=",account.id:"+this.selectedTransportServiceCatalog.account.id;
       }
        console.log(requete);
    this.transportAccountServiceService
    .find(
    requete
    )
    .subscribe((data) => {
      if(this.selectedTransportServiceCatalog?.account?.id == null || this.selectedTransportServiceCatalog?.account?.id ==undefined){
        data= data.filter(f=> f.account==null);
   }
      if (data[0]) {
        console.log(data);

        console.log("account");
        this.initPurchase(
          data[0].purchaseAmountHt,
          data[0].purchaseAmountTtc,
          data[0].purchaseVat
        );
      } else {
        this.onSearchPriceServiceTransport();

      }
    });

  }

  onSearchPriceServiceTransport() {


          console.log("transport");

          this.transportServiceService
            .find(
              "transport.id:" +
                this.selectedTransportServiceCatalog.transport.id +
                ",product.id:" +
                this.selectedTransportServiceCatalog.product.id
            )
            .subscribe((data) => {
              if (data[0]) {
                this.initPurchase(
                  data[0].purchaseAmountHt,
                  data[0].purchaseAmountTtc,
                  data[0].purchaseVat
                );
              } else {
                this.initPurchase(0, 0, null);
              }
            });

  }



  onSearchSalePriceServiceBycompany() {

    let requete;
    requete =
      "company.id:" +
      this.selectedAccount.company.id +
      ",product.id:" +
      this.selectedTransportServiceCatalog.product.id+
     ",account.id:"+this.selectedTransportServiceCatalog.account.id;


 console.log(requete);

    this.accountPricingServiceService
      .find(
      requete
      )
      .subscribe((data) => {
        console.log(data);
        if(this.selectedTransportServiceCatalog?.account?.id == null || this.selectedTransportServiceCatalog?.account?.id ==undefined){
             data= data.filter(f=> f.account==null);
        }
        console.log(data);

        if (data[0]) {
          console.log("companyService");

          this.initSale(
            data[0].saleAmountHt,
            data[0].saleAmountTtc,
            data[0].saleVat
          );
        } else {
          console.log("accountService");
          this.onSearchSalePriceServiceByAccount();
        }
      });
  }


  onSearchSalePriceServiceByAccount() {

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
        if(this.selectedTransportServiceCatalog?.account?.id == null || this.selectedTransportServiceCatalog?.account?.id ==undefined){
             data= data.filter(f=> f.account==null);
        }
        console.log(data);

        if (data[0]) {
          console.log("accountService");

          this.initSale(
            data[0].saleAmountHt,
            data[0].saleAmountTtc,
            data[0].saleVat
          );
        } else {
          console.log("catalogService");
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

  initPurchase(
    purchaseAmountht: number,
    purchaseAmountTtc: number,
    purchaseVat: Vat
  ) {
    this.selectedTransportServiceCatalog.purchasePriceHT = purchaseAmountht;
    this.selectedTransportServiceCatalog.purchasePriceTTC = purchaseAmountTtc;

    this.selectedTransportServiceCatalog.purchaseVat = purchaseVat;
    this.initForm();
  }

  initSale(saleAmountht: number, saleAmountTtc: number, saleVat: Vat) {
    console.log(saleVat);

    this.selectedTransportServiceCatalog.salePriceHT = saleAmountht;
    this.selectedTransportServiceCatalog.salePriceTTC = saleAmountTtc;

    this.selectedTransportServiceCatalog.saleVat = saleVat;
    this.initForm();
  }

  onSelectPurchaseVat(event) {
    let purchaseVat =  event.value;

    this.selectedTransportServiceCatalog.purchaseVat = purchaseVat;
    console.log(this.selectedTransportServiceCatalog.purchaseVat);

    this.onPriceChange(1);
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

  onPriceChange(n: Number) {
    let purchasePrice = +this.transportProductForm.value["purchasePriceHT"];
    let purchasePriceTTC = +this.transportProductForm.value["purchasePriceTTC"];
    let purchaseVat = this.transportProductForm.value["purchaseVat"].value;

    if (purchasePrice === undefined || purchasePrice == null) {
      purchasePrice = 0;
    }
    if (purchasePriceTTC === undefined || purchasePriceTTC == null) {
      purchasePriceTTC = 0;
    }
    if (purchaseVat === undefined || purchaseVat == null) {
      purchaseVat = 0;
    }

    if (n === 1) {
      const amountTva = (purchasePrice / 100) * purchaseVat;
      const purchasePriceTTC = purchasePrice + amountTva;
      this.transportProductForm.patchValue({
        purchasePriceTTC: purchasePriceTTC.toFixed(2),
      });
    }
    if (n === 2) {
      purchasePrice = purchasePriceTTC / (1 + purchaseVat / 100);
      this.transportProductForm.patchValue({
        purchasePriceHT: purchasePrice.toFixed(2),
      });
    }
  }

  onPriceSaleChange(n: Number) {
    let purchasePrice = +this.transportProductForm.value["salePriceHT"];
    let purchasePriceTTC = +this.transportProductForm.value["salePriceTTC"];
    let purchaseVat = this.transportProductForm.value["saleVat"].value;

    if (purchasePrice === undefined || purchasePrice == null) {
      purchasePrice = 0;
    }
    if (purchasePriceTTC === undefined || purchasePriceTTC == null) {
      purchasePriceTTC = 0;
    }
    if (purchaseVat === undefined || purchaseVat == null) {
      purchaseVat = 0;
    }

    if (n === 1) {
      const amountTva = (purchasePrice / 100) * purchaseVat;
      const purchasePriceTTC = purchasePrice + amountTva;
      this.selectedTransportServiceCatalog.salePriceVat=amountTva;

      this.transportProductForm.patchValue({
        salePriceTTC: purchasePriceTTC.toFixed(2),
      });
    }
    if (n === 2) {

      purchasePrice = purchasePriceTTC / (1 + purchaseVat / 100);
      const amountTva = (purchasePrice / 100) * purchaseVat;
      this.selectedTransportServiceCatalog.salePriceVat=amountTva;

      this.transportProductForm.patchValue({
        salePriceHT: purchasePrice.toFixed(2),
      });
    } console.log(this.selectedTransportServiceCatalog);
  }



}
