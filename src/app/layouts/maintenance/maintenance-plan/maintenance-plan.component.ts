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
import { MaintenancePlan } from './../../../shared/models/maintenance-plan';
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


@Component({
  selector: 'app-maintenance-plan',
  templateUrl: './maintenance-plan.component.html',
  styleUrls: ['./maintenance-plan.component.css'],
  providers: [RoundPipe]


})
export class MaintenancePlanComponent implements OnInit {


  @Input() actionEdited: Action = new Action();
  selectAction = new Action();
  page = 0;
  size = 8;
  editModeTitle = 'Inserer  maintenance';
  editMode: boolean;
  fr: any;
  selectedTypes: string[] = [];
  types: SelectItem[];
  periodicities: Array<any> = [];
  periodicityMode = 0;
  value4: number;
  showDialog: boolean;
  selectedMaintenancePlan: MaintenancePlan = new MaintenancePlan();
  selectedMaintenanceAction: Array<Action> = [];
  selectedMaintenanceActionLine: Array<ActionLine> = [];
  searchQuery = '';
  maintenanceForm: FormGroup;
  selectedMaintenancePlanLine: Array<Action> = [];
  maintenanceTypeList: Array<MaintenanceType> = [];
  programTypeList: Array<ProgramType> = [];
  MaintenancestateList: Array<MaintenanceState> = [];
  responsabilityList: Array<Responsability> = [];
  serviceProviderList: Array<ServiceProvider> = [];
  periodicityTypeList: Array<PeriodicityType> = [];
  patrimonyList: Array<Patrimony> = [];
  patrimonySearch: Patrimony;
  subscrubtion = new Subscription();
  maintenacePlanForm: FormGroup;
  isFormSubmitted = false;
  selectMaintenancetype: MaintenanceType = new MaintenanceType();
  editModee = false;
  subscriptions: Subscription[] = [];
  validiteMode = false;

  constructor(
    private maintenanceTypeService: MaintenanceTypeService,
    private programTypeService: ProgramTypeService,
    private responsabilityService: ResponsabilityService,
    private operationTypeService: OperationTypeService,
    private actionLineService: ActionLineService,
    private actionService: ActionService,
    private serviceProviderService: ServiceProviderService,
    private periodicityTypeService: PeriodicityTypeService,
    private patrimonyService: PatrimonyService,
    private confirmationService: ConfirmationService,
    private maintenancePlanService: MaintenancePlanService,
    private maintenanceStateService: MaintenanceStateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private roundPipe: RoundPipe,
    private router: Router,

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

    this.types = [
      { label: 'lundi', value: 'lundi' },
      { label: 'mardi', value: 'mardi' },
      { label: 'mercredi', value: 'mercredi' },
      { label: 'jeudi', value: 'jeudi' },
      { label: 'vendredi', value: 'vendredi' },
      { label: 'samedi', value: 'samedi' },
      { label: 'dimanche', value: 'dimanche' },
    ];

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
        this.maintenanceTypeList = data;
      })
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

    // this.initForm();
    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.editModee = true;
      this.editModeTitle = 'Modifier Maintenance';
      this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
        id = params['id'];
        this.subscriptions.push(this.maintenancePlanService.findById(id).subscribe(
          data => {
           this.selectedMaintenancePlan = data;
          if(this.selectedMaintenancePlan.maintenanceType.id===1){
           this.onSelectPeriodicity(this.selectedMaintenancePlan.periodicityType);
          }
           this.onSelectMaintenanceType(this.selectedMaintenancePlan.maintenanceType);

 console.log(this.selectedMaintenancePlan);

            this.initForm();
          },
          err => {
            this.toastr.error(err.error.message);
            this.spinner.hide();
          }));
      })
      );
    } else {
      this.initForm();
    }
    this.initForm();

  }

  initForm() {
    const dStart = new Date(this.selectedMaintenancePlan.startDate);
    const dEnd = new Date(this.selectedMaintenancePlan.endDate);
    const dDeclare = new Date(this.selectedMaintenancePlan.declaredDate);
    const dTrigger = new Date(this.selectedMaintenancePlan.triggerDate);

    const dInterventionDate = new Date(this.selectedMaintenancePlan.interventionDate);

    this.maintenacePlanForm = new FormGroup({

      general: new FormGroup({
        'fcode': new FormControl(this.selectedMaintenancePlan.code, Validators.required),
        'fmaintenaceType': new FormControl(this.selectedMaintenancePlan.maintenanceType, Validators.required),
        'fProgram': new FormControl(this.selectedMaintenancePlan.programType, Validators.required),
        'fPatrimony': new FormControl(this.selectedMaintenancePlan.patrimony, Validators.required),
        'fState': new FormControl(this.selectedMaintenancePlan.maintenanceState, Validators.required),

      }),
      periodicity: new FormGroup({
        'fDateStart': new FormControl(dStart, Validators.required),
        'fDateEnd': new FormControl(dEnd, Validators.required),
        'fPeriodicity': new FormControl(this.selectedMaintenancePlan.periodicityType, Validators.required),
        'fInterventionDate': new FormControl(dInterventionDate, Validators.required),
        'fTrigger': new FormControl(this.selectedMaintenancePlan.alert, Validators.required),
        'flist': new FormControl(this.selectedMaintenancePlan.selectedTypes),

      }),

      responsability: new FormGroup({
        'fServiceProvider': new FormControl(this.selectedMaintenancePlan.serviceProvider, Validators.required),
        'fResponsability': new FormControl(this.selectedMaintenancePlan.responsability, Validators.required),
        'fagent': new FormControl(this.selectedMaintenancePlan.agent, Validators.required),

      }),
      service: new FormGroup({
        'fService': new FormControl(this.selectedMaintenancePlan.service, Validators.required),
        'femplyer': new FormControl(this.selectedMaintenancePlan.employer, Validators.required),
        'fTriggerr': new FormControl(dTrigger, Validators.required),
        'fDeclareDate': new FormControl(dDeclare, Validators.required),
        'fObseravtion': new FormControl(this.selectedMaintenancePlan.observation, Validators.required),
        'fDuration': new FormControl(this.selectedMaintenancePlan.duration, Validators.required),
        'fIntervetionDate': new FormControl(dInterventionDate, Validators.required),

      }),

      'price': new FormControl({
        value: this.selectedMaintenancePlan.totalPrice ?
          this.roundPipe.transform(this.selectedMaintenancePlan.totalPrice, 2) : 0, disabled: true
      }),
    });

  }

  onChangePeriodicity(event) {
    this.periodicityMode = event.value.id;

  }

  onPatrimonySearch(event: any) {
    this.patrimonyService.find('code~' + event.query).subscribe((data) => {
      this.patrimonyList = data;
    });
  }

  onShowDialogAction(line) {
    this.showDialog = true;
    console.log(line);

    if (line !== undefined) {
      this.selectAction = line;
      this.editMode = true;
      console.log(this.editMode);
    }else
    {
      this.editMode = false;

    }


    console.log(this.editMode);

  }
  onSubmit(close = false) {
 console.log(this.maintenacePlanForm);
    this.isFormSubmitted = true;
    if (this.maintenacePlanForm.controls['general'].invalid &&
      this.maintenacePlanForm.controls['responsability'].invalid) { return; }
    if (this.selectMaintenancetype.id === 1) {
      if (
        this.maintenacePlanForm.controls['periodicity'].invalid
      ) { return; }
    } else if (this.selectMaintenancetype.id === 2) {
      if (
        this.maintenacePlanForm.controls['service'].invalid) { return; }
    }



    this.selectedMaintenancePlan.code = this.maintenacePlanForm.value['general']['fcode'];
    this.selectedMaintenancePlan.patrimony = this.maintenacePlanForm.value['general']['fPatrimony'];
    this.selectedMaintenancePlan.maintenanceState = this.maintenacePlanForm.value['general']['fState'];
    this.selectedMaintenancePlan.agent = this.maintenacePlanForm.value['responsability']['fagent'];

    if(this.selectedMaintenancePlan.maintenanceType.id === 1){
      console.log("preventive");

    this.selectedMaintenancePlan.startDate = this.maintenacePlanForm.value['periodicity']['fDateStart'];
    this.selectedMaintenancePlan.endDate = this.maintenacePlanForm.value['periodicity']['fDateEnd'];
    this.selectedMaintenancePlan.interventionDate = this.maintenacePlanForm.value['periodicity']['fInterventionDate'];
    this.selectedMaintenancePlan.alert = this.maintenacePlanForm.value['periodicity']['fTrigger'];
    this.selectedMaintenancePlan.selectedTypes = this.maintenacePlanForm.value['periodicity']['flist'];

  } else if (this.selectedMaintenancePlan.maintenanceType.id === 2){
    console.log("corrective");

    this.selectedMaintenancePlan.employer = this.maintenacePlanForm.value['service']['femplyer'];
    this.selectedMaintenancePlan.declaredDate = this.maintenacePlanForm.value['service']['fDeclareDate'];
    this.selectedMaintenancePlan.triggerDate = this.maintenacePlanForm.value['service']['fTriggerr'];
    this.selectedMaintenancePlan.observation = this.maintenacePlanForm.value['service']['fObseravtion'];
    this.selectedMaintenancePlan.duration = this.maintenacePlanForm.value['service']['fDuration'];

    }

    var dt = new Date(this.selectedMaintenancePlan.interventionDate);
    var day =this.selectedMaintenancePlan.alert;
    dt.setDate( dt.getDate() - day );
    console.log(dt);
    console.log(day);



    this.selectedMaintenancePlan.triggerDate = dt;

    console.log(this.selectedMaintenancePlan);

 console.log(this.selectedMaintenancePlan.selectedTypes);

    this.maintenancePlanService.set(this.selectedMaintenancePlan).subscribe(
      dataM => {
        this.toastr.success('Elément P est Enregistré Avec Succès', 'Edition');

        this.isFormSubmitted = false;
        this.spinner.hide();
        this.selectedMaintenancePlan = new MaintenancePlan();
        this.maintenacePlanForm.reset();

        if (close) {
          this.router.navigate(['/core/maintenance/treatment']);
        } else {
          this.editModee = false;
          this.router.navigate(['/core/maintenance/plan']);
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
    );
  }



  onSelectMaintenanceType(event) {
    if (event.value === undefined) {
      this.selectMaintenancetype = event;
      this.selectedMaintenancePlan.maintenanceType = event;
    }
    else {
      this.selectMaintenancetype = event.value;
      this.selectedMaintenancePlan.maintenanceType = this.selectMaintenancetype;
    }

    this.subscrubtion.add(
      this.programTypeService.findAll().subscribe((data) => {
        this.programTypeList = data.filter(l =>
          l.maintenanceType.id === this.selectMaintenancetype.id
        );
      })
    );
  }

  onSelectProgrameType(event) {
    this.selectedMaintenancePlan.programType = event.value as ProgramType;
  }
  onSelectMaintenanceState(event) {
    this.selectedMaintenancePlan.maintenanceState = event.value as MaintenanceState;
  }

  onSelectPatrimony(event) {
    console.log(event);
    this.selectedMaintenancePlan.patrimony = event.value as Patrimony;

  }
  onSelectPeriodicity(event) {

    if (event.value === undefined) {
      this.selectedMaintenancePlan.periodicityType = event;
    } else {
      this.selectedMaintenancePlan.periodicityType = event.value as PeriodicityType;
    }

    if(this.selectedMaintenancePlan.periodicityType.id !== 3){
  this.validiteMode=true;
    }else{
      this.validiteMode=false;

    }
   console.log(this.selectedMaintenancePlan.periodicityType.id);

  }
  onSelectPServiceProvider(event) {

    this.selectedMaintenancePlan.serviceProvider = event.value as ServiceProvider;
  }
  onSelectResponsability(event) {
    this.selectedMaintenancePlan.responsability = event.value as Responsability;

  }
  onSelectService(event) {
    this.selectedMaintenancePlan.service = event.value as Responsability;

  }
  onHideDialogAction(event) {
    this.showDialog = event;
  }

  onLineEditedAction(line: Action) {
    this.selectedMaintenancePlan.actions = this.selectedMaintenancePlan.actions.filter(
      (l) => l.actionType.id !== line.actionType.id
    );
    this.selectedMaintenancePlan.actions.push(line);
    this.updateTotalPrice();

  }
  onDeleteMaintenanceLine(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.selectedMaintenancePlan.actions = this.selectedMaintenancePlan.actions.filter(
          (l) => l.id !== id
        );
        this.updateTotalPrice();
      },
    });
  }
  updateTotalPrice() {
    this.selectedMaintenancePlan.totalPrice = 0;

    if (this.selectedMaintenancePlan.actions.length) {
      this.selectedMaintenancePlan.totalPrice =
        this.selectedMaintenancePlan.actions
          .map(l => {
            return l.actionLines.map(ls => ls.totalPriceTTC)
              .reduce((acc = 0, curr) => acc + curr, 0);
          })
          .reduce((acc = 0, curr) => acc + curr, 0);
    }

    console.log(this.selectedMaintenancePlan.totalPrice);

    this.maintenacePlanForm.patchValue({
      'price': this.selectedMaintenancePlan.totalPrice
    });
  }


}
