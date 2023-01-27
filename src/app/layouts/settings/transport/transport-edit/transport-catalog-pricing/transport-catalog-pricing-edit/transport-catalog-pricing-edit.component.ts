import { Vat } from './../../../../../../shared/models/vat';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaysService } from './../../../../../../shared/services/api/pays.service';
import { TrajetService } from './../../../../../../shared/services/api/trajet.service';
import { VatService } from './../../../../../../shared/services/api/vat.service';
import { VehicleTrayService } from './../../../../../../shared/services/api/vehicle-tray.service';
import { LoadingTypeService } from './../../../../../../shared/services/api/loading-type.service';
import { TurnTypeService } from './../../../../../../shared/services/api/turn-type.service';
import { VehicleCategoryService } from './../../../../../../shared/services/api/vehicle-category.service';
import { AuthenticationService } from './../../../../../../shared/services/api/authentication.service';
import { CatalogTransportPricingService } from './../../../../../../shared/services/api/catalog-transport-pricing.service';
import { Pays } from './../../../../../../shared/models/pays';
import { VehicleTray } from './../../../../../../shared/models/vehicle-tray';
import { LoadingType } from './../../../../../../shared/models/loading-type';
import { Trajet } from './../../../../../../shared/models/trajet';
import { TurnType } from './../../../../../../shared/models/turn-Type';
import { VehicleCategory } from './../../../../../../shared/models/vehicle-category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogTransportPricing } from './../../../../../../shared/models/CatalogTransportPricing';
import { Transport } from './../../../../../../shared/models/transport';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transport-catalog-pricing-edit',
  templateUrl: './transport-catalog-pricing-edit.component.html',
  styleUrls: ['./transport-catalog-pricing-edit.component.scss']
})
export class TransportCatalogPricingEditComponent implements OnInit {

  @Input() selectedTransport: Transport = new Transport();
  @Input() selectCatalogTransportPricing = new CatalogTransportPricing();
  @Input() catalogTransportPricings: CatalogTransportPricing[] = [];
  @Output() acountPricingEdited = new EventEmitter<CatalogTransportPricing>();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  catalogTransportPricingForm: FormGroup;
  vehicleCategorieList: VehicleCategory[] = [];
  turnTypeList: TurnType[] = [];
  trajetList: Trajet[] = [];
  vatList: Vat[] = [];
  vat = new Vat();
  displayDialog: boolean;
  isFormSubmitted = false;
  title = "Modifier  Tarif Standard";
  turnTypeid: number;
  transport: number;
  catVehicleId: number;
  trajetId: number;
  loadingTypeId: number;
  vehicleTrayId: number;
  loadingTypeList: Array<LoadingType> = [];
  vehicleTrayList: Array<VehicleTray> = [];
  constructor(
    private catalogTransportPricingService: CatalogTransportPricingService,
    private authentificationService: AuthenticationService,
    private vehicleCategoryService: VehicleCategoryService,
    private turnTypeService: TurnTypeService,
    private loadingTypeService: LoadingTypeService,
    private vehicleTrayService: VehicleTrayService,
    private vatService: VatService,
    private trajetService: TrajetService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.load();
    if (this.editMode === 1) {
      this.selectCatalogTransportPricing = new CatalogTransportPricing();
      this.title = "Ajouter  Tarif Standard";
    } else {
      this.turnTypeid = this.selectCatalogTransportPricing?.turnType?.id;
      this.vehicleTrayId = this.selectCatalogTransportPricing?.vehicleTray?.id;
      this.catVehicleId = this.selectCatalogTransportPricing?.vehicleCategory?.id;
      this.loadingTypeId = this.selectCatalogTransportPricing?.loadingType?.id;
      this.trajetId = this.selectCatalogTransportPricing?.trajet?.id;
    }
    console.log(this.selectedTransport);

    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.catalogTransportPricingForm = new FormGroup({
      fVehicleCategory: new FormControl(
        this.selectCatalogTransportPricing?.vehicleCategory,
        Validators.required
      ),
      fVehicleTray: new FormControl(
        this.selectCatalogTransportPricing?.vehicleTray,
        Validators.required
      ),
      fLoadingType: new FormControl(
        this.selectCatalogTransportPricing?.loadingType,
        Validators.required
      ),
      fTurnType: new FormControl(
        this.selectCatalogTransportPricing?.turnType,
        Validators.required
      ),


      fTrajet: new FormControl(
        this.selectCatalogTransportPricing?.trajet,
        Validators.required
      ),


      fPurchaseAmountHt: new FormControl(
        this.selectCatalogTransportPricing.purchaseAmountHt,
        Validators.required
      ),
      fPurchaseAmountTtc: new FormControl(
        this.selectCatalogTransportPricing.purchaseAmountTtc,
        Validators.required
      ),
      fPurchaseAmountTva: new FormControl(
        this.selectCatalogTransportPricing.purchaseAmountTva,
        Validators.required
      ),
      fPurchaseVat: new FormControl(
        this.editMode != 1
          ? this.selectCatalogTransportPricing?.purchaseVat?.value
          : this.selectCatalogTransportPricing?.purchaseVat,

        Validators.required
      ),
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.catalogTransportPricingForm.invalid) {
      return;
    }
    this.spinner.show();
    this.selectCatalogTransportPricing.purchaseAmountHt =
      this.catalogTransportPricingForm.value["fPurchaseAmountHt"];
    this.selectCatalogTransportPricing.purchaseAmountTtc =
      this.catalogTransportPricingForm.value["fPurchaseAmountTtc"];
    this.selectCatalogTransportPricing.purchaseAmountTva =
      this.catalogTransportPricingForm.value["fPurchaseAmountTva"];
    if (
      this.selectedTransport.id != undefined ||
      this.selectedTransport.id != null
    ) {
      if (this.selectCatalogTransportPricing.id) {
        this.saveCatalogTransportPricing();
      } else {
        this.existPricing();
      }
    } else {
      this.onLineEdited(this.selectCatalogTransportPricing);
    }
    this.spinner.hide();
  }

  existPricing() {
    this.catalogTransportPricingService
      .sizeSearch(
        `transport.id:${this.selectedTransport.id},loadingType.id:${this.loadingTypeId},turnType.id:${this.turnTypeid},vehicleCategory.id:${this.catVehicleId},vehicleTray.id:${this.vehicleTrayId},trajet.id:${this.trajetId}`
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
            this.selectCatalogTransportPricing.transport = this.selectedTransport;
            this.saveCatalogTransportPricing();
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

  saveCatalogTransportPricing() {
    this.catalogTransportPricingService.set(this.selectCatalogTransportPricing).subscribe(
      (data) => {
        this.messageService.add({
          severity: "success",
          summary: "Edition",
          detail: "Elément Enregistré Avec Succès",
        });
        console.log(this.selectCatalogTransportPricing);
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
    this.selectCatalogTransportPricing.vehicleCategory = event.value;
    this.catVehicleId = this.selectCatalogTransportPricing.vehicleCategory.id;
  }
  onSelectTurnType(event: any) {
    this.selectCatalogTransportPricing.turnType = event.value;
    this.turnTypeid = this.selectCatalogTransportPricing.turnType.id;
    // this.catVehicleId=event.value.code;
  }

  onSelectloadingType(event) {
    this.selectCatalogTransportPricing.loadingType = event.value;
    this.loadingTypeId = this.selectCatalogTransportPricing.loadingType.id;
  }
  onSelectvehicleTray(event) {
    this.selectCatalogTransportPricing.vehicleTray = event.value;
    this.vehicleTrayId = this.selectCatalogTransportPricing.vehicleTray.id;
  }

  onTrajetSearch(event: any) {
    this.trajetService
      .find("code~" + event.query)
      .subscribe((data) => (this.trajetList = data));
  }

  onSelectPurchaseVat(event) {
    this.selectCatalogTransportPricing.purchaseVat = this.vatList.filter(
      (f) => f.value == event.value
    )[0];
    this.onPurchasePriceChange(1);
  }


  onSelectTrajet(event: any) {
    this.selectCatalogTransportPricing.trajet = event;
    this.trajetId = this.selectCatalogTransportPricing.trajet.id;
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
    let PriceHt = +this.catalogTransportPricingForm.value["fPurchaseAmountHt"];
    let PriceTTC = +this.catalogTransportPricingForm.value["fPurchaseAmountTtc"];
    let vat = this.catalogTransportPricingForm.value["fPurchaseVat"];
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
      this.catalogTransportPricingForm.patchValue({
        fPurchaseAmountTtc: priceTTC.toFixed(2),
        fPurchaseAmountTva: amountTva.toFixed(2),
      });
    }
    if (n === 2) {
      PriceHt = PriceTTC / (1 + vat / 100);
      const amountTva = (PriceHt / 100) * vat;
      this.catalogTransportPricingForm.patchValue({
        fPurchaseAmountHt: PriceHt.toFixed(2),
        fPurchaseAmountTva: amountTva.toFixed(2),
      });
    }
  }

  onLineEdited(catalogTransportPricingEdited: CatalogTransportPricing) {
    const acountPricing = this.catalogTransportPricings.find(
      (f) =>
        f.turnType.id == catalogTransportPricingEdited.turnType.id &&
        f.loadingType.id == catalogTransportPricingEdited.loadingType.id &&
        f.vehicleCategory.id == catalogTransportPricingEdited.vehicleCategory.id &&
        f.vehicleTray.id == catalogTransportPricingEdited.vehicleTray.id &&
        f.trajet.id == catalogTransportPricingEdited.trajet.id
    );
    if (acountPricing == null) {
      this.acountPricingEdited.emit(this.selectCatalogTransportPricing);
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
