import { CompanyService } from './../../../../../../shared/services/api/company.service';
import { Company } from './../../../../../../shared/models/company';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaysService } from './../../../../../../shared/services/api/pays.service';
import { Pays } from './../../../../../../shared/models/pays';
import { TrajetService } from './../../../../../../shared/services/api/trajet.service';
import { VatService } from './../../../../../../shared/services/api/vat.service';
import { VehicleTrayService } from './../../../../../../shared/services/api/vehicle-tray.service';
import { LoadingTypeService } from './../../../../../../shared/services/api/loading-type.service';
import { TurnTypeService } from './../../../../../../shared/services/api/turn-type.service';
import { VehicleCategoryService } from './../../../../../../shared/services/api/vehicle-category.service';
import { AuthenticationService } from './../../../../../../shared/services/api/authentication.service';
import { CatalogTransportAccountPricingService } from './../../../../../../shared/services/api/catalog-transport-account-pricing.service';
import { VehicleTray } from './../../../../../../shared/models/vehicle-tray';
import { LoadingType } from './../../../../../../shared/models/loading-type';
import { Vat } from './../../../../../../shared/models/vat';
import { Trajet } from './../../../../../../shared/models/trajet';
import { TurnType } from './../../../../../../shared/models/turn-Type';
import { VehicleCategory } from './../../../../../../shared/models/vehicle-category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transport } from './../../../../../../shared/models/transport';
import { CatalogTransportAccountPricing } from './../../../../../../shared/models/catalog-transport-account-pricing';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transport-account-pricing-edit',
  templateUrl: './transport-account-pricing-edit.component.html',
  styleUrls: ['./transport-account-pricing-edit.component.scss']
})
export class TransportAccountPricingEditComponent implements OnInit {

  @Input() selectedTransport: Transport = new Transport();
  @Input() selectCatalogTransportAccountPricing = new CatalogTransportAccountPricing();
  @Input() catalogTransportAccountPricings: CatalogTransportAccountPricing[] = [];
  @Output() acountPricingEdited = new EventEmitter<CatalogTransportAccountPricing>();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  catalogTransportAccountPricingForm: FormGroup;
  vehicleCategorieList: VehicleCategory[] = [];
  turnTypeList: TurnType[] = [];
  trajetList: Trajet[] = [];
  companyList: Company[] = [];

  vatList: Vat[] = [];
  vat = new Vat();
  displayDialog: boolean;
  isFormSubmitted = false;
  title = "Modifier  Tarif Spécial";
  turnTypeid: number;
  transport: number;
  catVehicleId: number;
  trajetId: number;
  loadingTypeId: number;
  vehicleTrayId: number;
  companyId:number;
  loadingTypeList: Array<LoadingType> = [];
  vehicleTrayList: Array<VehicleTray> = [];
  constructor(
    private catalogTransportAccountPricingService: CatalogTransportAccountPricingService,
    private authentificationService: AuthenticationService,
    private vehicleCategoryService: VehicleCategoryService,
    private companyService:CompanyService,
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
      this.selectCatalogTransportAccountPricing = new CatalogTransportAccountPricing();
      this.title = "Ajouter  Tarif Spécial";
    } else {
      this.turnTypeid = this.selectCatalogTransportAccountPricing?.turnType?.id;
      this.vehicleTrayId = this.selectCatalogTransportAccountPricing?.vehicleTray?.id;
      this.catVehicleId = this.selectCatalogTransportAccountPricing?.vehicleCategory?.id;
      this.loadingTypeId = this.selectCatalogTransportAccountPricing?.loadingType?.id;
      this.trajetId = this.selectCatalogTransportAccountPricing?.trajet?.id;
      this.companyId=this.selectCatalogTransportAccountPricing?.company?.id;
    }
    console.log(this.selectedTransport);

    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.catalogTransportAccountPricingForm = new FormGroup({
      fCompany: new FormControl(
        this.selectCatalogTransportAccountPricing?.company,
        Validators.required
      ),
      fVehicleCategory: new FormControl(
        this.selectCatalogTransportAccountPricing?.vehicleCategory,
        Validators.required
      ),
      fVehicleTray: new FormControl(
        this.selectCatalogTransportAccountPricing?.vehicleTray,
        Validators.required
      ),
      fLoadingType: new FormControl(
        this.selectCatalogTransportAccountPricing?.loadingType,
        Validators.required
      ),
      fTurnType: new FormControl(
        this.selectCatalogTransportAccountPricing?.turnType,
        Validators.required
      ),


      fTrajet: new FormControl(
        this.selectCatalogTransportAccountPricing?.trajet,
        Validators.required
      ),


      fPurchaseAmountHt: new FormControl(
        this.selectCatalogTransportAccountPricing.purchaseAmountHt,
        Validators.required
      ),
      fPurchaseAmountTtc: new FormControl(
        this.selectCatalogTransportAccountPricing.purchaseAmountTtc,
        Validators.required
      ),
      fPurchaseAmountTva: new FormControl(
        this.selectCatalogTransportAccountPricing.purchaseAmountTva,
        Validators.required
      ),
      fPurchaseVat: new FormControl(
        this.editMode != 1
          ? this.selectCatalogTransportAccountPricing?.purchaseVat?.value
          : this.selectCatalogTransportAccountPricing?.purchaseVat,

        Validators.required
      ),
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.catalogTransportAccountPricingForm.invalid) {
      return;
    }
    this.spinner.show();
    this.selectCatalogTransportAccountPricing.purchaseAmountHt =
      this.catalogTransportAccountPricingForm.value["fPurchaseAmountHt"];
    this.selectCatalogTransportAccountPricing.purchaseAmountTtc =
      this.catalogTransportAccountPricingForm.value["fPurchaseAmountTtc"];
    this.selectCatalogTransportAccountPricing.purchaseAmountTva =
      this.catalogTransportAccountPricingForm.value["fPurchaseAmountTva"];
    if (
      this.selectedTransport.id != undefined ||
      this.selectedTransport.id != null
    ) {
      if (this.selectCatalogTransportAccountPricing.id) {
        this.saveCatalogTransportAccountPricing();
      } else {
        this.existPricing();
      }
    } else {
      this.onLineEdited(this.selectCatalogTransportAccountPricing);
    }
    this.spinner.hide();
  }

  existPricing() {
    this.catalogTransportAccountPricingService
      .sizeSearch(
        `company.id:${this.companyId},
        ,transport.id:${this.selectedTransport.id},loadingType.id:${this.loadingTypeId},turnType.id:${this.turnTypeid},vehicleCategory.id:${this.catVehicleId},vehicleTray.id:${this.vehicleTrayId},trajet.id:${this.trajetId}`
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
            this.selectCatalogTransportAccountPricing.transport = this.selectedTransport;
            this.saveCatalogTransportAccountPricing();
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

  saveCatalogTransportAccountPricing() {
    this.catalogTransportAccountPricingService.set(this.selectCatalogTransportAccountPricing).subscribe(
      (data) => {
        this.messageService.add({
          severity: "success",
          summary: "Edition",
          detail: "Elément Enregistré Avec Succès",
        });
        console.log(this.selectCatalogTransportAccountPricing);
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
    this.selectCatalogTransportAccountPricing.vehicleCategory = event.value;
    this.catVehicleId = this.selectCatalogTransportAccountPricing.vehicleCategory.id;
  }
  onSelectTurnType(event: any) {
    this.selectCatalogTransportAccountPricing.turnType = event.value;
    this.turnTypeid = this.selectCatalogTransportAccountPricing.turnType.id;
    // this.catVehicleId=event.value.code;
  }

  onSelectloadingType(event) {
    this.selectCatalogTransportAccountPricing.loadingType = event.value;
    this.loadingTypeId = this.selectCatalogTransportAccountPricing.loadingType.id;
  }
  onSelectvehicleTray(event) {
    this.selectCatalogTransportAccountPricing.vehicleTray = event.value;
    this.vehicleTrayId = this.selectCatalogTransportAccountPricing.vehicleTray.id;
  }
  onSelectCompany(event) {
    this.selectCatalogTransportAccountPricing.company = event;
    this.companyId = this.selectCatalogTransportAccountPricing.company.id;
  }
  onCompanySearch(event: any) {
    this.companyService
      .find("name~" + event.query)
      .subscribe((data) => (this.companyList = data));
  }

  onTrajetSearch(event: any) {
    this.trajetService
      .find("code~" + event.query)
      .subscribe((data) => (this.trajetList = data));
  }

  onSelectPurchaseVat(event) {
    this.selectCatalogTransportAccountPricing.purchaseVat = this.vatList.filter(
      (f) => f.value == event.value
    )[0];
    this.onPurchasePriceChange(1);
  }


  onSelectTrajet(event: any) {
    this.selectCatalogTransportAccountPricing.trajet = event;
    this.trajetId = this.selectCatalogTransportAccountPricing.trajet.id;
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

  onPurchasePriceChange(n: Number) {
    let PriceHt = +this.catalogTransportAccountPricingForm.value["fPurchaseAmountHt"];
    let PriceTTC = +this.catalogTransportAccountPricingForm.value["fPurchaseAmountTtc"];
    let vat = this.catalogTransportAccountPricingForm.value["fPurchaseVat"];
    console.log(vat);

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
      this.catalogTransportAccountPricingForm.patchValue({
        fPurchaseAmountTtc: priceTTC.toFixed(2),
        fPurchaseAmountTva: amountTva.toFixed(2),
      });
    }
    if (n === 2) {
      PriceHt = PriceTTC / (1 + vat / 100);
      const amountTva = (PriceHt / 100) * vat;
      this.catalogTransportAccountPricingForm.patchValue({
        fPurchaseAmountHt: PriceHt.toFixed(2),
        fPurchaseAmountTva: amountTva.toFixed(2),
      });
    }
  }

  onLineEdited(catalogTransportAccountPricingEdited: CatalogTransportAccountPricing) {
    const acountPricing = this.catalogTransportAccountPricings.find(
      (f) =>
        f.turnType.id == catalogTransportAccountPricingEdited.turnType.id &&
        f.loadingType.id == catalogTransportAccountPricingEdited.loadingType.id &&
        f.vehicleCategory.id == catalogTransportAccountPricingEdited.vehicleCategory.id &&
        f.vehicleTray.id == catalogTransportAccountPricingEdited.vehicleTray.id &&
        f.trajet.id == catalogTransportAccountPricingEdited.trajet.id
    );
    if (acountPricing == null) {
      this.acountPricingEdited.emit(this.selectCatalogTransportAccountPricing);
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
