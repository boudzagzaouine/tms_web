import { SupplierInvoiceService } from './../../../shared/services/api/supplier-invoice.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../shared/services/api/authentication.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SupplierInvoice } from './../../../shared/models/supplier-invoice';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generate-supplier-invoice-from-reception',
  templateUrl: './generate-supplier-invoice-from-reception.component.html',
  styleUrls: ['./generate-supplier-invoice-from-reception.component.scss']
})
export class GenerateSupplierInvoiceFromReceptionComponent implements OnInit {

  @Input() selectedSupplierInvoice = new SupplierInvoice();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() supplierInvoiceAdded = new EventEmitter<SupplierInvoice>();

  supplierInvoiceForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de badge';
  subscriptions= new Subscription();

  constructor(private supplierInvoiceService: SupplierInvoiceService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (!this.editMode) {
      console.log("add");
      this.selectedSupplierInvoice = new SupplierInvoice();
  //     this.supplierInvoiceService.generateCode().subscribe(
  //       data=> {
  //         this.selectedSupplierInvoice = new SupplierInvoice();
  // console.log("subscri");

  //         this.selectedSupplierInvoice.code=data;
  //         console.log(this.selectedSupplierInvoice.code);

  //       }
  //     );
      this.title = 'Ajouter Facture';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.supplierInvoiceForm = new FormGroup({
      'supplierInvoiceCode': new FormControl(this.selectedSupplierInvoice.supplierInvoiceCode, Validators.required),
      'invoiceDate': new FormControl(new Date(this.selectedSupplierInvoice.invoiceDate)),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.supplierInvoiceForm.invalid) { return; }
    this.spinner.show();
    this.selectedSupplierInvoice.supplierInvoiceCode = this.supplierInvoiceForm.value['supplierInvoiceCode'];
    this.selectedSupplierInvoice.invoiceDate = this.supplierInvoiceForm.value['invoiceDate'];
 this.selectedSupplierInvoice.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedSupplierInvoice.owner);

 this.supplierInvoiceAdded.emit(this.selectedSupplierInvoice);
 this.displayDialog = false;
 this.spinner.hide();
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
