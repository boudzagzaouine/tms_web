import { VatService } from '../../../../shared/services/api/vat.service';
import { ProductServiceService } from '../../../../shared/services/api/product-service.service';
import { TransportProductService } from '../../../../shared/services/api/transport-product.service';
import { AuthenticationService } from '../../../../shared/services/api/authentication.service';
import { Subscription } from 'rxjs';
import { Vat } from '../../../../shared/models/vat';
import { Product } from '../../../../shared/models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransportProduct } from '../../../../shared/models/transport-product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transport-plan-service-edit',
  templateUrl: './transport-plan-service-edit.component.html',
  styleUrls: ['./transport-plan-service-edit.component.scss']
})
export class TransportPlanServiceEditComponent implements OnInit {

  @Input() selectedTransportProduct: TransportProduct = new TransportProduct();
  @Input() editMode = false;
  @Output() transportProductEdited = new EventEmitter<TransportProduct>();
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Catalogue ';
  transportProductForm: FormGroup;
  transportProductCode :string ;
  productList: Product[] = [];
  vats: Vat[];

  subscriptions = new Subscription();


  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,
    private transportProductService : TransportProductService,
    private productService:ProductServiceService,
    private vatService: VatService,



  ) { }

  ngOnInit() {
    this.subscriptions.add(this.vatService.findAll().subscribe((data: Vat[]) => {
      this.vats = data;
    }));



    this.displayDialog = true;
    console.log(this.editMode);


    if (!this.editMode) {
      this.title = 'Ajouter un Catalogue';

      console.log("new");
      this.selectedTransportProduct = new TransportProduct();

    }
    else{
      this.title = 'Modifier un catalogue';







    }
    this.initForm();
    console.log(this.selectedTransportProduct);



  }

  initForm() {

    this.transportProductForm = this.formBuilder.group({

      product: this.formBuilder.control(this.selectedTransportProduct.product,Validators.required),
      transport: this.formBuilder.control(this.selectedTransportProduct.transport),


      priceHT: this.formBuilder.control(this.selectedTransportProduct.priceHT),
      vat: this.formBuilder.control(this.selectedTransportProduct.vat),
      priceTTC: this.formBuilder.control(this.selectedTransportProduct.priceTTC),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.transportProductForm.invalid) {
      return;
    }

    // this.selectedTransportProduct.Day = this.transportProductForm.value['day'];
   // this.selectedTransportProduct.code = this.transportProductCode;
    this.selectedTransportProduct.priceHT = this.transportProductForm.value['priceHT'];
    this.selectedTransportProduct.priceTTC = this.transportProductForm.value['priceTTC'];


    this.selectedTransportProduct.owner = this.authentificationService.getDefaultOwner();
    console.log(this.selectedTransportProduct);

    this.transportProductEdited.emit(this.selectedTransportProduct);
    this.displayDialog = false;

  }

  productSearch(evt) {
    this.productService.find(`code~${evt.query}`).subscribe((data) => {
      this.productList = data;
    });
  }

  onSelectProduct(event) {
    //this.selectedProduct = event as Product;
    this.selectedTransportProduct.product = event as Product;
    this.selectedTransportProduct.vat=this.selectedTransportProduct.product.vat;
    this.transportProductForm.patchValue({
      //description: this.selectedProduct.shortDesc,
      priceHT: this.selectedTransportProduct.product.purshasePriceUB
        ? this.selectedTransportProduct.product.purshasePriceUB
        : 0,
        priceTTC: this.selectedTransportProduct.product.purshasePriceTTCUB
        ? this.selectedTransportProduct.product.purshasePriceTTCUB
        : 0,

      vat: this.selectedTransportProduct.product.vat.value,
      uom: this.selectedTransportProduct.product.uomByProductUomBase,

    });

  }





  onSelectVat(event ) {
  let vat= this.vats.filter(f=> f.value== event.value)[0];

    this.selectedTransportProduct.vat = vat;
    console.log(this.selectedTransportProduct.vat);

    this.onPriceChange(1);

  }

  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }



onPriceChange(n: Number) {
  let purchasePrice = +this.transportProductForm.value['priceHT'];
  let purchasePriceTTC = +this.transportProductForm.value['priceTTC'];
  let vat = this.transportProductForm.value['vat'];

  if (purchasePrice === undefined || purchasePrice == null) {
    purchasePrice = 0;
  } if (purchasePriceTTC === undefined || purchasePriceTTC == null) {
    purchasePriceTTC = 0;
  } if (vat === undefined || vat == null) {
    vat = 0;
  }

  if (n === 1) {
    const amountTva = (purchasePrice / 100) * vat;
    const priceTTC = purchasePrice + amountTva;
    this.transportProductForm.patchValue({
      priceTTC: priceTTC.toFixed(2),
    });
  }if (n === 2) {
      purchasePrice = purchasePriceTTC / (1 + vat / 100);
      this.transportProductForm.patchValue({
        priceHT: purchasePrice.toFixed(2)
      });
  }

}

}
