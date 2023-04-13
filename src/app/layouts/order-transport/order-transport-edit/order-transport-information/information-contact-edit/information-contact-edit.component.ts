import { ContactFunctionService } from './../../../../../shared/services/api/contact-function.service';
import { ContactFunction } from './../../../../../shared/models/contact-function';
import { ActivatedRoute } from '@angular/router';
import { Company } from './../../../../../shared/models/company';
import { ContactService } from './../../../../../shared/services/api/contact.service';
import { AuthenticationService } from './../../../../../shared/services/api/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from './../../../../../shared/models/contact';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Account } from './../../../../../shared/models';
@Component({
  selector: 'app-information-contact-edit',
  templateUrl: './information-contact-edit.component.html',
  styleUrls: ['./information-contact-edit.component.scss']
})
export class InformationContactEditComponent implements OnInit {

  @Input() selectedAccount: Account = new Account();
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
  subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,
    private contactService : ContactService,
    private contactFunctionService :ContactFunctionService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,


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
this.selectedContact.account=this.selectedAccount;

    this.subscriptions.add(
      this.contactService.set(this.selectedContact).subscribe(
        (data) => {
          this.messageService.add({
            severity: "success",
            summary: "Edition",
            detail: "Elément Enregistré Avec Succès",
          });

          //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
   this.contactEdited.emit(data);
          this.displayDialog = false;
          this.isFormSubmitted = false;
          this.spinner.hide();

          this.contactForm.reset();

        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur",
          });

          // this.toastr.error(error.error.message);
          this.spinner.hide();
        },

        () => this.spinner.hide()
      )
    );













  }

  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }

}
