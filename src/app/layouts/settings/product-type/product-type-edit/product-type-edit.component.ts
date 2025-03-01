import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductTypeService } from './../../../../shared/services/api/product-type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductType } from './../../../../shared/models/product-type';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../../shared/services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-type-edit',
  templateUrl: './product-type-edit.component.html',
  styleUrls: ['./product-type-edit.component.css']
})
export class ProductTypeEditComponent implements OnInit {

  @Input() selectedProductType = new ProductType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  productTypeParentList: ProductType[] = [];


  productTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de produit';
  subscriptions = new Subscription();

  constructor(private productTypeService: ProductTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,

    private authentificationService: AuthenticationService,
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedProductType = new ProductType();
      this.title = 'Ajouter un type de produit';

    }
console.log(this.selectedProductType);

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.productTypeForm = new FormGroup({
      'code': new FormControl(this.selectedProductType.code, Validators.required),
      'description': new FormControl(this.selectedProductType.description),
      'productType': new FormControl(this.selectedProductType.productType),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.productTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedProductType.code = this.productTypeForm.value['code'];
    this.selectedProductType.description = this.productTypeForm.value['description'];
    this.selectedProductType.owner=this.authentificationService.getDefaultOwner();
    this.subscriptions.add( this.productTypeService.set(this.selectedProductType).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

       // this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        //this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }

  onSelectedProductType(event){

    this.selectedProductType.productType=event;
    console.log( this.selectedProductType.productType);


  }
  onProductTypeSearch(event: any) {
    this.subscriptions.add( this.productTypeService
      .find('code~' + event.query)
      .subscribe(data => (this.productTypeParentList = data)));
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
