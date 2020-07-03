import { FormGroup } from '@angular/forms';
import { MaintenancePlan } from './../../../shared/models/maintenance-plan';
import { MaintenanceLine } from './../../../shared/models/maintenance-line';
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
import { Component, OnInit } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { Patrimony } from './../../../shared/models/patrimony';

@Component({
  selector: 'app-maintenance-plan',
  templateUrl: './maintenance-plan.component.html',
  styleUrls: ['./maintenance-plan.component.css'],
})
export class MaintenancePlanComponent implements OnInit {

  page = 0;
  size = 8;
  editModeTitle = 'Inserer Plan de maintenance';
  fr: any;
  selectedTypes: string[] = [];
  types: SelectItem[];
  periodicities: Array<any> = [];
  periodicityMode=0;
  value4  :number;
  showDialog: boolean ;
  selectedMaintenance: MaintenancePlan = new MaintenancePlan();
  maintenanceForm: FormGroup;
  selectedMaintenanceLine = new MaintenanceLine();
  maintenanceTypeList: Array<MaintenanceType> = [];
  programTypeList: Array<ProgramType> = [];
  responsabilityList: Array<Responsability> = [];
  operationTypeList: Array<OperationType> = [];
  serviceProviderList: Array<ServiceProvider> = [];
  periodicityTypeList: Array<PeriodicityType> = [];
  patrimonyList : Array<Patrimony>=[];
  patrimonySearch: string;
 subscrubtion = new Subscription ();
  constructor(    private maintenanceTypeService: MaintenanceTypeService,
    private programTypeService: ProgramTypeService,
    private responsabilityService: ResponsabilityService,
    private operationTypeService: OperationTypeService,
    private serviceProviderService: ServiceProviderService,
    private periodicityTypeService: PeriodicityTypeService,
    private patrimonyService :PatrimonyService,
    private confirmationService: ConfirmationService,
    ) {}

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

    this.subscrubtion.add(this.periodicityTypeService.findAll().subscribe((data) => {
      this.periodicityTypeList = data;
    }));


    this.subscrubtion.add(this.maintenanceTypeService.findAll().subscribe((data) => {
      this.maintenanceTypeList = data;
    }));

    this.subscrubtion.add(this.responsabilityService.findAll().subscribe((data) => {
      this.responsabilityList = data;
    }));

    this.subscrubtion.add(this.operationTypeService.findAll().subscribe((data) => {
      this.operationTypeList = data;
    }));

    this.subscrubtion.add(this.serviceProviderService.findAll().subscribe((data) => {
      this.serviceProviderList = data;
    }));
    this.subscrubtion.add(this.programTypeService.findAll().subscribe((data) => {
      this.programTypeList = data;
    }));

  }

  onChangePeriodicity(event) {
    this.periodicityMode = event.value.id;

  }

  onPatrimonySearch(event: any) {
    this.patrimonyService.find('code~' + event.query).subscribe(
      data => {

        this.patrimonyList = data.map(f => f.code);


      }
    );
  }

  onShowDialog(event) {
    this.showDialog = true;
    console.log(event);

    // if(event === undefined){
    //   this.selectedMaintenanceLine = new MaintenanceLine();
    //   console.log(this.selectedMaintenanceLine);

    //     } else{
    //           this.selectedMaintenanceLine = event;
    //                console.log(this.selectedMaintenanceLine);

    //     }
  }

  onHideDialog(event) {
    this.showDialog = event;

  }

  onLineEdited(line: MaintenanceLine) {
    this.selectedMaintenance.maintenanceLineList = this.selectedMaintenance.maintenanceLineList.filter(
      (l) => l.action.id !== line.action.id
    );
    this.selectedMaintenance.maintenanceLineList.push(line);
    //this.updateTotalPrice();
  }
  onDeleteMaintenanceLine(id: number) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Suprimer?",
      accept: () => {
        this.selectedMaintenance.maintenanceLineList = this.selectedMaintenance.maintenanceLineList.filter(
          (l) => l.action.id !== id
        );
      //  this.updateTotalPrice();
      },
    });
  }

  // updateTotalPrice() {
  //   this.selectedMaintenance.totalPrice = 0;

  //   if (this.selectedMaintenance.maintenanceLineList.length) {
  //     this.selectedMaintenance.totalPrice = this.selectedMaintenance.maintenanceLineList
  //       .map((l) => l.totalPriceTTC)
  //       .reduce((acc = 0, curr) => acc + curr, 0);
  //   }

  //   console.log(this.selectedMaintenance.totalPrice);

  //   this.maintenanceForm.patchValue({
  //     price: this.selectedMaintenance.totalPrice,
  //   });
  // }
}
