import { CompanyService } from './../../../../shared/services/api/company.service';
import { Company } from './../../../../shared/models/company';
import { DayService } from './../../../../shared/services/api/day.service';
import { Day } from './../../../../shared/models/day';
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
  days :Array<Day>=[];
  plannings :Array<Planning>=[];
  companies :Array<Company>=[];

  editModePlannig: boolean;
planningN :Planning = new Planning();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Client';
  subscriptions= new Subscription();
 size :number;
  showDialogPlanning: boolean;

  constructor(
    private accountService: AccountService,
    private authentificationService:AuthenticationService,
    private addressService :AddressService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private dayService:DayService,
    private companyService:CompanyService) { }

  ngOnInit() {


    this.subscriptions.add(
      this.dayService.findAll().subscribe((data) => {
        this.days = data.sort(function (a, b) {
          return (Number(a.value) - Number(b.value))
        });
        this.generatePlannings();
      })

    );
    if (this.editMode === 1) {
      this.selectedAccount = new Account();
      this.selectedContact = new Contact();
      this.selectedAddress = new Address();
      this.selectedAccount.plannings = this.plannings.sort(function (a, b) {
        return (Number(a.day.value) - Number(b.day.value))
      });
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
      console.log(this.selectedAccount.plannings);

      if(this.selectedAccount.plannings.length ==0){
        this.selectedAccount.plannings = this.plannings.sort(function (a, b) {
          return (Number(a.day.value) - Number(b.day.value))
        });
      }
      if(this.selectedAccount.plannings.length >=0){
        this.selectedAccount.plannings = this.selectedAccount.plannings.sort(function (a, b) {
          return (Number(a.day.value) - Number(b.day.value))
        });
      }
    }


    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    let deliveryDate = new Date(this.selectedAccount.deliveryDate);

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
      'country': new FormControl(this.selectedAddress.country),
      'company': new FormControl(this.selectedAccount.company),
      'deliveryDate': new FormControl(deliveryDate)

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
    this.selectedAccount.deliveryDate = this.accountForm.value['deliveryDate'];

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
  onCompanySearch(event: any) {
    this.subscriptions.add( this.companyService
      .find('code~' + event.query)
      .subscribe(data => (this.companies = data)));
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

  onLineEditedPlanning(line: Planning) {
    console.log(line);

    this.selectedAccount.plannings = this.selectedAccount.plannings.filter(
      (l) => l.day.code !== line.day.code
    );
    this.selectedAccount.plannings.push(line);
    this.selectedAccount.plannings =  this.selectedAccount.plannings.sort(function (a, b) {
      return (Number(a.day.value) - Number(b.day.value))
    });
   console.log(this.selectedAccount.plannings);


  }
  onDeletePlanning (day: string) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.selectedAccount.plannings = this.selectedAccount.plannings.filter(
          (l) => l.day.code !== day
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

  generatePlannings(){

    var planning : Planning;
   var datMD :Date = new Date();
   var datMF :Date = new Date();
   var datSD :Date = new Date();
   var datSF :Date = new Date();


this.days.forEach(element => {
  planning = new Planning()
   datMD.setHours(8);datMD.setMinutes(0);
   datMF.setHours(12);datMF.setMinutes(0);
   datSD.setHours(14);datSD.setMinutes(0);
   datSF.setHours(18);datSF.setMinutes(0);
  planning.day=element,
  planning.closingDay=false,
  planning.morningTimeStart=datMD,
  planning.morningTimeEnd=datMF,
  planning.everingTimeStart=datSD,
  planning.everingTimeEnd=datSF,

   this.plannings.push(planning);
});
  }
}
