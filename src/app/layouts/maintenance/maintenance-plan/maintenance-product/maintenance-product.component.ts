import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RoundPipe } from 'ngx-pipes';
import { ActionLineMaintenance } from './../../../../shared/models/action-line-maintenance';
import { MaintenanceState, Product } from './../../../../shared/models';
import { ActionMaintenance } from './../../../../shared/models/action-maintenance';
import { MaintenanceStateService } from './../../../../shared/services';
import { ProductService } from './../../../../shared/services/api/product.service';

@Component({
  selector: 'app-maintenance-product',
  templateUrl: './maintenance-product.component.html',
  styleUrls: ['./maintenance-product.component.scss']
})
export class MaintenanceProductComponent implements OnInit {

  @Input() selectedActionLine: ActionLineMaintenance = new ActionLineMaintenance();
  @Input() editMode = false;
  @Output() actionLineEdited = new EventEmitter<ActionLineMaintenance>();
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un produit';
  selectedProduct: Product;
  lineForm: FormGroup;
  productList: Product[] = [];
  actionList: Array<ActionMaintenance> = [];
  actionSearch: ActionMaintenance;
  selectedActions = new ActionMaintenance();
  maintenanceStateList: Array<MaintenanceState> = [];

  constructor(
    private formBuilder: FormBuilder,
    private roundPipe: RoundPipe,
    private productService: ProductService,
    private maintenanceStateService : MaintenanceStateService,
  ) { }

  ngOnInit() {

    this.title = 'Ajouter un produit';
    this.displayDialog = true;


    if (!this.editMode) {
      this.selectedActionLine = new ActionLineMaintenance();
      console.log(this.selectedActionLine);

      // this.maintenanceStateService.findAll().subscribe((data) => {
      //  this.maintenanceStateList= data.filter(f => f.id === 2);
      //  this.selectedActionLine.maintenanceState=this.maintenanceStateList[0];
      // })
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
    //this.selectedActionLine.quantityServed = +this.lineForm.value['quantity'];
  
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
