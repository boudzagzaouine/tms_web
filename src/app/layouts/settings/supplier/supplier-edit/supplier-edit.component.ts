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
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (this.editMode === 1) {
      this.selectedSupplier = new Supplier();
      this.selectedContact = new Contact();
      this.selectedAddress = new Address();
      this.title = 'Ajouter un Fournisseur';

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
      'description': new FormControl(this.selectedSupplier.description),
      'name': new FormControl(this.selectedContact.name, Validators.required),
      'surName': new FormControl(this.selectedContact.surname),
      'tel1': new FormControl(this.selectedContact.tel1),
      'tel2': new FormControl(this.selectedContact.tel2),
      'fax': new FormControl(this.selectedContact.fax),
      'email': new FormControl(this.selectedContact.email),
      'addrCode': new FormControl(this.selectedAddress.code, Validators.required),
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
    this.selectedSupplier.description = this.supplierForm.value['description'];

    this.selectedContact.name = this.supplierForm.value['name'];
    this.selectedContact.surname = this.supplierForm.value['surName'];
    this.selectedContact.tel1 = this.supplierForm.value['tel1'];
    this.selectedContact.tel2 = this.supplierForm.value['tel2'];
    this.selectedContact.fax = this.supplierForm.value['fax'];
    this.selectedContact.email = this.supplierForm.value['email'];

    this.selectedAddress.code = this.supplierForm.value['addrCode'];
    this.selectedAddress.line1 = this.supplierForm.value['line1'];
    this.selectedAddress.line2 = this.supplierForm.value['line2'];
    this.selectedAddress.zip = this.supplierForm.value['zipCode'];
    this.selectedAddress.city = this.supplierForm.value['city'];
    this.selectedAddress.country = this.supplierForm.value['country'];

    if (this.selectedContact.name) {
      this.selectedSupplier.contact = this.selectedContact;
    }
    if (this.selectedAddress.code) {
      this.selectedSupplier.address = this.selectedAddress;
    }

    const s = this.supplierService.set(this.selectedSupplier).subscribe(
      data => {
        this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
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
