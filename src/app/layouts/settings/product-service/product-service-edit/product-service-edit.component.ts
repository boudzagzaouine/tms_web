import { ServiceTypeService } from './../../../../shared/services/api/service-type.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { UomService } from './../../../../shared/services/api/uom.service';
import { VatService } from './../../../../shared/services/api/vat.service';
import { ProductServiceService } from './../../../../shared/services/api/product-service.service';
import { ProductPackService } from './../../../../shared/services/api/product-pack.service';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { Subscription } from 'rxjs';
import { ServiceType } from './../../../../shared/models/service-type';
import { Uom } from './../../../../shared/models/uom';
import { Vat } from './../../../../shared/models/vat';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductPack } from './../../../../shared/models/product-pack';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './../../../../shared/models';

@Component({
  selector: 'app-product-service-edit',
  templateUrl: './product-service-edit.component.html',
  styleUrls: ['./product-service-edit.component.scss']
})
export class ProductServiceEditComponent implements OnInit {

  @Input() selectedProduct: Product;
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  selectProductPack = new ProductPack()

  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Service';
  productForm: FormGroup;
  vats: Vat[];
  uoms: Uom[];
  serviceTypeList: ServiceType[];
  subscriptions = new Subscription();
  editMd :boolean;
  vat = new Vat();
  constructor(
    private serviceTypeService: ServiceTypeService,
    private authentificationService:AuthenticationService,

    private productServiceService: ProductServiceService,
    private vatService: VatService,
    private uomService: UomService,
    private messageService: MessageService,

    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.subscriptions.add(this.serviceTypeService.findAll().subscribe((data: ServiceType[]) => {
      this.serviceTypeList = data;
  }));
  this.subscriptions.add(this.vatService.findAll().subscribe((data: Vat[]) => {
      this.vats = data;
    }));

    this.subscriptions.add(this.uomService.findAll().subscribe((data: Uom[]) => {
      this.uoms = data;


    }));
    this.editMd=true;

    if (this.editMode === 1) {
      this.selectedProduct = new Product();
      this.title = 'Ajouter un Service';
      this.editMd=false;

    }
console.log(this.selectedProduct);

    this.displayDialog = true;
    this.initForm();

    console.log(this.selectedProduct);



  }

  initForm() {

    this.productForm = new FormGroup({
      code: new FormControl(this.selectedProduct.code,Validators.required),
      description: new FormControl(this.selectedProduct.desc),
      type: new FormControl(this.selectedProduct.serviceType,Validators.required),
      vat: new FormControl(
        this.editMode!=1 ?this.selectedProduct.vat.value
        :this.selectedProduct.vat,Validators.required ),
      purchasePrice: new FormControl(this.selectedProduct.purshasePriceUB,Validators.required),
      purchasePriceTTC: new FormControl(this.selectedProduct.purshasePriceTTCUB,Validators.required),


  });

  }
  onSubmit() {

    this.isFormSubmitted = true;
    if (this.productForm.invalid) { return; }

    this.spinner.show();
    this.selectedProduct.code = this.productForm.value['code'];
    this.selectedProduct.desc = this.productForm.value['description'];
    this.selectedProduct.purshasePriceUB = +this.productForm.value[
        'purchasePrice'
    ];
    this.selectedProduct.purshasePriceTTCUB = +this.productForm.value[
      'purchasePriceTTC'
  ];


  //this.selectedProduct.service=true;

    this.selectedProduct.active = true;
    this.selectedProduct.owner=this.authentificationService.getDefaultOwner();


     this.subscriptions.add(this.productServiceService.set(this.selectedProduct).subscribe(
      dataP => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});

         // this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
          this.displayDialog = false;
          this.isFormSubmitted = false;
          this.spinner.hide();
        },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

      //  this.toastr.error(error.error.message);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    ));


  }

  onSearchProduct(event: any) {
    this.subscriptions.add(this.serviceTypeService.find(`code~${event.query}`).subscribe(
        data => {
            this.serviceTypeList = data;
        }
    ));
}

onSelectServiceType(type: ServiceType) {

  this.selectedProduct.serviceType = type as ServiceType;

}
onSelectUom(event) {

  this.selectedProduct.uomByProductUomBase = event.value as Uom;
  this.selectedProduct.uomByProductUomPurshase = event.value as Uom;
  this.selectedProduct.uomByProductUomSale = event.value as Uom;

 /* this.productForm.patchValue({
      uom: this.selectedProduct.uomByProductUomBase
  });*/

}


onSelectVat(event : Vat) {
  this.vat= this.vats.filter(f=> f.value== event.value)[0];

  this.selectedProduct.vat = this.vat;
  //console.log(this.vat);

  this.onPriceChange(1);

}





onPriceChange(n: Number) {
  let purchasePrice = +this.productForm.value['purchasePrice'];
  let purchasePriceTTC = +this.productForm.value['purchasePriceTTC'];
  let vat = this.productForm.value['vat'];

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
    this.productForm.patchValue({
      'purchasePriceTTC': priceTTC.toFixed(2),
    });
  }if (n === 2) {
      purchasePrice = purchasePriceTTC / (1 + vat / 100);
      this.productForm.patchValue({
          purchasePrice: purchasePrice.toFixed(2)
      });
  }

}



  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
