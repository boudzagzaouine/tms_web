import { BrandVehicleTypeService } from './../../../shared/services/api/brand-vehicle-type.service';
import { BrandVehicleType } from './../../../shared/models/brand-vehicle-type';
import { VehicleTrayService } from './../../../shared/services/api/vehicle-tray.service';
import { VehicleTray } from './../../../shared/models/vehicle-tray';
import { VehicleProductReference } from './../../../shared/models/vehicle-product-reference';
import { ProductService } from './../../../shared/services/api/product.service';
import { ProductTypeService } from './../../../shared/services/api/product-type.service';
import { ProductType } from './../../../shared/models/product-type';
import { ConfigMessageComponent } from './../../settings/configMessage/configMessage.component';
import { VehicleProduct } from './../../../shared/models/vehicle-product';
import { DriverService } from './../../../shared/services/api/driver.service';
import { Driver } from './../../../shared/models/driver';
import { Filter } from './../../../shared/models/filter';
import { Subscription } from 'rxjs';
import { ConsumptionType } from './../../../shared/models/consumption-type';

import { TransportServcie } from './../../../shared/services/api/transport.service';

import { InsuranceTermsVehicle } from './../../../shared/models/insurance-terms-vehicle';
import { Transport } from './../../../shared/models/transport';

import { InsuranceTypeTermsService } from './../../../shared/services/api/insurance-type-term.service';
import { InsuranceTypeTerms } from './../../../shared/models/insurance-type-terms';
import { Confirmation, MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { InsuranceTypeService } from './../../../shared/services/api/insurance-type.service';
import { InsuranceType } from './../../../shared/models/insurance-Type';
import { ToastrService } from 'ngx-toastr';
import { InsuranceTermService } from './../../../shared/services/api/insurance-term.service';
import { SupplierService } from './../../../shared/services/api/supplier.service';
import { ContractTypeService } from './../../../shared/services/api/contract-type.service';
import { InsuranceService } from './../../../shared/services/api/insurance.service';
import { Insurance } from './../../../shared/models/insurance';

import { BadgeType } from './../../../shared/models/badge-Type';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { BadgeTypeService } from '../../../shared/services/api/badge-type.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { Vehicle } from './../../../shared/models/vehicle';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContractType, Supplier, InsuranceTerm, MaintenancePlan, Product } from '../../../shared/models';
import { ConsumptionTypeService } from './../../../shared/services/api/consumption-type.service';
import { AuthenticationService, MaintenancePlanService } from './../../../shared/services';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  providers: [MessageService],
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit, OnDestroy {

  page = 0;
  size = 5;
  collectionSize: number;
  selectedVehicle: Vehicle = new Vehicle();
  selectedVehicleCategory = new VehicleCategory();
  selectedInsurance = new Insurance();
  selectedModInsurance = new Insurance();
  selectedInsuranceType = new InsuranceType();
  selectedBadgeType = new BadgeType();
  selectedContractType = new ContractType();
  selectedConsumptionType = new ConsumptionType();
  vehicleForm: FormGroup;
  editModee = false;
  editModeTitle = 'Ajouter un véhicule';
  editInsuranceMode = false;
  badgeTypeList: BadgeType[] = [];
  contractTypeList: ContractType[] = [];
  vehicleCategoryList: VehicleCategory[] = [];
  vehicleBrandTypeList: BrandVehicleType[] = [];
  supplierList: Supplier[] = [];
  insuranceTypeList: InsuranceType[] = [];
  inssuranceTermList: InsuranceTerm[] = [];
  inssuranceTypeTermList: InsuranceTypeTerms[] = [];
  consumptionTypeList: ConsumptionType[] = [];
  selectInusuranceTypeTerm = new InsuranceTypeTerms();
  InsuranceTermVehicle: InsuranceTermsVehicle[] = [];
  maintenancePlanList: MaintenancePlan[] = [];
 driverList: Driver[] = [];
 interneExternes : any[];
 internOrExtern :string;
  transportList: any[] = [];
  idinsurancetype: number;
  index: number = 0;
  subscriptions= new Subscription ();
  isFormSubmitted = false;
  fr: any;
  items: MenuItem[];

  home: MenuItem;
  types: any[];
  vehicleProducts: VehicleProduct[]=[];
  selectedVehicleProduct: VehicleProduct = new VehicleProduct();
  vehicleProduct = new VehicleProduct;

  showDialogVehiclePriduct: boolean;
  editModeVehiclePriduct: boolean;
  productTypeParentList : VehicleProduct[]=[];
  productTypeChildList : VehicleProduct[]=[];
  productList : VehicleProduct;
  productReferenceList : VehicleProductReference[]=[];
 idVehicleProduct:number=0;
 vehicleTrayList :VehicleTray[]=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private maintenancePlanService :MaintenancePlanService,
    private productTypeService: ProductTypeService,
    private productService: ProductService,
    private brandVehicleTypeService :BrandVehicleTypeService,
    private driverService: DriverService,
    private vehicleService: VehicleService,
    private vehicleCategoryService: VehicleCategoryService,
    private badgeTypeService: BadgeTypeService,
    private insuranceService: InsuranceService,
    private insuranceTypeTermsService: InsuranceTypeTermsService,
    private spinner: NgxSpinnerService,
    private contractTypeService: ContractTypeService,
    private supplierService: SupplierService,
    private insuranceTermService: InsuranceTermService,
    private router: Router,
    private toastr: ToastrService,
    private insuranceTypeService: InsuranceTypeService,
    private transportService: TransportServcie,
    private consumptionTypeService: ConsumptionTypeService,
    private authentificationService:AuthenticationService,
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private vehicleTrayService : VehicleTrayService

  ) { }

  ngOnInit() {


    this.items = [
      {label: 'Véhicule'},
      {label: 'Editer' ,routerLink:'/core/vehicles/edit'},

  ];

  this.home = {icon: 'pi pi-home'};

  this.interneExternes=[
    'Interne',
    'Externe',
]

  this.types=[

    {name:'Fixe'},
    {name:'Variable'},
]


// this.subscriptions.add(this.productTypeService.getParents().subscribe(
//   data => {


//  this.productTypeParentList = data;
//  this.productTypeParentList=this.productTypeParentList.filter(f=> f.gmao==true);
//   this.initForm();
// }
// ));
    this.initForm();
    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.editModee = true;
      this.editModeTitle = 'Modifier un véhicule';
      this.subscriptions.add(this.activatedRoute.params.subscribe(params => {
        id = params['id'];
        this.subscriptions.add(this.vehicleService.findById(id).subscribe(data => {
          this.selectedVehicle = data;
          this.selectedVehicle.vehicleProducts=this.selectedVehicle.vehicleProducts?this.selectedVehicle.vehicleProducts:[];
          this.productTypeParentList=this.selectedVehicle.vehicleProducts.filter(
            (thing, i, arr) => arr.findIndex(t => t.productType.productType.id === thing.productType.productType.id) === i
          );
          console.log(        this.productTypeParentList);

          console.log("vehicule");
          console.log(this.selectedVehicle);

          this.subscriptions.add(this.insuranceService.findByPatrimony(id)
            .subscribe(
              dataInsurance => {
                console.log(dataInsurance);
                if (dataInsurance !== null) {

                  this.selectedInsurance = dataInsurance;


                  console.log("insurance");
                  console.log(this.selectedInsurance);

                } else {
                  this.selectedInsurance = new Insurance();
                  this.editModee=false;
                }
                this.initForm();
              },
              err => {
                this.toastr.error(err.error.message,"Erreur");
                //this.toastr.error(err.error.message);
                this.spinner.hide();
              }));


          this.initForm();
        },
          err => {
            this.toastr.error(err.error.message,"Erreur");
         //   this.toastr.error(err.error.message);
            this.spinner.hide();
          }));
      })
      );
    } else {
      this.selectedVehicle.vehicleProducts=this.selectedVehicle.vehicleProducts?this.selectedVehicle.vehicleProducts:[];

    //   this.subscriptions.add(this.vehicleService.generateCode().subscribe(
    //     code => {
    //       console.log("code");

    //       console.log(code);

    //    this.selectedVehicle.code = code;
    //     this.initForm();
    // }
    // ));
    }

    this.subscriptions.add(this.consumptionTypeService.findAll().subscribe(
      data => {
        this.consumptionTypeList = data;
      }
    ));

    this.subscriptions.add(this.insuranceTermService.findAll().subscribe(
      data => {
        this.inssuranceTermList = data;
      }
    ));

    this.subscriptions.add(this.vehicleCategoryService.findAll().subscribe(
      data => {
        this.vehicleCategoryList = data;

      }
    ));

    this.subscriptions.add(this.badgeTypeService.findAll().subscribe(
      data => {
        this.badgeTypeList = data;
      }
    ));

    this.subscriptions.add(this.contractTypeService.findAll().subscribe(
      data => {
        this.contractTypeList = data;
      }
    ));
    this.subscriptions.add(this.supplierService.findAll().subscribe(
      data => {
        this.supplierList = data;
      }
    ));
    this.subscriptions.add(this.insuranceTypeService.findAll().subscribe(
      data => {
        this.insuranceTypeList = data;
      }
    ));

    this.subscriptions.add(this.transportService.findAll().subscribe(
      data => {
        this.transportList = data;
      }
    ));
    this.subscriptions.add(this.vehicleTrayService.findAll().subscribe(
      data => {
        this.vehicleTrayList = data;
      }
    ));
    this.subscriptions.add(this.brandVehicleTypeService.findAll().subscribe(
      data => {
        this.vehicleBrandTypeList = data;
      }
    ));
  }

  onSelectProductTypeParent(item){

console.log(item);

return this.productTypeChildList =this.selectedVehicle.vehicleProducts.filter(f=> f.productType.productType.id==item.productType.productType.id);

  }

  onSelectProductTypeCild(productTypeChild){
    console.log(productTypeChild);


return this.productReferenceList =this.selectedVehicle.vehicleProducts.filter(f=> f.productType.id==productTypeChild.productType.id)[0].vehicleProductReferences;




  }


  onLineEdited(line: InsuranceTermsVehicle) {
    this.selectedInsurance.insuranceTermLignes = this.selectedInsurance.insuranceTermLignes.filter(
      p => p.insuranceTerm.code !== line.insuranceTerm.code);
    this.selectedInsurance.insuranceTermLignes.push(line);
  }
  onDeleteLine(line: InsuranceTermsVehicle) {
    this.selectedInsurance.insuranceTermLignes = this.selectedInsurance.insuranceTermLignes.filter(
      p => p.insuranceTerm.id !== line.insuranceTerm.id);
  }
  initForm() {
    const d = new Date(this.selectedVehicle.technicalVisit);
    const dd = new Date(this.selectedVehicle.vignette);
    const ddd = new Date(this.selectedVehicle.aquisitionDate);
    const dateDriver = new Date(this.selectedVehicle.dateDriver);

    const drelease = this.selectedVehicle.release == null  ?this.selectedVehicle.release :new Date(this.selectedVehicle.release);


     var Diff_temps = new Date().getTime() - (new Date(this.selectedVehicle.release?this.selectedVehicle.release : new Date())).getTime();
     var Diff_jours = Diff_temps / (1000 * 3600 * 24);

    this.vehicleForm = new FormGroup({

      general: new FormGroup({
        'fCode': new FormControl(this.selectedVehicle.code, Validators.required),
        'fRegistrationNumber': new FormControl(this.selectedVehicle.registrationNumber, Validators.required),
        'fVehicleCategory': new FormControl(this.selectedVehicle.vehicleCategory, Validators.required),
        'fVehicleTray': new FormControl(this.selectedVehicle.vehicleTray, Validators.required),
        'fBrandVehicleType': new FormControl(this.selectedVehicle.brandVehicleType, Validators.required),

        'fBadgeType': new FormControl(this.selectedVehicle.badgeType, Validators.required),
        'fTechnicalVisit': new FormControl(d),
        'fValeurVisiteTechnique': new FormControl(this.selectedVehicle.valueTechnicalVisit),
        'fVignette': new FormControl(dd),
        'fValeurVignette': new FormControl(this.selectedVehicle.valueVignette),
        'fMaintenancePlan': new FormControl(this.selectedVehicle.maintenancePlan),
        'fDriver': new FormControl(this.selectedVehicle.driver),
        'fFixeOrVariable': new FormControl(this.selectedVehicle.fixOrVariable),
        'fDateDriver': new FormControl(dateDriver),

      }),
      caracteristic: new FormGroup({
        'fGrayCard': new FormControl(this.selectedVehicle.grayCard),
        'fChassisNumber': new FormControl(this.selectedVehicle.chassisNumber),
        'fNumberCylinder': new FormControl(this.selectedVehicle.numberCylinder),
        'fFiscalPower': new FormControl(this.selectedVehicle.fiscalPower),
        'fBody': new FormControl(this.selectedVehicle.body),
        'fConsumptionType': new FormControl(this.selectedVehicle.consumptionType, Validators.required),
        'fEngineOil': new FormControl(this.selectedVehicle.engineOil),
        'fRearDeck': new FormControl(this.selectedVehicle.rearDeck),
        'fDirection': new FormControl(this.selectedVehicle.direction),
        'fRadiator': new FormControl(this.selectedVehicle.radiator),
        'fAreaFilter': new FormControl(this.selectedVehicle.airFilter),
        'fGearBox': new FormControl(this.selectedVehicle.gearBox),
        'fDesiccantFilter': new FormControl(this.selectedVehicle.desiccantFilter),
        'fInitialmileage': new FormControl(this.selectedVehicle.initialMileage,Validators.required),
        'fCurrentmileage': new FormControl(this.selectedVehicle.currentMileage),
      }),
      insurance: new FormGroup({
        'fInsurance': new FormControl(),
        'fIStartDate': new FormControl(new Date(this.selectedInsurance.startDate)),
        'fIEndDate': new FormControl(new Date(this.selectedInsurance.endDate)),
        'fIMontant': new FormControl(this.selectedInsurance.amount),
        'fISupplier': new FormControl(this.selectedInsurance.supplier),
        'fICode': new FormControl(this.selectedInsurance.code),
        'fIType': new FormControl(this.selectedInsurance.insuranceType),
      }),

      contract: new FormGroup({
        'fContractType': new FormControl(this.selectedVehicle.contractType, Validators.required),
        'fAquisition': new FormControl(ddd, Validators.required),
        'fAmountc': new FormControl(this.selectedVehicle.amount, Validators.required),
        'fTransport': new FormControl(this.selectedVehicle.transport),
        'fRelease': new FormControl(drelease , Validators.required),
        'fAge': new FormControl(Diff_jours.toFixed(0)+'  jours'),
        'fInternOrExterne': new FormControl(this.selectedVehicle.interneOrExterne ),
        'fDurationInMonth': new FormControl(this.selectedVehicle.durationInMonths ),

      }),

    });
  }

  onSubmit(close = false) {

    this.isFormSubmitted = true;
    if (this.vehicleForm.invalid) { this.spinner.hide(); return; }
    this.spinner.show();
    const formValue = this.vehicleForm.value;

    this.selectedVehicle.code = formValue['general']['fCode'];
    this.selectedVehicle.registrationNumber = formValue['general']['fRegistrationNumber'];
    this.selectedVehicle.technicalVisit = formValue['general']['fTechnicalVisit'];
    this.selectedVehicle.valueTechnicalVisit = formValue['general']['fValeurVisiteTechnique'];
    this.selectedVehicle.vignette = formValue['general']['fVignette'];
    this.selectedVehicle.valueVignette = formValue['general']['fValeurVignette'];
    this.selectedVehicle.valueVignette = formValue['general']['fmileage'];
    this.selectedVehicle.dateDriver = formValue['general']['fDateDriver'];

    this.selectedVehicle.grayCard = formValue['caracteristic']['fGrayCard'];
    this.selectedVehicle.chassisNumber = formValue['caracteristic']['fChassisNumber'];
    this.selectedVehicle.numberCylinder = formValue['caracteristic']['fNumberCylinder'];
    this.selectedVehicle.fiscalPower = formValue['caracteristic']['fFiscalPower'];
    this.selectedVehicle.body = formValue['caracteristic']['fBody'];
    this.selectedVehicle.energy = formValue['caracteristic']['fEnergy'];
    this.selectedVehicle.engineOil = formValue['caracteristic']['fEngineOil'];
    this.selectedVehicle.rearDeck = formValue['caracteristic']['fRearDeck'];
    this.selectedVehicle.direction = formValue['caracteristic']['fDirection'];
    this.selectedVehicle.radiator = formValue['caracteristic']['fRadiator'];
    this.selectedVehicle.airFilter = formValue['caracteristic']['fAreaFilter'];
    this.selectedVehicle.gearBox = formValue['caracteristic']['fGearBox'];
     this.selectedVehicle.initialMileage = formValue['caracteristic']['fInitialmileage'];
    this.selectedVehicle.currentMileage = formValue['caracteristic']['fCurrentmileage'];
     this.selectedVehicle.desiccantFilter = formValue['caracteristic']['fDesiccantFilter']
    this.selectedInsurance.code = formValue['insurance']['fICode'];
    this.selectedInsurance.startDate = formValue['insurance']['fIStartDate'];
    this.selectedInsurance.endDate = formValue['insurance']['fIEndDate'];
    this.selectedInsurance.amount = formValue['insurance']['fIMontant'];
    this.selectedInsurance.insuranceType = formValue['insurance']['fIType'];
    this.selectedInsurance.owner=this.authentificationService.getDefaultOwner();
    this.selectedVehicle.aquisitionDate = formValue['contract']['fAquisition'];
    this.selectedVehicle.amount = formValue['contract']['fAmountc'];
    this.selectedVehicle.release = formValue['contract']['fRelease'];


    this.selectedVehicle.durationInMonths = formValue['contract']['fDurationInMonth'];


  this.selectedVehicle.owner=this.authentificationService.getDefaultOwner();



    this.subscriptions.add(this.vehicleService.set(this.selectedVehicle).subscribe(
      data => {
        if (this.selectedInsurance.code) {
          this.selectedInsurance.patrimony = data;
          this.subscriptions.add(this.insuranceService.set(this.selectedInsurance).subscribe(
            data => {
              this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');

            },
            err =>{
              this.toastr.error(err.error.message,"Erreur");
            }
          ));

        }
        console.log("vehicule");

        console.log(this.selectedVehicle);
        console.log("insurance");

        console.log(this.selectedInsurance);
        this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');

       this.isFormSubmitted = false;
        this.spinner.hide();
        this.selectedVehicle = new Vehicle();
        this.vehicleForm.reset();
        if (close) {
          this.router.navigate(['/core/vehicles/list']);
        } else {
          this.editModee = false;
          this.router.navigate(['/core/vehicles/edit']);
        }

      },
      err => {

        this.toastr.error(err.error.message,"Erreur");
        this.spinner.hide();
        return;
      },
      () => {
        this.spinner.hide();
      }
    ));


  }

  onSelectBadgeType(event: any) {
    this.selectedBadgeType = event.value;
    this.selectedVehicle.badgeType = event.value;
  }
  onSelectConsumptionType(event: any) {
    this.selectedConsumptionType = event.value;
    this.selectedVehicle.consumptionType = event.value;
  }
  onSelectVehicleCategory(event: any) {
    this.selectedVehicleCategory = event.value;
    this.selectedVehicle.vehicleCategory = event.value;
  }

  onloadByTypeTermInsurance(idinsurancetype: number) {
    console.log(idinsurancetype);

    if (this.editModee) {
      this.selectedInsurance.insuranceTermLignes = [];
    }
    this.subscriptions.add(this.insuranceTypeTermsService.findAll().subscribe(
      data => {
        this.inssuranceTypeTermList = data;
        this.inssuranceTypeTermList = this.inssuranceTypeTermList.filter(p => p.insuranceType.id === idinsurancetype);
        this.inssuranceTypeTermList.forEach(element => {
          this.selectedInsurance.insuranceTermLignes.push(new InsuranceTermsVehicle(element.insuranceTerm, element.amount));
        });
      }
    ));
  }

  onSelectVehicleTray(event ){
    this.selectedVehicle.vehicleTray = event.value;

  }

  onSelectBrandVehicleType(event){
    this.selectedVehicle.brandVehicleType = event.value;

  }
  onSelectContract(event: any) {
    this.selectedVehicle.contractType = event.value;
  }
  onSelectConsumption(event: any) {
    this.selectedVehicle.consumptionType = event.value;
  }

  onSelectsupplier(event: any) {
    this.selectedInsurance.supplier = event.value;
  }
  onSelectInsuranceType(event: any) {
    this.selectedInsurance.insuranceType = event.value;
    this.idinsurancetype = this.selectedInsurance.insuranceType.id;
    this.selectedInsurance.insuranceTermLignes = [];
    this.onloadByTypeTermInsurance(this.idinsurancetype);
  }
  onSelectinssuranceTerm(event: any) {
    this.selectedInsurance.insuranceTerm = event.value;
  }
  onSelectTransport(event: any) {
    this.selectedVehicle.transport = event.value;

  }


 onselectType(event){
    //  this.selectType=(event.option.name) as string;
    //  console.log(event.option.code);

    this.selectedVehicle.fixOrVariable=event.option.name;
    }
    onselectInterneExterne(event){
console.log(event.option);

      this.selectedVehicle.interneOrExterne=event.option;

    }


  onNvclick() {
    this.vehicleForm.controls['insurance'].get('fICode').setValue(null);
    this.vehicleForm.controls['insurance'].get('fISupplier').setValue(null);
    this.vehicleForm.controls['insurance'].get('fIMontant').setValue(null);
    this.vehicleForm.controls['insurance'].get('fIStartDate').setValue(new Date(this.selectedInsurance.startDate));
    this.vehicleForm.controls['insurance'].get('fIEndDate').setValue(new Date(this.selectedInsurance.endDate));
    this.editInsuranceMode = true;
    this.selectedModInsurance = this.selectedInsurance;
    this.selectedInsurance = new Insurance();

  }

  onSelectMaintenancePlan(event: any) {
    this.selectedVehicle.maintenancePlan = event;


  }
  onSelectDriver(event: any) {
    this.selectedVehicle.driver = event;


  }

  onMaintenancePlanSearch(event: any) {
    this.subscriptions.add( this.maintenancePlanService
      .find('description~' + event.query)
      .subscribe(data => (this.maintenancePlanList = data)));
  }

  onDriverSearch(event: any) {
    this.subscriptions.add( this.driverService
      .find('name~' + event.query)
      .subscribe(data => (this.driverList = data)));
  }


  onShowDialogVehicleProduct(line, mode) {
    console.log("show dialog");
  console.log(mode);
console.log("---");

    this.showDialogVehiclePriduct = true;

    if (mode == true) {
      this.selectedVehicleProduct = line;
      this.editModeVehiclePriduct = true;
    } else {
      this.editModeVehiclePriduct = false;

    }
  }

  onDeleteVehicleProduct(id: number) {
    console.log("delete");

    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Supprimer?',
      accept: () => {
        this.selectedVehicle.vehicleProducts = this.selectedVehicle.vehicleProducts.filter(
          (l) => l.id !== id
        );

        this.productTypeChildList =this.selectedVehicle.vehicleProducts;

        // this.updateTotalPrice();
      },
    });

  }

  onLineEditedVehicleProduct(vehicleProduct: VehicleProduct) {
 this.idVehicleProduct--;
   vehicleProduct.id>0 ? '' :vehicleProduct.id=this.idVehicleProduct;
console.log(vehicleProduct);

    const orderline = this.selectedVehicle.vehicleProducts.find(
      line => line.product.id === vehicleProduct.product.id
    );
    if (orderline == null) {
      this.selectedVehicle.vehicleProducts.push(vehicleProduct);

      console.log( this.selectedVehicle.vehicleProducts.length);

      if(this.selectedVehicle.vehicleProducts.length>1) {
         this.productTypeParentList=this.selectedVehicle.vehicleProducts.filter(
        (thing, i, arr) => arr.findIndex(t => t.productType?.productType?.id === thing.productType?.productType?.id) === i
      );
      console.log(  this.productTypeParentList);

      }else {
         this.productTypeParentList =this.selectedVehicle.vehicleProducts;
         console.log(  this.productTypeParentList);
      }



    }
  }
  onHideDialogVehicleProduct(event) {
    this.showDialogVehiclePriduct = event;
  }



  openNext() {
    this.isFormSubmitted = true;

    if (this.index === 0) {
      if
        (this.vehicleForm.controls['general'].invalid) {
        return;
      } else if (this.vehicleForm.controls['general'].valid) {
        this.index = this.index + 1;
        this.isFormSubmitted = false;
      }

    }else if (this.index === 1) {this.index = this.index + 1;
      this.isFormSubmitted = false;}

    else if (this.index === 2) {
      if
        (this.vehicleForm.controls['caracteristic'].invalid) {
        return;
      } else if (this.vehicleForm.controls['caracteristic'].valid) {
        this.index = this.index + 1;
        this.isFormSubmitted = false;
      }
}
      else if (this.index === 3) {
        this.index = this.index + 1;
        this.isFormSubmitted = false;



     }

  }
  openPrev() {
    this.index = this.index - 1;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
