import { AddressService } from './../../../../shared/services/api/address.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Address } from './../../../../shared/models/address';
import { Contact } from './../../../../shared/models/contact';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Supplier } from '../../../../shared/models';
import { SupplierService } from '../../../../shared/services';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {

  @Input() selectedSupplier = new Supplier();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  selectedContact = new Contact();
  selectedAddress = new Address();
  closeResult: String;
  supplierForm: FormGroup;
  supplierTypeList: Supplier[] = [];

  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Fournisseur';

  constructor(
    private supplierService: SupplierService,
    private addressService :AddressService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (this.editMode === 1) {
      this.selectedSupplier = new Supplier();
      this.selectedContact = new Contact();
      this.selectedAddress = new Address();
      this.title = 'Ajouter un Fournisseur';
 this.supplierService.generateCode().subscribe(
        code => {
       this.selectedSupplier.code = code;
        this.initForm();
    });

    this.addressService.generateCode().subscribe(
      code => {
     this.selectedAddress.code = code;
      this.initForm();
  });
    } else {




      if (this.selectedSupplier.contact) {
        this.selectedContact = this.selectedSupplier.contact;
      }
      if (this.selectedSupplier.address) {
        this.selectedAddress = this.selectedSupplier.address;
      }

    }


    this.displayDialog = true;
    this.initForm();

  }

  initForm() {

    this.supplierForm = new FormGroup({
      'code': new FormControl(this.selectedSupplier.code, Validators.required),
      'name': new FormControl(this.selectedContact.name, Validators.required),
      'tel1': new FormControl(this.selectedContact.tel1),
      'email': new FormControl(this.selectedContact.email),
      'line1': new FormControl(this.selectedAddress.line1, Validators.required),
      'line2': new FormControl(this.selectedAddress.line2),
      'zipCode': new FormControl(this.selectedAddress.zip),
      'city': new FormControl(this.selectedAddress.city),
      'country': new FormControl(this.selectedAddress.country)
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.supplierForm.invalid) { return; }
    this.spinner.show();
    this.selectedSupplier.code = this.supplierForm.value['code'];

    this.selectedContact.name = this.supplierForm.value['name'];
    this.selectedContact.tel1 = this.supplierForm.value['tel1'];
    this.selectedContact.email = this.supplierForm.value['email'];

    this.selectedAddress.line1 =this.supplierForm.value['line1'];
    console.log(this.supplierForm.value['line1']);

    this.selectedAddress.line2 = this.supplierForm.value['line2'];
    this.selectedAddress.zip = this.supplierForm.value['zipCode'];
    this.selectedAddress.city = this.supplierForm.value['city'];
    this.selectedAddress.country = this.supplierForm.value['country'];

    if (this.selectedContact.name) {
      this.selectedSupplier.contact = this.selectedContact;
    }
    if (this.selectedAddress.line1) {
      this.selectedSupplier.address = this.selectedAddress;
    }

    const s = this.supplierService.set(this.selectedSupplier).subscribe(
      data => {
        this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
        console.log(this.selectedSupplier);

        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message);
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
