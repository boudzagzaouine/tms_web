import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Planning } from './../../../../shared/models/planning';
import { Account, Address, Contact } from './../../../../shared/models';
import { AuthenticationService } from './../../../../shared/services';
import { AccountService } from './../../../../shared/services/api/account.service';
import { AddressService } from './../../../../shared/services/api/address.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {

  @Input() selectedAccount = new Account();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  selectedPlanning :Planning= new Planning();
  selectedContact = new Contact();
  selectedAddress = new Address();
  closeResult: String;
  accountForm: FormGroup;
  accountTypeList: Account[] = [];
  editModePlannig: boolean;
planningN :Planning = new Planning();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Client';
  subscriptions= new Subscription();

  showDialogPlanning: boolean;

  constructor(
    private accountService: AccountService,
    private authentificationService:AuthenticationService,
    private addressService :AddressService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (this.editMode === 1) {
      this.selectedAccount = new Account();
      this.selectedContact = new Contact();
      this.selectedAddress = new Address();
      this.title = 'Ajouter un Client';
      this.subscriptions.add(this.accountService.generateCode().subscribe(
        code => {
       this.selectedAccount.code = code;
        this.initForm();
    }));

    this.subscriptions.add(this.addressService.generateCode().subscribe(
      code => {
     this.selectedAddress.code = code;
      this.initForm();
  }));
    } else {




      if (this.selectedAccount.contact) {
        this.selectedContact = this.selectedAccount.contact;
      }
      if (this.selectedAccount.deliveryAddress) {
        this.selectedAddress = this.selectedAccount.deliveryAddress;
      }

    }


    this.displayDialog = true;
    this.initForm();

  }

  initForm() {

    this.accountForm = new FormGroup({
      'code': new FormControl(this.selectedAccount.code, Validators.required),
      'nameA': new FormControl(this.selectedAccount.name, Validators.required),
      'name': new FormControl(this.selectedContact.name),
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
    if (this.accountForm.invalid) { return; }
    this.spinner.show();
    this.selectedAccount.code = this.accountForm.value['code'];
    this.selectedAccount.name = this.accountForm.value['nameA'];

   this.selectedAccount.owner=this.authentificationService.getDefaultOwner();
    this.selectedContact.name = this.selectedAccount.name ;
    this.selectedContact.tel1 = this.accountForm.value['tel1'];
    this.selectedContact.email = this.accountForm.value['email'];

    this.selectedAddress.line1 =this.accountForm.value['line1'];

    this.selectedAddress.line2 = this.accountForm.value['line2'];
    this.selectedAddress.zip = this.accountForm.value['zipCode'];
    this.selectedAddress.city = this.accountForm.value['city'];
    this.selectedAddress.country = this.accountForm.value['country'];

    if (this.selectedContact.name) {
      this.selectedContact.owner=this.authentificationService.getDefaultOwner();
      this.selectedAccount.contact = this.selectedContact;
    }
    if (this.selectedAddress.line1) {
      this.selectedAddress.owner=this.authentificationService.getDefaultOwner();
      this.selectedAccount.deliveryAddress = this.selectedAddress;
    }
console.log(this.selectedAccount);

    this.subscriptions.add( this.accountService.set(this.selectedAccount).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});

        //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');

        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    ));

  }


  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onLineEditedPlanning(line: Planning) {
    console.log(line);
    
    this.selectedAccount.plannings = this.selectedAccount.plannings.filter(
      (l) => l.day !== line.day
    );
    this.selectedAccount.plannings.push(line);
   console.log(this.selectedAccount.plannings);
   

  }
  onDeletePlanning (day: string) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.selectedAccount.plannings = this.selectedAccount.plannings.filter(
          (l) => l.day !== day
        );
  
      },
    });
  }
  onHideDialogPlanning(event) {
    this.showDialogPlanning = event;
  }

  onShowDialogPlanning(line, mode) {
    this.showDialogPlanning = true;

    if (mode == true) {
      console.log("true");
      console.log(line);
      
      this.selectedPlanning = line;
      this.editModePlannig = true;

    } else if(mode ==false) {
      console.log("false");
      this.selectedPlanning=new Planning();
      this.editModePlannig = false;

    }




  }
}
