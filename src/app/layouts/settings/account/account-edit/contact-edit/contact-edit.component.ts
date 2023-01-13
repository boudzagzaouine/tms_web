import { ContactFunctionService } from './../../../../../shared/services/api/contact-function.service';
import { ContactFunction } from './../../../../../shared/models/contact-function';
import { ActivatedRoute } from '@angular/router';
import { Company } from './../../../../../shared/models/company';
import { ContactService } from './../../../../../shared/services/api/contact.service';
import { AuthenticationService } from './../../../../../shared/services/api/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from './../../../../../shared/models/contact';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { emit } from 'process';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  @Input() selectedContact: Contact = new Contact();
  @Input() editMode = false;
  @Output() contactEdited = new EventEmitter<Contact>();
  @Output() showDialog = new EventEmitter<boolean>();
  contactFunctionList:ContactFunction[]=[];
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Contact';
  contactForm: FormGroup;
  contactCode :string ;
  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,
    private contactService : ContactService,
    private contactFunctionService :ContactFunctionService



  ) { }

  ngOnInit() {


    this.displayDialog = true;
    console.log(this.editMode);

this.contactFunctionService.findAll().subscribe(
  data=> {
    this.contactFunctionList=data;
  }
);

    if (!this.editMode) {
      this.title = 'Ajouter un Contact';

      console.log("new");
      this.selectedContact = new Contact();
  this.contactService.generateCode().subscribe(
    data=> {

            this.contactCode = data;
            this.selectedContact.code= this.contactCode;
            console.log();

    }
  );


    }
    else{
      this.title = 'Modifier un Contact';







    }
    this.initForm();
    console.log(this.selectedContact);



  }

  onSelectContactFunction(event){
this.selectedContact.contactFunction=event.value;
  }

  initForm() {

    this.contactForm = this.formBuilder.group({

      code: this.formBuilder.control(this.selectedContact.code),
      name: this.formBuilder.control(this.selectedContact.name,Validators.required),
      surname: this.formBuilder.control(this.selectedContact.surname),

      tele: this.formBuilder.control(this.selectedContact.tel1),
      email: this.formBuilder.control(this.selectedContact.email),
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

    this.selectedContact.owner = this.authentificationService.getDefaultOwner();
    console.log(this.selectedContact);

    this.contactEdited.emit(this.selectedContact);
    this.displayDialog = false;

  }

  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }
}
