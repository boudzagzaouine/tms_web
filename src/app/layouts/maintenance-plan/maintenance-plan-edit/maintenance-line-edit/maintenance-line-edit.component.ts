import { Product } from './../../../../shared/models/product';
import { ProductService } from './../../../../shared/services/api/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaintenanceLine } from './../../../../shared/models/maintenance-line';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RoundPipe } from 'ngx-pipes';

@Component({
  selector: 'app-maintenance-line-edit',
  templateUrl: './maintenance-line-edit.component.html',
  styleUrls: ['./maintenance-line-edit.component.css'],
  providers: [RoundPipe]
})
export class MaintenanceLineEditComponent implements OnInit {

  @Input() selectedMaintenanceLine: MaintenanceLine = new MaintenanceLine();
  @Input() editMode = false;
  @Output() lineEdited = new EventEmitter<MaintenanceLine>();

  selectedProduct: Product;

  isFormSubmitted = false;

  lineForm: FormGroup;
  productList: Product[] = [];
  modal: NgbModalRef;
  closeResult: string;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private modalService: NgbModal,
    private roundPipe: RoundPipe) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.lineForm = this.formBuilder.group(
      {
        'product': this.formBuilder.control(
          {
            value: this.selectedMaintenanceLine.product, disabled: this.editMode
          }, Validators.required
        ),
        'description': this.formBuilder.control(this.selectedMaintenanceLine.description),
        'unitPrice': this.formBuilder.control(this.roundPipe.transform(this.selectedMaintenanceLine.unitPrice, 2)),
        'quantity': this.formBuilder.control(this.roundPipe.transform(this.selectedMaintenanceLine.quantity, 2)),
        'priceHT': this.formBuilder.control({
          value: this.roundPipe.transform(this.selectedMaintenanceLine.totalPriceHT, 2)
          , disabled: true
        }),
        'priceTTC': this.formBuilder.control({
          value: this.roundPipe.transform(this.selectedMaintenanceLine.totalPriceTTC, 2)
          , disabled: true
        })
      }
    );
  }

  onSubmit() {
    console.log(this.lineForm.invalid);
    console.log(this.lineForm);

    this.isFormSubmitted = true;

    if (this.lineForm.invalid) {
      return;
    }

    this.selectedMaintenanceLine.description = this.lineForm.value['description'];
    this.selectedMaintenanceLine.unitPrice = +this.lineForm.value['unitPrice'];
    this.selectedMaintenanceLine.quantity = +this.lineForm.value['quantity'];


    this.lineEdited.emit(this.selectedMaintenanceLine);
    console.log('Emitted');
    console.log(this.selectedMaintenanceLine);

if (this.modal){
  this.modal.close();
}

    this.isFormSubmitted = false;
  }
  productSearch(evt) {
    this.productService.find(`code~${evt.query}`).subscribe(
      data => {
        this.productList = data;
      }
    );
  }

  onSelectProduct(event) {
    console.log(event);

      this.selectedProduct = event as Product;
      this.selectedMaintenanceLine.product = event as Product;

      this.lineForm.patchValue({
        'description': this.selectedProduct.shortDesc,
        'unitPrice': this.selectedProduct.purshasePriceUB ?  this.selectedProduct.purshasePriceUB : 0
      });

      this.onUnitPriceChange();
  }


  open(content) {
    this.isFormSubmitted = false;
    if (!this.editMode) {
      this.selectedMaintenanceLine = new MaintenanceLine();
    }
    this.initForm();
    this.modal = this.modalService.open(content, { backdrop: 'static', centered: true, size: 'lg', keyboard: false });
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onQuantityChange() {
    const quantity = this.lineForm.value['quantity'];
    let unitPrice = this.lineForm.value['unitPrice'];
    let vat = 0;
    if (this.selectedMaintenanceLine.product != null
      && this.selectedMaintenanceLine.product.vat != null) {
      vat = this.selectedMaintenanceLine.product.vat.value;
    }
    if (!unitPrice) {
      unitPrice = 0;
    }

    const priceHT = (unitPrice * quantity);
    const priceTTC = priceHT + (priceHT * vat / 100);
    this.selectedMaintenanceLine.totalPriceHT = priceHT;
    this.selectedMaintenanceLine.totalPriceTTC = priceTTC;
    this.lineForm.patchValue({
      'priceHT': this.roundPipe.transform(priceHT, 2),
      'priceTTC': this.roundPipe.transform(priceTTC, 2)
    });
    console.log(this.lineForm.value['quantity']);

  }

  onUnitPriceChange() {
    let quantity = this.lineForm.value['quantity'];
    const unitPrice = this.lineForm.value['unitPrice'];
    let vat = 0;
    if (this.selectedMaintenanceLine.product != null
      && this.selectedMaintenanceLine.product.vat != null) {
      vat = this.selectedMaintenanceLine.product.vat.value;
    }
    if (!quantity) {
      quantity = 0;
    }

    const priceHT = (unitPrice * quantity);
    const priceTTC = priceHT + (priceHT * vat / 100);

    this.selectedMaintenanceLine.totalPriceHT = priceHT;
    this.selectedMaintenanceLine.totalPriceTTC = priceTTC;
    this.lineForm.patchValue({
      'priceHT': this.roundPipe.transform(priceHT, 2),
      'priceTTC': this.roundPipe.transform(priceTTC, 2)
    });
    console.log(this.lineForm.value['quantity']);
  }

}
