import { ProductPack } from './../../../shared/models/product-pack';
import { ProductPackService } from './../../../shared/services/api/product-pack.service';
import { UomService } from './../../../shared/services/api/uom.service';
import { Uom } from './../../../shared/models/uom';
import { SupplierService } from './../../../shared/services/api/supplier.service';
import { Supplier } from './../../../shared/models/supplier';
import { ProductService } from './../../../shared/services/api/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { StockService } from './../../../shared/services/api/stock.service';
import { Stock } from './../../../shared/models/stock';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './../../../shared/models';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {

  @Input() selectedStock = new Stock();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  supplierList: Array<Supplier> = [];
  supplierSearch: string;
  productList: Array<Product> = [];
  productSearch: string;
  uoms: Uom[];
  stockForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un stock';
  productPackList: ProductPack[];

  constructor(private stockService: StockService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private uomService: UomService,
    private productPackService: ProductPackService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.uomService.findAll().subscribe((data: Uom[]) => {
      this.uoms = data;
    });

    if (this.editMode === 1) {
      this.selectedStock = new Stock();
      this.title = 'Ajouter un stock';

    } else {
    this.productPackService.findAll().subscribe(
      d =>
        this.productPackList = d
    );
    }
    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    const d = new Date(this.selectedStock.receptionDate);

    this.stockForm = new FormGroup({
      'product': new FormControl(this.selectedStock.product, Validators.required),
      'uom': new FormControl(this.selectedStock.productPack, Validators.required),
      'quantity': new FormControl(this.selectedStock.quantity, Validators.required),
      'supplier': new FormControl(this.selectedStock.supplier, Validators.required),
      'receptionDate': new FormControl(d, Validators.required),


    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.stockForm.invalid) { return; }
    this.spinner.show();
    this.selectedStock.receptionDate = this.stockForm.value['receptionDate'];
    this.selectedStock.quantity = this.stockForm.value['quantity'];
    this.selectedStock.product = this.stockForm.value['product'];
    this.selectedStock.supplier = this.stockForm.value['supplier'];

    const s = this.stockService.set(this.selectedStock).subscribe(
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
  onCodeSupplierSearch(event: any) {
    this.supplierService.find('code~' + event.query).subscribe(
      data => this.supplierList = data
    );
  }

  onCodeProductSearch(event: any) {
    this.productService.find('code~' + event.query).subscribe(
      data => this.productList = data
    );
  }

  onSelectUom(event) {
    this.selectedStock.productPack = event.value;
  }
  onSelectProduct(event) {


    this.selectedStock.product = event;
    this.productPackService
      .find('product.id:' + this.selectedStock.product.id)
      .subscribe(data => {
        if (data && data.length) {
          this.productPackList = data;
          this.selectedStock.productPack = data[0];
          this.selectedStock.uom = data[0].uom;
          this.stockForm.patchValue({
            uom: data[0].uom.code
          });
          this.stockForm.updateValueAndValidity();
        }
      });

  }
  onSelectSupplier(event) {
    this.selectedStock.supplier = event.value as Supplier;

  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
