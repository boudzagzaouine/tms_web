import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { ProductService } from './../../../../shared/services/api/product.service';
import { Subscription } from 'rxjs';
import { Product } from './../../../../shared/models/product';
import { ReceptionLine } from './../../../../shared/models/reception-line';
import { VehicleProduct } from './../../../../shared/models/vehicle-product';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vehicle-product',
  templateUrl: './vehicle-product.component.html',
  styleUrls: ['./vehicle-product.component.scss']
})
export class VehicleProductComponent implements OnInit {

  @Input() selectedVehicleProduct: VehicleProduct;
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() vehicleProductAdded = new EventEmitter<VehicleProduct>();
  selectedProduct: Product;
  productList: Product[];
  vehicleProductForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier pieces de rechange';
  subscrubtion = new Subscription();

  constructor(
    private productService: ProductService,
    private authentificationService:AuthenticationService,
) { }

  ngOnInit() {
    console.log(this.editMode);

    console.log(this.selectedVehicleProduct);

    if(!this.editMode){
      this.title = 'Ajouter   pieces de rechange';

      this.selectedVehicleProduct= new VehicleProduct();

    }
    this.displayDialog = true;
    this.initForm();
  }



  initForm() {
    if (!this.editMode) {
      this.selectedVehicleProduct = new VehicleProduct();
    }
    this.vehicleProductForm = new FormGroup({
      pdt: new FormControl(
          this.selectedVehicleProduct != null &&
          this.selectedVehicleProduct.product != null
              ? this.selectedVehicleProduct.product.code
              : null,
          Validators.required
      ),

      reference: new FormControl(
          this.selectedVehicleProduct != null &&
          this.selectedVehicleProduct.reference != null
              ? this.selectedVehicleProduct.reference
              : ''
      ),


  });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.vehicleProductForm.invalid) {
      return;
    }

    this.selectedVehicleProduct.reference = this.vehicleProductForm.value[
      'reference'
      ];

 this.selectedVehicleProduct.owner=this.authentificationService.getDefaultOwner();
  this.vehicleProductAdded.emit(this.selectedVehicleProduct);
    this.displayDialog = false;


  }

  searchProduct(event) {
    this.subscrubtion.add(this.productService.find('code~' + event.query).subscribe(data => {
      this.productList = data;
    }));
  }




onSelectProduct(event) {
  this.selectedVehicleProduct.product = event as Product;

}

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }


  ngOnDestroy() {
    this.subscrubtion.unsubscribe();
  }
}
