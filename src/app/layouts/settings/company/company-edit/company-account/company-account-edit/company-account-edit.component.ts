import { VilleService } from '../../../../../../shared/services/api/ville.service';
import { PaysService } from '../../../../../../shared/services/api/pays.service';
import { CompanyService } from '../../../../../../shared/services/api/company.service';
import { DayService } from '../../../../../../shared/services/api/day.service';
import { AddressService } from '../../../../../../shared/services/api/address.service';
import { AuthenticationService } from '../../../../../../shared/services/api/authentication.service';
import { AccountService } from '../../../../../../shared/services/api/account.service';
import { Ville } from '../../../../../../shared/models/ville';
import { Pays } from '../../../../../../shared/models/pays';
import { Day } from '../../../../../../shared/models/day';
import { Company } from '../../../../../../shared/models/company';
import { Address } from '../../../../../../shared/models/address';
import { Contact } from '../../../../../../shared/models/contact';
import { Planning } from '../../../../../../shared/models/planning';
import { Account } from '../../../../../../shared/models/account';

import { ActivatedRoute, Router } from "@angular/router";

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService, MessageService,MenuItem } from "primeng/api";
import { Subscription } from "rxjs";


@Component({
  selector: "app-company-account-edit",
  templateUrl: "./company-account-edit.component.html",
  styleUrls: ["./company-account-edit.component.scss"],
})
export class CompanyAccountEditComponent implements OnInit {
  @Input() selectedAccount = new Account();
  @Input() selectedCompany = new Company();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() showDialogContactEvent = new EventEmitter<boolean>();

  selectedPlanning: Planning = new Planning();
  selectedContact = new Contact();
  selectedAddress = new Address();
  closeResult: String;
  accountForm: FormGroup;
  accountTypeList: Account[] = [];
  days: Array<Day> = [];
  plannings: Array<Planning> = [];
  companies: Array<Company> = [];

  editModePlannig: boolean;
  editModeContact: boolean;
  editModeAddress: boolean;

  planningN: Planning = new Planning();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier un Compte";
  subscriptions = new Subscription();
  size: number;
  showDialogPlanning: boolean;
  showDialogContact: boolean;
  showDialogAddress: boolean;
  items: MenuItem[];
  paysList:Array<Pays>=[];
  villeList:Array<Ville>=[];
  home: MenuItem;
  constructor(
    private accountService: AccountService,
    private authentificationService: AuthenticationService,
    private addressService: AddressService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private dayService: DayService,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private paysService:PaysService,
    private villeService:VilleService,
  ) {}

  ngOnInit() {
    this.items = [
      {label: 'Compte'},
      {label: 'Editer' ,routerLink:'/core/account/edit'},

  ];

  this.home = {icon: 'pi pi-home'};


    this.subscriptions.add(
      this.dayService.findAll().subscribe((data) => {
        this.days = data.sort(function (a, b) {
          return Number(a.value) - Number(b.value);
        });
        this.generatePlannings();
      })
    );



      if (this.editMode === 1) {
      this.selectedAccount = new Account();
      this.selectedAccount.company=this.selectedCompany;
      this.selectedContact = new Contact();
      this.selectedAddress = new Address();
      this.selectedAccount.plannings = this.plannings.sort(function (a, b) {
        return Number(a.day.value) - Number(b.day.value);
      });
      this.title = "Ajouter  Compte";
      this.initForm();

    } else {


this.selectedAddress=this.selectedAccount?.deliveryAddress?.code?this.selectedAccount.deliveryAddress:new Address();
if (this.selectedAccount.plannings.length == 0) {
  this.selectedAccount.plannings = this.plannings.sort(function (
    a,
    b
  ) {
    return Number(a.day.value) - Number(b.day.value);
  });
}
if (this.selectedAccount.plannings.length >= 0) {
  this.selectedAccount.plannings =
    this.selectedAccount.plannings.sort(function (a, b) {
      return Number(a.day.value) - Number(b.day.value);
    });

}
this.initForm();

    }





    let id = this.activatedRoute.snapshot.params["id"];
    if (!id) {
      // this.selectedAccount = new Account();
      // this.selectedContact = new Contact();
      // this.selectedAddress = new Address();
      // this.selectedAccount.plannings = this.plannings.sort(function (a, b) {
      //   return Number(a.day.value) - Number(b.day.value);
      // });
      // this.title = "Ajouter un Compte";



    } else {

      if (id) {
        console.log(id);
//         this.accountService.findById(id).subscribe((data) => {
//           this.selectedAccount = data;
//           console.log(this.selectedAccount);

// this.selectedAddress=this.selectedAccount?.deliveryAddress?.code?this.selectedAccount.deliveryAddress:new Address();
//           if (this.selectedAccount.plannings.length == 0) {
//             this.selectedAccount.plannings = this.plannings.sort(function (
//               a,
//               b
//             ) {
//               return Number(a.day.value) - Number(b.day.value);
//             });
//           }
//           if (this.selectedAccount.plannings.length >= 0) {
//             this.selectedAccount.plannings =
//               this.selectedAccount.plannings.sort(function (a, b) {
//                 return Number(a.day.value) - Number(b.day.value);
//               });
//           }
//           this.initForm();
//         });
      }
    }

    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    let deliveryDate = new Date(this.selectedAccount.deliveryDate);

    this.accountForm = new FormGroup({
      code: new FormControl(this.selectedAccount.code, Validators.required),
      name: new FormControl(this.selectedAccount.name, Validators.required),
      tel1: new FormControl(this.selectedAccount.telephone),
      email: new FormControl(this.selectedAccount.email),

      company: new FormControl(this.selectedAccount.company),
      deliveryDate: new FormControl(this.selectedAccount.deliveryDate),


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
    this.selectedAccount.deliveryDate = this.accountForm.value["deliveryDate"];

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

    this.subscriptions.add(
      this.accountService.set(this.selectedAccount).subscribe(
        (data) => {
          this.messageService.add({
            severity: "success",
            summary: "Edition",
            detail: "Elément Enregistré Avec Succès",
          });

          //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');

          this.displayDialog = false;
          this.isFormSubmitted = false;
          this.spinner.hide();

          this.accountForm.reset();
          // if (close) {
          //   this.router.navigate(["/core/settings/account"]);
          // } else {
          //   this.editMode = 1;
          //   this.router.navigate(["/core/settings/account-edit"]);
          //   this.title = "Ajouter un Client";
          // }
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

  onLineEditedPlanning(line: Planning) {
    console.log(line);

    this.selectedAccount.plannings = this.selectedAccount.plannings.filter(
      (l) => l.day.code !== line.day.code
    );
    this.selectedAccount.plannings.push(line);
    this.selectedAccount.plannings = this.selectedAccount.plannings.sort(
      function (a, b) {
        return Number(a.day.value) - Number(b.day.value);
      }
    );
    console.log(this.selectedAccount.plannings);
  }
  onDeletePlanning(day: string) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Supprimer?",
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
    } else if (mode == false) {
      console.log("false");
      this.selectedPlanning = new Planning();
      this.editModePlannig = false;
    }
  }

  generatePlannings() {
    var planning: Planning;
    var datMD: Date = new Date();
    var datMF: Date = new Date();
    var datSD: Date = new Date();
    var datSF: Date = new Date();

    this.days.forEach((element) => {
      planning = new Planning();
      datMD.setHours(8);
      datMD.setMinutes(0);
      datMF.setHours(12);
      datMF.setMinutes(0);
      datSD.setHours(14);
      datSD.setMinutes(0);
      datSF.setHours(18);
      datSF.setMinutes(0);
      (planning.day = element),
        (planning.closingDay = false),
        (planning.morningTimeStart = datMD),
        (planning.morningTimeEnd = datMF),
        (planning.everingTimeStart = datSD),
        (planning.everingTimeEnd = datSF),
        this.plannings.push(planning);
    });
  }

  onHideDialogContact(event) {
    this.showDialogContact = event;
  }

  onLineEditedContact(line: Contact) {
    console.log(line);
    console.log(line);

    this.selectedAccount.contacts = this.selectedAccount.contacts.filter(
      (l) => l.code !== line.code
    );
    this.selectedAccount.contacts.push(line);

    console.log(this.selectedAccount.contacts);
  }
  onDeleteContact(code: string) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Supprimer?",
      accept: () => {
        this.selectedAccount.contacts = this.selectedAccount.contacts.filter(
          (l) => l.code !== code
        );
      },
    });
  }

  onShowDialogContact(line, mode) {
    this.showDialogContact = true;

    if (mode == true) {
      console.log("true");
      console.log(line);

      this.selectedContact = line;
      this.editModeContact = true;
    } else if (mode == false) {
      console.log("false");
      this.selectedContact = new Contact();
      this.editModeContact = false;
    }
  }

  onHideDialogAddress(event) {
    this.showDialogAddress = event;
  }

  onLineEditedAddress(line: Address) {
    console.log(line);
    console.log(line);

    this.selectedAccount.addresses = this.selectedAccount.addresses.filter(
      (l) => l.code !== line.code
    );
    this.selectedAccount.addresses.push(line);

    console.log(this.selectedAccount.addresses);
  }
  onDeleteAddress(code: string) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Supprimer?",
      accept: () => {
        this.selectedAccount.addresses = this.selectedAccount.addresses.filter(
          (l) => l.code !== code
        );
      },
    });
  }

  onShowDialogAddress(line, mode) {
    this.showDialogAddress = true;

    if (mode == true) {
      console.log("true");
      console.log(line);

      this.selectedAddress = line;
      this.editModeAddress = true;
    } else if (mode == false) {
      console.log("false");
      this.selectedAddress = new Address();
      this.editModeAddress = false;
    }
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
