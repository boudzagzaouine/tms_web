import { Vat } from './../../../../shared/models/vat';
import { Uom } from './../../../../shared/models/uom';
import { UomService } from './../../../../shared/services/api/uom.service';
import { ProductPackService } from './../../../../shared/services/api/product-pack.service';
import { ProductService } from './../../../../shared/services/api/product.service';
import { ProductPack } from './../../../../shared/models/product-pack';
import { Product } from './../../../../shared/models/product';
import { PurchaseOrderLineService } from './../../../../shared/services/api/purchase-order-line.service';
import { PurchaseOrderLine } from './../../../../shared/models/purchase-order-line';
import { ReceptionLineService } from './../../../../shared/services/api/reception-line.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReceptionLine } from './../../../../shared/models/reception-line';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Reception } from './../../../../shared/models/reception';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VatService } from './../../../../shared/services/api/vat.service';

@Component({
  selector: 'app-order-line-edit',
  templateUrl: './order-line-edit.component.html',
  styleUrls: ['./order-line-edit.component.css']
})
export class OrderLineEditComponent implements OnInit {

    @Input()selectedPurchaseOrderLine: PurchaseOrderLine;
    @Input() editMode: number;
    @Output() showDialog = new EventEmitter<boolean>();
    @Output()purchaseOrderLineAdded = new EventEmitter<PurchaseOrderLine>();
    selectedProduct: Product;
    productList: Product[];
    vatList: Vat[];

    productPackList: ProductPack[] = [];
    uomList: Uom[] = [];

   selectedReception: Reception;
   purchaseOrderLineForm: FormGroup;

  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier la ligne de commande';

  constructor(private purchaseOrderLineService: PurchaseOrderLineService,
    private productService :ProductService,
    private productPackService: ProductPackService,
    private uomService :UomService,
    private vatService :VatService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {

    console.log(this.selectedPurchaseOrderLine);

    this.vatService.findAll().subscribe(
      data=>{
        this.vatList =data;
      }
    );

    this.displayDialog=true;
    this.initForm();
  }



  initForm() {
    if (!this.editMode) {
        this.selectedPurchaseOrderLine = new PurchaseOrderLine();
    }
    this.selectedProduct = this.selectedPurchaseOrderLine.product;
    this.purchaseOrderLineForm = new FormGroup({
        pdt: new FormControl(
            {
                value:
                    this.selectedPurchaseOrderLine != null &&
                    this.selectedPurchaseOrderLine.product != null
                        ? this.selectedPurchaseOrderLine.product.code
                        : null,
                disabled: this.editMode
            },
            Validators.required
        ),

        description: new FormControl(
                this.selectedPurchaseOrderLine != null
                    ? this.selectedPurchaseOrderLine.description
                    : ''
        ),

        price: new FormControl({
            value:
                this.selectedPurchaseOrderLine != null &&
                this.selectedPurchaseOrderLine.product != null
                    ? this.selectedPurchaseOrderLine.product.purshasePriceUB
                    : null,
            disabled: true
        },  Validators.required),

        payedPrice: new FormControl(
            this.selectedPurchaseOrderLine != null
                ? this.selectedPurchaseOrderLine.purshasePrice
                : null,
            Validators.required
        ),

        quantity: new FormControl(
            this.selectedPurchaseOrderLine != null
                ? this.selectedPurchaseOrderLine.quantity
                : '1',
            Validators.required
        ),
        pdtPack: new FormControl(

          {
            value:
                this.selectedPurchaseOrderLine != null &&
                this.selectedPurchaseOrderLine.uom != null
                    ? this.selectedPurchaseOrderLine.uom.code
                    : null,
            disabled: this.editMode
        },


        ),

        totalHT: new FormControl({
            value:
                this.selectedPurchaseOrderLine != null
                    ? this.selectedPurchaseOrderLine.totalPriceHT
                    : '',
            disabled: true
        }),

        totalTTC: new FormControl({
            value:
                this.selectedPurchaseOrderLine != null
                    ? this.selectedPurchaseOrderLine.totalPriceTTC
                    : '',
            disabled: true
        }),
        vat: new FormControl(
          {
            value:
                this.selectedPurchaseOrderLine != null &&
                this.selectedPurchaseOrderLine.vat != null
                    ? this.selectedPurchaseOrderLine.vat.value
                    : null,
            disabled: this.editMode
        },
        )
    });
}


onSubmit() {
  this.isFormSubmitted=true;
  if (this.purchaseOrderLineForm.invalid) {
      return;
  }

  const payedPrice = +this.purchaseOrderLineForm.value['payedPrice'];
  const price = +this.purchaseOrderLineForm.value['payedPrice'];
  const quantity = +this.purchaseOrderLineForm.value['quantity'];


  if (!isNaN(price) && !isNaN(quantity)) {
      this.selectedPurchaseOrderLine.totalPriceHT = price * quantity;
      this.selectedPurchaseOrderLine.totalPriceTTC =
          price * quantity * (1 + this.selectedProduct.vat.value / 100);
  }

  console.log (this.purchaseOrderLineForm.value['vat']);
  console.log(this.selectedProduct.purchaseVat);

  this.selectedPurchaseOrderLine.vat =  this.selectedProduct.vat;
  this.selectedPurchaseOrderLine.purshasePrice = price;
  this.selectedPurchaseOrderLine.quantity = quantity;
  if (!this.editMode) {
      const pdtPack = this.purchaseOrderLineForm.value[
          'pdtPack'
      ] as ProductPack;
      this.selectedPurchaseOrderLine.product = this.selectedProduct;
      this.selectedPurchaseOrderLine.description = this.purchaseOrderLineForm.value['description'];
      this.selectedPurchaseOrderLine.productPack = pdtPack;
      this.selectedPurchaseOrderLine.uom = pdtPack.uom;
  }

   console.log(this.selectedPurchaseOrderLine);
  this.purchaseOrderLineAdded.emit(this.selectedPurchaseOrderLine);
  this.displayDialog=false;


}

searchProduct(event) {
  this.productService.find('code~' + event.query).subscribe(data => {
      this.productList = data;
  });
}


public onSelectProduct(value: Product): void {
  this.selectedProduct = value;
  this.productPackService
      .find('product.id:' + this.selectedProduct.id)
      .subscribe(data => {
          this.productPackList = data;
          console.log(data);

          this.purchaseOrderLineForm.patchValue({
              price: this.selectedProduct.purshasePriceUB,
              vat: this.selectedProduct.vat.value,
              description: this.selectedProduct.shortDesc,
              pdtPack: data[0]
          });

          this.purchaseOrderLineForm.updateValueAndValidity();
           console.log( this.purchaseOrderLineForm);

      });

}

onNumberChanged() {
  const price = +this.purchaseOrderLineForm.value['payedPrice'];
  const quantity = +this.purchaseOrderLineForm.value['quantity'];
  if (!isNaN(price) && !isNaN(quantity)) {
      this.purchaseOrderLineForm.patchValue(
          {
              totalHT: (price * quantity),
              totalTTC: (
                  price *
                  quantity *
                  (1 + this.selectedProduct.vat.value / 100)
              )
          },
          {
              onlySelf: true
          }
      );
  }
}

onShowDialog() {
  let a = false;
  this.showDialog.emit(a);
}


}
