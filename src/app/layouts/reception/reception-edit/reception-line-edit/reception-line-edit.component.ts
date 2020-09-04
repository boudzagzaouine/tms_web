import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UomService } from './../../../../shared/services/api/uom.service';
import { ProductPackService } from './../../../../shared/services/api/product-pack.service';
import { ProductService } from './../../../../shared/services/api/product.service';
import { ReceptionLineService } from './../../../../shared/services/api/reception-line.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Uom } from './../../../../shared/models/uom';
import { ProductPack } from './../../../../shared/models/product-pack';
import { Vat } from './../../../../shared/models/vat';
import { Product } from './../../../../shared/models/product';
import { ReceptionLine } from './../../../../shared/models/reception-line';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reception } from './../../../../shared/models';
import { VatService } from './../../../../shared/services/api/vat.service';

@Component({
  selector: 'app-reception-line-edit',
  templateUrl: './reception-line-edit.component.html',
  styleUrls: ['./reception-line-edit.component.css']
})
export class ReceptionLineEditComponent implements OnInit {

  @Input() selectedReceptionLine: ReceptionLine;
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() receptionLineAdded = new EventEmitter<ReceptionLine>();
  selectedProduct: Product;
  productList: Product[];
  vatList: Vat[];

  productPackList: ProductPack[] = [];
  uomList: Uom[] = [];


  selectedReception: Reception;
  receptionLineForm: FormGroup;

  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier la ligne de reception';

  constructor(private receptionLineService: ReceptionLineService,
    private productService: ProductService,
    private productPackService: ProductPackService,
    private uomService: UomService,
    private vatService: VatService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.vatService.findAll().subscribe(
      data => {
        this.vatList = data;
      }
    );

    this.displayDialog = true;
    this.initForm();
    this.onUnitPayedPriceChanged();
  }



  initForm() {
    if (!this.editMode) {
      this.selectedReceptionLine = new ReceptionLine();
    }
    this.receptionLineForm = new FormGroup({
      pdt: new FormControl(
          this.selectedReceptionLine != null &&
          this.selectedReceptionLine.product != null
              ? this.selectedReceptionLine.product.code
              : null,
          Validators.required
      ),

      description: new FormControl(
          this.selectedReceptionLine != null &&
          this.selectedReceptionLine.description != null
              ? this.selectedReceptionLine.description
              : ''
      ),

      expectedQuantity: new FormControl(
          this.selectedReceptionLine != null &&
          this.selectedReceptionLine.quantity != null
              ? this.selectedReceptionLine.quantity
              : null,
          Validators.required
      ),

      receivedQuantity: new FormControl(
          this.selectedReceptionLine != null &&
          this.selectedReceptionLine.quantityReceived != null
              ? this.selectedReceptionLine.quantityReceived
              : null
      ),

      expectedUom: new FormControl(
          this.selectedReceptionLine != null &&
          this.selectedReceptionLine.uom != null
              ? this.selectedReceptionLine.uom.code
              : null
      ),

      receivedUom: new FormControl(
          this.selectedReceptionLine != null &&
          this.selectedReceptionLine.uomReceived != null
              ? this.selectedReceptionLine.uomReceived.code
              : null
      ),

      blockType: new FormControl(
          this.selectedReceptionLine != null &&
          this.selectedReceptionLine.blockType != null
              ? this.selectedReceptionLine.blockType.code
              : null
      ),
      pdtPack: new FormControl(
          this.selectedReceptionLine != null &&
          this.selectedReceptionLine.product != null &&
          this.selectedReceptionLine.product.productPack != null
              ? this.selectedReceptionLine.product.productPack
              : null,
          Validators.required
      ),

      price: new FormControl({
          value:
              this.selectedReceptionLine != null &&
              this.selectedReceptionLine.product != null
                  ? this.selectedReceptionLine.product.purshasePriceUB
                  : null,
          disabled: true
      }),
      priceTTC: new FormControl({
          value:
              this.selectedReceptionLine != null &&
              this.selectedReceptionLine.product != null
                  ? this.selectedReceptionLine.product.purshasePriceTTCUB
                  : null,
          disabled: true
      }),

      payedPrice: new FormControl(
          this.selectedReceptionLine != null &&
          this.selectedReceptionLine.product != null
              ? this.selectedReceptionLine.purshasePrice
              : null,
          Validators.required
      ),

      payedPriceTTC: new FormControl(null),

      totalPayedPrice: new FormControl(
          this.selectedReceptionLine != null &&
          this.selectedReceptionLine.product != null
              ? this.selectedReceptionLine.totalPriceTTC
              : null
      ),
      totalPayedPriceTTC: new FormControl(null)
  });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.receptionLineForm.invalid) {
      return;
    }

    this.selectedReceptionLine.quantity = +this.receptionLineForm.value[
      'expectedQuantity'
      ];

  this.selectedReceptionLine.purshasePrice = +this.receptionLineForm
      .value['payedPrice'];
  this.selectedReceptionLine.description = this.receptionLineForm.value[
      'description'
      ];

      this.selectedReceptionLine.totalPriceHT =
      this.selectedReceptionLine.purshasePrice *
      this.selectedReceptionLine.quantity;
      this.selectedReceptionLine.totalPriceTTC = +this.receptionLineForm
      .value['totalPayedPriceTTC'];


  this.receptionLineAdded.emit(this.selectedReceptionLine);
    this.displayDialog = false;


  }

  searchProduct(event) {
    this.productService.find('code~' + event.query).subscribe(data => {
      this.productList = data;
    });
  }




onSelectProduct(event) {
  this.selectedReceptionLine.product = event as Product;
  this.selectedReceptionLine.productPack = this.selectedReceptionLine.product.productPack;
 // console.log(event);
  // console.log(event.value);
  this.selectedReceptionLine.description = this.selectedReceptionLine.product.shortDesc;
  this.selectedReceptionLine.vat = this.selectedReceptionLine.product.purchaseVat;
  this.receptionLineForm.patchValue({
      pdt: this.selectedReceptionLine.product,
      description: this.selectedReceptionLine.product.shortDesc,
      price: this.selectedReceptionLine.product.purshasePriceUB,
      priceTTC: this.selectedReceptionLine.product.purshasePriceTTCUB
  });
  this.productPackService
      .find('product.id:' + this.selectedReceptionLine.product.id)
      .subscribe(data => {
          if (data && data.length) {
              this.productPackList = data;
              this.selectedReceptionLine.productPack = data[0];
              this.selectedReceptionLine.uom = data[0].uom;
              this.receptionLineForm.patchValue({
                  pdtPack: data[0].uom.code
              });

              this.receptionLineForm.updateValueAndValidity();
             // console.log(data);
          }
      });
  // console.log('purchase price : ' + this.selectedReceptionLine.product.purshasePriceUB);
}
onUnitPayedPriceChanged() {
    if (this.selectedReceptionLine.product == null) {
        return;
    }
    const price = +this.receptionLineForm.value['payedPrice'];

    const qty = +this.receptionLineForm.value['expectedQuantity'];
    const vat =
        this.selectedReceptionLine.product !== null &&
        this.selectedReceptionLine.product.vat !== null
            ? this.selectedReceptionLine.product.vat.value / 100
            : 0;


    const priceHT = price * (1 + vat);
    this.receptionLineForm.patchValue({
        payedPriceTTC: (price * (1 + vat)).toFixed(2),
        totalPayedPrice: (price * qty).toFixed(2),
        totalPayedPriceTTC: (priceHT * qty).toFixed(2)
    });
}
  onUnitPayedPriceTTCChanged() {
    if (this.selectedReceptionLine.product == null) {
        return;
    }
    const priceTTC = +this.receptionLineForm.value['payedPriceTTC'];

    const qty = +this.receptionLineForm.value['expectedQuantity'];
    const vat =
        this.selectedReceptionLine.product !== null &&
        this.selectedReceptionLine.product.vat !== null
            ? this.selectedReceptionLine.product.vat.value / 100
            : 0;
    const priceHT = priceTTC / (1 + vat);
    this.receptionLineForm.patchValue({
        payedPrice: priceHT.toFixed(2),
        totalPayedPrice: (priceHT * qty).toFixed(2),
        totalPayedPriceTTC: (priceTTC * qty).toFixed(2)
    });
}

onSelectPdtPack(pdt) {
  // console.log(pdt);

  this.selectedReceptionLine.productPack = pdt.value;
  this.selectedReceptionLine.uom = pdt.value.uom;
}
onTotalPayedPriceChanged() {
  if (this.selectedReceptionLine.product == null) {
      return;
  }
  const totalPrice = +this.receptionLineForm.value['totalPayedPrice'];

  const qty = +this.receptionLineForm.value['expectedQuantity'];
  const vat =
      this.selectedReceptionLine.product !== null &&
      this.selectedReceptionLine.product.vat !== null
          ? this.selectedReceptionLine.product.vat.value / 100
          : 0;
  const unitPriceHT = totalPrice / qty;
  const unitPriceTTC = unitPriceHT * (1 + vat);
  this.receptionLineForm.patchValue({
      payedPrice: unitPriceHT.toFixed(2),
      payedPriceTTC: unitPriceTTC.toFixed(2),
      totalPayedPriceTTC: (unitPriceHT * qty).toFixed(2)
  });
}

onTotalPayedPriceTTCChanged() {
  if (this.selectedReceptionLine.product == null) {
      return;
  }
  const totalPriceTTC = +this.receptionLineForm.value['totalPayedPriceTTC'];
  const qty = +this.receptionLineForm.value['expectedQuantity'];

  const vat =
      this.selectedReceptionLine.product !== null &&
      this.selectedReceptionLine.product.vat !== null
          ? this.selectedReceptionLine.product.vat.value / 100
          : 0;
  const unitPriceTTC = totalPriceTTC / qty;
  const priceHT = unitPriceTTC / (1 + vat);
  this.receptionLineForm.patchValue({
      payedPriceTTC: (totalPriceTTC / qty).toFixed(2),
      payedPrice: priceHT.toFixed(2),
      totalPayedPrice: (priceHT * qty).toFixed(2)
  });
}


  onNumberChanged() {
    const price = +this.receptionLineForm.value['payedPrice'];
    const quantity = +this.receptionLineForm.value['quantity'];
    // console.log(price);
    // console.log(quantity);

    if (!isNaN(price) && !isNaN(quantity)) {
      this.receptionLineForm.patchValue(
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
