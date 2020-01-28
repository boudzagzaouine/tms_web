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
  @Input() editMode: boolean;
  @Output() supplierAdd = new EventEmitter<Supplier>();

  selectedContact = new Contact();
  selectedAddress = new Address();
  closeResult: String;
  supplierForm: FormGroup;
  supplierTypeList: Supplier[] = [];

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(
    private supplierService: SupplierService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.initForm();

  }

  initForm() {

    this.supplierForm = new FormGroup({
      'code': new FormControl({value:this.selectedSupplier.code, disabled: true}, Validators.required),
      'description': new FormControl({value:this.selectedSupplier.description, disabled: true}),
      'name': new FormControl({value:this.selectedContact.name, disabled: true}, Validators.required),
      'surName': new FormControl({value:this.selectedContact.surname, disabled: true}),
      'tel1': new FormControl({value:this.selectedContact.tel1, disabled: true}),
      'tel2': new FormControl({value:this.selectedContact.tel2, disabled: true}),
      'fax': new FormControl({value:this.selectedContact.fax, disabled: true}),
      'email': new FormControl({value:this.selectedContact.email, disabled: true}),
      'addrCode': new FormControl({value:this.selectedAddress.code, disabled: true}, Validators.required),
      'line1': new FormControl({value:this.selectedAddress.line1, disabled: true}, Validators.required),
      'line2': new FormControl({value:this.selectedAddress.line2, disabled: true}),
      'zipCode': new FormControl({value:this.selectedAddress.zip, disabled: true}),
      'city': new FormControl({value:this.selectedAddress.city, disabled: true}),
      'country': new FormControl({value:this.selectedAddress.country, disabled: true})
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

    console.log(this.selectedSupplier);
    const s = this.supplierService.set(this.selectedSupplier).subscribe(
      data => {
        this.supplierAdd.emit(data);

        this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        if (this.modal) { this.modal.close(); }
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message);
        console.log(error);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );

  }

  open(content) {
    if (!this.editMode) {
      this.selectedSupplier = new Supplier();
      this.selectedContact = new Contact();
      this.selectedAddress = new Address();
    } else {
      console.log(this.selectedSupplier);

      if (this.selectedSupplier.contact) {
        this.selectedContact = this.selectedSupplier.contact;
      }
      if (this.selectedSupplier.address) {
        this.selectedAddress = this.selectedSupplier.address;
      }
    }
    this.initForm();
    this.modal = this.modalService.open(content, { backdrop: 'static', centered: true, size: 'xl' });
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
