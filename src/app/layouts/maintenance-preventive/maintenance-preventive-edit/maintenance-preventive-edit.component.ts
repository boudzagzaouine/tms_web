import { MaintenancePlan } from './../../../shared/models/maintenance-plan';
import { MaintenancePlanService } from './../../../shared/services/api/maintenance-plan.service';
import { DayService } from './../../../shared/services/api/day.service';
import { MonthService } from './../../../shared/services/api/month.service';
import { Day } from './../../../shared/models/day';
import { Month } from './../../../shared/models/month';
import { RoundPipe } from 'ngx-pipes';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MaintenanceStateService } from './../../../shared/services/api/maintenance-states.service';
import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { PeriodicityTypeService } from './../../../shared/services/api/periodicity-type.service';
import { ServiceProviderService } from './../../../shared/services/api/service-provider.service';
import { ActionService } from './../../../shared/services/api/action.service';
import { ActionLineService } from './../../../shared/services/api/action-line.service';
import { OperationTypeService } from './../../../shared/services/api/operation-type.service';
import { ResponsabilityService } from './../../../shared/services/api/responsability.service';
import { ProgramTypeService } from './../../../shared/services/api/program-type.service';
import { MaintenanceTypeService } from './../../../shared/services/api/maintenance-type.service';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Patrimony } from './../../../shared/models/patrimony';
import { PeriodicityType } from './../../../shared/models/periodicity-type';
import { ServiceProvider } from './../../../shared/models/service-provider';
import { Responsability } from './../../../shared/models/responsability';
import { MaintenanceState } from './../../../shared/models/maintenance-state';
import { ProgramType } from './../../../shared/models/program-type';
import { MaintenanceType } from './../../../shared/models/maintenance-type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionLine } from './../../../shared/models/action-line';
import { Action } from './../../../shared/models/action';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-maintenance-preventive-edit',
  templateUrl: './maintenance-preventive-edit.component.html',
  styleUrls: ['./maintenance-preventive-edit.component.css'],
  providers: [RoundPipe]

})
export class MaintenancePreventiveEditComponent implements OnInit {

  @Input() actionEdited: Action = new Action();
  selectAction = new Action();
  page = 0;
  size = 8;
  editModeTitle = 'Inserer  Plan maintenance';
  editMode: boolean;
  fr: any;
  selectedTypes: string[] = [];

  periodicities: Array<any> = [];
  value4: number;
  showDialog: boolean;
  selectedMaintenancePreventive: MaintenancePlan = new MaintenancePlan();
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
  periodicityMode: number;
  daysOfMonth: SelectItem[] = [];
  days:Array<Day> = [];
  monthList: Array<Month> = [];
  selectedType: Array<Month> = [];
  periodicityTreatment: Array<any> = [];
  selectedMaintenancePlans: Array<MaintenancePlan> = [];
  editMType : boolean =false ;
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
    private maintenancePreventiveService: MaintenancePlanService,
    private maintenanceStateService: MaintenanceStateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private monthService :MonthService,
    private dayService :DayService,
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

    this.daysOfMonth = [
      { label: '1', value: 1 }, { label: '2', value: 2 },
      { label: '3', value: 3 }, { label: '4', value: 4 },
      { label: '5', value: 5 }, { label: '6', value: 6 },
      { label: '7', value: 7 }, { label: '8', value: 8 },
      { label: '9', value: 9 }, { label: '10', value: 10 },
      { label: '11', value: 11 }, { label: '12', value: 12 },
      { label: '13', value: 13 }, { label: '14', value: 14 }, { label: '15', value: 15 },
      { label: '16', value: 16 }, { label: '17', value: 17 },
      { label: '18', value: 18 }, { label: '19', value: 19 },
      { label: '20', value: 20 }, { label: '21', value: 21 },
      { label: '22', value: 23 }, { label: '24', value: 24 },
      { label: '25', value: 25 }, { label: '26', value: 26 },
      { label: '18', value: 18 }, { label: '19', value: 19 },
      { label: '20', value: 20 }, { label: '21', value: 21 },
      { label: '22', value: 23 }, { label: '24', value: 24 },
      { label: '25', value: 25 }, { label: '26', value: 26 },
      { label: '27', value: 27 }, { label: '28', value: 28 },
      { label: '29', value: 29 }, { label: '30', value: 30 },
      { label: '31', value: 31 }
    ];



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
        this.maintenanceTypeList = data.filter(f=> f.id===1);
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
        this.subscriptions.push(this.maintenancePreventiveService.findById(id).subscribe(
          data => {
            this.selectedMaintenancePreventive = data;
            if (this.selectedMaintenancePreventive.maintenanceType.id === 1) {
              console.log("pariodicyt");
              this.onSelectPeriodicity(this.selectedMaintenancePreventive.periodicityType);
              this.editMType=true;
            }
            this.onSelectMaintenanceType(this.selectedMaintenancePreventive.maintenanceType);

            console.log(this.selectedMaintenancePreventive);

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
    const dStart = new Date(this.selectedMaintenancePreventive.startDate);
    const dEnd = new Date(this.selectedMaintenancePreventive.endDate);
    const dTriggerDate = new Date(this.selectedMaintenancePreventive.triggerDate);
    const dInterventionDate = new Date(this.selectedMaintenancePreventive.interventionDate);
    const dDeclare = new Date(this.selectedMaintenancePreventive.declaredDate);

    this.maintenacePlanForm = new FormGroup({
      'price': new FormControl({
        value: this.selectedMaintenancePreventive.totalPrice ?
          this.roundPipe.transform(this.selectedMaintenancePreventive.totalPrice, 2) : 0, disabled: true
      }),
      general: new FormGroup({
        'fcode': new FormControl(this.selectedMaintenancePreventive.code, Validators.required),
        'fmaintenaceType': new FormControl(this.selectedMaintenancePreventive.maintenanceType, Validators.required),
        'fProgram': new FormControl(this.selectedMaintenancePreventive.programType, Validators.required),
        'fPatrimony': new FormControl(this.selectedMaintenancePreventive.patrimony, Validators.required),
        'fState': new FormControl(this.selectedMaintenancePreventive.maintenanceState, Validators.required),

      }),
      periodicity: new FormGroup({
        'fDateStart': new FormControl(dStart, Validators.required),
        'fDateEnd': new FormControl(dEnd, Validators.required),
        'fPeriodicity': new FormControl(this.selectedMaintenancePreventive.periodicityType, Validators.required),
        'fInterventionDate': new FormControl(dInterventionDate, Validators.required),
        'fTriggerDay': new FormControl(this.selectedMaintenancePreventive.triggerDay, Validators.required),
        'fhebdomadaire': new FormControl(this.selectedMaintenancePreventive.day),
        'fmensuel': new FormControl(this.selectedMaintenancePreventive.months),
        'fdayOfMonth': new FormControl(this.selectedMaintenancePreventive.dayOfMonth),

      }),

      responsability: new FormGroup({
        'fServiceProvider': new FormControl(this.selectedMaintenancePreventive.serviceProvider, Validators.required),
        'fResponsability': new FormControl(this.selectedMaintenancePreventive.responsability, Validators.required),
        'fagent': new FormControl(this.selectedMaintenancePreventive.agent),

      }),



    });

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
    } else {
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
        this.maintenacePlanForm.controls['periodicity'].invalid) { return; }

    }

    this.selectedMaintenancePreventive.code = this.maintenacePlanForm.value['general']['fcode'];
    this.selectedMaintenancePreventive.patrimony = this.maintenacePlanForm.value['general']['fPatrimony'];
    this.selectedMaintenancePreventive.maintenanceState = this.maintenacePlanForm.value['general']['fState'];
    this.selectedMaintenancePreventive.agent = this.maintenacePlanForm.value['responsability']['fagent'];

      this.selectedMaintenancePreventive.startDate = this.maintenacePlanForm.value['periodicity']['fDateStart'];
      this.selectedMaintenancePreventive.endDate = this.maintenacePlanForm.value['periodicity']['fDateEnd'];
      this.selectedMaintenancePreventive.triggerDay = this.maintenacePlanForm.value['periodicity']['fTriggerDay'];
      this.selectedMaintenancePreventive.day = this.maintenacePlanForm.value['periodicity']['fhebdomadaire'];
      this.selectedMaintenancePreventive.dayOfMonth = this.maintenacePlanForm.value['periodicity']['fdayOfMonth'];
      this.selectedMaintenancePreventive.months = this.maintenacePlanForm.value['periodicity']['fmensuel'];

      // console.log("triger Date");
      // console.log(this.selectedMaintenancePreventive.triggerDate);
      // let dt = new Date(this.selectedMaintenancePreventive.interventionDate);
      // let day = this.selectedMaintenancePreventive.triggerDay;
      // dt.setDate(dt.getDate() - day);
      // this.selectedMaintenancePreventive.triggerDate = dt;


  // if(this.selectedMaintenancePlan.maintenanceType.id=== 1){
  //    this.listofperiodicityMensuel();
  //  }
  //   else if(this.selectedMaintenancePlan.maintenanceType.id=== 2) {
  //           this.selectedMaintenancePlans.push(this.selectedMaintenancePlan);
  //   }
  // let dt = new Date(this.selectedMaintenancePreventive.interventionDate);
  // let day = this.selectedMaintenancePreventive.triggerDay;
  // dt.setDate(dt.getDate() - day);
  // this.selectedMaintenancePreventive.triggerDate = dt;
console.log(this.selectedMaintenancePreventive);

 // this.selectedMaintenancePlans.push(this.selectedMaintenancePreventive);
    this.maintenancePreventiveService.set(this.selectedMaintenancePreventive).subscribe(
      dataM => {
        this.toastr.success('Elément P est Enregistré Avec Succès', 'Edition');

        this.isFormSubmitted = false;
        this.spinner.hide();
        this.selectedMaintenancePreventive = new MaintenancePlan();
        this.maintenacePlanForm.reset();

        if (close) {
          this.router.navigate(['/core/maintenance-plan/list']);
        } else {
          this.editModee = false;
          this.router.navigate(['/core/maintenance-plan/edit']);
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

  // listofperiodicityMensuel() {
  //   let dtS = new Date(this.selectedMaintenancePlan.startDate);
  //   let dtE = new Date(this.selectedMaintenancePlan.endDate);
  //   let nbr = dtE.getFullYear() - dtS.getFullYear();
  //   for (let i = 0; i <= nbr; i++) {
  //     for (let j = 0; j < this.selectedMaintenancePlan.month.length; j++) {
  //       let dat = new Date();
  //       let days: number = this.selectedMaintenancePlan.dayOfMonth['value'];
  //       let monthhh: number = this.selectedMaintenancePlan.month[j]['value'];
  //       dat.setDate(days);
  //       dat.setMonth(monthhh);
  //       let fr = i;
  //       if (i === 0) {
  //         dat.setFullYear(dtS.getFullYear());
  //       } else {
  //         dat.setFullYear(dtS.getFullYear() + 1);
  //       }
  // if( dat > dtS  || dat > dtE){
  //   console.log("superier");
  //       this.periodicityTreatment.push(dat);
  //     }}
  //   }
  //   console.log(this.periodicityTreatment);

  //  for (let i =0 ; i< this.periodicityTreatment.length ;i++){
  //            this.selectedMaintenancePlan.interventionDate =this.periodicityTreatment[i];
  //            let dt = new Date(this.selectedMaintenancePlan.interventionDate);
  //            let day = this.selectedMaintenancePlan.triggerDay;
  //            dt.setDate(dt.getDate() - day);
  //            this.selectedMaintenancePlan.triggerDate = dt;
  //            this.selectedMaintenancePlans.push(this.selectedMaintenancePlan);

  //  }
  //  console.log(this.selectedMaintenancePlans);


  // }


  onSelectMaintenanceType(event) {
    if (event.value === undefined) {
      this.selectMaintenancetype = event;
      this.selectedMaintenancePreventive.maintenanceType = event;
    }
    else {
      this.selectMaintenancetype = event.value;
      this.selectedMaintenancePreventive.maintenanceType = this.selectMaintenancetype;
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
    this.selectedMaintenancePreventive.programType = event.value as ProgramType;
  }
  onSelectMaintenanceState(event) {
    this.selectedMaintenancePreventive.maintenanceState = event.value as MaintenanceState;
  }

  onSelectPatrimony(event) {
    console.log(event);
    this.selectedMaintenancePreventive.patrimony = event.value as Patrimony;

  }
  onSelectPeriodicity(event) {
    this.periodicityMode = 0;
    if (event.value === undefined) {
      this.selectedMaintenancePreventive.periodicityType = event;
    } else {
      this.selectedMaintenancePreventive.periodicityType = event.value as PeriodicityType;
    }
    this.periodicityMode = this.selectedMaintenancePreventive.periodicityType.id;

    console.log(this.selectedMaintenancePreventive.periodicityType.id);

  }
  onSelectPServiceProvider(event) {

    this.selectedMaintenancePreventive.serviceProvider = event.value as ServiceProvider;
  }
  onSelectResponsability(event) {
    this.selectedMaintenancePreventive.responsability = event.value as Responsability;

  }
  onSelectService(event) {
    this.selectedMaintenancePreventive.service = event.value as Responsability;

  }
  onHideDialogAction(event) {
    this.showDialog = event;
  }

  onLineEditedAction(line: Action) {
    this.selectedMaintenancePreventive.actions = this.selectedMaintenancePreventive.actions.filter(
      (l) => l.actionType.id !== line.actionType.id
    );
    this.selectedMaintenancePreventive.actions.push(line);
    this.updateTotalPrice();

  }
  onDeleteMaintenanceLine(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.selectedMaintenancePreventive.actions = this.selectedMaintenancePreventive.actions.filter(
          (l) => l.id !== id
        );
        this.updateTotalPrice();
      },
    });
  }

  updateTotalPrice() {
    this.selectedMaintenancePreventive.totalPrice = 0;

    if (this.selectedMaintenancePreventive.actions.length) {
      this.selectedMaintenancePreventive.totalPrice =
        this.selectedMaintenancePreventive.actions
          .map(l => {
            return l.actionLines.map(ls => ls.totalPriceTTC)
              .reduce((acc = 0, curr) => acc + curr, 0);
          })
          .reduce((acc = 0, curr) => acc + curr, 0);
    }

    console.log(this.selectedMaintenancePreventive.totalPrice);

    this.maintenacePlanForm.patchValue({
      'price': this.selectedMaintenancePreventive.totalPrice
    });
  }
}
