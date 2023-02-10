import { Company } from "./../../../../../../shared/models/company";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { PaysService } from "./../../../../../../shared/services/api/pays.service";
import { TrajetService } from "./../../../../../../shared/services/api/trajet.service";
import { VatService } from "./../../../../../../shared/services/api/vat.service";
import { TransportServcie } from "./../../../../../../shared/services/api/transport.service";
import { VehicleTrayService } from "./../../../../../../shared/services/api/vehicle-tray.service";
import { LoadingTypeService } from "./../../../../../../shared/services/api/loading-type.service";
import { TurnTypeService } from "./../../../../../../shared/services/api/turn-type.service";
import { VehicleCategoryService } from "./../../../../../../shared/services/api/vehicle-category.service";
import { AuthenticationService } from "./../../../../../../shared/services/api/authentication.service";
import { AccountPricingService } from "./../../../../../../shared/services/api/account-pricing.service";
import { Pays } from "./../../../../../../shared/models/pays";
import { VehicleTray } from "./../../../../../../shared/models/vehicle-tray";
import { LoadingType } from "./../../../../../../shared/models/loading-type";
import { Vat } from "./../../../../../../shared/models/vat";
import { Trajet } from "./../../../../../../shared/models/trajet";
import { TurnType } from "./../../../../../../shared/models/turn-Type";
import { Transport } from "./../../../../../../shared/models/transport";
import { VehicleCategory } from "./../../../../../../shared/models/vehicle-category";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AccountPricing } from "./../../../../../../shared/models/account-pricing";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-company-pricing-edit",
  templateUrl: "./company-pricing-edit.component.html",
  styleUrls: ["./company-pricing-edit.component.scss"],
})
export class CompanyPricingEditComponent implements OnInit {
  @Input() selectedCompany: Company = new Company();
  @Input() selectAccountPricing = new AccountPricing();
  @Input() accountPricings: AccountPricing[] = [];
  @Output() acountPricingEdited = new EventEmitter<AccountPricing>();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  accountPricingForm: FormGroup;
  vehicleCategorieList: VehicleCategory[] = [];
  turnTypeList: TurnType[] = [];
  trajetList: Trajet[] = [];
  vatList: Vat[] = [];
  vat = new Vat();
  displayDialog: boolean;
  isFormSubmitted = false;
  title = "Modifier  Tarif";
  turnTypeid: number;
  transport: number;
  catVehicleId: number;
  trajetId: number;

  loadingTypeId: number;
  vehicleTrayId: number;
  loadingTypeList: Array<LoadingType> = [];
  vehicleTrayList: Array<VehicleTray> = [];

  constructor(
    private accountPricingService: AccountPricingService,
    private authentificationService: AuthenticationService,
    private vehicleCategoryService: VehicleCategoryService,
    private turnTypeService: TurnTypeService,
    private loadingTypeService: LoadingTypeService,
    private vehicleTrayService: VehicleTrayService,
    private vatService: VatService,
    private trajetService: TrajetService,
    private paysService: PaysService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.load();
    if (this.editMode === 1) {
      this.selectAccountPricing = new AccountPricing();
      this.title = "Ajouter  Tarif";
    } else {
      this.turnTypeid = this.selectAccountPricing?.turnType?.id;
      this.vehicleTrayId = this.selectAccountPricing?.vehicleTray?.id;
      this.catVehicleId = this.selectAccountPricing?.vehicleCategory?.id;
      this.loadingTypeId = this.selectAccountPricing?.loadingType?.id;
      this.trajetId = this.selectAccountPricing?.trajet?.id;
    }
    console.log(this.selectedCompany);

    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.accountPricingForm = new FormGroup({
      fVehicleCategory: new FormControl(
        this.selectAccountPricing?.vehicleCategory,
        Validators.required
      ),
      fVehicleTray: new FormControl(
        this.selectAccountPricing?.vehicleTray,
        Validators.required
      ),
      fLoadingType: new FormControl(
        this.selectAccountPricing?.loadingType,
        Validators.required
      ),
      fTurnType: new FormControl(
        this.selectAccountPricing?.turnType,
        Validators.required
      ),

      fTrajet: new FormControl(
        this.selectAccountPricing?.trajet,
        Validators.required
      ),


      fSaleAmountHt: new FormControl(
        this.selectAccountPricing.saleAmountHt,
        Validators.required
      ),
      fSaleAmountTtc: new FormControl(
        this.selectAccountPricing.saleAmountTtc,
        Validators.required
      ),
      fSaleAmountTva: new FormControl(
        this.selectAccountPricing.saleAmountTva,
        Validators.required
      ),
      fSaleVat: new FormControl(

           this.selectAccountPricing?.saleVat,

        Validators.required
      ),
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.accountPricingForm.invalid) {
      return;
    }
    this.spinner.show();
    this.selectAccountPricing.saleAmountHt =
      this.accountPricingForm.value["fSaleAmountHt"];
    this.selectAccountPricing.saleAmountTtc =
      this.accountPricingForm.value["fSaleAmountTtc"];
    this.selectAccountPricing.saleAmountTva =
      this.accountPricingForm.value["fSaleAmountTva"];
    if (
      this.selectedCompany.id != undefined ||
      this.selectedCompany.id != null
    ) {
      if (this.selectAccountPricing.id) {
        this.saveAccountPricing();
      } else {
        this.existPricing();
      }
    } else {
      this.onLineEdited(this.selectAccountPricing);
    }
    this.spinner.hide();
  }

  existPricing() {
    this.accountPricingService
      .sizeSearch(
        `company.id:${this.selectedCompany.id},loadingType.id:${this.loadingTypeId},turnType.id:${this.turnTypeid},vehicleCategory.id:${this.catVehicleId},vehicleTray.id:${this.vehicleTrayId},trajet.id:${this.trajetId}`
      )
      .subscribe(
        (data) => {
          console.log(data);

          if (data > 0) {
            this.messageService.add({
              severity: "error",
              summary: "Edition",
              detail: "Elément Existe Déja",
            });
            //this.toastr.error('Elément Existe Déja', 'Edition');
          } else {
            this.selectAccountPricing.company = this.selectedCompany;
            this.saveAccountPricing();
          }
          this.spinner.hide();
        },
        (error) => {
          // this.toastr.error(error.error.message, 'Erreur');
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur !",
          });
          this.spinner.hide();
        },

        () => this.spinner.hide()
      );
  }

  saveAccountPricing() {
    this.accountPricingService.set(this.selectAccountPricing).subscribe(
      (data) => {
        this.messageService.add({
          severity: "success",
          summary: "Edition",
          detail: "Elément Enregistré Avec Succès",
        });
        console.log(this.selectAccountPricing);
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
        this.displayDialog = false;
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "Erreur",
        });
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );
  }

  onSelectVehicleCateory(event: any) {
    this.selectAccountPricing.vehicleCategory = event.value;
    this.catVehicleId = this.selectAccountPricing.vehicleCategory.id;
  }
  onSelectTurnType(event: any) {
    this.selectAccountPricing.turnType = event.value;
    this.turnTypeid = this.selectAccountPricing.turnType.id;
    // this.catVehicleId=event.value.code;
  }

  onSelectloadingType(event) {
    this.selectAccountPricing.loadingType = event.value;
    this.loadingTypeId = this.selectAccountPricing.loadingType.id;
  }
  onSelectvehicleTray(event) {
    this.selectAccountPricing.vehicleTray = event.value;
    this.vehicleTrayId = this.selectAccountPricing.vehicleTray.id;
  }

  onTrajetSearch(event: any) {
    this.trajetService
      .find("code~" + event.query)
      .subscribe((data) => (this.trajetList = data));
  }

  onSelectSaleVat(event) {
    this.selectAccountPricing.saleVat = this.vatList.filter(
      (f) => f.value == event.value
    )[0];
    this.onSalePriceChange(1);
  }


  onSelectTrajet(event: any) {
    this.selectAccountPricing.trajet = event;
    this.trajetId = this.selectAccountPricing.trajet.id;
  }



  load() {
    this.vehicleCategoryService.findAll().subscribe((data) => {
      this.vehicleCategorieList = data;
    });
    this.turnTypeService.findAll().subscribe((data) => {
      this.turnTypeList = data;
    });
    this.trajetService.findAll().subscribe((data) => {
      this.trajetList = data;
    });
    this.vatService.findAll().subscribe((data) => {
      this.vatList = data;
    });

    this.loadingTypeService.findAll().subscribe((data) => {
      this.loadingTypeList = data;
    });

    this.vehicleTrayService.findAll().subscribe((data) => {
      this.vehicleTrayList = data;
    });


  }

  onSalePriceChange(n: Number) {
    let PriceHt = +this.accountPricingForm.value["fSaleAmountHt"];
    let PriceTTC = +this.accountPricingForm.value["fSaleAmountTtc"];
    let vat = this.accountPricingForm.value["fSaleVat"].value;
    console.log(PriceHt);
    console.log(vat);
    console.log(PriceTTC);
    if (PriceHt === undefined || PriceHt == null) {
      PriceHt = 0;
    }
    if (PriceTTC === undefined || PriceTTC == null) {
      PriceTTC = 0;
    }
    if (vat === undefined || vat == null) {
      vat = 0;
    }

    if (n === 1) {
      const amountTva = (PriceHt / 100) * vat;
      const priceTTC = PriceHt + amountTva;
      console.log(priceTTC);

      this.accountPricingForm.patchValue({
        fSaleAmountTtc: priceTTC.toFixed(2),
        fSaleAmountTva: amountTva.toFixed(2),
      });
    }
    if (n === 2) {
      PriceHt = PriceTTC / (1 + vat / 100);
      const amountTva = (PriceHt / 100) * vat;
      this.accountPricingForm.patchValue({
        fSaleAmountHt: PriceHt.toFixed(2),
        fSaleAmountTva: amountTva.toFixed(2),
      });
    }
  }

  onLineEdited(accountPricingEdited: AccountPricing) {
    const acountPricing = this.accountPricings.find(
      (f) =>
        f.turnType.id == accountPricingEdited.turnType.id &&
        f.loadingType.id == accountPricingEdited.loadingType.id &&
        f.vehicleCategory.id == accountPricingEdited.vehicleCategory.id &&
        f.vehicleTray.id == accountPricingEdited.vehicleTray.id &&
        f.trajet.id == accountPricingEdited.trajet.id
    );
    if (acountPricing == null) {
      this.acountPricingEdited.emit(this.selectAccountPricing);
      this.displayDialog = false;
    } else {
      if (this.editMode == 1) {
        this.toastr.error("Erreur", "Elément Existe Déja");
        console.log("err");
      }
    }
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }
}
