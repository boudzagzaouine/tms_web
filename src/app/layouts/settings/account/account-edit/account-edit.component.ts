import { ActivatedRoute, Router } from "@angular/router";
import { CompanyService } from "./../../../../shared/services/api/company.service";
import { Company } from "./../../../../shared/models/company";
import { DayService } from "./../../../../shared/services/api/day.service";
import { Day } from "./../../../../shared/models/day";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService, MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { Planning } from "./../../../../shared/models/planning";
import { Account, Address, Contact } from "./../../../../shared/models";
import { AuthenticationService } from "./../../../../shared/services";
import { AccountService } from "./../../../../shared/services/api/account.service";
import { AddressService } from "./../../../../shared/services/api/address.service";

@Component({
  selector: "app-account-edit",
  templateUrl: "./account-edit.component.html",
  styleUrls: ["./account-edit.component.scss"],
})
export class AccountEditComponent implements OnInit {
  @Input() selectedAccount = new Account();
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
    private router: Router
  ) {}

  ngOnInit() {


    this.subscriptions.add(
      this.dayService.findAll().subscribe((data) => {
        this.days = data.sort(function (a, b) {
          return Number(a.value) - Number(b.value);
        });
        this.generatePlannings();
      })
    );
    let id = this.activatedRoute.snapshot.params["id"];
    if (!id) {
      this.selectedAccount = new Account();
      this.selectedContact = new Contact();
      this.selectedAddress = new Address();
      this.selectedAccount.plannings = this.plannings.sort(function (a, b) {
        return Number(a.day.value) - Number(b.day.value);
      });
      this.title = "Ajouter un Compte";
      // this.subscriptions.add(
      //   this.accountService.generateCode().subscribe((code) => {
      //     this.selectedAccount.code = code;
      //     this.initForm();
      //   })
      // );

      this.subscriptions.add(
        this.addressService.generateCode().subscribe((code) => {
          this.selectedAddress.code = code;
          this.initForm();
        })
      );
    } else {

      if (id) {
        console.log(id);
        this.accountService.findById(id).subscribe((data) => {
          this.selectedAccount = data;

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
        });
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
          if (close) {
            this.router.navigate(["/core/settings/account"]);
          } else {
            this.editMode = 1;
            this.router.navigate(["/core/settings/account-edit"]);
            this.title = "Ajouter un Client";
          }
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
      message: "Voulez vous vraiment Suprimer?",
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
      message: "Voulez vous vraiment Suprimer?",
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
      message: "Voulez vous vraiment Suprimer?",
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
}
