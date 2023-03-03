import { TransportAccountService } from './../../../../shared/models/transport-account-service';
import { CatalogTransportAccountPricing } from './../../../../shared/models/catalog-transport-account-pricing';
import { CatalogTransportPricingService } from './../../../../shared/services/api/catalog-transport-pricing.service';
import { CatalogTransportPricing } from './../../../../shared/models/CatalogTransportPricing';
import { PaysService } from './../../../../shared/services/api/pays.service';
import { VilleService } from './../../../../shared/services/api/ville.service';
import { Ville } from './../../../../shared/models/ville';
import { Pays } from './../../../../shared/models/pays';
import { ContactService } from './../../../../shared/services/api/contact.service';
import { Contact } from './../../../../shared/models/contact';
import { AccountPricingService } from './../../../../shared/services/api/account-pricing.service';
import { AccountPricing } from './../../../../shared/models/account-pricing';
import { ActivatedRoute, Route, Router } from "@angular/router";
import { AddressService } from "./../../../../shared/services/api/address.service";
import { Address } from "./../../../../shared/models/address";
import { TransportServcie } from "./../../../../shared/services/api/transport.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Transport } from "./../../../../shared/models/transport";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthenticationService } from "./../../../../shared/services";
import { MessageService, ConfirmationService } from "primeng/api";
import { TransportService } from './../../../../shared/models/transport-service';

@Component({
  selector: "app-transport-edit",
  templateUrl: "./transport-edit.component.html",
  styleUrls: ["./transport-edit.component.css"],
})
export class TransportEditComponent implements OnInit {

  @Input() catalogTransportPricingList :CatalogTransportPricing []= [];
   selectedTransport :Transport = new Transport();
 editMode: number;
  transportForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier un Transporteur";
  selectAddress = new Address();
  selectContact = new Contact();
  subscriptions = new Subscription();

  paysList: Pays[] = [];
  villeList: Ville[] = [];
  showTransportCatalogPricing:Boolean =false;
  showTransportService:Boolean =false;

  constructor(
    private transportService: TransportServcie,
    private accountPricingService :AccountPricingService,
    private authentificationService: AuthenticationService,
    private addressService: AddressService,
    private contactService: ContactService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private villeService: VilleService,
    private paysService :PaysService,
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["id"];
    if (!id) {
      this.title = "Ajouter un Transporteur";
         this.selectedTransport.active=true;
      this.editMode === 1;
      this.selectedTransport = new Transport();
      this.selectedTransport.interneOrExterne=false;
      this.transportService.generateCode().subscribe((code) => {
        this.selectedTransport.code = code;
        console.log(this.selectedTransport.code);

        this.initForm();
      });


      this.subscriptions.add(
        this.paysService.findById(1).subscribe((data) => {
          this.selectAddress.pays = data;
          console.log("pays");
          console.log(data);


          this.initForm();

        })
      );

      this.subscriptions.add(
        this.addressService.generateCode().subscribe((code) => {
          this.selectAddress.code = code;
          console.log(this.selectAddress.code);
        })
      );
      this.subscriptions.add(
        this.contactService.generateCode().subscribe((code) => {
          this.selectContact.code = code;
          console.log(this.selectContact.code);
        })
      );
      this.showTransportCatalogPricing=true;
    } else {
      if (id) {
        this.transportService.findById(id).subscribe((data) => {
          this.selectedTransport = data;
          console.log(this.selectedTransport );


          if (this.selectedTransport.address !=null) {
            this.selectAddress = this.selectedTransport.address;
          }
          if (this.selectedTransport.contact !=null) {
            this.selectContact = this.selectedTransport.contact;
          }
          this.initForm();
          this.showTransportCatalogPricing=true;
        });
      }
    }

    this.displayDialog = true;
    this.initForm();
  }


  initForm() {
    this.transportForm = new FormGroup({
      code: new FormControl(this.selectedTransport.code),
      name: new FormControl(this.selectedTransport.name, Validators.required),
      active: new FormControl(this.selectContact.active),
      intern: new FormControl(this.selectedTransport.interneOrExterne),
      description: new FormControl(this.selectedTransport.description),
      line1: new FormControl(
        this.selectAddress.line1
      ),
      line2: new FormControl(this.selectAddress.line2),
      city: new FormControl(this.selectAddress.ville),
      country: new FormControl(this.selectAddress.pays),
      zip: new FormControl(this.selectAddress.zip),

      nameContact: new FormControl(this.selectContact.name),
      tel1: new FormControl(this.selectContact.tel1),
      email: new FormControl(this.selectContact.email),


    });
  }

  onSubmit(close =false) {
    console.log(this.editMode);

    this.isFormSubmitted = true;
    if (this.transportForm.invalid) {
      return;
    }
    this.spinner.show();

    this.selectedTransport.name = this.transportForm.value["name"];
    this.selectedTransport.description =
      this.transportForm.value["description"];
      this.selectContact.code =  this.selectedTransport.name;
    this.selectContact.name =  this.selectedTransport.name;
    this.selectContact.tel1 = this.transportForm.value["tel1"];
    this.selectContact.email = this.transportForm.value["email"];
    // this.selectAddress.code = this.transportForm.value['code'];
    this.selectAddress.line1 = this.transportForm.value["line1"];
    this.selectAddress.line2 = this.transportForm.value["line2"];
    this.selectAddress.city = this.selectAddress.ville?.code;
    this.selectAddress.country = this.selectAddress.pays?.code;
    this.selectAddress.zip = this.transportForm.value["zip"];
    this.selectAddress.owner = this.authentificationService.getDefaultOwner();
    this.selectedTransport.owner =
      this.authentificationService.getDefaultOwner();

      if(this.selectAddress.line1){
        console.log("address");
        this.selectedTransport.address=this.selectAddress;
        console.log(this.selectAddress);
      }
      if(this.selectContact.name){
        console.log("contact");
        this.selectedTransport.contact=this.selectContact;
        console.log(this.selectContact);
      }
this.saveTransport();

    // this.subscriptions.add(
    //   this.addressService.set(this.selectAddress).subscribe((dataA) => {
    //     this.selectedTransport.address = dataA;
    //     console.log(this.selectedTransport);

    //     this.contactService.set(this.selectContact).subscribe((dataC) => {
    //       this.selectedTransport.contact = dataC;




    //   })  }) ///
    // );
  }

  saveTransport(){
    this.transportService.set(this.selectedTransport).subscribe(
      (data) => {
        this.messageService.add({
          severity: "success",
          summary: "Edition",
          detail: "Elément est Enregistré avec succès",
        });

        //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        this.displayDialog = false;
        this.isFormSubmitted = false;

        this.spinner.hide();

        if (close) {
          this.router.navigate(["/core/settings/transport"]);
        } else {
          this.editMode = 1;
          this.router.navigate(["/core/settings/transport-edit"]);
          this.title = "Ajouter Transport";
        }
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "Erreur",
        });

        //this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  onSelectIntern(event){
console.log(event.checked);

    this.selectedTransport.interneOrExterne=event.checked;
  }

  onSelectActive(event){
    console.log(event.checked);

        this.selectedTransport.active=event.checked;
      }
  onSelectPays(event: any) {
    this.selectAddress.pays = event;
  }
  onSelectVille(event: any) {
    this.selectAddress.ville = event;
  }

  onVilleSearch(event: any) {
    this.villeService
      .find('code~' + event.query)
      .subscribe(data => (this.villeList = data));
  }

  onPaysSearch(event: any) {
    this.paysService
      .find('code~' + event.query)
      .subscribe(data => (this.paysList = data));
  }









  onCatalogTransportPricingEdited(catalogTransportPricings : CatalogTransportPricing[]){
    this.selectedTransport.catalogTransportPricings=catalogTransportPricings;

  }

  onCatalogTransportAccountPricingEdited(catalogTransportAccountPricings : CatalogTransportAccountPricing[]){
    this.selectedTransport.catalogTransportAccountPricings=catalogTransportAccountPricings;

  }
  onCatalogTransportServiceEdited(catalogTransportServices : TransportService[]){
    this.selectedTransport.catalogTransportServices=catalogTransportServices;

  }
  onCatalogTransportAccountServiceEdited(catalogTransportAccountServices : TransportAccountService[]){
    this.selectedTransport.catalogTransportAccountServices=catalogTransportAccountServices;

  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
