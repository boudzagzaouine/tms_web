import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductTypeService } from './../../../../shared/services/api/product-type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductType } from './../../../../shared/models/product-type';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-type-edit',
  templateUrl: './product-type-edit.component.html',
  styleUrls: ['./product-type-edit.component.css']
})
export class ProductTypeEditComponent implements OnInit {

  @Input() selectedProductType = new ProductType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  productTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de produit';

  constructor(private productTypeService: ProductTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

    console.log(this.editMode);

    if (this.editMode === 1) {
      this.selectedProductType = new ProductType();
      this.title = 'Ajouter un type de produit';

    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.productTypeForm = new FormGroup({
      'code': new FormControl(this.selectedProductType.code, Validators.required),
      'description': new FormControl(this.selectedProductType.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.productTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedProductType.code = this.productTypeForm.value['code'];
    this.selectedProductType.description = this.productTypeForm.value['description'];

    const s = this.productTypeService.set(this.selectedProductType).subscribe(
      data => {
        this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
