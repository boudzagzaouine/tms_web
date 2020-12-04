import { TransportServcie } from './../../../shared/services/api/transport.service';
import { InsuranceTypeService } from './../../../shared/services/api/insurance-type.service';
import { ToastrService } from 'ngx-toastr';
import { InsuranceTermService } from './../../../shared/services/api/insurance-term.service';
import { SupplierService } from './../../../shared/services/api/supplier.service';
import { ContractTypeService } from './../../../shared/services/api/contract-type.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsuranceTypeTermsService } from './../../../shared/services/api/insurance-type-term.service';
import { InsuranceService } from './../../../shared/services/api/insurance.service';
import { MachineService } from './../../../shared/services/api/machine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsuranceTermsVehicle } from './../../../shared/models/insurance-terms-vehicle';
import { InsuranceTypeTerms } from './../../../shared/models/insurance-type-terms';
import { InsuranceTerm } from './../../../shared/models/insurance-term';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConsumptionType } from './../../../shared/models/consumption-type';
import { Supplier } from './../../../shared/models/supplier';
import { ContractType } from './../../../shared/models/contract-type';
import { InsuranceType } from './../../../shared/models/insurance-Type';
import { Insurance } from './../../../shared/models/insurance';
import { Machine } from './../../../shared/models/machine';
import { Component, OnInit } from '@angular/core';
import { ConsumptionTypeService } from './../../../shared/services/api/consumption-type.service';
import { AuthenticationService, MaintenancePlanService } from './../../../shared/services';
import { MaintenancePlan } from './../../../shared/models';

@Component({
  selector: 'app-machine-edit',
  templateUrl: './machine-edit.component.html',
  styleUrls: ['./machine-edit.component.css']
})
export class MachineEditComponent implements OnInit {

  page = 0;
  size = 8;
  collectionSize: number;
  selectedMachine: Machine = new Machine();
  selectedInsurance = new Insurance();
  selectedModInsurance = new Insurance();
  selectedInsuranceType = new InsuranceType();
  selectedContractType = new ContractType();
  selectedConsumptionType = new ConsumptionType();
  vehicleForm: FormGroup;
  editModee = false;
  editModeTitle = 'Ajouter une machine';
  editInsuranceMode = false;
  contractTypeList: ContractType[] = [];
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
  subscriptions= new Subscription ();
  isFormSubmitted = false;
  maintenancePlanList: MaintenancePlan[] = [];
  fr: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private machineService: MachineService,
    private insuranceService: InsuranceService,
    private insuranceTypeTermsService: InsuranceTypeTermsService,
    private spinner: NgxSpinnerService,
    private contractTypeService: ContractTypeService,
    private supplierService: SupplierService,
    private insuranceTermService: InsuranceTermService,
    private maintenancePlanService:MaintenancePlanService,
    private router: Router,
    private toastr: ToastrService,
    private insuranceTypeService: InsuranceTypeService,
    private transportService: TransportServcie,
    private consumptionTypeService: ConsumptionTypeService,
    private authentificationService:AuthenticationService,
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
    if (id) {
      this.editModee = true;
      this.editModeTitle = 'Modifier une machine';
      this.subscriptions.add(this.activatedRoute.params.subscribe(params => {
        id = params['id'];
        this.subscriptions.add(this.machineService.findById(id).subscribe(data => {
          this.selectedMachine = data;
          // (`vehicle.type~${'vehicle'},vehicle.code~${this.selectedVehicle.code}`)

          this.subscriptions.add(this.insuranceService.findByPatrimony(id)
            .subscribe(
              data => {
                if (data !== null) {

                  this.selectedInsurance = data;
                } else {
                  this.selectedInsurance = new Insurance();
                  this.editModee=false;
                }
                this.initForm();
              },
              err => {
                this.toastr.error(err.error.message);
                this.spinner.hide();
              }));

          this.initForm();
        },
          err => {
            this.toastr.error(err.error.message);
            this.spinner.hide();
          }));
      })
      );
    } else {
      this.subscriptions.add(this.machineService.generateCode().subscribe(
      code => {
     this.selectedMachine.code = code;
      this.initForm();
    }));
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

    const ddd = new Date(this.selectedMachine.aquisitionDate);

    this.vehicleForm = new FormGroup({
      general: new FormGroup({
        'fCode': new FormControl(this.selectedMachine.code, Validators.required),
        'fRef': new FormControl(this.selectedMachine.ref,Validators.required),
        'fConsumptionType': new FormControl(this.selectedMachine.consumptionType, Validators.required),
        'fMaintenancePlan': new FormControl(this.selectedMachine.maintenancePlan),

      
      }),

      insurance: new FormGroup({
        'fInsurance': new FormControl(),
        'fIStartDate': new FormControl(new Date(this.selectedInsurance.startDate)),
        'fIEndDate': new FormControl(new Date(this.selectedInsurance.endDate)),
        'fIMontant': new FormControl(this.selectedInsurance.amount, ),
        'fISupplier': new FormControl(this.selectedInsurance.supplier, ),
        'fICode': new FormControl(this.selectedInsurance.code, ),
        'fIType': new FormControl(this.selectedInsurance.insuranceType),
      }),

      contract: new FormGroup({
        'fContractType': new FormControl(this.selectedMachine.contractType, Validators.required),
        'fAquisition': new FormControl(ddd, Validators.required),
        'fAmountc': new FormControl(this.selectedMachine.amount, Validators.required),
        'fTransport': new FormControl(this.selectedMachine.transport, Validators.required),
      }),

    });
  }

  onSubmit(close = false) {

    this.isFormSubmitted = true;
    if (this.vehicleForm.invalid) { this.spinner.hide(); return; }
    this.spinner.show();
    const formValue = this.vehicleForm.value;

    this.selectedMachine.code = formValue['general']['fCode'];
    this.selectedMachine.ref = formValue['general']['fRef'];
    this.selectedInsurance.code = formValue['insurance']['fICode'];
    this.selectedInsurance.startDate = formValue['insurance']['fIStartDate'];
    this.selectedInsurance.endDate = formValue['insurance']['fIEndDate'];
    this.selectedInsurance.amount = formValue['insurance']['fIMontant'];
    // this.selectedInsurance.vehicleCode = this.selectedVehicle.code;
    this.selectedInsurance.insuranceType = formValue['insurance']['fIType'];
    this.selectedMachine.aquisitionDate = formValue['contract']['fAquisition'];
    this.selectedMachine.amount = formValue['contract']['fAmountc'];
  this.selectedInsurance.owner=this.authentificationService.getDefaultOwner();
  this.selectedMachine.owner=this.authentificationService.getDefaultOwner();

    // if (this.selectedInsurance.code) {
    // this.selectedVehicle.insurance = this.selectedInsurance;
    // }

    this.subscriptions.add(this.machineService.set(this.selectedMachine).subscribe(
      data => {
        if (this.selectedInsurance.code) {
          this.selectedInsurance.patrimony = data;
          this.subscriptions.add(this.insuranceService.set(this.selectedInsurance).subscribe(
            data => {

            }

          ));

        }
        /* if (this.editInsuranceMode) {
           this.subscriptions.push(this.insuranceService.set(this.selectedModInsurance).subscribe(
             data => {

             }

           ));
         }*/
        this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
        this.isFormSubmitted = false;
        this.spinner.hide();
        this.selectedMachine = new Machine();
        this.vehicleForm.reset();
        if (close) {
          this.router.navigate(['/core/machine/list']);
        } else {
          this.editModee = false;
          this.router.navigate(['/core/machine/edit']);
        }

      },
      err => {
        this.toastr.error(err.error.message);
        this.spinner.hide();
        return;
      },
      () => {
        this.spinner.hide();
      }
    ));


  }


  onSelectConsumptionType(event: any) {
    this.selectedConsumptionType = event.value;
    this.selectedMachine.consumptionType = event.value;
  }


  onloadByTypeTermInsurance(idinsurancetype: number) {
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


  onSelectContract(event: any) {
    this.selectedMachine.contractType = event.value;
  }
  onSelectConsumption(event: any) {
    this.selectedMachine.consumptionType = event.value;
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
    this.selectedMachine.transport = event.value;

  }

  onSelectMaintenancePlan(event: any) {
    this.selectedMachine.maintenancePlan = event;
  
    
   
  }

  onMaintenancePlanSearch(event: any) {
    this.subscriptions.add(this.maintenancePlanService
      .find('code~' + event.query)
      .subscribe(data => (this.maintenancePlanList = data)));
  }



  onNvclick() {
    this.vehicleForm.controls['insurance'].get('fICode').setValue(null);
    this.vehicleForm.controls['insurance'].get('fISupplier').setValue(null);
    this.vehicleForm.controls['insurance'].get('fIMontant').setValue(null);
    this.editInsuranceMode = true;
    this.selectedModInsurance = this.selectedInsurance;
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
        this.isFormSubmitted = false;
      }

    } else if (this.index === 1) {
      if
        (this.vehicleForm.controls['insurance'].invalid) {
        return;
      } else if (this.vehicleForm.controls['insurance']) {
        this.index = this.index + 1;
        this.isFormSubmitted = false;

      }

    }

  }
  openPrev() {
    this.index = this.index - 1;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
