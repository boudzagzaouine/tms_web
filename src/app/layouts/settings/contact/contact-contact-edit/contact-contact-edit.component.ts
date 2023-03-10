import { AddressService } from './../../../../shared/services/api/address.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ContactFunctionService } from './../../../../shared/services/api/contact-function.service';
import { ContactFunction } from './../../../../shared/models/contact-function';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from './../../../../shared/services/api/contact.service';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address } from './../../../../shared/models/address';
import { Contact } from './../../../../shared/models/contact';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-contact-edit',
  templateUrl: './contact-contact-edit.component.html',
  styleUrls: ['./contact-contact-edit.component.scss']
})
export class ContactContactEditComponent implements OnInit {


  @Input() selectedContact: Contact = new Contact();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Contact';
  contactFunctionList:ContactFunction[]=[];
  addressList:Address[]=[];

  contactForm: FormGroup;
  contactCode :string ;
  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,
    private contactService : ContactService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private contactFunctionService :ContactFunctionService,
    private addressService:AddressService,


  ) { }

  ngOnInit() {

    this.contactFunctionService.findAll().subscribe(
      data=> {
        this.contactFunctionList=data;
      }
    );
    this.displayDialog = true;


    if (this.editMode === 1) {
      this.selectedContact = new Contact();
      this.title = 'Ajouter Contact';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {

    this.contactForm = this.formBuilder.group({

      //code: this.formBuilder.control(this.selectedContact.code),
      name: this.formBuilder.control(this.selectedContact.name,Validators.required),
      surname: this.formBuilder.control(this.selectedContact.surname),

      tele: this.formBuilder.control(this.selectedContact.tel1),
      email: this.formBuilder.control(this.selectedContact.email),
      address: this.formBuilder.control(this.selectedContact.address),
      function: this.formBuilder.control(this.selectedContact.contactFunction),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.contactForm.invalid) {
      return;
    }

    // this.selectedContact.Day = this.contactForm.value['day'];
   // this.selectedContact.code = this.contactCode;
    this.selectedContact.name = this.contactForm.value['name'];
    this.selectedContact.surname = this.contactForm.value['surname'];
    this.selectedContact.tel1 = this.contactForm.value['tele'];
    this.selectedContact.email = this.contactForm.value['email'];
    this.selectedContact.active = true;
    this.selectedContact.delivery = true;

    this.selectedContact.owner = this.authentificationService.getDefaultOwner();
    console.log(this.selectedContact);

   this.contactService.set(this.selectedContact).subscribe(
      data => {
        //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


    this.displayDialog = false;

  }
  onAddressSearch(event: any) {
    this.addressService
      .find('code~' + event.query)
      .subscribe(data => (this.addressList = data));
  }

  onSelectAddress(event){
    this.selectedContact.address=event;

  }

  onSelectContactFunction(event){
    this.selectedContact.contactFunction=event.value;
      }
  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }

}
