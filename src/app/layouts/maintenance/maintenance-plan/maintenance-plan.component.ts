import { MaintenanceStockService } from './../../../shared/services/api/maintenance-stock.service';
import { ActionMaintenance } from './../../../shared/models/action-maintenance';
import { MaintenanceService } from './../../../shared/services/api/maintenance.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { ActionLine } from './../../../shared/models/action-line';
import { ActionLineService } from './../../../shared/services/api/action-line.service';
import { MaintenanceStateService } from './../../../shared/services/api/maintenance-states.service';
import { MaintenanceState } from './../../../shared/models/maintenance-state';
import { ActionService } from './../../../shared/services/api/action.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoundPipe } from 'ngx-pipes';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginModule } from './../../../login/login.module';
import { MaintenancePlanService } from './../../../shared/services/api/maintenance-plan.service';
import { Action } from './../../../shared/models/action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { PeriodicityTypeService } from './../../../shared/services/api/periodicity-type.service';
import { ServiceProviderService } from './../../../shared/services/api/service-provider.service';
import { OperationTypeService } from './../../../shared/services/api/operation-type.service';
import { ResponsabilityService } from './../../../shared/services/api/responsability.service';
import { ProgramTypeService } from './../../../shared/services/api/program-type.service';
import { MaintenanceTypeService } from './../../../shared/services/api/maintenance-type.service';
import { Subscription } from 'rxjs';
import { PeriodicityType } from './../../../shared/models/periodicity-type';
import { ServiceProvider } from './../../../shared/models/service-provider';
import { OperationType } from './../../../shared/models/operation-type';
import { Responsability } from './../../../shared/models/responsability';
import { ProgramType } from './../../../shared/models/program-type';
import { MaintenanceType } from './../../../shared/models/maintenance-type';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { Patrimony } from './../../../shared/models/patrimony';
import { Maintenance } from './../../../shared/models/maintenance';
import { ActionLineMaintenance } from './../../../shared/models/action-line-maintenance';
import { ActionType } from './../../../shared/models/action-type';
import { ActionTypeService } from './../../../shared/services/api/action-type.service';
import { ConditionalTypeService } from './../../../shared/services/api/conditional-type.service';
import { ConditionalType } from './../../../shared/models/contional-Type';
import { SupplierService } from './../../../shared/services/api/supplier.service';
import { SaleOrderService } from './../../../shared/services/api/sale-order.service';
import { PurchaseOrder, Supplier } from './../../../shared/models';
import { PurchaseOrderService } from './../../../shared/services/api/purchase-order.service';
import { AuthenticationService } from './../../../shared/services';



@Component({
  selector: 'app-maintenance-plan',
  templateUrl: './maintenance-plan.component.html',
  styleUrls: ['./maintenance-plan.component.css'],
  providers: [RoundPipe]


})
export class MaintenancePlanComponent implements OnInit {


  @Input() actionEdited: ActionMaintenance = new ActionMaintenance();
  selectActionLineMaintenance = new ActionLineMaintenance();
  page = 0;
  size = 8;
  searchQuery = '';
  editModeTitle = 'Inserer  maintenance';
  editMode: boolean;
  fr: any;
  showDialog: boolean;
  selectedMaintenance: Maintenance = new Maintenance();
  maintenanceTypeList: Array<MaintenanceType> = [];
  programTypeList: Array<ProgramType> = [];
  conditionalTypeList: Array<ConditionalType> = [];
  MaintenancestateList: Array<MaintenanceState> = [];
  responsabilityList: Array<Responsability> = [];
  serviceProviderList: Array<ServiceProvider> = [];
  periodicityTypeList: Array<PeriodicityType> = [];
  patrimonyList: Array<Patrimony> = [];
  supplierList: Array<Supplier> = [];
  purchaseOrderList :PurchaseOrder[] = [];
    actionTypeList: Array<ActionType> = [];
  patrimonySearch: Patrimony;
  subscrubtion = new Subscription();
  maintenacePlanForm: FormGroup;
  isFormSubmitted = false;
  selectMaintenancetype: MaintenanceType = new MaintenanceType();
  editModee = false;
  periodicityMode: number;
  editMType: number = 2;
  actionLineM = new ActionLineMaintenance;
   maintenancestateMode: number = 1;
   serviceProviderMode : number = 1;
  constructor(
    private maintenanceTypeService: MaintenanceTypeService,
    private conditionalTypeService: ConditionalTypeService,
    private supplierService :SupplierService,
    private purchcaseOrderService : PurchaseOrderService,
    private actionTypeService: ActionTypeService,
    private programTypeService: ProgramTypeService,
    private responsabilityService: ResponsabilityService,
    private maintenanceStockService: MaintenanceStockService,
    private serviceProviderService: ServiceProviderService,
    private patrimonyService: PatrimonyService,
    private confirmationService: ConfirmationService,
    private maintenanceService: MaintenanceService,
    private maintenanceStateService: MaintenanceStateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private roundPipe: RoundPipe,
    private router: Router,
    private authentificationService:AuthenticationService,

  ) { }

  ngOnInit() {
    this.fr = {
      firstDayOfWeek: 1,
      dayNames: [
        'dimanche',
        'lundi',
        'mardi ',
        'mercredi',
        'mercredi ',
        'vendredi ',
        'samedi ',
      ],
      dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre',
      ],
      monthNamesShort: [
        'jan',
        'fév',
        'mar',
        'avr',
        'mai',
        'jun',
        'jui',
        'aoû',
        'sep',
        'oct',
        'nov',
        'dec',
      ],
      today: 'Aujourd hui',
      clear: 'Supprimer',
    };




    this.subscrubtion.add(
      this.maintenanceStateService.findAll().subscribe((data) => {
        this.MaintenancestateList = data;
        this.selectedMaintenance.maintenanceState = data.filter(f => f.id == 3)[0]; 
        this.initForm();  
      }),
    );

    this.subscrubtion.add(
      this.responsabilityService.findAll().subscribe((data) => {
        this.responsabilityList = data;
      })
    );
    this.subscrubtion.add(
      this.conditionalTypeService.findAll().subscribe((data) => {
        this.conditionalTypeList = data;
      })
    );


    this.subscrubtion.add(
      this.serviceProviderService.findAll().subscribe((data) => {
        this.serviceProviderList = data;
        this.selectedMaintenance.serviceProvider=data[0];
      })
    );


    this.subscrubtion.add(
      this.actionTypeService.findAll().subscribe((data) => {
        this.actionTypeList = data;
      })
    );

    

    // this.initForm();
    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.editModee = true;
      this.editModeTitle = 'Modifier Maintenance';
      this.subscrubtion.add(this.activatedRoute.params.subscribe(params => {
        id = params['id'];
        this.subscrubtion.add(this.maintenanceService.findById(id).subscribe(
          data => {
            this.selectedMaintenance = data;
            this.selectMaintenancetype = this.selectedMaintenance.maintenanceType;
            this.initForm();
            this.subscrubtion.add(
              this.programTypeService.findAll().subscribe((data) => {
                this.programTypeList = data.filter(l =>

                  l.id === this.selectedMaintenance.programType.id
                );
              })
            );

            if (this.selectedMaintenance.maintenanceType.id === 1) {
              this.editMType = 1;
            } else if (this.selectedMaintenance.maintenanceType.id === 2) {
              this.editMType = 2;
            }
            if (this.selectedMaintenance.serviceProvider.id===1 ) {
              this.serviceProviderMode = 1;
            } else if (this.selectedMaintenance.serviceProvider.id === 2) {
              this.serviceProviderMode = 2;
            }
        
            if (this.selectedMaintenance.maintenanceState.id===4 ) {
              this.maintenancestateMode = 4;
            } 
            

            this.initForm();
          },
          err => {
            this.toastr.error(err.error.message);
            this.spinner.hide();
          }));
      })
      );
    } else {
      this.subscrubtion.add(
        this.maintenanceTypeService.findAll().subscribe((data) => {
          this.maintenanceTypeList = data.filter(f => f.id === 2);
          this.selectedMaintenance.maintenanceType = this.maintenanceTypeList[0];
          this.selectMaintenancetype = this.maintenanceTypeList[0];
        })
      );

      this.subscrubtion.add(
        this.programTypeService.findAll().subscribe((data) => {
          this.programTypeList = data.filter(l =>

            l.maintenanceType.id === 2 //corrective

          );
         // this.selectedMaintenance.programType = data[0];
        })
      );
      this.maintenanceService.generateCode().subscribe(
        code => {
          this.selectedMaintenance.code = code;
          this.initForm();
        });

    }
    this.initForm();
  }

  initForm() {
    // const dStart = new Date(this.selectedMaintenance.startDate);
    // const dEnd = new Date(this.selectedMaintenance.endDate);
    // const dTriggerDate = new Date(this.selectedMaintenance.triggerDate);
    const dInterventionDate = new Date(this.selectedMaintenance.interventionDate);
   // const dMaintenancenDate = new Date(this.selectedMaintenance.maintenanceDate);
    const dDeclare = new Date(this.selectedMaintenance.declaredDate);

    this.maintenacePlanForm = new FormGroup({
      'price': new FormControl({
        value: this.selectedMaintenance.totalPrice ?
          this.roundPipe.transform(this.selectedMaintenance.totalPrice, 2) : 0, disabled: true
      }),
      'mileage': new FormControl(this.selectedMaintenance.mileage,Validators.required),
      'fDuration': new FormControl(this.selectedMaintenance.duration),
      'fMaintenanceDate': new FormControl(this.selectedMaintenance.maintenanceDate),

      general: new FormGroup({
        'fcode': new FormControl(
          {
            value:
              this.selectedMaintenance != null &&
                this.selectedMaintenance.code != null
                ? this.selectedMaintenance.code
                : null,
            disabled: true
          },
          Validators.required),

        'fmaintenaceType': new FormControl(

          this.editMType === 2
            ? this.selectedMaintenance.maintenanceType
            : this.selectedMaintenance.maintenanceType.code,

          Validators.required),

        'fProgram': new FormControl(

          this.editMType === 2
            ? this.selectedMaintenance.programType
            : this.selectedMaintenance.programType.code,
          //  disabled : true

          Validators.required),


        'fPatrimony': new FormControl(this.selectedMaintenance.patrimony, Validators.required),
        'fState': new FormControl(
          {
            value:
              this.selectedMaintenance != null &&
                this.selectedMaintenance.maintenanceState != null
                ? this.selectedMaintenance.maintenanceState.code
                : null,
            disabled: true
          },Validators.required)
          
         // this.selectedMaintenance.maintenanceState.code, Validators.required),

      }),
      periodicity: new FormGroup({
        'fInterventionDate': new FormControl(dInterventionDate),
        'fTriggerDay': new FormControl(this.selectedMaintenance.triggerDay),
        'fActionType': new FormControl(this.selectedMaintenance.actionType),
        'fConditionalType': new FormControl(this.selectedMaintenance.conditionalType),
        'fvaleurCOnditional': new FormControl(this.selectedMaintenance.valueconditionalType),
        'finterventionKm': new FormControl(this.selectedMaintenance.mileageNext),

      }),

      responsability: new FormGroup({
        'fServiceProvider': new FormControl(this.selectedMaintenance.serviceProvider, Validators.required),
        'fResponsability': new FormControl(this.selectedMaintenance.responsability, Validators.required),
        'fagent': new FormControl(this.selectedMaintenance.agent),
        'fSupplier': new FormControl(this.selectedMaintenance.supplier),
        'order': new FormControl(this.selectedMaintenance.purshaseOrder),


        //'fIntervetionDate': new FormControl(new Date(this.selectedMaintenance.interventionDate)),


      }),
      service: new FormGroup({
        'fService': new FormControl(this.selectedMaintenance.service, Validators.required),
        'femplyer': new FormControl(this.selectedMaintenance.employer, Validators.required),
        'fTriggerDayy': new FormControl(this.selectedMaintenance.triggerDay),
        'fDeclareDate': new FormControl(dDeclare, Validators.required),
        'fObseravtion': new FormControl(this.selectedMaintenance.observation, Validators.required),

      }),

    });

  }


  onPatrimonySearch(event: any) {
    this.patrimonyService.find('code~' + event.query).subscribe((data) => {
      this.patrimonyList = data;
    });
  }

  onSupplierSearch(event: any) {
    this.supplierService.find('code~' + event.query).subscribe((data) => {
      this.supplierList = data;
    });
  }

  onPurchaseOrderCodeSearch(event: any) {
    this.purchcaseOrderService.find('code~' + event.query).subscribe((data) => {
      this.purchaseOrderList = data.filter(data =>  data.orderStatus.id != 1);
    });
  }

  onSelectPurchaseOrder(event){
  this.selectedMaintenance.purshaseOrder=event;
  }
  onSelectSupplier(event){
  this.selectedMaintenance.supplier=event;
  }

  onShowDialogAction(line, mode) {
    this.showDialog = true;


    if (mode == true) {
      this.selectActionLineMaintenance = line;
      this.editMode = true;

    } else {
      this.editMode = false;

    }




  }
  onSubmit(close) {
    
    this.isFormSubmitted = true;
    if (this.maintenacePlanForm.controls['general'].invalid &&
      this.maintenacePlanForm.controls['responsability'].invalid) { return; }

    if (this.selectMaintenancetype.id === 1) {
      if (
        this.maintenacePlanForm.controls['periodicity'].invalid) { return; }

    } else if (this.selectMaintenancetype.id === 2) {
      if (
        this.maintenacePlanForm.controls['service'].invalid) { return; }
    }

   if( this.maintenacePlanForm.controls['mileage'].invalid){ return };

    //this.selectedMaintenance.code = this.maintenacePlanForm.value['general']['fcode'];
    this.selectedMaintenance.mileage = this.maintenacePlanForm.value['mileage'];
    this.selectedMaintenance.maintenanceDate = this.maintenacePlanForm.value['fMaintenanceDate'];
    this.selectedMaintenance.duration = this.maintenacePlanForm.value['fDuration'];

    this.selectedMaintenance.patrimony = this.maintenacePlanForm.value['general']['fPatrimony'];
    //this.selectedMaintenance.maintenanceState = this.maintenacePlanForm.value['general']['fState'];
    this.selectedMaintenance.valueconditionalType = this.maintenacePlanForm.value['general']['fvaleurCOnditional'];
    this.selectedMaintenance.agent = this.maintenacePlanForm.value['responsability']['fagent'];
    


    this.selectedMaintenance.employer = this.maintenacePlanForm.value['service']['femplyer'];
    this.selectedMaintenance.declaredDate = this.maintenacePlanForm.value['service']['fDeclareDate'];
    this.selectedMaintenance.triggerDay = this.maintenacePlanForm.value['service']['fTriggerDayy'];
    this.selectedMaintenance.observation = this.maintenacePlanForm.value['service']['fObseravtion'];
    this.selectedMaintenance.valueconditionalType = this.maintenacePlanForm.value['periodicity']['fvaleurCOnditional'];

    this.selectedMaintenance.owner=this.authentificationService.getDefaultOwner();


    if (this.selectedMaintenance.programType.id == 1) {
      this.selectedMaintenance.interventionDate = this.maintenacePlanForm.value['periodicity']['fInterventionDate'];
      let dt = new Date(this.selectedMaintenance.interventionDate);
      let day = this.selectedMaintenance.triggerDay;
      dt.setDate(dt.getDate() - day);
      this.selectedMaintenance.triggerDate = dt;

    }
    if (close == 2) {
      this.save();
    } else if (close == 1) {
      this.saveClose();
    }


  }

  save() {
    this.maintenanceService.set(this.selectedMaintenance).subscribe(
      dataM => {

        this.maintenanceStockService.insert(dataM);
        this.toastr.success('Elément Maintenance est Enregistré Avec Succès', 'Edition');

        this.isFormSubmitted = false;
        this.spinner.hide();
        this.selectedMaintenance = new Maintenance();
        this.maintenacePlanForm.reset();
        this.router.navigate(['/core/maintenance/treatment']);
        // if (close) {
        //   this.router.navigate(['/core/maintenance/treatment']);
        // } else {
        //   this.editModee = false;
        //   this.router.navigate(['/core/maintenance/plan']);
        // }

      },
      err => {
        this.toastr.error(err.error.message);
        this.spinner.hide();
        return;
      },
      () => {
        this.spinner.hide();
      }
    );
  }
  saveClose() {
    this.maintenanceService.close(this.selectedMaintenance).subscribe(
      dataM => {

        this.maintenanceStockService.insert(dataM);
        this.toastr.success('Elément P est Enregistré Avec Succès', 'Edition');

        this.isFormSubmitted = false;
        this.spinner.hide();
        this.selectedMaintenance = new Maintenance();
        this.maintenacePlanForm.reset();

        this.router.navigate(['/core/maintenance/treatment']);

      },
      err => {
        this.toastr.error(err.error.message);
        this.spinner.hide();
        return;
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  onSelectMaintenanceType(event) {

    if (event.value === undefined) {
      this.selectMaintenancetype = event;
      this.selectedMaintenance.maintenanceType = event;
    }
    else {
      this.selectMaintenancetype = event.value;
      this.selectedMaintenance.maintenanceType = this.selectMaintenancetype;
    }

    // this.subscrubtion.add(
    //   this.programTypeService.findAll().subscribe((data) => {
    //     this.programTypeList = data.filter(l =>

    //       l.maintenanceType.id === this.selectMaintenancetype.id
    //     );
    //   })
    // );
  }

  onSelectProgrameType(event) {
    this.selectedMaintenance.programType = event.value as ProgramType;
  }
  onSelectMaintenanceState(event) {
    this.selectedMaintenance.maintenanceState = event.value as MaintenanceState;
  }

  onSelectConditionalType(event) {
    this.selectedMaintenance.conditionalType = event.value as ConditionalType;
  }

  onSelectPatrimony(event) {
    this.selectedMaintenance.patrimony = event.value as Patrimony;

  }
  onSelectPeriodicity(event) {
    this.periodicityMode = 0;
    if (event.value === undefined) {
      this.selectedMaintenance.periodicityType = event;
    } else {
      this.selectedMaintenance.periodicityType = event.value as PeriodicityType;
    }
    this.periodicityMode = this.selectedMaintenance.periodicityType.id;


  }
  onSelectPServiceProvider(event) {

    this.selectedMaintenance.serviceProvider = event.value as ServiceProvider;
  }
  onSelectResponsability(event) {
    this.selectedMaintenance.responsability = event.value as Responsability;

  }
  onSelectService(event) {
    this.selectedMaintenance.service = event.value as Responsability;

  }
  onHideDialogAction(event) {
    this.showDialog = event;
  }

  onLineEditedAction(line: ActionLineMaintenance) {
    this.selectedMaintenance.actionLineMaintenances = this.selectedMaintenance.actionLineMaintenances.filter(
      (l) => l.product.id !== line.product.id
    );
    this.selectedMaintenance.actionLineMaintenances.push(line);
    this.updateTotalPrice();

  }
  onDeleteMaintenanceLine(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.selectedMaintenance.actionLineMaintenances = this.selectedMaintenance.actionLineMaintenances.filter(
          (l) => l.id !== id
        );
        this.updateTotalPrice();
      },
    });
  }

  updateTotalPrice() {
    this.selectedMaintenance.totalPrice = 0;

    if (this.selectedMaintenance.actionLineMaintenances.length) {
      this.selectedMaintenance.totalPrice =
        this.selectedMaintenance.actionLineMaintenances
          .map(l =>
            l.totalPriceTTC)
          .reduce((acc = 0, curr) => acc + curr, 0);



      this.maintenacePlanForm.patchValue({
        'price': this.selectedMaintenance.totalPrice
      });
    }
  }

}
