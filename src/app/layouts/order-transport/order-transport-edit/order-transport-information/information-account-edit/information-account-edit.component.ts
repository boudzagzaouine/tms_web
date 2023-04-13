import { Subscription } from 'rxjs';
import { Address, Company } from './../../../../../shared/models';
import { Contact } from './../../../../../shared/models/contact';
import { Account } from './../../../../../shared/models/account';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pays } from './../../../../../shared/models/pays';
import { Ville } from './../../../../../shared/models/ville';
import { AuthenticationService } from './../../../../../shared/services';
import { AccountService } from './../../../../../shared/services/api/account.service';
import { PaysService } from './../../../../../shared/services/api/pays.service';
import { VilleService } from './../../../../../shared/services/api/ville.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AddressService } from './../../../../../shared/services/api/address.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from './../../../../../shared/services/api/company.service';

@Component({
  selector: 'app-information-account-edit',
  templateUrl: './information-account-edit.component.html',
  styleUrls: ['./information-account-edit.component.scss']
})
export class InformationAccountEditComponent implements OnInit {


  @Input() selectedAccount = new Account();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() accountEdited = new EventEmitter<Account>();
    selectedCompany : Company = new  Company();
  selectedContact = new Contact();
  selectedAddress = new Address();
  closeResult: String;
  accountForm: FormGroup;
  accountTypeList: Account[] = [];

  companies : Company[]=[];

  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Ajouter un Compte";
  subscriptions = new Subscription();
  size: number;
  showDialogPlanning: boolean;
  showDialogContact: boolean;
  showDialogAddress: boolean;
  paysList:Array<Pays>=[];
  villeList:Array<Ville>=[];
  home: MenuItem;
  constructor(
    private accountService: AccountService,
    private authentificationService: AuthenticationService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private companyService: CompanyService,
    private router: Router,
    private paysService:PaysService,
    private villeService:VilleService,
  ) {}

  ngOnInit() {


  this.home = {icon: 'pi pi-home'};

      this.selectedAccount = new Account();
      this.selectedContact = new Contact();
      this.selectedAddress = new Address();
      this.companyService.generateCode().subscribe(
        data => {
               this.selectedCompany.code=data;
               console.log(data);

               this.initForm();
        }
      );

    this.displayDialog = true;
    this.initForm();
  }

  initForm() {

    this.accountForm = new FormGroup({
      code: new FormControl(this.selectedAccount.code, Validators.required),
      name: new FormControl(this.selectedAccount.name, Validators.required),
      tel1: new FormControl(this.selectedAccount.telephone),
      email: new FormControl(this.selectedAccount.email),

      company: new FormControl(this.selectedAccount.company),


      line1: new FormControl(this.selectedAddress.line1, Validators.required),
      line2: new FormControl(this.selectedAddress.line2),
      zip: new FormControl(this.selectedAddress.zip),
      city: new FormControl(this.selectedAddress.ville,Validators.required),
      country: new FormControl(this.selectedAddress.pays,Validators.required),

    });
  }

  onSubmit(close = false) {
    this.isFormSubmitted = true;
    if (this.accountForm.invalid) {
      return;
    }
    this.spinner.show();
    this.selectedAccount.code = this.accountForm.value["code"];
    this.selectedAccount.name = this.accountForm.value["name"];

    this.selectedAccount.owner = this.authentificationService.getDefaultOwner();
    this.selectedAccount.telephone = this.accountForm.value["tel1"];
    this.selectedAccount.email = this.accountForm.value["email"];

    this.selectedAddress.addressType=1;
    this.selectedAddress.code = this.accountForm.value['name'];
    this.selectedAddress.name = this.accountForm.value['name'];

    this.selectedAddress.line1 = this.accountForm.value['line1'];
    this.selectedAddress.line2 = this.accountForm.value['line2'];
    this.selectedAddress.zip = this.accountForm.value['zip'];

    if(this.selectedAddress.code){
      console.log("address");
      this.selectedAddress.latitude=this.selectedAddress.latitude?this.selectedAddress.latitude:this.selectedAddress.ville.latitude
      this.selectedAddress.longitude=this.selectedAddress.longitude?this.selectedAddress.longitude:this.selectedAddress.ville.longitude
console.log(this.selectedAddress.latitude +"" +this.selectedAddress.longitude );

      this.selectedAccount.deliveryAddress=this.selectedAddress;

    console.log(this.selectedAddress);

    }

    console.log(this.selectedAccount);


    if(this.selectedAccount.company){
this.saveAccount()
    }
  else{
    this.saveCompany();
  }
  }

saveCompany(){

this.selectedCompany.name=this.selectedAccount.name;
this.selectedCompany.owner=this.authentificationService.getDefaultOwner();

  this.subscriptions.add(
    this.companyService.set(this.selectedCompany).subscribe(
      (data) => {
        this.messageService.add({
          severity: "success",
          summary: "Edition",
          detail: "Elément Enregistré Avec Succès",
        });

        //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
        this.selectedAccount.company=data;

       this.saveAccount();

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

  saveAccount(){

    this.subscriptions.add(
      this.accountService.set(this.selectedAccount).subscribe(
        (data) => {
          this.messageService.add({
            severity: "success",
            summary: "Edition",
            detail: "Elément Enregistré Avec Succès",
          });

          //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
   this.accountEdited.emit(data);
          this.displayDialog = false;
          this.isFormSubmitted = false;
          this.spinner.hide();

          this.accountForm.reset();

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
  onCompanySearch(event: any) {
    this.subscriptions.add(
      this.companyService
        .find("name~" + event.query)
        .subscribe((data) => (this.companies = data))
    );
  }

  onSelectCompany(event: any) {
    console.log(event);

    this.selectedAccount.company = event;
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }

  onPaysSearch(event: any) {
    this.paysService
      .find('code~' + event.query)
      .subscribe(data => (this.paysList = data));
  }

  onSelectPays(event){
    this.selectedAddress.pays=event;
    console.log( this.selectedAddress.pays);

  }

  onVilleSearch(event: any) {
    this.villeService
      .find('code~' + event.query)
      .subscribe(data => (this.villeList = data));
  }

  onSelectVille(event){
    this.selectedAddress.ville=event;
    console.log( this.selectedAddress.ville);

  }


}
