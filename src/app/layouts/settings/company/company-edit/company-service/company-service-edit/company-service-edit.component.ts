import { AddressService } from './../../../../../../shared/services/api/address.service';
import { Address } from './../../../../../../shared/models/address';
import { Product } from './../../../../../../shared/models/product';
import { ProductServiceService } from './../../../../../../shared/services/api/product-service.service';
import { VatService } from './../../../../../../shared/services/api/vat.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../../../shared/services/api/authentication.service';
import { AccountServiceService } from './../../../../../../shared/services/api/account-service.service';
import { Pays } from './../../../../../../shared/models/pays';
import { Vat } from './../../../../../../shared/models/vat';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from './../../../../../../shared/models/company';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from './../../../../../../shared/models/account-service';

@Component({
  selector: 'app-company-service-edit',
  templateUrl: './company-service-edit.component.html',
  styleUrls: ['./company-service-edit.component.css']
})
export class CompanyServiceEditComponent implements OnInit {

  @Input() selectedCompany: Company = new Company();
  @Input() selectAccountService = new AccountService();
  @Input() accountServices: AccountService[] = [];
  @Output() acountServiceEdited = new EventEmitter<AccountService>();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  accountServiceForm: FormGroup;
  addressList:Address[]=[];
  vat = new Vat();
  displayDialog: boolean;
  isFormSubmitted = false;
  title = "Modifier  Service";
  productId: number;
  addressId: number;

  vatList:Vat[]=[];
   productList :Product[]=[];
  constructor(
    private accountServiceService: AccountServiceService,
    private authentificationService: AuthenticationService,
    private productService:ProductServiceService,
    private vatService: VatService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private addressService:AddressService,
  ) {}

  ngOnInit() {
    this.load();
    if (this.editMode === 1) {
      this.selectAccountService = new AccountService();
      this.title = "Ajouter  Service";
    } else {
      this.productId = this.selectAccountService?.product?.id;
      this.addressId = this.selectAccountService?.address?.id;

    }
    this.onAddressSearch();
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.accountServiceForm = new FormGroup({

      fAddress: new FormControl(
        this.selectAccountService.address
      ),

      fProduct: new FormControl(
        this.selectAccountService.product,
        Validators.required
      ),

      fSaleAmountHt: new FormControl(
        this.selectAccountService.saleAmountHt,
        Validators.required
      ),
      fSaleAmountTtc: new FormControl(
        this.selectAccountService.saleAmountTtc,
        Validators.required
      ),
      fSaleAmountTva: new FormControl(
        this.selectAccountService.saleAmountTva,
        Validators.required
      ),
      fSaleVat: new FormControl(

           this.selectAccountService?.saleVat,

        Validators.required
      ),
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.accountServiceForm.invalid) {
      return;
    }
    this.spinner.show();
    this.selectAccountService.saleAmountHt =
      this.accountServiceForm.value["fSaleAmountHt"];
    this.selectAccountService.saleAmountTtc =
      this.accountServiceForm.value["fSaleAmountTtc"];
    this.selectAccountService.saleAmountTva =
      this.accountServiceForm.value["fSaleAmountTva"];
    if (
      this.selectedCompany.id != undefined ||
      this.selectedCompany.id != null
    ) {
      if (this.selectAccountService.id) {
        this.saveAccountService();
      } else {
        this.existService();
      }
    } else {
      this.onLineEdited(this.selectAccountService);
    }
    this.spinner.hide();
  }

  existService() {
let requete ;
requete=`company.id:${this.selectedCompany.id},product.id:${this.productId}`;
if(this.selectAccountService?.address?.id!=null || this.selectAccountService?.address?.id!=undefined){
  requete+= `,address.id:${this.addressId}`
}
console.log(requete);

    this.accountServiceService
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
            this.selectAccountService.company = this.selectedCompany;
            this.saveAccountService();
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

  saveAccountService() {
    this.accountServiceService.set(this.selectAccountService).subscribe(
      (data) => {
        this.messageService.add({
          severity: "success",
          summary: "Edition",
          detail: "Elément Enregistré Avec Succès",
        });
        console.log(this.selectAccountService);
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
    this.selectAccountService.saleVat = event.value
    this.onSalePriceChange(1);
    console.log(    this.selectAccountService.saleVat );

  }

  onProductSearch(event: any) {
    this.productService
      .find('code~' + event.query)
      .subscribe(data => (this.productList = data));
  }

  onSelectProduct(event){
    this.selectAccountService.product=event;
    console.log( this.selectAccountService.product);

    this.productId=  this.selectAccountService?.product?.id;
  }

  onAddressSearch() {
console.log(this.selectAccountService?.company?.id);


    this.addressService
      .find('account.company.id:'+this.selectedCompany?.id)
      .subscribe(data => (this.addressList = data));

  }

  onSelectAddress(event){
    this.selectAccountService.address=event.value;
    console.log( this.selectAccountService.address);

    this.addressId=  this.selectAccountService?.address?.id;
  }
  load() {

    this.vatService.findAll().subscribe((data) => {
      this.vatList = data;
    });


  }

  onSalePriceChange(n: Number) {
    let PriceHt = +this.accountServiceForm.value["fSaleAmountHt"];
    let PriceTTC = +this.accountServiceForm.value["fSaleAmountTtc"];
    let vat = this.accountServiceForm.value["fSaleVat"].value;
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
      this.accountServiceForm.patchValue({
        fSaleAmountTtc: priceTTC.toFixed(2),
        fSaleAmountTva: amountTva.toFixed(2),
      });
    }
    if (n === 2) {
      PriceHt = PriceTTC / (1 + vat / 100);
      const amountTva = (PriceHt / 100) * vat;
      this.accountServiceForm.patchValue({
        fSaleAmountHt: PriceHt.toFixed(2),
        fSaleAmountTva: amountTva.toFixed(2),
      });
    }
  }

  onLineEdited(accountServiceEdited: AccountService) {
    const acountService = this.accountServices.find(
      (f) =>
        f.product.id == accountServiceEdited.product.id

    );
    if (acountService == null) {
      this.acountServiceEdited.emit(this.selectAccountService);
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
