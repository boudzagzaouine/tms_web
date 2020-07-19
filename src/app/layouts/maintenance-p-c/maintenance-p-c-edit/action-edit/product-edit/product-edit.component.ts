import { ProductService } from './../../../../../shared/services/api/product.service';
import { RoundPipe } from 'ngx-pipes';
import { Product } from './../../../../../shared/models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionLine } from './../../../../../shared/models/action-line';
import { Action } from './../../../../../shared/models/action';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: [RoundPipe],

})
export class ProductEditComponent implements OnInit {


  @Input() selectedActionLine: ActionLine = new ActionLine();
  @Input() editMode = false;
  @Output() actionLineEdited = new EventEmitter<ActionLine>();
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un produit';
  selectedProduct: Product;
  lineForm: FormGroup;
  productList: Product[] = [];
  actionList: Array<Action> = [];
  actionSearch: Action;
  selectedActions = new Action();

  constructor(
    private formBuilder: FormBuilder,
    private roundPipe: RoundPipe,
    private productService: ProductService,

  ) { }

  ngOnInit() {

    this.title = 'Ajouter un produit';
    this.displayDialog = true;


    if (!this.editMode) {
      this.selectedActionLine = new ActionLine();
      console.log(this.selectedActionLine);

    }
    console.log(this.selectedActionLine);
    this.initForm();


  }

  initForm() {
    this.lineForm = this.formBuilder.group({
      product: this.formBuilder.control(
        {
          value: this.selectedActionLine.product,
          disabled: this.editMode,
        },
        Validators.required
      ),
      description: this.formBuilder.control(
        this.selectedActionLine.description
      ),
      unitPrice: this.formBuilder.control(
        this.roundPipe.transform(this.selectedActionLine.unitPrice, 2)
      ),
      quantity: this.formBuilder.control(
        this.roundPipe.transform(this.selectedActionLine.quantity, 2)
      ),
      priceHT: this.formBuilder.control({
        value: this.roundPipe.transform(
          this.selectedActionLine.totalPriceHT,
          2
        ),
        disabled: true,
      }),
      priceTTC: this.formBuilder.control({
        value: this.roundPipe.transform(
          this.selectedActionLine.totalPriceTTC,
          2
        ),
        disabled: true,
      }),

      tva: this.formBuilder.control({
        value: this.selectedActionLine.product ?
          this.selectedActionLine.product.vat.value : 0,
        disabled: true,
      }),

      amountTva: this.formBuilder.control({
        value: this.roundPipe.transform(
          this.selectedActionLine.amountVat,
          2
        ),
        disabled: true,
      }),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.lineForm.invalid) {
      return;
    }
    this.selectedActionLine.description = this.lineForm.value['description'];
    this.selectedActionLine.unitPrice = +this.lineForm.value['unitPrice'];
    this.selectedActionLine.quantity = +this.lineForm.value['quantity'];
    this.actionLineEdited.emit(this.selectedActionLine);
    this.displayDialog = false;

  }
  productSearch(evt) {
    this.productService.find(`code~${evt.query}`).subscribe((data) => {
      this.productList = data;
    });
  }
  onSelectProduct(event) {
    this.selectedProduct = event as Product;
    this.selectedActionLine.product = event as Product;
    this.lineForm.patchValue({
      description: this.selectedProduct.shortDesc,
      unitPrice: this.selectedProduct.purshasePriceUB
        ? this.selectedProduct.purshasePriceUB
        : 0,
      tva: this.selectedProduct.vat.value,
    });
    this.onUnitPriceChange();
  }
  onQuantityChange() {
    const quantity = this.lineForm.value['quantity'];
    let unitPrice = this.lineForm.value['unitPrice'];
    let vat = 0;
    if (
      this.selectedActionLine.product != null &&
      this.selectedActionLine.product.vat != null
    ) {
      vat = this.selectedActionLine.product.vat.value;
    }
    if (!unitPrice) {
      unitPrice = 0;
    }
    const priceHT = unitPrice * quantity;
    const amountTva = (priceHT / 100) * vat;
    const priceTTC = priceHT + amountTva;
    this.selectedActionLine.totalPriceHT = priceHT;
    this.selectedActionLine.totalPriceTTC = priceTTC;
    this.selectedActionLine.amountVat = amountTva;
    this.lineForm.patchValue({
      priceHT: this.roundPipe.transform(priceHT, 2),
      priceTTC: this.roundPipe.transform(priceTTC, 2),
      amountTva: this.roundPipe.transform(amountTva, 2),
    });
  }

  onUnitPriceChange() {
    let quantity = this.lineForm.value['quantity'];
    const unitPrice = this.lineForm.value['unitPrice'];
    let vat = 0;
    if (
      this.selectedActionLine.product != null &&
      this.selectedActionLine.product.vat != null
    ) {
      vat = this.selectedActionLine.product.vat.value;
    }
    if (!quantity) {
      quantity = 0;
    }
    const priceHT = unitPrice * quantity;
    const amountTva = (priceHT / 100) * vat;
    const priceTTC = priceHT + amountTva;

    this.selectedActionLine.totalPriceHT = priceHT;
    this.selectedActionLine.totalPriceTTC = priceTTC;
    this.selectedActionLine.amountVat = amountTva;
    this.lineForm.patchValue({
      priceHT: this.roundPipe.transform(priceHT, 2),
      priceTTC: this.roundPipe.transform(priceTTC, 2),
      amountTva: this.roundPipe.transform(amountTva, 2),
    });
  }

  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }
}
