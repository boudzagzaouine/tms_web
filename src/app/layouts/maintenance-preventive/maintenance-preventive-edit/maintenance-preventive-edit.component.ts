import { ActionMaintenance } from './../../../shared/models/action-maintenance';
import { PurchaseOrderLine } from './../../../shared/models/purchase-order-line';
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
import { ActionPlan } from './../../../shared/models/action-plan';

@Component({
  selector: 'app-maintenance-preventive-edit',
  templateUrl: './maintenance-preventive-edit.component.html',
  styles: [`
  :host ::ng-deep .ui-multiselect {
      min-width: 15em;
  }

  :host ::ng-deep .ui-multiselected-item-token,
  :host ::ng-deep .ui-multiselected-empty-token {
      padding: 2px 4px;
      margin: 0 0.286em 0 0;
      display: inline-block;
      vertical-align:middle;
      height: 1.857em;
  }

  :host ::ng-deep .ui-multiselected-item-token {
      background: #007ad9;
      color: #ffffff;
  }

  :host ::ng-deep .ui-multiselected-empty-token {
      background: #d95f00;
      color: #ffffff;
  }
`],
  providers: [RoundPipe]

})
export class MaintenancePreventiveEditComponent implements OnInit {

  @Input() actionEdited: Action = new Action();
  selectActionPlan = new ActionPlan();
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
            console.log(this.selectedMaintenancePreventive);
            
    //         if (this.selectedMaintenancePreventive.maintenanceType.id === 1) {
    //           console.log("pariodicyt");
    //           this.onSelectPeriodicity(this.selectedMaintenancePreventive.periodicityType);
    //           this.editMType=true;
    //         }
    //         this.onSelectMaintenanceType(this.selectedMaintenancePreventive.maintenanceType);

    //         console.log(this.selectedMaintenancePreventive);
    // console.log(this.selectedMaintenancePreventive.months);

            this.initForm();
    //         console.log(this.maintenacePlanForm.value['periodicity']['fmensuel']);

          },
          err => {
            this.toastr.error(err.error.message);
            this.spinner.hide();
          }));
      })
      );
    } else {
      this.maintenancePreventiveService.generateCode().subscribe(
        code => {
       this.selectedMaintenancePreventive.code = code;
       console.log(this.selectedMaintenancePreventive.code);

       this.initForm();
        });

    }
    this.initForm();


  }

  initForm() {
    
    this.maintenacePlanForm = new FormGroup({
    
        'fcode': new FormControl(this.selectedMaintenancePreventive.code, Validators.required),
        'fdescription': new FormControl(this.selectedMaintenancePreventive.description),
     
    });

  }


  onPatrimonySearch(event: any) {
    this.patrimonyService.find('code~' + event.query).subscribe((data) => {
      this.patrimonyList = data;
    });
  }

  onShowDialogAction(line = new ActionPlan) {
    this.showDialog = true;
    console.log(line);

    if (line.actionType.id > 0) {
      this.selectActionPlan = line;
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
    if (this.maintenacePlanForm.invalid ) { return; }

   

    this.selectedMaintenancePreventive.description = this.maintenacePlanForm.value['fdescription'];

 console.log(this.selectedMaintenancePreventive);

    //  this.selectedMaintenancePreventive.months=this.selectedMaintenancePreventive.months.sort();

    //  console.log(this.selectedMaintenancePreventive.months);

 // this.selectedMaintenancePlans.push(this.selectedMaintenancePreventive);
 console.log(this.selectedMaintenancePreventive);
 
    this.maintenancePreventiveService.set(this.selectedMaintenancePreventive).subscribe(
      dataM => {
        this.toastr.success('Elément P est Enregistré Avec Succès', 'Edition');
 console.log(dataM);
 
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

 


   onHideDialogAction(event) {
    this.showDialog = event;
   }

  onLineEditedAction(line: ActionPlan) {
    this.selectedMaintenancePreventive.actionPlans = this.selectedMaintenancePreventive.actionPlans.filter(
      (l) => l.actionType.id !== line.actionType.id
    );
    this.selectedMaintenancePreventive.actionPlans.push(line);
    //this.updateTotalPrice();

  }
  onDeleteMaintenanceLine(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.selectedMaintenancePreventive.actionPlans = this.selectedMaintenancePreventive.actionPlans.filter(
          (l) => l.id !== id
        );
        //this.updateTotalPrice();
      },
    });
  }

  // updateTotalPrice() {
  //   this.selectedMaintenancePreventive.totalPrice = 0;

  //   if (this.selectedMaintenancePreventive.actions.length) {
  //     this.selectedMaintenancePreventive.totalPrice =
  //       this.selectedMaintenancePreventive.actions
  //         .map(l => {
  //           return l.actionLines.map(ls => ls.totalPriceTTC)
  //             .reduce((acc = 0, curr) => acc + curr, 0);
  //         })
  //         .reduce((acc = 0, curr) => acc + curr, 0);
  //   }

  //   console.log(this.selectedMaintenancePreventive.totalPrice);

  //   this.maintenacePlanForm.patchValue({
  //     'price': this.selectedMaintenancePreventive.totalPrice
  //   });
  // }
}
