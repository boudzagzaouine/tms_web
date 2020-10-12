import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActionPlan } from './../../../../shared/models/action-plan';
import { ActionLine } from './../../../../shared/models/action-line';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoundPipe } from 'ngx-pipes';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceTypeService, MaintenancePlanService, MaintenanceStateService } from './../../../../shared/services';
import { ProgramTypeService } from './../../../../shared/services/api/program-type.service';
import { ResponsabilityService } from './../../../../shared/services/api/responsability.service';
import { OperationTypeService } from './../../../../shared/services/api/operation-type.service';
import { ActionLineService } from './../../../../shared/services/api/action-line.service';
import { ActionService } from './../../../../shared/services/api/action.service';
import { ServiceProviderService } from './../../../../shared/services/api/service-provider.service';
import { PeriodicityTypeService } from './../../../../shared/services/api/periodicity-type.service';
import { PatrimonyService } from './../../../../shared/services/api/patrimony-service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MonthService } from './../../../../shared/services/api/month.service';
import { DayService } from './../../../../shared/services/api/day.service';
import { Subscription } from 'rxjs';
import { Day } from './../../../../shared/models/day';
import { Month } from './../../../../shared/models/month';
import { MaintenanceState, MaintenanceType } from './../../../../shared/models';
import { Responsability } from './../../../../shared/models/responsability';
import { ServiceProvider } from './../../../../shared/models/service-provider';
import { PeriodicityType } from './../../../../shared/models/periodicity-type';
import { ActionPlanService } from './../../../../shared/services/api/action-plan.service';
import { ProgramType } from './../../../../shared/models/program-type';
import { ActionTypeService } from './../../../../shared/services/api/action-type.service';

@Component({
  selector: 'app-plan-action-edit',
  templateUrl: './plan-action-edit.component.html',
  styles: [`
  .ui-steps .ui-steps-item {
      width: 25%;
  }
  
  .ui-steps.steps-custom {
      margin-bottom: 30px;
  }
  
  .ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
      padding: 0 1em;
      overflow: visible;
  }
  
  .ui-steps.steps-custom .ui-steps-item .ui-steps-number {
      background-color: #0081c2;
      color: #FFFFFF;
      display: inline-block;
      width: 36px;
      border-radius: 50%;
      margin-top: -14px;
      margin-bottom: 10px;
  }
  
  .ui-steps.steps-custom .ui-steps-item .ui-steps-title {
      color: #555555;
  }
`],
  encapsulation: ViewEncapsulation.None,
  providers: [RoundPipe]
})
export class PlanActionEditComponent implements OnInit {
 
  @Input() selectedActionPlan = new ActionPlan();
  @Input() editMode = false;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() lineActionPlanEdited = new EventEmitter<ActionPlan>();

  actionPlanForm: FormGroup;
  subscrubtion = new Subscription();
  days: Array<Day> = [];
  monthList: Array<Month> = [];
  MaintenancestateList: Array<MaintenanceState> = [];
  responsabilityList: Array<Responsability> = [];
  serviceProviderList: Array<ServiceProvider> = [];
  periodicityTypeList: Array<PeriodicityType> = [];
  maintenanceTypeList: Array<MaintenanceType> = [];
  programTypeList: Array<ProgramType> = [];
  actionTypeList: Array<ProgramType> = [];
  isFormSubmitted = false;
  displayDialog: boolean;
  items: MenuItem[];
  selectMaintenancetype: MaintenanceType = new MaintenanceType();
  selectProgrameType: ProgramType = new ProgramType();
  periodicityMode: number;
  title = 'Modifier une action';

  activeIndex: number = 0;

  constructor(private maintenanceTypeService: MaintenanceTypeService,
    private programTypeService: ProgramTypeService,
    private responsabilityService: ResponsabilityService,
    private actionTpeService: ActionTypeService,
    private operationTypeService: OperationTypeService,
    private actionLineService: ActionLineService,
    private actionService: ActionService,
    private serviceProviderService: ServiceProviderService,
    private periodicityTypeService: PeriodicityTypeService,
    private patrimonyService: PatrimonyService,
    private confirmationService: ConfirmationService,
    private actionPlanService: ActionPlanService,
    private maintenanceStateService: MaintenanceStateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private monthService: MonthService,
    private dayService: DayService,

    private activatedRoute: ActivatedRoute,
    private roundPipe: RoundPipe,
    private router: Router,) { }

  ngOnInit() {

    this.items = [{
      label: 'Action',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Périodicité',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    },
    {
      label: 'Responsable',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    },
   
    ];


    this.title = 'Ajouter une action';
    this.displayDialog = true;

    console.log(this.editMode);
 if(!this.editMode){
     this.selectedActionPlan = new ActionPlan();
   }else{
         this.selectProgrameType=this.selectedActionPlan.programType;
         this.periodicityMode = this.selectedActionPlan.periodicityType.id;

   }

    this.subscrubtion.add(
      this.dayService.findAll().subscribe((data) => {
        this.days = data;
      })
    );

    this.subscrubtion.add(
      this.monthService.findAll().subscribe((data) => {
        this.monthList = data;
      })
    );

    this.subscrubtion.add(
      this.periodicityTypeService.findAll().subscribe((data) => {
        this.periodicityTypeList = data;
      })
    );

    this.subscrubtion.add(
      this.responsabilityService.findAll().subscribe((data) => {
        this.responsabilityList = data;
      })
    );

    this.subscrubtion.add(
      this.maintenanceTypeService.findAll().subscribe((data) => {
        this.maintenanceTypeList = data.filter(f => f.id === 1);
      this.selectedActionPlan.maintenanceType=this.maintenanceTypeList[0];
      this.initForm();

      }),
    );

    this.subscrubtion.add(
      this.serviceProviderService.findAll().subscribe((data) => {
        this.serviceProviderList = data;
      })
    );

    this.subscrubtion.add(
      this.maintenanceStateService.findAll().subscribe((data) => {
        this.MaintenancestateList = data;
      })
    );
    this.subscrubtion.add(
      this.programTypeService.findAll().subscribe((data) => {
        this.programTypeList = data.filter(l =>
          l.maintenanceType.id === 1 //preventive
        );
      })
    );


    this.initForm();





  }


  initForm() {
    const dStart = new Date(this.selectedActionPlan.startDate);
    const dEnd = new Date(this.selectedActionPlan.endDate);
    const dTriggerDate = new Date(this.selectedActionPlan.triggerDate);
    const dInterventionDate = new Date(this.selectedActionPlan.interventionDate);
    const dDeclare = new Date(this.selectedActionPlan.declaredDate);

    this.actionPlanForm = new FormGroup({

      general: new FormGroup({
      
        'fmaintenaceType': new FormControl(this.selectedActionPlan.maintenanceType),
        'fProgram': new FormControl(this.selectedActionPlan.programType, Validators.required),
        'FcodeType': new FormControl(this.selectedActionPlan.actionType, Validators.required),
      }),
      periodicity: new FormGroup({
        'fDateStart': new FormControl(dStart, Validators.required),
        'fDateEnd': new FormControl(dEnd, Validators.required),
        'fPeriodicity': new FormControl(this.selectedActionPlan.periodicityType, Validators.required),
        'fInterventionDate': new FormControl(dInterventionDate, Validators.required),
        'fTriggerDay': new FormControl(this.selectedActionPlan.triggerDay, Validators.required),
        'fhebdomadaire': new FormControl(this.selectedActionPlan.days),
        'fmensuel': new FormControl(this.selectedActionPlan.months),
        'fdayOfMonth': new FormControl(this.selectedActionPlan.dayOfMonth),

      }),

      responsability: new FormGroup({
        'fServiceProvider': new FormControl(this.selectedActionPlan.serviceProvider, Validators.required),
        'fResponsability': new FormControl(this.selectedActionPlan.responsability, Validators.required),
        'fagent': new FormControl(this.selectedActionPlan.agent),

      }),



    });

  }


  onSubmit(close = false) {
    console.log(this.actionPlanForm);
    this.isFormSubmitted = true;
    if (this.actionPlanForm.controls['general'].invalid &&
      this.actionPlanForm.controls['responsability'].invalid,
      this.actionPlanForm.controls['periodicity'].invalid) { return; }

         


    this.selectedActionPlan.agent = this.actionPlanForm.value['responsability']['fagent'];
    this.selectedActionPlan.interventionDate = this.actionPlanForm.value['periodicity']['fInterventionDate'];
    this.selectedActionPlan.startDate = new Date(this.actionPlanForm.value['periodicity']['fDateStart']);
    this.selectedActionPlan.endDate = this.actionPlanForm.value['periodicity']['fDateEnd'];
    this.selectedActionPlan.triggerDay = this.actionPlanForm.value['periodicity']['fTriggerDay'];
    this.selectedActionPlan.days = this.actionPlanForm.value['periodicity']['fhebdomadaire'];
    this.selectedActionPlan.dayOfMonth = this.actionPlanForm.value['periodicity']['fdayOfMonth'];
    this.selectedActionPlan.months = this.actionPlanForm.value['periodicity']['fmensuel'];

    console.log(this.selectedActionPlan);

    this.selectedActionPlan.months = this.selectedActionPlan.months.sort();

    console.log(this.selectedActionPlan.months);

    //this.selectedMaintenancePlans.push(this.selectedMaintenancePreventive);

    this.lineActionPlanEdited.emit(this.selectedActionPlan);

    this.displayDialog = false;
  }

  onActionCodeSearch(event) {
    this.actionTpeService.find(`code~${event.query}`).subscribe((data) => {
      this.actionTypeList = data;
    });
  }

 
  onSelectPServiceProvider(event) {

      this.selectedActionPlan.serviceProvider = event.value as ServiceProvider;
    }
    onSelectResponsability(event) {
      this.selectedActionPlan.responsability = event.value as Responsability;
  
    }

  onSelect(event) {
   // this.selectedActionType = event;
    this.selectedActionPlan.actionType = event;
  }
  onSelectProgrameType(event) {
    this.selectProgrameType = event.value;
    this.selectedActionPlan.programType = event.value as ProgramType;
  }

  onSelectPeriodicity(event) {
    this.periodicityMode = 0;
    if (event.value === undefined) {
      this.selectedActionPlan.periodicityType = event;
    } else {
      this.selectedActionPlan.periodicityType = event.value as PeriodicityType;
    }
    this.periodicityMode = this.selectedActionPlan.periodicityType.id;

    console.log(this.selectedActionPlan.periodicityType.id);

  }

  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);

    this.displayDialog = false;
  }

  openNext() {
    this.isFormSubmitted = true;
    if (this.activeIndex === 0) {
      if
        (this.actionPlanForm.controls['general'].invalid) {
        return;
      } else if (this.actionPlanForm.controls['general'].valid) {
        this.activeIndex = this.activeIndex + 1;
        this.isFormSubmitted = false;
      }

    } else if (this.activeIndex === 1) {
      if
        (this.actionPlanForm.controls['periodicity'].invalid) {
        return;
      } else if (this.actionPlanForm.controls['periodicity'].valid) {
        this.activeIndex = this.activeIndex + 1;
        this.isFormSubmitted = false;
      }
}
      else if (this.activeIndex === 2) {
        this.activeIndex = this.activeIndex + 1;
        this.isFormSubmitted = false;



     }

  }
  openPrev() {
    this.activeIndex = this.activeIndex - 1;
  }


}
