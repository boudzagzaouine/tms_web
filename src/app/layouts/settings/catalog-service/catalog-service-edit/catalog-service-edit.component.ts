import { ProductServiceService } from './../../../../shared/services/api/product-service.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VatService } from './../../../../shared/services/api/vat.service';
import { ProductService } from './../../../../shared/services/api/product.service';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { CatalogServiceService } from './../../../../shared/services/api/catalog-service.service';
import { Vat } from './../../../../shared/models/vat';
import { Product } from './../../../../shared/models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogService } from './../../../../shared/models/catalog-service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-catalog-service-edit',
  templateUrl: './catalog-service-edit.component.html',
  styleUrls: ['./catalog-service-edit.component.css']
})
export class CatalogServiceEditComponent implements OnInit {

  @Input() selectCatalogService = new CatalogService();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  catalogServiceForm: FormGroup;
  productList: Product[] = [];

  vat = new Vat();
  displayDialog: boolean;
  isFormSubmitted = false;
  title = 'Modifier  Tarif';
  productId : number;

  vatList : Vat[] =[];
  constructor(
    private catalogServiceService: CatalogServiceService,
    private authentificationService:AuthenticationService,
    private productService: ProductServiceService,
    private vatService: VatService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,

    ) { }

  ngOnInit() {


      this.load();
    if (this.editMode === 1) {
      this.selectCatalogService = new CatalogService();
      this.title = 'Ajouter  Tarif';

    }

    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    this.catalogServiceForm = new FormGroup({


      'fProduct': new FormControl(this.selectCatalogService.product, Validators.required),

      'fPurchaseAmountHt': new FormControl(this.selectCatalogService.purchaseAmountHt, Validators.required),
      'fPurchaseAmountTtc': new FormControl(this.selectCatalogService.purchaseAmountTtc, Validators.required),
      'fPurchaseAmountTva': new FormControl(this.selectCatalogService.purchaseAmountTva, Validators.required),
      'fPurchaseVat': new FormControl(
         this.editMode!=1 ?this.selectCatalogService?.purchaseVat?.value:this.selectCatalogService?.purchaseVat,
         Validators.required),


         'fSaleAmountHt': new FormControl(this.selectCatalogService.saleAmountHt, Validators.required),
         'fSaleAmountTtc': new FormControl(this.selectCatalogService.saleAmountTtc, Validators.required),
         'fSaleAmountTva': new FormControl(this.selectCatalogService.saleAmountTva, Validators.required),
         'fSaleVat': new FormControl(

          this.editMode!=1 ?this.selectCatalogService?.saleVat?.value:this.selectCatalogService?.saleVat,

          Validators.required),
    });
  }
  onSubmit() {
    console.log(this.catalogServiceForm);
    this.isFormSubmitted = true;
    if (this.catalogServiceForm.invalid) { return; }

    this.spinner.show();
console.log(this.editMode);


console.log(this.selectCatalogService);

    if (this.editMode === 1) {


       this.existProduct();
    } else if (this.editMode === 2) {


           this.insertcatalogProduct();
    }


   // this.selectCatalogService = new CatalogService();


  }

  existProduct() {
    this.catalogServiceService.sizeSearch(`product.id:${this.productId}`).subscribe(
      data => {
console.log(data);

        if (data > 0) {
          this.messageService.add({severity:'error', summary: 'Edition', detail: 'Elément Existe Déja'});

          //this.toastr.error('Elément Existe Déja', 'Edition');
        } else {
          this.insertcatalogProduct();
        }
        this.spinner.hide();

      },
      error => {
       // this.toastr.error(error.error.message, 'Erreur');
       this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});


        this.spinner.hide();
      },

      () => this.spinner.hide()
    );
  }
  insertcatalogProduct(){

    this.selectCatalogService.purchaseAmountHt = this.catalogServiceForm.value['fPurchaseAmountHt'];
    this.selectCatalogService.purchaseAmountTtc = this.catalogServiceForm.value['fPurchaseAmountTtc'];
    this.selectCatalogService.purchaseAmountTva = this.catalogServiceForm.value['fPurchaseAmountTva'];

    this.selectCatalogService.saleAmountHt = this.catalogServiceForm.value['fSaleAmountHt'];
    this.selectCatalogService.saleAmountTtc = this.catalogServiceForm.value['fSaleAmountTtc'];
    this.selectCatalogService.saleAmountTva = this.catalogServiceForm.value['fSaleAmountTva'];

    // this.selectCatalogService.turnType = this.catalogServiceForm.value['fTurnType'];

    //  this.selectCatalogService.vehicleCategory = this.catalogServiceForm.value['fVehicleCategory'];
    //  this.selectCatalogService.villeDestination = this.catalogServiceForm.value['fVilleDestination'];
    //  this.selectCatalogService.villeSource = this.catalogServiceForm.value['fVilleSource'];
   // this.selectCatalogService.vat =  this.vatList.filter(f=> f.value== this.catalogServiceForm.value['fVat'])[0];
    console.log(this.selectCatalogService);

    this.catalogServiceService.set(this.selectCatalogService).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});
 console.log(this.selectCatalogService);

        //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );
  }



  onProductSearch(event: any) {
    this.productService
      .find('code~' + event.query)
      .subscribe(data => (this.productList = data));
  }

  onSelectProduct(event){
    this.selectCatalogService.product=event;
    console.log( this.selectCatalogService.product);

    this.productId=  this.selectCatalogService?.product?.id;
  }

  onSelectPurchaseVat(event) {
    this.selectCatalogService.purchaseVat= this.vatList.filter(f=> f.value== event.value)[0];
    this.onPurcahsePriceChange(1);
  }

  onSelectSaleVat(event) {
    this.selectCatalogService.saleVat=this.vatList.filter(f=> f.value== event.value)[0];
    this.onSalePriceChange(1);
  }


  onPurcahsePriceChange(n: Number) {
    let PriceHt = +this.catalogServiceForm.value['fPurchaseAmountHt'];
    let PriceTTC = +this.catalogServiceForm.value['fPurchaseAmountTtc'];
    let vat = this.catalogServiceForm.value['fPurchaseVat'];
    console.log(vat);


    if (PriceHt === undefined || PriceHt == null) {
      PriceHt = 0;
    } if (PriceTTC === undefined || PriceTTC == null) {
      PriceTTC = 0;
    } if (vat === undefined || vat == null) {
      vat = 0;
    }

    if (n === 1) {
      const amountTva = (PriceHt / 100) * vat;
    const priceTTC = PriceHt + amountTva;
    this.catalogServiceForm.patchValue({
      'fPurchaseAmountTtc': priceTTC.toFixed(2),
      'fPurchaseAmountTva': amountTva.toFixed(2),
    });

    }if (n === 2) {

    PriceHt = PriceTTC / (1 + vat / 100);
    const amountTva = (PriceHt / 100) * vat;
      this.catalogServiceForm.patchValue({
        'fPurchaseAmountHt': PriceHt.toFixed(2),
        'fPurchaseAmountTva':  amountTva.toFixed(2),
      });
    }

  }

  load(){

    this.vatService.findAll().subscribe(
      data => {
        this.vatList = data;
      }
    );


  }

  onSalePriceChange(n: Number) {
    let PriceHt = +this.catalogServiceForm.value['fSaleAmountHt'];
    let PriceTTC = +this.catalogServiceForm.value['fSaleAmountTtc'];
    let vat = this.catalogServiceForm.value['fSaleVat'];
    console.log(vat);


    if (PriceHt === undefined || PriceHt == null) {
      PriceHt = 0;
    } if (PriceTTC === undefined || PriceTTC == null) {
      PriceTTC = 0;
    } if (vat === undefined || vat == null) {
      vat = 0;
    }

    if (n === 1) {
      const amountTva = (PriceHt / 100) * vat;
    const priceTTC = PriceHt + amountTva;
    this.catalogServiceForm.patchValue({
      'fSaleAmountTtc': priceTTC.toFixed(2),
      'fSaleAmountTva': amountTva.toFixed(2),
    });

    }if (n === 2) {

    PriceHt = PriceTTC / (1 + vat / 100);
    const amountTva = (PriceHt / 100) * vat;
      this.catalogServiceForm.patchValue({
        'fSaleAmountHt': PriceHt.toFixed(2),
        'fSaleAmountTva':  amountTva.toFixed(2),
      });
    }

  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
