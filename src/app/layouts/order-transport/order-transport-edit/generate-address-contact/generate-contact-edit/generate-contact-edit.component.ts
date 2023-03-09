import { Address } from './../../../../../shared/models/address';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../../../../shared/services/api/authentication.service';
import { ContactService } from './../../../../../shared/services/api/contact.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from './../../../../../shared/models/contact';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generate-contact-edit',
  templateUrl: './generate-contact-edit.component.html',
  styleUrls: ['./generate-contact-edit.component.scss']
})
export class GenerateContactEditComponent implements OnInit {

  @Input() selectedContact: Contact = new Contact();
  @Input() selectedAddress: Address = new Address();

  @Input() editMode = false;
  @Output() contactEdited = new EventEmitter<Contact>();
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Contact';
  contactForm: FormGroup;
  contactCode :string ;
  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,
    private contactService : ContactService,
    private toastr :ToastrService,



  ) { }

  ngOnInit() {


    this.displayDialog = true;
    console.log(this.editMode);
console.log(this.selectedAddress);
this.selectedContact=new Contact();
this.selectedContact.address=this.selectedAddress;
console.log(this.selectedContact);

    this.title = 'Ajouter un Contact';

  //   if (!this.editMode) {
  //     this.title = 'Ajouter un Contact';

  //     console.log("new");
  //     this.selectedContact = new Contact();
  // this.contactService.generateCode().subscribe(
  //   data=> {

  //           this.contactCode = data;
  //           this.selectedContact.code= this.contactCode;
  //           console.log();

  //   }
  // );


  //   }
  //   else{
  //     this.title = 'Modifier un Contact';







  //   }
  console.log(this.selectedContact);
    this.initForm();




  }

  initForm() {

    this.contactForm = this.formBuilder.group({

      code: this.formBuilder.control(this.selectedContact.code),
      name: this.formBuilder.control(this.selectedContact.name,Validators.required),
      surname: this.formBuilder.control(this.selectedContact.surname),

      tele: this.formBuilder.control(this.selectedContact.tel1),
      email: this.formBuilder.control(this.selectedContact.email),
      address: this.formBuilder.control(this.selectedContact.address),

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

    this.selectedContact.owner = this.authentificationService.getDefaultOwner();
    console.log(this.selectedContact);

    this.contactService.set( this.selectedContact).subscribe(
      data=> {
              console.log(data);
              this.contactEdited.emit(data);

              this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
      }
    );
    this.displayDialog = false;

  }

  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }
}
