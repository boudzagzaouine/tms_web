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


})
export class MaintenancePlanComponent implements OnInit {


  @Input() actionEdited: Action = new Action();
  selectAction = new Action();
  page = 0;
  size = 8;
  editModeTitle = 'Inserer Plan de maintenance';
  editMode: boolean;
  fr: any;
  selectedTypes: string[] = [];
  types: SelectItem[];
  periodicities: Array<any> = [];
  periodicityMode = 0;
  value4: number;
  showDialog: boolean;
  selectedMaintenancePlan: MaintenancePlan = new MaintenancePlan();
  maintenanceForm: FormGroup;
  selectedMaintenancePlanLine: Array<Action> = [];
  maintenanceTypeList: Array<MaintenanceType> = [];
  programTypeList: Array<ProgramType> = [];
  responsabilityList: Array<Responsability> = [];
  operationTypeList: Array<OperationType> = [];
  serviceProviderList: Array<ServiceProvider> = [];
  periodicityTypeList: Array<PeriodicityType> = [];
  patrimonyList: Array<Patrimony> = [];
  patrimonySearch: string;
  subscrubtion = new Subscription();
  maintenacePlanForm : FormGroup ;
  constructor(
    private maintenanceTypeService: MaintenanceTypeService,
    private programTypeService: ProgramTypeService,
    private responsabilityService: ResponsabilityService,
    private operationTypeService: OperationTypeService,
    private serviceProviderService: ServiceProviderService,
    private periodicityTypeService: PeriodicityTypeService,
    private patrimonyService: PatrimonyService,
    private confirmationService: ConfirmationService
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
      this.serviceProviderService.findAll().subscribe((data) => {
        this.serviceProviderList = data;
      })
    );
    this.subscrubtion.add(
      this.programTypeService.findAll().subscribe((data) => {
        this.programTypeList = data.filter(l =>
          l.maintenanceType.id !== 2
        );
        console.log(this.programTypeList);
      })
    );
    this.initForm();
  }

  initForm(){
    this.maintenacePlanForm = new FormGroup({
      'fProgram': new FormControl(this.selectedMaintenancePlan.programType, Validators.required),
      'fOperation': new FormControl({value: this.selectedMaintenancePlan.operationType, disabled: true}
        , Validators.required),
        'fPatrimony': new FormControl(this.selectedMaintenancePlan.patrimony, Validators.required),

        'fDateStart': new FormControl(this.selectedMaintenancePlan.startDate, Validators.required),

        'fDateEnd': new FormControl(this.selectedMaintenancePlan.endDate, Validators.required),

        'fPeriodicity': new FormControl(this.selectedMaintenancePlan.periodicityType, Validators.required),

        'frepeatDate': new FormControl(this.selectedMaintenancePlan.dayTrigger, Validators.required),
        'fServiceProvider': new FormControl(this.selectedMaintenancePlan.serviceProvider, Validators.required),
        'fResponsability': new FormControl(this.selectedMaintenancePlan.responsability, Validators.required),
        'fagent': new FormControl(this.selectedMaintenancePlan.agent, Validators.required),

    });

  }
  
  onChangePeriodicity(event) {
    this.periodicityMode = event.value.id;
  }

  onPatrimonySearch(event: any) {
    this.patrimonyService.find('code~' + event.query).subscribe((data) => {
      this.patrimonyList = data.map((f) => f.code);
    });
  }

  onShowDialogAction(line) {
    this.showDialog = true;
    console.log(line);

    if (line !== undefined) {
      this.selectAction = line;
      this.editMode = true;
      console.log(this.editMode);
    }


 console.log(this.editMode);

  }
onSubmit(){




}

onSelectProgrameType(event){
  this.subscrubtion.add(
    this.operationTypeService.find('programType.code~' + event.value.code).subscribe((data) => {
      this.operationTypeList = data;
    })
  );
}

  onHideDialogAction(event) {
    this.showDialog = event;
  }

  onLineEditedAction(line: Action) {
    this.selectedMaintenancePlan.actions = this.selectedMaintenancePlan.actions.filter(
      (l) => l.actionType.id !== line.actionType.id
    );
    this.selectedMaintenancePlan.actions.push(line);

    // this.updateTotalPrice();
  }
  onDeleteMaintenanceLine(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.selectedMaintenancePlan.actions = this.selectedMaintenancePlan.actions.filter(
          (l) => l.actionType.id !== id
        );
        //  this.updateTotalPrice();
      },
    });
  }


}
