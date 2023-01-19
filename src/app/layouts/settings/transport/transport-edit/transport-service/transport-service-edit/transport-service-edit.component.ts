import { Transport } from './../../../../../../shared/models/transport';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VatService } from './../../../../../../shared/services/api/vat.service';
import { ProductServiceService } from './../../../../../../shared/services/api/product-service.service';
import { AuthenticationService } from './../../../../../../shared/services/api/authentication.service';
import { TransportServiceService } from './../../../../../../shared/services/api/transport-service.service';
import { Product } from './../../../../../../shared/models/product';
import { Vat } from './../../../../../../shared/models/vat';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransportService } from './../../../../../../shared/models/transport-service';

@Component({
  selector: 'app-transport-service-edit',
  templateUrl: './transport-service-edit.component.html',
  styleUrls: ['./transport-service-edit.component.css']
})
export class TransportServiceEditComponent implements OnInit {

  @Input() selectedTransport: Transport = new Transport();
  @Input() selectTransportService = new TransportService();
  @Input() accountServices: TransportService[] = [];
  @Output() acountServiceEdited = new EventEmitter<TransportService>();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  accountServiceForm: FormGroup;

  vat = new Vat();
  displayDialog: boolean;
  isFormSubmitted = false;
  title = "Modifier  Service";
  productId: number;
  vatList:Vat[]=[];
   productList :Product[]=[];
  constructor(
    private accountServiceService: TransportServiceService,
    private authentificationService: AuthenticationService,
    private productService:ProductServiceService,
    private vatService: VatService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.load();
    if (this.editMode === 1) {
      this.selectTransportService = new TransportService();
      this.title = "Ajouter  Service";
    } else {
      this.productId = this.selectTransportService.product.id;

    }
    console.log(this.selectedTransport);

    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.accountServiceForm = new FormGroup({

      fProduct: new FormControl(
        this.selectTransportService.product,
        Validators.required
      ),

      fSaleAmountHt: new FormControl(
        this.selectTransportService.saleAmountHt,
        Validators.required
      ),
      fSaleAmountTtc: new FormControl(
        this.selectTransportService.saleAmountTtc,
        Validators.required
      ),
      fSaleAmountTva: new FormControl(
        this.selectTransportService.saleAmountTva,
        Validators.required
      ),
      fSaleVat: new FormControl(
        this.editMode != 1
          ? this.selectTransportService?.saleVat?.value
          : this.selectTransportService?.saleVat,

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
    this.selectTransportService.saleAmountHt =
      this.accountServiceForm.value["fSaleAmountHt"];
    this.selectTransportService.saleAmountTtc =
      this.accountServiceForm.value["fSaleAmountTtc"];
    this.selectTransportService.saleAmountTva =
      this.accountServiceForm.value["fSaleAmountTva"];
    if (
      this.selectedTransport.id != undefined ||
      this.selectedTransport.id != null
    ) {
      if (this.selectTransportService.id) {
        this.saveTransportService();
      } else {
        this.existService();
      }
    } else {
      this.onLineEdited(this.selectTransportService);
    }
    this.spinner.hide();
  }

  existService() {
    this.accountServiceService
      .sizeSearch(
        `transport.id:${this.selectedTransport.id},product.id:${this.productId}`
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
            this.selectTransportService.transport = this.selectedTransport;
            this.saveTransportService();
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

  saveTransportService() {
    this.accountServiceService.set(this.selectTransportService).subscribe(
      (data) => {
        this.messageService.add({
          severity: "success",
          summary: "Edition",
          detail: "Elément Enregistré Avec Succès",
        });
        console.log(this.selectTransportService);
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
    this.selectTransportService.saleVat = this.vatList.filter(
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
    this.selectTransportService.product=event;
    console.log( this.selectTransportService.product);

    this.productId=  this.selectTransportService?.product?.id;
  }


  load() {

    this.vatService.findAll().subscribe((data) => {
      this.vatList = data;
    });


  }

  onSalePriceChange(n: Number) {
    let PriceHt = +this.accountServiceForm.value["fSaleAmountHt"];
    let PriceTTC = +this.accountServiceForm.value["fSaleAmountTtc"];
    let vat = this.accountServiceForm.value["fSaleVat"];
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

  onLineEdited(accountServiceEdited: TransportService) {
    const acountService = this.accountServices.find(
      (f) =>
        f.product.id == accountServiceEdited.product.id

    );
    if (acountService == null) {
      this.acountServiceEdited.emit(this.selectTransportService);
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
