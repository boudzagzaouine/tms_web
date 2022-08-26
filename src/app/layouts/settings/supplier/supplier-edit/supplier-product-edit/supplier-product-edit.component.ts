import { VatService } from './../../../../../shared/services/api/vat.service';
import { UomService } from './../../../../../shared/services/api/uom.service';
import { Subscription } from 'rxjs';
import { Uom } from './../../../../../shared/models/uom';
import { Vat } from './../../../../../shared/models/vat';
import { Product } from './../../../../../shared/models/product';
import { ProductService } from './../../../../../shared/services/api/product.service';
import { SupplierProductService } from './../../../../../shared/services/api/supplier-product.service';
import { AuthenticationService } from './../../../../../shared/services/api/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplierProduct } from './../../../../../shared/models/supplier-product';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-supplier-product-edit',
  templateUrl: './supplier-product-edit.component.html',
  styleUrls: ['./supplier-product-edit.component.scss']
})
export class SupplierProductEditComponent implements OnInit {


  @Input() selectedSupplierProduct: SupplierProduct = new SupplierProduct();
  @Input() editMode = false;
  @Output() supplierProductEdited = new EventEmitter<SupplierProduct>();
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Catalogue ';
  supplierProductForm: FormGroup;
  supplierProductCode :string ;
  productList: Product[] = [];
  vats: Vat[];
  uoms: Uom[];
  subscriptions = new Subscription();


  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,
    private supplierProductService : SupplierProductService,
    private productService:ProductService,
    private vatService: VatService,
    private uomService: UomService,



  ) { }

  ngOnInit() {
    this.subscriptions.add(this.vatService.findAll().subscribe((data: Vat[]) => {
      this.vats = data;
    }));

    this.subscriptions.add(this.uomService.findAll().subscribe((data: Uom[]) => {
      this.uoms = data;


    }));

    this.displayDialog = true;
    console.log(this.editMode);


    if (!this.editMode) {
      this.title = 'Ajouter un Catalogue';

      console.log("new");
      this.selectedSupplierProduct = new SupplierProduct();

    }
    else{
      this.title = 'Modifier un catalogue';







    }
    this.initForm();
    console.log(this.selectedSupplierProduct);



  }

  initForm() {

    this.supplierProductForm = this.formBuilder.group({

      product: this.formBuilder.control(this.selectedSupplierProduct.product,Validators.required),
      supplier: this.formBuilder.control(this.selectedSupplierProduct.supplier),
      uom: this.formBuilder.control(this.selectedSupplierProduct.uom),

      priceHT: this.formBuilder.control(this.selectedSupplierProduct.priceHT),
      vat: this.formBuilder.control(this.selectedSupplierProduct.vat),
      priceTTC: this.formBuilder.control(this.selectedSupplierProduct.priceTTC),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.supplierProductForm.invalid) {
      return;
    }

    // this.selectedSupplierProduct.Day = this.supplierProductForm.value['day'];
   // this.selectedSupplierProduct.code = this.supplierProductCode;
    this.selectedSupplierProduct.priceHT = this.supplierProductForm.value['priceHT'];
    this.selectedSupplierProduct.priceTTC = this.supplierProductForm.value['priceTTC'];


    this.selectedSupplierProduct.owner = this.authentificationService.getDefaultOwner();
    console.log(this.selectedSupplierProduct);

    this.supplierProductEdited.emit(this.selectedSupplierProduct);
    this.displayDialog = false;

  }

  productSearch(evt) {
    this.productService.find(`code~${evt.query}`).subscribe((data) => {
      this.productList = data;
    });
  }

  onSelectProduct(event) {
    //this.selectedProduct = event as Product;
    this.selectedSupplierProduct.product = event as Product;
    this.selectedSupplierProduct.uom=this.selectedSupplierProduct.product.uomByProductUomBase;
    this.selectedSupplierProduct.vat=this.selectedSupplierProduct.product.vat;
    this.supplierProductForm.patchValue({
      //description: this.selectedProduct.shortDesc,
      priceHT: this.selectedSupplierProduct.product.purshasePriceUB
        ? this.selectedSupplierProduct.product.purshasePriceUB
        : 0,
        priceTTC: this.selectedSupplierProduct.product.purshasePriceTTCUB
        ? this.selectedSupplierProduct.product.purshasePriceTTCUB
        : 0,

      vat: this.selectedSupplierProduct.product.vat.value,
      uom: this.selectedSupplierProduct.product.uomByProductUomBase,

    });

  }



  onSelectUom(event) {

    this.selectedSupplierProduct.uom = event.value as Uom;
console.log( this.selectedSupplierProduct.uom);



  }


  onSelectVat(event ) {
  let vat= this.vats.filter(f=> f.value== event.value)[0];

    this.selectedSupplierProduct.vat = vat;
    console.log(this.selectedSupplierProduct.vat);

    this.onPriceChange(1);

  }

  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }



onPriceChange(n: Number) {
  let purchasePrice = +this.supplierProductForm.value['priceHT'];
  let purchasePriceTTC = +this.supplierProductForm.value['priceTTC'];
  let vat = this.supplierProductForm.value['vat'];

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
    this.supplierProductForm.patchValue({
      priceTTC: priceTTC.toFixed(2),
    });
  }if (n === 2) {
      purchasePrice = purchasePriceTTC / (1 + vat / 100);
      this.supplierProductForm.patchValue({
        priceHT: purchasePrice.toFixed(2)
      });
  }

}

}
