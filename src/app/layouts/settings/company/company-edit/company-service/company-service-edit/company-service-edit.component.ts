import { AccountService } from './../../../../../../shared/services/api/account.service';
import { AddressService } from './../../../../../../shared/services/api/address.service';
import { Address } from './../../../../../../shared/models/address';
import { Product } from './../../../../../../shared/models/product';
import { ProductServiceService } from './../../../../../../shared/services/api/product-service.service';
import { VatService } from './../../../../../../shared/services/api/vat.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../../../shared/services/api/authentication.service';
import { AccountPricingServiceService } from '../../../../../../shared/services/api/account-pricing-service.service';
import { Pays } from './../../../../../../shared/models/pays';
import { Vat } from './../../../../../../shared/models/vat';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from './../../../../../../shared/models/company';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountPricingService } from '../../../../../../shared/models/account-pricing-service';
import { Account } from './../../../../../../shared/models';

@Component({
  selector: 'app-company-service-edit',
  templateUrl: './company-service-edit.component.html',
  styleUrls: ['./company-service-edit.component.css']
})
export class CompanyServiceEditComponent implements OnInit {

  @Input() selectedCompany: Company = new Company();
  @Input() selectAccountPricingService = new AccountPricingService();
  @Input() accountPricingServices: AccountPricingService[] = [];
  @Output() acountServiceEdited = new EventEmitter<AccountPricingService>();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  accountPricingServiceForm: FormGroup;
  accountList:Account[]=[];
  vat = new Vat();
  displayDialog: boolean;
  isFormSubmitted = false;
  title = "Modifier  Service";
  productId: number;
  accountId: number;

  vatList:Vat[]=[];
   productList :Product[]=[];
  constructor(
    private accountPricingServiceService: AccountPricingServiceService,
    private authentificationService: AuthenticationService,
    private productService:ProductServiceService,
    private vatService: VatService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private accountService:AccountService,
  ) {}

  ngOnInit() {
    this.load();
    if (this.editMode === 1) {
      this.selectAccountPricingService = new AccountPricingService();
      this.title = "Ajouter  Service";
    } else {
      this.productId = this.selectAccountPricingService?.product?.id;
      this.accountId = this.selectAccountPricingService?.account?.id;

    }
    this.onAccountSearch();
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.accountPricingServiceForm = new FormGroup({

      fAccount: new FormControl(
        this.selectAccountPricingService.account
      ),

      fProduct: new FormControl(
        this.selectAccountPricingService.product,
        Validators.required
      ),

      fSaleAmountHt: new FormControl(
        this.selectAccountPricingService.saleAmountHt,
        Validators.required
      ),
      fSaleAmountTtc: new FormControl(
        this.selectAccountPricingService.saleAmountTtc,
        Validators.required
      ),
      fSaleAmountTva: new FormControl(
        this.selectAccountPricingService.saleAmountTva,
        Validators.required
      ),
      fSaleVat: new FormControl(

           this.selectAccountPricingService?.saleVat,

        Validators.required
      ),
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.accountPricingServiceForm.invalid) {
      return;
    }
    this.spinner.show();
    this.selectAccountPricingService.saleAmountHt =
      this.accountPricingServiceForm.value["fSaleAmountHt"];
    this.selectAccountPricingService.saleAmountTtc =
      this.accountPricingServiceForm.value["fSaleAmountTtc"];
    this.selectAccountPricingService.saleAmountTva =
      this.accountPricingServiceForm.value["fSaleAmountTva"];
    if (
      this.selectedCompany.id != undefined ||
      this.selectedCompany.id != null
    ) {
      if (this.selectAccountPricingService.id) {
        this.saveAccountPricingService();
      } else {
        this.existService();
      }
    } else {
      this.onLineEdited(this.selectAccountPricingService);
    }
    this.spinner.hide();
  }

  existService() {
let requete ;
requete=`company.id:${this.selectedCompany.id},product.id:${this.productId}`;
if(this.selectAccountPricingService?.account?.id!=null || this.selectAccountPricingService?.account?.id!=undefined){
  requete+= `,account.id:${this.accountId}`
}
console.log(requete);

    this.accountPricingServiceService
      .sizeSearch( requete )
      .subscribe(
        (data) => {
          console.log(data);

          if (data > 0) {
            this.messageService.add({
              severity: "error",
              summary: "Edition",
              detail: "Elément Existe Déja",
            });
            //this.toastr.error('Elément Existe Déja', 'Edition');
          } else {
            this.selectAccountPricingService.company = this.selectedCompany;
            this.saveAccountPricingService();
          }
          this.spinner.hide();
        },
        (error) => {
          // this.toastr.error(error.error.message, 'Erreur');
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur !",
          });
          this.spinner.hide();
        },

        () => this.spinner.hide()
      );
  }

  saveAccountPricingService() {
    this.accountPricingServiceService.set(this.selectAccountPricingService).subscribe(
      (data) => {
        this.messageService.add({
          severity: "success",
          summary: "Edition",
          detail: "Elément Enregistré Avec Succès",
        });
        console.log(this.selectAccountPricingService);
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
        this.displayDialog = false;
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "Erreur",
        });
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );
  }





  onSelectSaleVat(event) {
    this.selectAccountPricingService.saleVat = event.value
    this.onSalePriceChange(1);
    console.log(    this.selectAccountPricingService.saleVat );

  }

  onProductSearch(event: any) {
    this.productService
      .find('code~' + event.query)
      .subscribe(data => (this.productList = data));
  }

  onSelectProduct(event){
    this.selectAccountPricingService.product=event;
    console.log( this.selectAccountPricingService.product);

    this.productId=  this.selectAccountPricingService?.product?.id;
  }

  onAccountSearch() {
console.log(this.selectAccountPricingService?.company?.id);


    this.accountService
      .find('company.id:'+this.selectedCompany?.id)
      .subscribe(data => (this.accountList = data));

  }

  onSelectAccount(event){
    this.selectAccountPricingService.account=event.value;
    console.log( this.selectAccountPricingService.account);

    this.accountId=  this.selectAccountPricingService?.account?.id;
  }
  load() {

    this.vatService.findAll().subscribe((data) => {
      this.vatList = data;
    });


  }

  onSalePriceChange(n: Number) {
    let PriceHt = +this.accountPricingServiceForm.value["fSaleAmountHt"];
    let PriceTTC = +this.accountPricingServiceForm.value["fSaleAmountTtc"];
    let vat = this.accountPricingServiceForm.value["fSaleVat"]?.value!=null ?this.accountPricingServiceForm.value["fSaleVat"]?.value:0;
    console.log(vat);

    if (PriceHt === undefined || PriceHt == null) {
      PriceHt = 0;
    }
    if (PriceTTC === undefined || PriceTTC == null) {
      PriceTTC = 0;
    }
    if (vat === undefined || vat == null) {
      vat = 0;
    }

    if (n === 1) {
      const amountTva = (PriceHt / 100) * vat;
      const priceTTC = PriceHt + amountTva;
      this.accountPricingServiceForm.patchValue({
        fSaleAmountTtc: priceTTC.toFixed(2),
        fSaleAmountTva: amountTva.toFixed(2),
      });
    }
    if (n === 2) {
      PriceHt = PriceTTC / (1 + vat / 100);
      const amountTva = (PriceHt / 100) * vat;
      this.accountPricingServiceForm.patchValue({
        fSaleAmountHt: PriceHt.toFixed(2),
        fSaleAmountTva: amountTva.toFixed(2),
      });
    }
  }

  onLineEdited(accountPricingServiceEdited: AccountPricingService) {
    const acountService = this.accountPricingServices.find(
      (f) =>
        f.product.id == accountPricingServiceEdited.product.id

    );
    if (acountService == null) {
      this.acountServiceEdited.emit(this.selectAccountPricingService);
      this.displayDialog = false;
    } else {
      if (this.editMode == 1) {
        this.toastr.error("Erreur", "Elément Existe Déja");
        console.log("err");
      }
    }
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
