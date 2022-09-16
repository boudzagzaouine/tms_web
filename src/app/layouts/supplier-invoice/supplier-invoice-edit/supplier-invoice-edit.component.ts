import { SupplierInvoiceLine } from './../../../shared/models/supplier-invoice-line';
import { SupplierInvoiceLineService } from './../../../shared/services/api/supplier-invoice-line.service copy';
import { SubscriptionCardService } from './../../../shared/services/api/subscription-card.service';
import { AuthenticationService } from './../../../shared/services/api/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SupplierInvoiceService } from './../../../shared/services/api/supplier-invoice.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SupplierInvoice } from './../../../shared/models/supplier-invoice';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-invoice-edit',
  templateUrl: './supplier-invoice-edit.component.html',
  styleUrls: ['./supplier-invoice-edit.component.scss']
})
export class SupplierInvoiceEditComponent implements OnInit {

  supplierInvoiceForm: FormGroup;
  selectedSupplierInvoice: SupplierInvoice = new SupplierInvoice();
  index: number = 0;
  page = 0;
  size = 8;
  valid = false;
  collectionSize: number;
  editModeTitle = 'Ajouter Facture';

  subscriptions= new Subscription ();
  supplierInvoiceLineList : SupplierInvoiceLine[]=[];
  items: MenuItem[];
  idSupplierInvoice:number=0;
  home: MenuItem;
  constructor(private formBuilder: FormBuilder,
    private supplierInvoiceService: SupplierInvoiceService,
    private supplierInvoiceLineService: SupplierInvoiceLineService,

    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private authentificationService:AuthenticationService,
    private subscriptionCardService:SubscriptionCardService,
    ) { }

  ngOnInit() {

    this.items = [
      {label: 'Facture'},
      {label: 'Editer'},

  ];

  this.home = {icon: 'pi pi-home'};

  this.selectedSupplierInvoice= new SupplierInvoice();
    this.initForm();


console.log(this.route.snapshot.params['id']);
    if (this.route.snapshot.params['id'] >= 1) {
      this.idSupplierInvoice = this.route.snapshot.params['id'];
      this.subscriptions.add(this.supplierInvoiceService.findById(this.idSupplierInvoice).subscribe(
        data => {
          this.selectedSupplierInvoice = data;
          this.editModeTitle = 'Modifier Facture';

          this.initForm();
        }
      ));
      this.subscriptions.add(this.supplierInvoiceLineService.find('supplierInvoice.id:' + this.idSupplierInvoice).subscribe(
        data => {
          this.supplierInvoiceLineList = data;

        }))
    }




  }
  initForm(close = false) {
    const invoiceDate = new Date(this.selectedSupplierInvoice.invoiceDate);

    this.supplierInvoiceForm = this.formBuilder.group(
      {

        'code': new FormControl(this.selectedSupplierInvoice.code),
        'supplier': new FormControl(this.selectedSupplierInvoice?.supplier?.code),
        'supplierInvoiceCode': new FormControl(this.selectedSupplierInvoice.supplierInvoiceCode),
        'invoiceStatus': new FormControl(this.selectedSupplierInvoice?.invoiceStatus?.code),
        'paymentStatus': new FormControl(this.selectedSupplierInvoice?.paymentStatus?.code),

        'totalPriceHT': new FormControl(this.selectedSupplierInvoice.totalPriceHT),
        'totalPriceTTC': new FormControl(this.selectedSupplierInvoice.totalPriceTTC),
        'vat': new FormControl(this.selectedSupplierInvoice.vat),

        'currency': new FormControl(this.selectedSupplierInvoice?.currency?.code),
        'invoiceDate': new FormControl(invoiceDate),
        'warehouse': new FormControl(this.selectedSupplierInvoice.warehouse?.code),
      }
    );
  }

  loadDataLazy(event) {

    this.page = event.first / this.size;



  }













  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
