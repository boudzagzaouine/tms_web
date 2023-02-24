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
  @Input() transportServices: TransportService[] = [];
  @Output() transportServiceEdited = new EventEmitter<TransportService>();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  transportServiceForm: FormGroup;

  vat = new Vat();
  displayDialog: boolean;
  isFormSubmitted = false;
  title = "Modifier  Service";
  productId: number;
  vatList:Vat[]=[];
   productList :Product[]=[];
  constructor(
    private transportServiceService: TransportServiceService,
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
    this.transportServiceForm = new FormGroup({

      fProduct: new FormControl(
        this.selectTransportService.product,
        Validators.required
      ),

      fPurchaseAmountHt: new FormControl(
        this.selectTransportService.purchaseAmountHt,
        Validators.required
      ),
      fPurchaseAmountTtc: new FormControl(
        this.selectTransportService.purchaseAmountTtc,
        Validators.required
      ),
      fPurchaseAmountTva: new FormControl(
        this.selectTransportService.purchaseAmountTva,
        Validators.required
      ),
      fPurchaseVat: new FormControl(

           this.selectTransportService?.purchaseVat,

        Validators.required
      ),
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.transportServiceForm.invalid) {
      return;
    }
    this.spinner.show();
    this.selectTransportService.purchaseAmountHt =
      this.transportServiceForm.value["fPurchaseAmountHt"];
    this.selectTransportService.purchaseAmountTtc =
      this.transportServiceForm.value["fPurchaseAmountTtc"];
    this.selectTransportService.purchaseAmountTva =
      this.transportServiceForm.value["fPurchaseAmountTva"];
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
    this.transportServiceService
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
    this.transportServiceService.set(this.selectTransportService).subscribe(
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





  onSelectPurchaseVat(event) {
    this.selectTransportService.purchaseVat = event.value

   console.log(this.selectTransportService.purchaseVat);

    this.onPurchasePriceChange(1);
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

  onPurchasePriceChange(n: Number) {
    let PriceHt = +this.transportServiceForm.value["fPurchaseAmountHt"];
    let PriceTTC = +this.transportServiceForm.value["fPurchaseAmountTtc"];
    let vat = this.transportServiceForm.value["fPurchaseVat"]?.value?this.transportServiceForm.value["fPurchaseVat"].value:0;
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
      this.transportServiceForm.patchValue({
        fPurchaseAmountTtc: priceTTC.toFixed(2),
        fPurchaseAmountTva: amountTva.toFixed(2),
      });
    }
    if (n === 2) {
      PriceHt = PriceTTC / (1 + vat / 100);
      const amountTva = (PriceHt / 100) * vat;
      this.transportServiceForm.patchValue({
        fPurchaseAmountHt: PriceHt.toFixed(2),
        fPurchaseAmountTva: amountTva.toFixed(2),
      });
    }
  }

  onLineEdited(transportServiceEdited: TransportService) {
    const transportService = this.transportServices.find(
      (f) =>
        f.product.id == transportServiceEdited.product.id

    );
    if (transportService == null) {
      this.transportServiceEdited.emit(this.selectTransportService);
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
