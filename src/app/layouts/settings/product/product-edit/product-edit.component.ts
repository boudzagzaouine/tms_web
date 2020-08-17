import { ProductService } from './../../../../shared/services/api/product.service';
import { VatService } from './../../../../shared/services/api/vat.service';
import { UomService } from './../../../../shared/services/api/uom.service';
import { Uom } from './../../../../shared/models/uom';
import { Vat } from './../../../../shared/models/vat';
import { ProductTypeService } from './../../../../shared/services/api/product-type.service';
import { ProductType } from './../../../../shared/models/product-type';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from './../../../../shared/services/api/supplier.service';
import { Address } from './../../../../shared/models/address';
import { Contact } from './../../../../shared/models/contact';
import { Supplier } from './../../../../shared/models/supplier';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './../../../../shared/models';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  @Input() selectedProduct: Product;
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un produit';

  productForm: FormGroup;

  vats: Vat[];
  uoms: Uom[];
  productTypeList: ProductType[];

  constructor(
    private productTypeService: ProductTypeService,
    private productService: ProductService,
    private vatService: VatService,
    private uomService: UomService,

    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

   this.productTypeService.findAll().subscribe((data: ProductType[]) => {
      this.productTypeList = data;
  });
    this.vatService.findAll().subscribe((data: Vat[]) => {
      this.vats = data;
    });

    this.uomService.findAll().subscribe((data: Uom[]) => {
      this.uoms = data;
    });

    if (this.editMode === 1) {
      this.selectedProduct = new Product();
      this.title = 'Ajouter un produit';

    } else {
      console.log(this.selectedProduct);
      console.log(this.productForm);
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {

    this.productForm = new FormGroup({
      code: new FormControl(this.selectedProduct.code,Validators.required),
      description: new FormControl(this.selectedProduct.desc),
      type: new FormControl(this.selectedProduct.productType,Validators.required),
      uom: new FormControl( this.selectedProduct.uomByProductUomBase,Validators.required),
      vat: new FormControl(this.selectedProduct.vat,Validators.required),
      purchaseVat: new FormControl(this.selectedProduct.purchaseVat,Validators.required ),
      purchasePrice: new FormControl(this.selectedProduct.purshasePriceUB,Validators.required),
      salePrice: new FormControl(this.selectedProduct.salePriceUB,Validators.required),
      purchasePriceTTC: new FormControl(this.selectedProduct.purshasePriceTTCUB,Validators.required),
      salePriceTTC: new FormControl(this.selectedProduct.salePriceTTCUB, ),
       margin: new FormControl(this.selectedProduct.marginOfPurchase,Validators.required),


  });

  }
  onSubmit() {
    console.log("sbmt");

    this.isFormSubmitted = true;
    if (this.productForm.invalid) { return; }

    this.spinner.show();
    this.selectedProduct.code = this.productForm.value['code'];
    this.selectedProduct.shortDesc = this.productForm.value['description'];
    this.selectedProduct.desc = this.productForm.value['description'];
    // this.selectedProduct.vat = this.productForm.value['vat'];
    this.selectedProduct.purshasePriceUB = +this.productForm.value[
        'purchasePrice'
    ];
    this.selectedProduct.purshasePriceTTCUB = +this.productForm.value[
      'purchasePriceTTC'
  ];

    this.selectedProduct.salePriceUB = +this.productForm.value['salePrice'];
    this.selectedProduct.salePriceTTCUB = +this.productForm.value['salePriceTTC'];

    this.selectedProduct.marginOfPurchase = +this.productForm.value[
        'margin'
    ];
    this.selectedProduct.proMarginOfPurchase = this.productForm.value[
        'professionalMargin'
    ];
    this.selectedProduct.discount = +this.productForm.value['discount'];
    this.selectedProduct.active = true;
    this.selectedProduct.materialABCCode = 'A';



     console.log(this.selectedProduct);

    this.productService.set(this.selectedProduct).subscribe(
      data => {
          this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
          this.displayDialog = false;
          this.isFormSubmitted = false;
          this.spinner.hide();
        },
      error => {
        this.toastr.error(error.error.message);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );


  }

  onSearchProduct(event: any) {
    this.productTypeService.find(`code~${event.query}`).subscribe(
        data => {
            this.productTypeList = data;
        }
    );
}

onSelectProductType(type: ProductType) {
 console.log(type);

  this.selectedProduct.productType = type as ProductType;

}
onSelectUom(event) {
  this.selectedProduct.uomByProductUomBase = event.value as Uom;
  this.selectedProduct.uomByProductUomPurshase = event.value as Uom;
  this.selectedProduct.uomByProductUomSale = event.value as Uom;

  this.productForm.patchValue({
      uom: this.selectedProduct.uomByProductUomBase
  });
}

onSelectVat(event) {
  // console.log(event);
  this.selectedProduct.vat = event.value as Vat;
  this.productForm.patchValue({
      vat: this.selectedProduct.vat
  });
}
onSelectPurchaseVat(event) {
  // console.log(event);
  this.selectedProduct.purchaseVat = event.value as Vat;
  this.productForm.patchValue({
    purchaseVat: this.selectedProduct.purchaseVat
  });


}
onTTCPriceChange(n: Number) {
  let purchasePrice = +this.productForm.value['purchasePrice'];
  let purchasePriceTTC = +this.productForm.value['purchasePriceTTC'];
  const vat: Vat = this.productForm.value['vat'];
  const vatPurchase: Vat = this.productForm.value['purchaseVat'];
  let salePrice = +this.productForm.value['salePrice'];
  let salePriceTTC = +this.productForm.value['salePriceTTC'];
  let margin = +this.productForm.value['margin'];

  if (purchasePrice === undefined || purchasePrice == null) {
      purchasePrice = 0;
  }

  if (salePrice === undefined || salePrice == null) {
      salePrice = 0;
  }
  if (purchasePriceTTC === undefined || purchasePriceTTC == null) {
      purchasePriceTTC = 0;
  }
  if (salePriceTTC === undefined || salePriceTTC == null) {
      salePriceTTC = 0;
  }
  if (margin === undefined || margin == null) {
      margin = 0;
  }

  if (n === 1) {
      salePrice = salePriceTTC / (1 + vat.value / 100);
      this.productForm.patchValue({
          salePrice: salePrice.toFixed(2)
      });
  } else if (n === 2) {
      purchasePrice = purchasePriceTTC / (1 + vatPurchase.value / 100);
      this.productForm.patchValue({
          purchasePrice: purchasePrice.toFixed(2)
      });
  }
  margin = (salePrice / purchasePrice - 1) * 100;
  this.productForm.patchValue({
      margin: margin.toFixed(2)
  });
}

onPriceOrMarginChange(n: Number) {
  let purchasePrice = +this.productForm.value['purchasePrice'];
  let purchasePriceTTC = +this.productForm.value['purchasePriceTTC'];
  const vat: Vat = this.productForm.value['vat'];
  const vatPurchase: Vat = this.productForm.value['purchaseVat'];
  let salePrice = +this.productForm.value['salePrice'];
  let salePriceTTC = +this.productForm.value['salePriceTTC'];
  let margin = +this.productForm.value['margin'];
  let proMargin = +this.productForm.value['professionalMargin'];

  if (
      purchasePrice === undefined ||
      purchasePrice == null ||
      purchasePrice === NaN
  ) {
      purchasePrice = 0;
  }
  if (salePrice === undefined || salePrice == null || salePrice === NaN) {
      salePrice = 0;
  }
  if (
      purchasePriceTTC === undefined ||
      purchasePriceTTC == null ||
      purchasePriceTTC === NaN
  ) {
      purchasePriceTTC = 0;
  }
  if (
      salePriceTTC === undefined ||
      salePriceTTC == null ||
      salePriceTTC === NaN
  ) {
      salePriceTTC = 0;
  }

  if (n === 1) {
      // Purchase Price Changed
      purchasePriceTTC = purchasePrice * (1 + vatPurchase.value / 100);
      if (
          margin !== undefined &&
          margin != null &&
          NaN !== margin &&
          0 !== margin
      ) {
          salePrice = purchasePrice * (1 + margin / 100);
          salePriceTTC = salePrice * (1 + vat.value / 100);
          this.productForm.patchValue({
              salePrice: salePrice.toFixed(2)
          });
          this.productForm.patchValue({
              salePriceTTC: salePriceTTC.toFixed(2)
          });
      }
      this.productForm.patchValue({
          purchasePriceTTC: purchasePriceTTC.toFixed(2)
      });
  } else if (n === 2) {
      // Sale Price Changed
      salePriceTTC = salePrice * (1 + vat.value / 100);
      if (0 !== purchasePrice) {
          margin = (salePrice / purchasePrice - 1) * 100;
          this.productForm.patchValue({
              margin: margin.toFixed(2),
              salePriceTTC: salePriceTTC.toFixed(2)
          });
      }
  } else if (n === 3) {
      // Margin Changed
      salePrice = purchasePrice * (1 + margin / 100);
      salePriceTTC = salePrice * (1 + vat.value / 100);
      this.productForm.patchValue({
          salePrice: salePrice.toFixed(2)
      });

      this.productForm.patchValue({
          salePriceTTC: salePriceTTC.toFixed(2)
      });
  } else if (n === 4) {
      // Pro Margin Changed
      if (
          proMargin !== undefined &&
          proMargin != null &&
          NaN !== proMargin &&
          0 !== proMargin
      ) {
          salePrice = purchasePrice * (1 + proMargin / 100);
          salePriceTTC = salePrice * (1 + vat.value / 100);
          this.productForm.patchValue({
              professionalSalePrice: salePrice.toFixed(2)
          });

          this.productForm.patchValue({
              professionalTTCSalePrice: salePriceTTC.toFixed(2)
          });
          // console.log('pro margin changed');
      }
  }
}
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
