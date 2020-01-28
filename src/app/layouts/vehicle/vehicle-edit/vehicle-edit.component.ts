import { MenuItem, MessageService } from 'primeng/api';
import { InsuranceTypeService } from './../../../shared/services/api/insurance-type.service';
import { InsuranceType } from './../../../shared/models/insurance-Type';
import { InsuranceTermLigne } from './../../../shared/models/insurance-term-line';
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

  selectedBadgeType = new BadgeType();
  selectedContractType = new ContractType();
  vehicleForm: FormGroup;
  editMode = false;
  badgeTypeList: BadgeType[] = [];
  contractTypeList: ContractType[] = [];
  vehicleCategoryList: VehicleCategory[] = [];
  supplierList: Supplier[] = [];
  insuranceTypeList: InsuranceType[] = [];
  inssuranceTermList: InsuranceTerm[] = [];

  index: number = 0;


  myLinesList: Array<InsuranceTermLigne> = new Array<InsuranceTermLigne>();

  insuranceList: Insurance[] = [];
  isFormSubmitted = false;
  fr: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private vehicleCategoryService: VehicleCategoryService,
    private badgeTypeService: BadgeTypeService,
    private insuranceService: InsuranceService,
    private spinner: NgxSpinnerService,
    private contractTypeService: ContractTypeService,
    private supplierService: SupplierService,
    private insuranceTermService: InsuranceTermService,
    private router: Router,
    private toastr: ToastrService,
    private insuranceTypeService:InsuranceTypeService
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
    this.spinner.show();
    if (id) {
      this.activatedRoute.params.subscribe(params => {
        id = params['id'];

        this.vehicleService.findById(id).subscribe(data => {
          this.selectedVehicle = data;
          this.editMode = true;
          if (this.selectedVehicle.insurance) {
            this.selectedInsurance = this.selectedVehicle.insurance;

            // solution 1
            if (this.selectedInsurance.insuranceTermLignes == null) {
              this.selectedInsurance.insuranceTermLignes = []; // size = 0
            }

            /* // solution 2
             if (this.selectedInsurance.insuranceTermLigneLineList != null) {
               this.myLinesList = this.selectedInsurance.insuranceTermLigneLineList;
             }*/
          }
          this.initForm();
          console.log('data');

          console.log(data);
        });
      }
      );

    } else {
      this.initForm();
    }
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
        console.log('supplier');

        console.log(data);

      }
    );
    this.insuranceTypeService.findAll().subscribe(
      data => {
        this.insuranceTypeList = data;
      }
    );

    /*  this.insuranceService.findAll().subscribe(
       data => {
         this.insuranceList = data;
         if (this.selectedVehicle.insurance != null) {
           this.insuranceList.push(this.selectedVehicle.insurance);
           console.log(this.selectedVehicle.insurance);

         }
       });*/
  }

  openNext() {
    this.index = (this.index === 3) ? 0 : this.index + 1;
}

openPrev() {
    this.index = (this.index === 0) ? 2 : this.index - 1;
}

  onLineEdited(line: InsuranceTermLigne) {

    console.log(line.id);

    this.selectedInsurance.insuranceTermLignes = this.selectedInsurance.insuranceTermLignes.filter(
      p => p.insuranceTerm.id  !== line.insuranceTerm.id );

    this.selectedInsurance.insuranceTermLignes.push(line);

    console.log('line edited');

    console.log(this.selectedInsurance.insuranceTermLignes);
  }

  onDeleteLine(line: InsuranceTermLigne) {

    this.selectedInsurance.insuranceTermLignes = this.selectedInsurance.insuranceTermLignes.filter(
      p => p.insuranceTerm.id  !== line.insuranceTerm.id );


  }

  initForm() {
    console.log(this.selectedVehicle);
    const d = new Date(this.selectedVehicle.technicalVisit);
    const dd = new Date(this.selectedVehicle.vignette);
    this.vehicleForm = new FormGroup({
      'Fcode': new FormControl(this.selectedVehicle.code, Validators.required),
      'FregistrationNumber': new FormControl(this.selectedVehicle.registrationNumber, Validators.required),
      'FtechnicalVisit': new FormControl(d),
      'FValeurVisiteTechnique':new FormControl(this.selectedVehicle.valueTechnicalVisit),
      'FvehicleCategory': new FormControl(this.selectedVehicle.vehicleCategory, Validators.required),
      'FbadgeType': new FormControl(this.selectedVehicle.badgeType, Validators.required),
      'Finsurance': new FormControl(this.selectedVehicle.insurance),
      'FcontractType': new FormControl(this.selectedVehicle.contractType, Validators.required),

      'FgrayCard': new FormControl(this.selectedVehicle.grayCard),
      'FchassisNumber': new FormControl(this.selectedVehicle.chassisNumber),
      'FnumberCylinder': new FormControl(this.selectedVehicle.numberCylinder),
      'FfiscalPower': new FormControl(this.selectedVehicle.fiscalPower),
      'Fbody': new FormControl(this.selectedVehicle.body),
      'Fenergy': new FormControl(this.selectedVehicle.energy),
      'FengineOil': new FormControl(this.selectedVehicle.engineOil),
      'FrearDeck': new FormControl(this.selectedVehicle.rearDeck),
      'Fdirection': new FormControl(this.selectedVehicle.direction),
      'Fradiator': new FormControl(this.selectedVehicle.radiator),
      'FareaFilter': new FormControl(this.selectedVehicle.airFilter),
      'FgearBox': new FormControl(this.selectedVehicle.gearBox),
      'FdesiccantFilter': new FormControl(this.selectedVehicle.desiccantFilter),

      'FIcode': new FormControl(this.selectedInsurance.code, Validators.required),
    //  'FIdescription': new FormControl(this.selectedInsurance.description),
    'FIType': new FormControl(this.selectedInsurance.insuranceType),
      'FIstartDate': new FormControl(new Date(this.selectedInsurance.startDate), Validators.required),
      'FIendDate': new FormControl(new Date(this.selectedInsurance.endDate), Validators.required),
      'FIMontant': new FormControl(this.selectedInsurance.amount, Validators.required),
      'FIsupplier': new FormControl(this.selectedInsurance.supplier, Validators.required),
      'Fvignette':new FormControl(dd),
      'FValeurVignette':new FormControl(this.selectedVehicle.valueVignette)

    });
    this.spinner.hide();
  }

  onSubmit(close = false) {

    console.log('inside submit');


    console.log(this.vehicleForm);

    this.isFormSubmitted = true;
    if (this.vehicleForm.invalid) { this.spinner.hide(); return; }
    this.spinner.show();
    const formValue = this.vehicleForm.value;

    console.log('afer return');
    this.selectedVehicle.code = formValue['Fcode'];
    this.selectedVehicle.registrationNumber = formValue['FregistrationNumber'];
    this.selectedVehicle.technicalVisit = formValue['FtechnicalVisit'];
 this.selectedVehicle.valueTechnicalVisit=formValue['FValeurVisiteTechnique'];
    this.selectedVehicle.grayCard = formValue['FgrayCard'];
    this.selectedVehicle.chassisNumber = formValue['FchassisNumber'];
    this.selectedVehicle.numberCylinder = formValue['FnumberCylinder'];
    this.selectedVehicle.fiscalPower = formValue['FfiscalPower'];
    this.selectedVehicle.body = formValue['Fbody'];
    this.selectedVehicle.energy = formValue['Fenergy'];
    this.selectedVehicle.engineOil = formValue['FengineOil'];
    this.selectedVehicle.rearDeck = formValue['FrearDeck'];
    this.selectedVehicle.direction = formValue['Fdirection'];
    this.selectedVehicle.radiator = formValue['Fradiator'];
    this.selectedVehicle.airFilter = formValue['FareaFilter'];
    this.selectedVehicle.gearBox = formValue['FgearBox'];
    this.selectedVehicle.desiccantFilter = formValue['FdesiccantFilter'];

    this.selectedInsurance.code = formValue['FIcode'];
    this.selectedInsurance.description = formValue['FIdescription'];
    this.selectedInsurance.startDate = formValue['FIstartDate'];
    this.selectedInsurance.endDate = formValue['FIendDate'];
    this.selectedInsurance.amount = formValue['FIMontant'];
    this.selectedInsurance.vehicleCode = formValue['Fcode'];
    this.selectedVehicle.technicalVisit = formValue['Fvignette'];
    this.selectedVehicle.valueVignette = formValue['FValeurVignette'];


    if (this.selectedInsurance.code) {
      this.selectedVehicle.insurance = this.selectedInsurance;
    }
    console.log(this.selectedVehicle);


    this.vehicleService.set(this.selectedVehicle).subscribe(
      data => {
        this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
        this.isFormSubmitted = false;
        this.spinner.hide();
        this.selectedVehicle = new Vehicle();
        this.vehicleForm.reset();
        if (close) {
          this.router.navigate(['/core/vehicles/list']);
        } else {
          this.editMode = false;
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

  }

  onSelectBadgeType(event: any) {
    console.log(event);
    this.selectedBadgeType = event.value;
    this.selectedVehicle.badgeType = event.value;
    console.log(this.selectedVehicle.badgeType);
  }

  onSelectVehicleCategory(event: any) {
    console.log(event);
    this.selectedVehicleCategory = event.value;
    this.selectedVehicle.vehicleCategory = event.value;
    console.log(this.selectedVehicle.vehicleCategory);

   


  }


  onSelectContract(event: any) {
    console.log(event);
    this.selectedVehicle.contractType = event.value;
  }

  onSelectsupplier(event: any) {
    console.log(event);
    this.selectedInsurance.supplier = event.value;
  }
  onSelectInsuranceType(event: any) {
    console.log(event);
    this.selectedInsurance.insuranceType = event.value;
  }
  onSelectinssuranceTerm(event: any) {
    console.log(event);
    this.selectedInsurance.insuranceTerm = event.value;
  }


  onNvclick() {

    this.vehicleForm.controls['FIcode'].setValue('');
    this.vehicleForm.controls['FIdescription'].setValue('');
    this.vehicleForm.controls['FIsupplier'].setValue('');
    this.vehicleForm.controls['FinsuranceTerm'].setValue('');
    this.vehicleForm.controls['FIMontant'].setValue('');

    this.selectedInsurance = new Insurance();


  }



}
