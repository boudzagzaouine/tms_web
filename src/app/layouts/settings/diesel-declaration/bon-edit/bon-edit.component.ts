import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from './../../../../shared/services/api/product.service';
import { Product } from './../../../../shared/models/product';
import { ProductPackService } from './../../../../shared/services/api/product-pack.service';
import { OrderStatus, OrderType, ProductPack, PurchaseOrder, PurchaseOrderLine, Supplier } from './../../../../shared/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, SupplierService } from './../../../../shared/services';
import { PurchaseOrderService } from './../../../../shared/services/api/purchase-order.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderTypeService } from './../../../../shared/services/api/order-type.service';
import { OrderStatusService } from './../../../../shared/services/api/order-status.service';



@Component({
  selector: 'app-bon-edit',
  templateUrl: './bon-edit.component.html',
  styleUrls: ['./bon-edit.component.scss']
})
export class BonEditComponent implements OnInit {
  
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() purchaseOrderCode = new EventEmitter<PurchaseOrder>();
 selectedPurchaseOrderLine: PurchaseOrderLine= new PurchaseOrderLine();
 selectedPurchaseOrder: PurchaseOrder=new PurchaseOrder();
 isFormSubmitted = false;
 orderTypeList: OrderType[] = [];
  displayDialog: boolean;
  title = 'Editer Bon';
  productList: Product[];
  selectedProduct: Product;
  productPackList:ProductPack[];
  orderStatutList: OrderStatus[] = [];
  supplierList:Supplier[];
  purchaseOrderLineForm: FormGroup;
  constructor(private productService:ProductService,
    private  productPackService :ProductPackService,
    private purchaseOrderService :PurchaseOrderService,
    private supplierService:SupplierService,
    private orderStatutService: OrderStatusService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private orderTypeService: OrderTypeService,
    private authentificationService :AuthenticationService) { }

  ngOnInit() {
  this.purchaseOrderService.generateCode().subscribe(
    code => {
      this.selectedPurchaseOrder.code = code;
    
    })

    this.orderTypeService.findAll().subscribe(
      data => {
        this.orderTypeList = data.filter(f => f.id === 1);
        this.selectedPurchaseOrder.orderType = this.orderTypeList[0];
      }
    );

    this.orderStatutService.findAll().subscribe(
      data => {
        this.orderStatutList = data.filter(f => f.id === 1);
        this.selectedPurchaseOrderLine.orderStatus = this.orderStatutList[0];
        this.selectedPurchaseOrder.orderStatus=this.orderStatutList[0];
      
      }
 
    )

    this.displayDialog=true;
    this.initForm();
  }



  initForm() {
   
    //this.selectedProduct = this.selectedPurchaseOrderLine.product;
    this.purchaseOrderLineForm = new FormGroup({
        pdt: new FormControl(
            {
                value:
                    this.selectedPurchaseOrderLine != null &&
                    this.selectedPurchaseOrderLine.product != null
                        ? this.selectedPurchaseOrderLine.product.code
                        : null,
               
            },
            Validators.required
        ),

        supplier: new FormControl(
          {
              value:
                  this.selectedPurchaseOrder != null &&
                  this.selectedPurchaseOrder.supplier != null
                      ? this.selectedPurchaseOrder.supplier.code
                      : null,
             
          },
          Validators.required
      ),
      

      payedPrice: new FormControl(
            this.selectedPurchaseOrderLine != null
                ? this.selectedPurchaseOrderLine.purshasePrice
                : null,
            Validators.required
        ),

        quantity: new FormControl(
            this.selectedPurchaseOrderLine != null
                ? this.selectedPurchaseOrderLine.quantity
                : '1',
            Validators.required
        ),
       
      
        totalHT: new FormControl({
            value:
                this.selectedPurchaseOrderLine != null
                    ? this.selectedPurchaseOrderLine.totalPriceHT
                    : '',
            disabled: true
        }),
        totalTTC: new FormControl({
            value:
                this.selectedPurchaseOrderLine != null
                    ? this.selectedPurchaseOrderLine.totalPriceTTC
                    : '',
            disabled: true
        }),
      
    });
}


onSubmit() {

  this.isFormSubmitted=true;
  if (this.purchaseOrderLineForm.invalid) {
      return;
  }





  const payedPrice = +this.purchaseOrderLineForm.value['payedPrice'];
  const price = +this.purchaseOrderLineForm.value['payedPrice'];
  const quantity = +this.purchaseOrderLineForm.value['quantity'];


  if (!isNaN(price) && !isNaN(quantity)) {
      this.selectedPurchaseOrderLine.totalPriceHT = price * quantity;
      this.selectedPurchaseOrderLine.totalPriceTTC =
          price * quantity * (1 + this.selectedProduct.vat.value / 100);
  }



 this.selectedPurchaseOrderLine.vat =  this.selectedProduct.vat;
  this.selectedPurchaseOrderLine.purshasePrice = this.purchaseOrderLineForm.value['payedPrice'];
  this.selectedPurchaseOrderLine.quantity = this.purchaseOrderLineForm.value['quantity'];



      const pdtPack = this.selectedProduct.productPack;

      this.selectedPurchaseOrderLine.product = this.selectedProduct;
      this.selectedPurchaseOrderLine.description = this.purchaseOrderLineForm.value['description'];
      this.selectedPurchaseOrderLine.productPack = pdtPack;
      this.selectedPurchaseOrderLine.uom = pdtPack.uom;
  
      this.selectedPurchaseOrderLine.owner=this.authentificationService.getDefaultOwner();
      this.selectedPurchaseOrder.owner=this.authentificationService.getDefaultOwner();
      this.selectedPurchaseOrder.totalPriceTTC = this.selectedPurchaseOrderLine.totalPriceTTC;
      this.selectedPurchaseOrder.totalPriceHT = this.selectedPurchaseOrderLine.totalPriceHT;
      this.selectedPurchaseOrder.vat =this.selectedPurchaseOrderLine.totalPriceTTC - this.selectedPurchaseOrderLine.totalPriceHT;
     // this.selectedPurchaseOrder.supplier=this.purchaseOrderLineForm.value['supplier'];

        this.selectedPurchaseOrder.purshaseOrderLines.push(this.selectedPurchaseOrderLine);


      
      
        this.purchaseOrderService.set(this.selectedPurchaseOrder).subscribe(
          dataM => {

            this.toastr.success('Elément P est Enregistré Avec Succès', 'Edition');
            this.purchaseOrderCode.emit(dataM as PurchaseOrder);
            
            this.isFormSubmitted = false;
            this.spinner.hide();
            this.selectedPurchaseOrder = new PurchaseOrder();
            this.selectedPurchaseOrderLine = new PurchaseOrderLine();

            this.purchaseOrderLineForm.reset();
    
       
    
          },
          err => {
            this.toastr.error(err.error.message);
            this.spinner.hide();
            return;
          },
          () => {
            this.spinner.hide();
          }
        );
    


  this.displayDialog=false;


}



  searchProduct(event) {
 this.productService.find('code~' + event.query).subscribe(data => {
        this.productList = data;
    });
  }


  onSupplierCodeSearch(event: any) {

    this.supplierService.find('code~' + event.query).subscribe((data) => {
      this.supplierList = data;
    });
  }
  onSelectSupplier(sup :Supplier) {  
      this.selectedPurchaseOrder.supplier = sup ;
     
    
    
  }
  public onSelectProduct(value: Product): void {
    this.selectedProduct = value;
   this.productPackService
        .find('product.id:' + this.selectedProduct.id)
        .subscribe(data => {
            this.productPackList = data;
  
            this.purchaseOrderLineForm.patchValue({
              payedPrice: this.selectedProduct.purshasePriceUB,
                //vat: this.selectedProduct.vat.value,
                //description: this.selectedProduct.desc,
                pdtPack: data[0]
            });
  
            this.purchaseOrderLineForm.updateValueAndValidity();
  
        });
  
    
  
  }

  onNumberChanged() {
    const price = +this.purchaseOrderLineForm.value['payedPrice'];
    const quantity = +this.purchaseOrderLineForm.value['quantity'];
    if (!isNaN(price) && !isNaN(quantity)) {
        this.purchaseOrderLineForm.patchValue(
            {
                totalHT: (price * quantity),
                totalTTC: (
                    price *
                    quantity *
                    (1 + this.selectedProduct.vat.value / 100)
                )
            },
            {
                onlySelf: true
            }
        );
    }
  }





  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }
}
