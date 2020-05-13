import { ConsumptionType } from './../../../shared/models/consumption-type';

import { TransportServcie } from './../../../shared/services/api/transport.service';

import { InsuranceTermsVehicle } from './../../../shared/models/insurance-terms-vehicle';
import { Transport } from './../../../shared/models/transport';

import { InsuranceTypeTermsService } from './../../../shared/services/api/insurance-type-term.service';
import { InsuranceTypeTerms } from './../../../shared/models/insurance-type-terms';
import { MenuItem, MessageService } from 'primeng/api';
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
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContractType, Supplier, InsuranceTerm } from '../../../shared/models';
import { ConsumptionTypeService } from './../../../shared/services/api/consumption-type.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  providers: [MessageService],
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

  page = 0;
  size = 8;
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
  editInsuranceMode = false;
  badgeTypeList: BadgeType[] = [];
  contractTypeList: ContractType[] = [];
  vehicleCategoryList: VehicleCategory[] = [];
  supplierList: Supplier[] = [];
  insuranceTypeList: InsuranceType[] = [];
  inssuranceTermList: InsuranceTerm[] = [];
  inssuranceTypeTermList: InsuranceTypeTerms[] = [];
  consumptionTypeList: ConsumptionType[] = [];

  selectInusuranceTypeTerm = new InsuranceTypeTerms();
  InsuranceTermVehicle: InsuranceTermsVehicle[] = [];
  transportList: any[] = [];
  idinsurancetype: number;

  index: number = 0;
  codeTI: string;

  // myLinesList: Array<InsuranceTermLigne> = new Array<InsuranceTermLigne>();

  insuranceList: Insurance[] = [];
  isFormSubmitted = false;
  fr: any;
  constructor(
    private activatedRoute: ActivatedRoute,
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
  ) { }

  ngOnInit() {
    this.fr = {
      firstDayOfWeek: 1,
      dayNames: ['dimanche', 'lundi', 'mardi ', 'mercredi', 'mercredi ', 'vendredi ', 'samedi '],
      dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      monthNamesShort: ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jui', 'aoû', 'sep', 'oct', 'nov', 'dec'],
      today: 'Aujourd hui',
      clear: 'Supprimer'
    };
    this.initForm();
    let id = this.activatedRoute.snapshot.params['id'];
    //this.spinner.show();
    if (id) {
      this.editModee = true;
      this.activatedRoute.params.subscribe(params => {
        id = params['id'];

         this.vehicleService.findById(id).subscribe(data => {
           this.selectedVehicle = data;
          console.log(this.selectedVehicle);
            if (this.selectedVehicle.insurance) {
              this.selectedInsurance = this.selectedVehicle.insurance;
        //     // solution 1
        //     // if (this.selectedInsurance.insuranceTermLignes == null) {
        //     //   this.selectedInsurance.insuranceTermLignes = []; // size = 0
        //     //   }

        //     /* // solution 2
        //      if (this.selectedInsurance.insuranceTermLigneLineList != null) {
        //        this.myLinesList = this.selectedInsurance.insuranceTermLigneLineList;
        //      }*/
           }
           this.initForm();
         },
           err => {
             this.toastr.error(err.error.message);
             this.spinner.hide();
           });
      }
      );
    } else {
      this.initForm();
    }

    this.consumptionTypeService.findAll().subscribe(
      data => {
        this.consumptionTypeList = data;
      }
    );

    this.insuranceTermService.findAll().subscribe(
      data => {
        this.inssuranceTermList = data;
      }
    );

    this.vehicleCategoryService.findAll().subscribe(
      data => {
        this.vehicleCategoryList = data;

      }
    );

    this.badgeTypeService.findAll().subscribe(
      data => {
        this.badgeTypeList = data;
      }
    );

    this.contractTypeService.findAll().subscribe(
      data => {
        this.contractTypeList = data;
      }
    );
    this.supplierService.findAll().subscribe(
      data => {
        this.supplierList = data;
      }
    );
    this.insuranceTypeService.findAll().subscribe(
      data => {
        this.insuranceTypeList = data;
      }
    );

    this.transportService.findAll().subscribe(
      data => {
        this.transportList = data;
      }
    );

  }


  // TypeSearch(evt) {
  //   this.insuranceTypeService.find(`code~${evt.query}`).subscribe(
  //     data => {
  //       this.insuranceTypeList = data;
  //     }
  //   );
  //}
  onLineEdited(line: InsuranceTermsVehicle) {
    this.selectedVehicle.insuranceTermVehicles = this.selectedVehicle.insuranceTermVehicles.filter(
      p => p.insuranceTerm.code !== line.insuranceTerm.code);
    this.selectedVehicle.insuranceTermVehicles.push(line);
  }

  onDeleteLine(line: InsuranceTermsVehicle) {
    this.selectedVehicle.insuranceTermVehicles = this.selectedVehicle.insuranceTermVehicles.filter(
      p => p.insuranceTerm.id !== line.insuranceTerm.id);
  }

  initForm() {
    console.log(this.selectedVehicle);
    const d = new Date(this.selectedVehicle.technicalVisit);
    const dd = new Date(this.selectedVehicle.vignette);
    const ddd = new Date(this.selectedVehicle.aquisitionDate);

    this.vehicleForm = new FormGroup({
      general:new FormGroup({
      'fCode': new FormControl(this.selectedVehicle.code, Validators.required),
      'fRegistrationNumber': new FormControl(this.selectedVehicle.registrationNumber, Validators.required),
      'fVehicleCategory': new FormControl(this.selectedVehicle.vehicleCategory, Validators.required),
      'fBadgeType': new FormControl(this.selectedVehicle.badgeType, Validators.required),
      'fTechnicalVisit': new FormControl(d),
      'fValeurVisiteTechnique': new FormControl(this.selectedVehicle.valueTechnicalVisit),
      'fVignette': new FormControl(dd),
      'fValeurVignette': new FormControl(this.selectedVehicle.valueVignette),
       }),
       caracteristic:new FormGroup({
      'fGrayCard': new FormControl(this.selectedVehicle.grayCard),
      'fChassisNumber': new FormControl(this.selectedVehicle.chassisNumber),
      'fNumberCylinder': new FormControl(this.selectedVehicle.numberCylinder),
      'fFiscalPower': new FormControl(this.selectedVehicle.fiscalPower),
      'fBody': new FormControl(this.selectedVehicle.body),
      'fConsumptionType': new FormControl(this.selectedVehicle.energy),
      'fEngineOil': new FormControl(this.selectedVehicle.engineOil),
      'fRearDeck': new FormControl(this.selectedVehicle.rearDeck),
      'fDirection': new FormControl(this.selectedVehicle.direction),
      'fRadiator': new FormControl(this.selectedVehicle.radiator),
      'fAreaFilter': new FormControl(this.selectedVehicle.airFilter),
      'fGearBox': new FormControl(this.selectedVehicle.gearBox),
      'fDesiccantFilter': new FormControl(this.selectedVehicle.desiccantFilter),
     }),
      insurance:new FormGroup({
      'fInsurance': new FormControl(this.selectedVehicle.insurance),
      'fIStartDate': new FormControl(new Date(this.selectedInsurance.startDate), Validators.required),
      'fIEndDate': new FormControl(new Date(this.selectedInsurance.endDate), Validators.required),
      'fIMontant': new FormControl(this.selectedInsurance.amount, Validators.required),
      'fISupplier': new FormControl(this.selectedInsurance.supplier, Validators.required),
 'fICode': new FormControl(this.selectedInsurance.code, Validators.required),
      'fIType': new FormControl(
        {
          value:
            this.selectedVehicle != null
              && this.selectedVehicle.insurance != null
              && this.selectedVehicle.insurance.insuranceType != null
              ? this.selectedVehicle.insurance.insuranceType : null
        }
      ),
      }),

    contract:new FormGroup({
      'fContractType': new FormControl(this.selectedVehicle.contractType, Validators.required),
      'fAquisition': new FormControl(ddd, Validators.required),
      'fAmountc': new FormControl(this.selectedVehicle.amount, Validators.required),
      'fTransport': new FormControl(this.selectedVehicle.transport, Validators.required),
    }),

    });
  }

  onSubmit(close = false) {

    console.log('inside submit');
    console.log(this.vehicleForm);
    this.isFormSubmitted = true;
    if (this.vehicleForm.invalid) { this.spinner.hide(); return; }
    this.spinner.show();
    const formValue = this.vehicleForm.value;


    console.log('afer return');
    this.selectedVehicle.code = formValue['general']['fCode'];
    this.selectedVehicle.registrationNumber = formValue['general']['fRegistrationNumber'];
    this.selectedVehicle.technicalVisit = formValue['general']['fTechnicalVisit'];
    this.selectedVehicle.valueTechnicalVisit = formValue['general']['fValeurVisiteTechnique'];
    this.selectedVehicle.technicalVisit = formValue['general']['fVignette'];
    this.selectedVehicle.valueVignette = formValue['general']['fValeurVignette'];

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
    this.selectedVehicle.desiccantFilter = formValue['caracteristic']['fDesiccantFilter'];

    this.selectedInsurance.code = formValue['insurance']['fICode'];
    this.selectedInsurance.startDate = formValue['insurance']['fIStartDate'];
    this.selectedInsurance.endDate = formValue['insurance']['fIEndDate'];
    this.selectedInsurance.amount = formValue['insurance']['fIMontant'];
    this.selectedInsurance.vehicleCode = formValue['general']['Fcode'];

    this.selectedVehicle.aquisitionDate = formValue['contract']['fAquisition'];
    this.selectedVehicle.amount = formValue['contract']['fAmountc'];


    if (this.selectedInsurance.code) {
      this.selectedVehicle.insurance = this.selectedInsurance;
    }
    this.vehicleService.set(this.selectedVehicle).subscribe(
      data => {
        if (this.editInsuranceMode) {
          this.insuranceService.set(this.selectedModInsurance).subscribe(
            data => {
              console.log(this.selectedModInsurance);
              console.log(this.selectedInsurance);
            }

          );
        }
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
        this.toastr.error(err.error.message);
        console.log(err);

        this.spinner.hide();

        return;
      },
      () => {
        console.log('completed');

      }
    );


    console.log(this.selectedVehicle);
    console.log(this.vehicleForm);

  }

  onSelectBadgeType(event: any) {
    console.log(event);
    this.selectedBadgeType = event.value;
    this.selectedVehicle.badgeType = event.value;
  }
  onSelectConsumptionType(event: any) {
    console.log(event);
    this.selectedConsumptionType = event.value;
    this.selectedVehicle.consumptionType = event.value;
  }
  onSelectVehicleCategory(event: any) {
    //  this.selectedVehicle = new Vehicle();
    console.log(event);
    this.selectedVehicleCategory = event.value;
    this.selectedVehicle.vehicleCategory = event.value;

  }

  onloadTypeTermInsurance(idinsurancetype: number) {

    if (this.editModee) {
      this.selectedVehicle.insuranceTermVehicles = [];
    }

    this.insuranceTypeTermsService.findAll().subscribe(
      data => {

        this.inssuranceTypeTermList = data;
        this.inssuranceTypeTermList = this.inssuranceTypeTermList.filter(p => p.insuranceType.id === idinsurancetype);
        this.inssuranceTypeTermList.forEach(element => {
          this.selectedVehicle.insuranceTermVehicles.push(new InsuranceTermsVehicle(element.insuranceTerm, element.amount));
        });


      }


    );
  }


  onSelectContract(event: any) {
    this.selectedVehicle.contractType = event.value;
  }

  onSelectsupplier(event: any) {
    this.selectedInsurance.supplier = event.value;
  }
  onSelectInsuranceType(event: any) {
    this.selectedInsurance.insuranceType = event.value;
     this.idinsurancetype = this.selectedInsurance.insuranceType.id;
     this.onloadTypeTermInsurance(this.idinsurancetype);
  }
  onSelectinssuranceTerm(event: any) {
    this.selectedInsurance.insuranceTerm = event.value;
  }
  onSelectTransport(event: any) {
    this.selectedVehicle.transport = event.value;

  }

  onNvclick() {
    this.vehicleForm.controls['insurance']['fICode'].setValue(null);
    this.vehicleForm.controls['insurance']['fISupplier'].setValue(null);
    this.vehicleForm.controls['insurance']['fIMontant'].setValue(null);
    this.editInsuranceMode = true;
    this.selectedInsurance = new Insurance();
  }


  openNext() {
    this.isFormSubmitted = true;

    if (this.index === 0) {
      if
        (this.vehicleForm.controls['general'].invalid) {
        return;
      } else if (this.vehicleForm.controls['general'].valid) {
        this.index = this.index + 1;
      }

    }
    if (this.index === 1) {
      if
        (this.vehicleForm.controls['caracteristic'].invalid) {
        return;
      } else if (this.vehicleForm.controls['caracteristic'].valid) {
        this.index = this.index + 1;
      }

    }
    else if (this.index === 2) {
      if
        (this.vehicleForm.controls['insurance'].invalid ) {
        return;
      } else if (this.vehicleForm.controls['insurance']) {
        this.index = this.index + 1;



      }
    } else if (this.index === 3) {
      if
        (this.vehicleForm.controls['caracteristic'].invalid
      ) {


        return;
      } else if (this.vehicleForm.controls['caracteristic'].valid) {
        this.index = this.index + 1;
      }
    } else {
      this.index = this.index + 1;
    }

  }
  openPrev() {
    this.index = this.index - 1;
  }
}
