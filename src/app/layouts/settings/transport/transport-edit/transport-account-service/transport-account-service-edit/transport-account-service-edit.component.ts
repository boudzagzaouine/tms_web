import { Address } from './../../../../../../shared/models/address';
import { AddressService } from './../../../../../../shared/services/api/address.service';
import { Transport } from './../../../../../../shared/models/transport';
import { Company } from './../../../../../../shared/models/company';
import { CompanyService } from './../../../../../../shared/services/api/company.service';
import { TransportAccountServiceService } from './../../../../../../shared/services/api/transport-account-service.service';
import { TransportAccountService } from './../../../../../../shared/models/transport-account-service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VatService } from './../../../../../../shared/services/api/vat.service';
import { ProductServiceService } from './../../../../../../shared/services/api/product-service.service';
import { AuthenticationService } from './../../../../../../shared/services/api/authentication.service';
import { Product } from './../../../../../../shared/models/product';
import { Vat } from './../../../../../../shared/models/vat';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-transport-account-service-edit',
  templateUrl: './transport-account-service-edit.component.html',
  styleUrls: ['./transport-account-service-edit.component.css']
})
export class TransportAccountServiceEditComponent implements OnInit {

  @Input() selectedTransport: Transport = new Transport();
  @Input() selectTransportAccountService = new TransportAccountService();
  @Input() transportAccountServices: TransportAccountService[] = [];
  @Output() acountServiceEdited = new EventEmitter<TransportAccountService>();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  transportAccountServiceForm: FormGroup;

  vat = new Vat();
  displayDialog: boolean;
  isFormSubmitted = false;
  title = "Modifier  Service Client";
  productId: number;
  companyId: number;
  addressId: number;

  vatList:Vat[]=[];
   productList :Product[]=[];
  companyList :Company[]=[];
  addressList:Address[]=[];
  constructor(
    private transportAccountServiceService: TransportAccountServiceService,
    private authentificationService: AuthenticationService,
    private productService:ProductServiceService,
    private companyService:CompanyService,
    private vatService: VatService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.load();
    if (this.editMode === 1) {
      this.selectTransportAccountService = new TransportAccountService();
      this.title = "Ajouter Catalogue Service Client";
    } else {
      this.productId = this.selectTransportAccountService.product.id;
      this.companyId=this.selectTransportAccountService.product.id;
      this.addressId=this.selectTransportAccountService.company.id;
      this.onAddressSearch();

    }
    console.log(this.selectedTransport);

    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.transportAccountServiceForm = new FormGroup({

      fCompany: new FormControl(
        this.selectTransportAccountService.company,
        Validators.required
      ),
      fAddress: new FormControl(
        this.selectTransportAccountService.address,
        Validators.required
      ),
      fProduct: new FormControl(
        this.selectTransportAccountService.product,
        Validators.required
      ),

      fSaleAmountHt: new FormControl(
        this.selectTransportAccountService.saleAmountHt,
        Validators.required
      ),
      fSaleAmountTtc: new FormControl(
        this.selectTransportAccountService.saleAmountTtc,
        Validators.required
      ),
      fSaleAmountTva: new FormControl(
        this.selectTransportAccountService.saleAmountTva,
        Validators.required
      ),
      fSaleVat: new FormControl(
        this.editMode != 1
          ? this.selectTransportAccountService?.saleVat?.value
          : this.selectTransportAccountService?.saleVat,

        Validators.required
      ),
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.transportAccountServiceForm.invalid) {
      return;
    }
    this.spinner.show();
    console.log(this.selectTransportAccountService);

    this.selectTransportAccountService.saleAmountHt =
      this.transportAccountServiceForm.value["fSaleAmountHt"];
    this.selectTransportAccountService.saleAmountTtc =
      this.transportAccountServiceForm.value["fSaleAmountTtc"];
    this.selectTransportAccountService.saleAmountTva =
      this.transportAccountServiceForm.value["fSaleAmountTva"];
    if (
      this.selectedTransport.id != undefined ||
      this.selectedTransport.id != null
    ) {
      if (this.selectTransportAccountService.id) {
        this.saveTransportAccountService();
      } else {
        this.existService();
      }
    } else {
      this.onLineEdited(this.selectTransportAccountService);
    }
    this.spinner.hide();
  }

  existService() {
    this.transportAccountServiceService
      .sizeSearch(
        `transport.id:${this.selectedTransport.id},company.id:${this.companyId},address.id:${this.addressId},product.id:${this.productId}`
      )
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
            this.selectTransportAccountService.transport = this.selectedTransport;
            this.saveTransportAccountService();
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

  saveTransportAccountService() {
    this.transportAccountServiceService.set(this.selectTransportAccountService).subscribe(
      (data) => {
        this.messageService.add({
          severity: "success",
          summary: "Edition",
          detail: "Elément Enregistré Avec Succès",
        });
        console.log(this.selectTransportAccountService);
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
    this.selectTransportAccountService.saleVat = this.vatList.filter(
      (f) => f.value == event.value
    )[0];
    this.onSalePriceChange(1);
  }

  onProductSearch(event: any) {
    this.productService
      .find('code~' + event.query)
      .subscribe(data => (this.productList = data));
  }

  onSelectProduct(event){
    this.selectTransportAccountService.product=event;
    console.log( this.selectTransportAccountService.product);

    this.productId=  this.selectTransportAccountService?.product?.id;
  }

  onCompanySearch(event: any) {
    this.companyService
      .find('name~' + event.query)
      .subscribe(data => (this.companyList = data));
  }

  onSelectCompany(event){
    this.selectTransportAccountService.company=event;
    console.log( this.selectTransportAccountService.company);

    this.companyId=  this.selectTransportAccountService?.company?.id;
    this.onAddressSearch();
  }


  onAddressSearch() {


    this.addressService
      .find('account.company.id:'+this.selectTransportAccountService?.company?.id)
      .subscribe(data => (this.addressList = data));

  }

  onSelectAddress(event){
    this.selectTransportAccountService.address=event.value;
    console.log( this.selectTransportAccountService.address);

    this.addressId=  this.selectTransportAccountService?.address?.id;
  }

  load() {

    this.vatService.findAll().subscribe((data) => {
      this.vatList = data;
    });


  }

  onSalePriceChange(n: Number) {
    let PriceHt = +this.transportAccountServiceForm.value["fSaleAmountHt"];
    let PriceTTC = +this.transportAccountServiceForm.value["fSaleAmountTtc"];
    let vat = this.transportAccountServiceForm.value["fSaleVat"];
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
      this.transportAccountServiceForm.patchValue({
        fSaleAmountTtc: priceTTC.toFixed(2),
        fSaleAmountTva: amountTva.toFixed(2),
      });
    }
    if (n === 2) {
      PriceHt = PriceTTC / (1 + vat / 100);
      const amountTva = (PriceHt / 100) * vat;
      this.transportAccountServiceForm.patchValue({
        fSaleAmountHt: PriceHt.toFixed(2),
        fSaleAmountTva: amountTva.toFixed(2),
      });
    }
  }

  onLineEdited(transportAccountServiceEdited: TransportAccountService) {
    const acountService = this.transportAccountServices.find(
      (f) =>
        f.product.id == transportAccountServiceEdited.product.id

    );
    if (acountService == null) {
      this.acountServiceEdited.emit(this.selectTransportAccountService);
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
