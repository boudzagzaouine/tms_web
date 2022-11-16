import { AccountPricingService } from './../../../../shared/services/api/account-pricing.service';
import { AccountPricing } from './../../../../shared/models/account-pricing';
import { ActivatedRoute, Route, Router } from "@angular/router";
import { CatalogTransportTypeServcie } from "./../../../../shared/services/api/Catalog-Transport-Type.service";
import { CatalogTransportType } from "./../../../../shared/models/CatalogTransportType";
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

@Component({
  selector: "app-transport-edit",
  templateUrl: "./transport-edit.component.html",
  styleUrls: ["./transport-edit.component.css"],
})
export class TransportEditComponent implements OnInit {
  @Input() selectedtransport :Transport = new Transport();
 editMode: number;
  transportForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier un transport";
  selectAddress = new Address();
  subscriptions = new Subscription();
  catalogueTransports: CatalogTransportType[] = [];
  accountPricings :AccountPricing[]=[];
  showDialogCatalogue: boolean;
  showDialogAccountPricing: boolean;
  editModeAccountPricing: boolean;

  editModeCatalogue: boolean;
  selectCatalogueTransport: CatalogTransportType = new CatalogTransportType();
  selectAccountPricing: AccountPricing = new AccountPricing();

  catalogueTransportId: number = 0;
  constructor(
    private transportService: TransportServcie,
    private catalogTransporTypeService: CatalogTransportTypeServcie,
    private accountPricingService :AccountPricingService,
    private authentificationService: AuthenticationService,
    private addressService: AddressService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["id"];
    if (!id) {
      this.title = "Ajouter un transport";
      this.editMode === 1;
      this.selectedtransport = new Transport();

      this.transportService.generateCode().subscribe((code) => {
        this.selectedtransport.code = code;
        console.log(this.selectedtransport.code);

        this.initForm();
      });

      this.subscriptions.add(
        this.addressService.generateCode().subscribe((code) => {
          this.selectAddress.code = code;
          console.log(this.selectAddress.code);
        })
      );
    } else {
      if (id) {
        this.transportService.findById(id).subscribe((data) => {
          this.selectedtransport = data;
          console.log(this.selectedtransport );


          if (this.selectedtransport.address !=null) {
            this.selectAddress = this.selectedtransport.address;
          }
          this.initForm();
          this.loadCatalogByTransport();
          this.loadAccountPricingByTransport();
        });
      }
    }

    this.displayDialog = true;
    this.initForm();
  }

  loadCatalogByTransport() {
    this.catalogTransporTypeService
      .find("transport.id:" + this.selectedtransport.id)
      .subscribe((data) => {
        this.catalogueTransports = data;
      });
  }
  loadAccountPricingByTransport() {
    this.accountPricingService
      .find("transport.id:" + this.selectedtransport.id)
      .subscribe((data) => {
        this.accountPricings = data;
      });
  }
  initForm() {
    this.transportForm = new FormGroup({
      code: new FormControl(this.selectedtransport.code),
      name: new FormControl(this.selectedtransport.name, Validators.required),
      description: new FormControl(this.selectedtransport.description),
      line1: new FormControl(
        this.selectAddress.line1,

        Validators.required
      ),
      line2: new FormControl(this.selectAddress.line2),
      city: new FormControl(this.selectAddress.city),
      country: new FormControl(this.selectAddress.country),
      zip: new FormControl(this.selectAddress.zip),
    });
  }

  onSubmit(close =false) {
    console.log(this.editMode);

    this.isFormSubmitted = true;
    if (this.transportForm.invalid) {
      return;
    }
    this.spinner.show();
    this.selectedtransport.interneOrExterne = false;
    this.selectedtransport.name = this.transportForm.value["name"];
    this.selectedtransport.description =
      this.transportForm.value["description"];
    this.selectedtransport.active = true;

    // this.selectAddress.code = this.transportForm.value['code'];
    this.selectAddress.line1 = this.transportForm.value["line1"];
    this.selectAddress.line2 = this.transportForm.value["line2"];
    this.selectAddress.city = this.transportForm.value["city"];
    this.selectAddress.country = this.transportForm.value["country"];
    this.selectAddress.zip = this.transportForm.value["zip"];
    this.selectAddress.owner = this.authentificationService.getDefaultOwner();
    this.selectedtransport.owner =
      this.authentificationService.getDefaultOwner();

    this.subscriptions.add(
      this.addressService.set(this.selectAddress).subscribe((dataA) => {
        this.selectedtransport.address = dataA;
        console.log(this.selectedtransport);

        this.transportService.set(this.selectedtransport).subscribe(
          (data) => {
            this.messageService.add({
              severity: "success",
              summary: "Edition",
              detail: "Elément est Enregistré avec succès",
            });
            if (this.editMode == 1) {
              console.log("avant");
              if (
                this.catalogueTransports != null &&
                this.catalogueTransports.length > 0
              ) {
                this.catalogueTransports.forEach((element) => {
                  element.transport = data;
                  console.log("elemetn");
                });

                console.log("appres");

                this.saveAllCatalog();
                console.log("appres2");
              }
            }
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
      })
    );
  }

  saveAllCatalog() {
    this.catalogTransporTypeService
      .saveAll(this.catalogueTransports)
      .subscribe((data) => {
        this.toastr.success("Elément est Enregistré avec succès", "Edition");
      });
  }
  onLineCatalogueEdited(catalogue: CatalogTransportType) {
    if (catalogue != null && catalogue.id > 0) {
      console.log("modifier Transport ");

      this.loadCatalogByTransport();
    } else {
      console.log("Nouve Transport ");

      const orderline = this.catalogueTransports.find(
        (line) =>
          line.turnType.id === catalogue.turnType.id &&
          line.vehicleCategory.id === catalogue.vehicleCategory.id &&
          line.villeSource.id === catalogue.villeSource.id &&
          line.villeDestination.id === catalogue.villeDestination.id
      );
      if (orderline == null) {
        this.catalogueTransports.push(catalogue);
      } else {
        this.messageService.add({
          severity: "info",
          summary: "info ",
          detail: "Deja Existe",
        });
      }
    }
  }

  onDeleteCatalogue(id: number) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Suprimer?",
      accept: () => {
        if (id > 0) {
          this.catalogTransporTypeService.delete(id).subscribe((data) => {
            this.loadCatalogByTransport();
          });
        } else {
          this.catalogueTransports = this.catalogueTransports.filter(
            (l) => l.id !== id
          );
        }
        // this.updateTotalPrice();
      },
    });
  }



  onShowDialogCatalogue(line, mode) {
    this.showDialogCatalogue = true;

    if (mode == true) {
      console.log("modifier");

      this.selectCatalogueTransport = line;
      this.selectCatalogueTransport.transport = this.selectedtransport
        ? this.selectedtransport
        : new Transport();
      console.log(this.selectCatalogueTransport);

      this.editModeCatalogue = true;
    } else {
      console.log("ajouter");

      this.selectCatalogueTransport = new CatalogTransportType();
      this.selectCatalogueTransport.transport = this.selectedtransport
        ? this.selectedtransport
        : new Transport();
      console.log(this.selectCatalogueTransport);

      this.editModeCatalogue = false;
    }
  }
  onShowDialogAccountPricingByCatalogue(catalogue){
    this.showDialogAccountPricing = true;

    this.selectAccountPricing = new AccountPricing();
    this.selectAccountPricing.transport = this.selectedtransport
      ? this.selectedtransport
      : new Transport();
      this.selectAccountPricing.catalogTransportType = catalogue;

    console.log(this.selectAccountPricing);

    this.editModeAccountPricing = false;
  }
  onShowDialogAccountPricing(line, mode){
    this.showDialogAccountPricing = true;

    if (mode == true) {
      console.log("modifier");

      this.selectAccountPricing = line;
      console.log(this.selectedtransport);

      this.selectAccountPricing.transport = this.selectedtransport
        ? this.selectedtransport
        : new Transport();
      console.log(this.selectAccountPricing);

      this.editModeAccountPricing = true;
    } else {
      console.log("ajouter");

      this.selectAccountPricing = new AccountPricing();
      this.selectAccountPricing.transport = this.selectedtransport
        ? this.selectedtransport
        : new Transport();
      console.log(this.selectAccountPricing);

      this.editModeAccountPricing = false;
    }
  }

  onLineAccountPricingEdited(accountPricing: AccountPricing) {
    if (accountPricing != null && accountPricing.id > 0) {
      console.log("modifier Transport ");

      this.loadAccountPricingByTransport();
    } else {
      console.log("Nouve Transport ");

      const orderline = this.accountPricings.find(
        (line) =>
          line.catalogTransportType.turnType.id === accountPricing.catalogTransportType.turnType.id &&
          line.catalogTransportType.vehicleCategory.id === accountPricing.catalogTransportType.vehicleCategory.id &&
          line.catalogTransportType.villeSource.id === accountPricing.catalogTransportType.villeSource.id &&
          line.catalogTransportType.villeDestination.id === accountPricing.catalogTransportType.villeDestination.id &&
          line.account.id === accountPricing.account.id
      );
      if (orderline == null) {
        this.accountPricings.push(accountPricing);
      } else {
        this.messageService.add({
          severity: "info",
          summary: "info ",
          detail: "Deja Existe",
        });
      }
    }
  }

  onDeleteAccountPricing(id: number) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Suprimer?",
      accept: () => {
        if (id > 0) {
          this.accountPricingService.delete(id).subscribe((data) => {
            this.loadAccountPricingByTransport();
          });
        } else {
          this.accountPricings = this.accountPricings.filter(
            (l) => l.id !== id
          );
        }
        // this.updateTotalPrice();
      },
    });
  }
  onHideDialogAccountPricing(event) {
    this.showDialogAccountPricing = event;
  }

  onHideDialogCAtalogue(event) {
    this.showDialogCatalogue = event;
  }



  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
