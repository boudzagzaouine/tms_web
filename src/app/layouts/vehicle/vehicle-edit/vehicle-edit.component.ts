
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
    private transportService: TransportServcie
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
      this.editModee = true;
      this.activatedRoute.params.subscribe(params => {
        id = params['id'];

        this.vehicleService.findById(id).subscribe(data => {
          this.selectedVehicle = data;
          console.log(this.selectedVehicle);

          this.codeTI = this.selectedVehicle.vehicleCategory.insuranceType.code;
          this.idinsurancetype = this.selectedVehicle.vehicleCategory.insuranceType.id;
          console.log(this.idinsurancetype);
          //this.vehicleForm.controls['FIType'].setValue(this.selectedVehicle.vehicleCategory.insuranceType.code);


          // this.onloadTypeTermInsurance(this.idinsurancetype);
          // this.inssuranceTypeTermList.push(this.selectedVehicle.insuranceTermVehicles);
          if (this.selectedVehicle.insurance) {
            this.selectedInsurance = this.selectedVehicle.insurance;
            this.selectedModInsurance = this.selectedVehicle.insurance;


            this.codeTI = this.selectedVehicle.vehicleCategory.insuranceType.code;
            console.log(this.codeTI);



            // solution 1
            // if (this.selectedInsurance.insuranceTermLignes == null) {
            //   this.selectedInsurance.insuranceTermLignes = []; // size = 0
            //   }

            /* // solution 2
             if (this.selectedInsurance.insuranceTermLigneLineList != null) {
               this.myLinesList = this.selectedInsurance.insuranceTermLigneLineList;
             }*/
          }

          this.initForm();
          console.log('data');

          console.log(data);
        },
          err => {
            console.log(err);
            this.toastr.error(err.error.message);
            this.spinner.hide();
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
        this.insuranceTypeList=data;
      }
    );

    this.transportService.findAll().subscribe(
      data => {
      this.transportList=data;
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


  TypeSearch(evt) {
    this.insuranceTypeService.find(`code~${evt.query}`).subscribe(
      data => {
        this.insuranceTypeList = data;
      }
    );
  }
  onLineEdited(line: InsuranceTermsVehicle) {



    this.selectedVehicle.insuranceTermVehicles = this.selectedVehicle.insuranceTermVehicles.filter(
      p => p.insuranceTerm.code !== line.insuranceTerm.code);

    this.selectedVehicle.insuranceTermVehicles.push(line);

    console.log('line edited');

    console.log(this.selectedVehicle.insuranceTermVehicles);
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

      'Fcode': new FormControl(this.selectedVehicle.code, Validators.required),
      'FregistrationNumber': new FormControl(this.selectedVehicle.registrationNumber, Validators.required),
      'FtechnicalVisit': new FormControl(d),
      'FValeurVisiteTechnique': new FormControl(this.selectedVehicle.valueTechnicalVisit),
      'FvehicleCategory': new FormControl(this.selectedVehicle.vehicleCategory, Validators.required),
      'FbadgeType': new FormControl(this.selectedVehicle.badgeType, Validators.required),
      'Finsurance': new FormControl(this.selectedVehicle.insurance),
      'FcontractType': new FormControl(this.selectedVehicle.contractType, Validators.required),
      'Faquisition': new FormControl(ddd, Validators.required),
      'Famountc': new FormControl(this.selectedVehicle.amount, Validators.required),

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

      'FIType': new FormControl(
        {
          value:
            this.selectedVehicle != null
              && this.selectedVehicle.vehicleCategory != null
              && this.selectedVehicle.vehicleCategory.insuranceType != null
              ? this.selectedVehicle.vehicleCategory.insuranceType : null
        }
      ),
      'FIstartDate': new FormControl(new Date(this.selectedInsurance.startDate), Validators.required),
      'FIendDate': new FormControl(new Date(this.selectedInsurance.endDate), Validators.required),
      'FIMontant': new FormControl(this.selectedInsurance.amount, Validators.required),
      'FIsupplier': new FormControl(this.selectedInsurance.supplier, Validators.required),
      'Fvignette': new FormControl(dd),
      'FValeurVignette': new FormControl(this.selectedVehicle.valueVignette),
      'Ftransport': new FormControl(this.selectedVehicle.transport, Validators.required),




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
    this.selectedVehicle.valueTechnicalVisit = formValue['FValeurVisiteTechnique'];
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
    this.selectedVehicle.technicalVisit = formValue['Fvignette'];
    this.selectedVehicle.valueVignette = formValue['FValeurVignette'];
    this.selectedVehicle.aquisitionDate = formValue['Faquisition'];
    this.selectedVehicle.amount = formValue['Famountc'];
    this.selectedInsurance.code = formValue['FIcode'];
    this.selectedInsurance.description = formValue['FIdescription'];
    this.selectedInsurance.startDate = formValue['FIstartDate'];
    this.selectedInsurance.endDate = formValue['FIendDate'];
    this.selectedInsurance.amount = formValue['FIMontant'];
    this.selectedInsurance.vehicleCode = formValue['Fcode'];


    if (this.selectedInsurance.code) {
      this.selectedVehicle.insurance = this.selectedInsurance;
    }
    console.log(this.selectedVehicle);


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
    console.log(this.selectedVehicle.badgeType);
  }
  onSelectVehicleCategory(event: any) {
    //  this.selectedVehicle = new Vehicle();
    console.log(event);
    this.selectedVehicleCategory = event.value;
    this.selectedVehicle.vehicleCategory = event.value;

    this.idinsurancetype = this.selectedVehicle.vehicleCategory.insuranceType.id;
    this.onloadTypeTermInsurance(this.idinsurancetype);


  }

  onloadTypeTermInsurance(idinsurancetype: number) {

    if (this.editModee) {
      this.selectedVehicle.insuranceTermVehicles = [];

    }


    console.log(this.idinsurancetype);

    console.log(this.selectedVehicle.vehicleCategory.insuranceType.code);

    this.insuranceTypeTermsService.findAll().subscribe(
      data => {

        this.inssuranceTypeTermList = data;
        console.log("inssuranceTypeTermList  find all");

        console.log(this.inssuranceTypeTermList);

        this.inssuranceTypeTermList = this.inssuranceTypeTermList.filter(p => p.insuranceType.id === idinsurancetype);
        console.log("inssuranceTypeTermList  filter");

        console.log(this.inssuranceTypeTermList);

        this.inssuranceTypeTermList.forEach(element => {
          console.log(element.insuranceTerm.code);

          this.selectedVehicle.insuranceTermVehicles.push(new InsuranceTermsVehicle(element.insuranceTerm, element.amount));
        });

        console.log("vehicule insurance term ");
        console.log(this.selectedVehicle.insuranceTermVehicles);

        this.codeTI = this.selectedVehicle.vehicleCategory.insuranceType.code;
        this.vehicleForm.controls['FIType'].setValue(this.selectedVehicle.vehicleCategory.insuranceType.code);
        console.log(this.vehicleForm.controls['FIType'].value);


      }


    );
    /*  this.insuranceTypeTermsService.findAll().subscribe(
        data => {

          this.inssuranceTypeTermList=data;


            this.selectedVehicle.insuranceTermVehicule.()

         this.selectedVehicle.insuranceTermVehicule.push(data.filter(p => p.insuranceType.id === idinsurancetype);
          this.vehicleForm.controls['FIType'].setValue(this.selectedVehicle.vehicleCategory.insuranceType.code);

          console.log(idinsurancetype);
          console.log(this.selectedInsuranceType.insuranceTypeTermsSet);


        }
      );*/



  }
  openNext() {
    this.isFormSubmitted = true;
    console.log("insedx");
    console.log(this.index);


    if (this.index == 0) {
      if
        (this.vehicleForm.controls['Fcode'].invalid &&
        this.vehicleForm.controls['FregistrationNumber'].invalid &&
        this.vehicleForm.controls['FbadgeType'].invalid &&
        this.vehicleForm.controls['FvehicleCategory'].invalid) {
        console.log(this.index);

        return;
      }

      else if (this.vehicleForm.controls['Fcode'].valid &&
        this.vehicleForm.controls['FregistrationNumber'].valid &&
        this.vehicleForm.controls['FbadgeType'].valid &&
        this.vehicleForm.controls['FvehicleCategory'].valid) {
        this.index = this.index + 1;



      }

    }
    else if (this.index == 2) {
      if
        (this.vehicleForm.controls['FIcode'].invalid &&
        this.vehicleForm.controls['FIsupplier'].invalid &&
        this.vehicleForm.controls['FIstartDate'].invalid &&
        this.vehicleForm.controls['FIendDate'].invalid &&
        this.vehicleForm.controls['FIMontant'].invalid) {


        return;
      }

      else if (this.vehicleForm.controls['FIcode'].valid &&
        this.vehicleForm.controls['FIsupplier'].valid &&
        this.vehicleForm.controls['FIstartDate'].valid &&
        this.vehicleForm.controls['FIendDate'].valid &&
        this.vehicleForm.controls['FIMontant'].valid) {
        this.index = this.index + 1;



      }
    }

    else if (this.index == 3) {
      if
        (this.vehicleForm.controls['FcontractType'].invalid &&
        this.vehicleForm.controls['Faquisition'].invalid &&
        this.vehicleForm.controls['Famountc'].invalid
      ) {


        return;
      }

      else if (this.vehicleForm.controls['FcontractType'].valid &&
        this.vehicleForm.controls['Faquisition'].valid &&
        this.vehicleForm.controls['Famountc'].valid) {
        this.index = this.index + 1;



      }


    }
    else {
      this.index = this.index + 1;
    }




  }
  openPrev() {
    this.index = this.index - 1;
  }
  onDeleteTermInsurance() {



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
  onSelectTransport(event: any) {
    console.log(event);
    this.selectedVehicle.transport = event.value;
    console.log(this.selectedVehicle.transport);

  }

  onNvclick() {

    this.vehicleForm.controls['FIcode'].setValue(null);
    // this.vehicleForm.controls['FIdescription'].setValue('');
    this.vehicleForm.controls['FIsupplier'].setValue(null);
    //this.vehicleForm.controls['FinsuranceTerm'].setValue(null);
    this.vehicleForm.controls['FIMontant'].setValue(null);
    this.editInsuranceMode = true;
    this.selectedInsurance = new Insurance();

  }



}
