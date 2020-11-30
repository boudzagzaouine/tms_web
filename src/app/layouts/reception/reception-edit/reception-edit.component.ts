import { StockService } from './../../../shared/services/api/stock.service';
import { ReceptionStockService } from './../../../shared/services/api/reception-stock.service';
import { OrderStatusService } from './../../../shared/services/api/order-status.service';
import { PurchaseOrder } from './../../../shared/models/purchase-order';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { OrderTypeService } from './../../../shared/services/api/order-type.service';
import { PurchaseOrderService } from './../../../shared/services/api/purchase-order.service';
import { SupplierService } from './../../../shared/services/api/supplier.service';
import { Supplier } from './../../../shared/models/supplier';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UomService } from './../../../shared/services/api/uom.service';
import { ProductPackService } from './../../../shared/services/api/product-pack.service';
import { ProductService } from './../../../shared/services/api/product.service';
import { ReceptionLineService } from './../../../shared/services/api/reception-line.service';
import { ReceptionLine } from './../../../shared/models/reception-line';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Uom } from './../../../shared/models/uom';
import { Reception } from './../../../shared/models/reception';
import { ProductPack } from './../../../shared/models/product-pack';
import { Vat } from './../../../shared/models/vat';
import { Product } from './../../../shared/models/product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VatService } from './../../../shared/services/api/vat.service';
import { ReceptionService } from './../../../shared/services/api/reception.service';
import { OrderType } from './../../../shared/models/order-type';
import { logging } from 'protractor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reception-edit',
  templateUrl: './reception-edit.component.html',
  styleUrls: ['./reception-edit.component.css']
})
export class ReceptionEditComponent implements OnInit {

  size = 8;
  receptionForm: FormGroup;
  selectedReception: Reception = new Reception();
  selectedPurchaseOrder: PurchaseOrder = new PurchaseOrder();
  selectedReceptionLine: ReceptionLine = new ReceptionLine();
  isFormSubmitted = false;
  editModeTitle = 'Inserer une Reception';
  supplierList: Supplier[] = [];
  orderTypeList: OrderType[] = [];
  purchaseOrderList :PurchaseOrder[] = [];
  uomList: Uom[] = [];
  showDialog: boolean;
  editMode: boolean;
  receptionLine=new ReceptionLine;
  subscrubtion = new Subscription();

  constructor(private supplierService : SupplierService,
    private receptionStockService:ReceptionStockService,
    private purchcaseOrderService : PurchaseOrderService,
    private receptionService: ReceptionService,
    private orderStatusService : OrderStatusService,
    private orderTypeService : OrderTypeService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,


     ) { }

  ngOnInit() {

    this.subscrubtion.add(this.orderTypeService.findAll().subscribe(
      data => {
          this.orderTypeList = data.filter(f => f.id === 1);
      }
    ));


    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.editModeTitle = 'Modifier une Reception';
      this.activatedRoute.params.subscribe(params => {
        id = params['id'];
        this.subscrubtion.add(this.receptionService.findById(id).subscribe(data => {
          this.selectedReception = data;
          this.selectedPurchaseOrder = data.purshaseOrder;



          this.initForm();
        },
          err => {
            this.toastr.error(err.error.message);
            this.spinner.hide();
          }));
      });

    } else {

      this.subscrubtion.add( this.receptionService.generateCode().subscribe(
        code => {
       this.selectedReception.code = code;
        this.initForm();
    }));


    this.subscrubtion.add(this.orderStatusService.findById(5).subscribe(order => {
        this.receptionForm.patchValue({
            status: order.code
        });
        this.selectedReception.orderStatus = order;
   

    }));

    

      this.initForm();
    }

    this.initForm();
  }

  initForm() {
    const d= new Date (this.selectedReception.receptionDate);
    this.receptionForm = new FormGroup({
      code: new FormControl(
          {
              value:
                  this.selectedReception != null &&
                  this.selectedReception.code != null
                      ? this.selectedReception.code
                      : null,
              disabled: this.editMode
          },
          Validators.required
      ),
      vat: new FormControl({
          value: this.selectedReception != null ?
              this.selectedReception.vat : 0,
          disabled: true
      }),
      totalttc: new FormControl({
          value: this.selectedReception != null ?
              this.selectedReception.totalPriceTTC : 0,
          disabled: true
      }),
      totalPriceHT: new FormControl({
          value: this.selectedReception != null ?
              this.selectedReception.totalPriceHT : 0,
          disabled: true
      }),
       order: new FormControl(
        this.selectedReception.purshaseOrder
      //     value:
      //         this.selectedReception != null &&
      //         this.selectedReception.purshaseOrder != null
      //             ? this.selectedReception.purshaseOrder.code
      //             : null,
      //     disabled: this.editMode
      ),
      supplierEdit: new FormControl({
          value:
              this.selectedReception != null &&
              this.selectedReception.supplier != null
                  ? this.selectedReception.supplier.code
                  : null,
          disabled: this.editMode
      }),

      supplier: new FormControl(
          {
              value:
                  this.selectedReception != null &&
                  this.selectedReception.supplier != null
                      ? this.selectedReception.supplier
                      : null,
              disabled: this.editMode
          },
          Validators.required
      ),

      status: new FormControl(
          {
              value:
                  this.selectedReception != null &&
                  this.selectedReception.orderStatus != null
                      ? this.selectedReception.orderStatus.code
                      : null,
              disabled: true
          },
          Validators.required
      ),

      type: new FormControl(
          {
              value:
                  this.selectedReception != null &&
                  this.selectedReception.orderType != null
                      ? this.selectedReception.orderType.code
                      : null,
              disabled: this.editMode
          },
          Validators.required
      ),

      receptionDate: new FormControl(
          {
              value:  this.selectedReception != null
              ? d
              : new Date(),
              disabled: this.editMode
          },
          Validators.required
      ),

      remarks: new FormControl(
          this.selectedReception != null
              ? this.selectedReception.remarks
              : null
      ),
      supplierBL: new FormControl(
          this.selectedReception != null
              ? this.selectedReception.orderCode
              : null
      ),

      accounted: new FormControl({
          value: this.selectedReception != null &&
          this.selectedReception.accounted != null
              ? !this.selectedReception.accounted
              : false
      })
  });

}
onSubmit() {
  this.isFormSubmitted=true;
  if (this.receptionForm.invalid) {
      return;
  }
  this.selectedReception.remarks = this.receptionForm.value['remarks'];
        this.selectedReception.orderCode = this.receptionForm.value['supplierBL'];
        if (this.selectedReception.receptionDate == null) {
            this.selectedReception.receptionDate = this.receptionForm.value['receptionDate'];
        }
        this.selectedReception.supplierDeliveryDate = this.receptionForm.value['blDate'];
// this.selectedReception.orderType = this.purchaseOrderForm.value['orderType'];
this.subscrubtion.add(this.receptionService.set(this.selectedReception).subscribe(
  dataM => {
    if (this.selectedReception.purshaseOrder !== null) {
      this.receptionStockService.receive(dataM);
  }
    this.toastr.success('Elément P est Enregistré Avec Succès', 'Edition');

    this.isFormSubmitted = false;
    this.spinner.hide();
    this.selectedReception = new Reception();
    this.receptionForm.reset();

    if (close) {
      this.router.navigate(['/core/reception/list']);
    } else {

      this.router.navigate(['/core/reception/edit']);
    }

  },
  err => {
    this.toastr.error(err.error.message);
    this.spinner.hide();
    return;
  },
  () => {
    this.spinner.hide();
  }
));
}
  onSupplierCodeSearch(event: any) {

    this.subscrubtion.add(this.supplierService.find('code~' + event.query).subscribe((data) => {
      this.supplierList = data;
    }));
  }

  onPurchaseOrderCodeSearch(event: any) {
    this.subscrubtion.add( this.purchcaseOrderService.find('code~' + event.query).subscribe((data) => {
      this.purchaseOrderList = data.filter(data =>  data.orderStatus.id != 1);
    }));
  }

  onSelectOrderType(event){
    this.selectedReception.orderType= event.value as OrderType;
  }
  onSelectPurchaseOrder(event) {

    this.selectedPurchaseOrder = event;
    this.selectedReception.purshaseOrder = this.selectedPurchaseOrder;
    this.selectedReception.supplier = this.selectedPurchaseOrder.supplier;
    this.selectedReception.orderStatus = this.selectedPurchaseOrder.orderStatus;
    this.selectedReception.orderType = this.selectedPurchaseOrder.orderType;
    this.selectedReception.totalPriceHT = this.selectedPurchaseOrder.totalPriceHT;
    this.selectedReception.vat = this.selectedPurchaseOrder.vat;
    this.selectedReception.totalPriceTTC = this.selectedPurchaseOrder.totalPriceTTC;
    this.selectedReception.accounted = this.selectedPurchaseOrder.accounted;
    this.selectedReception.receptionLines = this.receptionService.generateReceptionLinesFromPurchaseOrderLines(
        this.selectedPurchaseOrder.purshaseOrderLines
    );


    //  this.initForm();

    this.receptionForm.patchValue({
      supplier: this.selectedPurchaseOrder.supplier,
        type: this.selectedPurchaseOrder.orderType.code,
        //status: this.selectedReception.orderStatus.code
    });

    this.receptionForm.updateValueAndValidity();
}

  onSelectSupplier(event){
    this.selectedReception.supplier= event as Supplier;
  }

  onShowDialogAction(line ,mode) {
    this.showDialog = true;

    if (mode==true) {
      this.selectedReceptionLine = line;
      this.editMode = true;
    } else {
      this.editMode = false;

    }
  }

  onDeleteMaintenanceLine(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.selectedReception.receptionLines = this.selectedReception.receptionLines.filter(
          (l) => l.id !== id
        );
       // this.updateTotalPrice();
      },
    });

  }

  onLineEditedAction(receptionLine: ReceptionLine) {


  const orderline = this.selectedReception.receptionLines.find(
    line => line.product.id === receptionLine.product.id
);
if (orderline == null) {
    this.selectedReception.receptionLines.push(receptionLine);
}


  this.selectedReception.totalPriceTTC = 0.0;
  this.selectedReception.totalPriceHT = 0.0;
  this.selectedReception.vat = 0.0;
  this.selectedReception.receptionLines.forEach(line => {
      this.selectedReception.totalPriceTTC += line.totalPriceTTC;
      this.selectedReception.totalPriceHT += line.totalPriceHT;
      this.selectedReception.vat +=
          line.totalPriceTTC - line.totalPriceHT;
  });

  if (this.receptionForm != null) {
      this.receptionForm.patchValue({
        totalPriceHT: this.selectedReception.totalPriceHT,
          vat: this.selectedReception.vat,
          totalttc: this.selectedReception.totalPriceTTC
      });
      this.receptionForm.updateValueAndValidity();

  }


  }

  calculateAllLines() {
    this.selectedReception.totalPriceHT = 0;
    this.selectedReception.totalPriceTTC = 0;
    this.selectedReception.vat = 0;
    this.selectedReception.receptionLines.forEach(line => {
            this.selectedReception.totalPriceHT += line.totalPriceHT;
            this.selectedReception.totalPriceTTC += line.totalPriceTTC;
            this.selectedReception.vat =
                (this.selectedReception.totalPriceTTC -
                    this.selectedReception.totalPriceHT);
        }
    );
    const purchaseOrderNameControl = this.receptionForm.get('order');
    this.receptionForm.patchValue({
        'vat': this.selectedReception.vat
    });
    this.receptionForm.patchValue({
        'totalttc': this.selectedReception.totalPriceTTC
    });
    this.receptionForm.patchValue({
        'totalPriceHT': this.selectedReception.totalPriceHT
    });
    purchaseOrderNameControl.disable({
        onlySelf:
            this.selectedReception.receptionLines != null &&
            this.selectedReception.receptionLines.length > 0
    });
}

  onHideDialogAction(event) {
    this.showDialog = event;
  }


  ngOnDestroy() {
    this.subscrubtion.unsubscribe();
  }


}
