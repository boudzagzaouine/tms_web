import { ProductService } from "./../../../../../shared/services/api/product.service";
import { Product } from "./../../../../../shared/models/product";
import { MaintenanceLine } from "./../../../../../shared/models/maintenance-line";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RoundPipe } from "ngx-pipes";
import { Action } from "./../../../../../shared/models/action";
import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"],
  providers: [RoundPipe],
})
export class ProductEditComponent implements OnInit {

  @Input() selectedMaintenanceLine: MaintenanceLine = new MaintenanceLine();
  @Input() editMode = false;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() lineEdited = new EventEmitter<MaintenanceLine>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier un produit";
  selectedProduct: Product;
  lineForm: FormGroup;
  productList: Product[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roundPipe: RoundPipe,
    private productService: ProductService
  ) {}

  ngOnInit() {

    this.title = "Ajouter un produit";
    this.displayDialog = true;

    this.initForm();
  }

  initForm() {
    this.lineForm = this.formBuilder.group({
      product: this.formBuilder.control(
        {
          value: this.selectedMaintenanceLine.product,
          disabled: this.editMode,
        },
        Validators.required
      ),
      description: this.formBuilder.control(
        this.selectedMaintenanceLine.description
      ),
      unitPrice: this.formBuilder.control(
        this.roundPipe.transform(this.selectedMaintenanceLine.unitPrice, 2)
      ),
      quantity: this.formBuilder.control(
        this.roundPipe.transform(this.selectedMaintenanceLine.quantity, 2)
      ),
      priceHT: this.formBuilder.control({
        value: this.roundPipe.transform(
          this.selectedMaintenanceLine.totalPriceHT,
          2
        ),
        disabled: true,
      }),
      priceTTC: this.formBuilder.control({
        value: this.roundPipe.transform(
          this.selectedMaintenanceLine.totalPriceTTC,
          2
        ),
        disabled: true,
      }),

      tva: this.formBuilder.control({
        value: this.editMode
          ? this.selectedMaintenanceLine.product.vat.value
          : 0,
        disabled: true,
      }),
      amountTva: this.formBuilder.control({
        value: this.roundPipe.transform(
          this.selectedMaintenanceLine.amountVat,
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

    this.selectedMaintenanceLine.description = this.lineForm.value[
      "description"
    ];
    this.selectedMaintenanceLine.unitPrice = +this.lineForm.value["unitPrice"];
    this.selectedMaintenanceLine.quantity = +this.lineForm.value["quantity"];

    this.lineEdited.emit(this.selectedMaintenanceLine);

    this.displayDialog = false;
  }
  productSearch(evt) {
    this.productService.find(`code~${evt.query}`).subscribe((data) => {
      this.productList = data;
    });
  }
  onSelectProduct(event) {

    this.selectedProduct = event as Product;
    this.selectedMaintenanceLine.product = event as Product;

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
    const quantity = this.lineForm.value["quantity"];
    let unitPrice = this.lineForm.value["unitPrice"];

    let vat = 0;
    if (
      this.selectedMaintenanceLine.product != null &&
      this.selectedMaintenanceLine.product.vat != null
    ) {
      vat = this.selectedMaintenanceLine.product.vat.value;
    }
    if (!unitPrice) {
      unitPrice = 0;
    }

    const priceHT = unitPrice * quantity;
    const amountTva = (priceHT / 100) * vat;
    const priceTTC = priceHT + amountTva;
    this.selectedMaintenanceLine.totalPriceHT = priceHT;
    this.selectedMaintenanceLine.totalPriceTTC = priceTTC;
    this.selectedMaintenanceLine.amountVat = amountTva;
    this.lineForm.patchValue({
      priceHT: this.roundPipe.transform(priceHT, 2),
      priceTTC: this.roundPipe.transform(priceTTC, 2),
      amountTva: this.roundPipe.transform(amountTva, 2),
    });
  }

  onUnitPriceChange() {
    let quantity = this.lineForm.value["quantity"];
    const unitPrice = this.lineForm.value["unitPrice"];
    let vat = 0;
    if (
      this.selectedMaintenanceLine.product != null &&
      this.selectedMaintenanceLine.product.vat != null
    ) {
      vat = this.selectedMaintenanceLine.product.vat.value;
    }
    if (!quantity) {
      quantity = 0;
    }

    const priceHT = unitPrice * quantity;
    const amountTva = (priceHT / 100) * vat;
    const priceTTC = priceHT + amountTva;

    this.selectedMaintenanceLine.totalPriceHT = priceHT;
    this.selectedMaintenanceLine.totalPriceTTC = priceTTC;
    this.selectedMaintenanceLine.amountVat = amountTva;
    this.lineForm.patchValue({
      priceHT: this.roundPipe.transform(priceHT, 2),
      priceTTC: this.roundPipe.transform(priceTTC, 2),
      amountTva: this.roundPipe.transform(amountTva, 2),
    });
  }

  onHideDialog() {
    let a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;
    console.log(this.selectedMaintenanceLine);

  }
}
