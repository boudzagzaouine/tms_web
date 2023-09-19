import { ActionLineMaintenance } from './../../../../shared/models/action-line-maintenance';
import { ActionMaintenance } from './../../../../shared/models/action-maintenance';
import { MaintenanceStateService } from './../../../../shared/services/api/maintenance-states.service';
import { MaintenanceState } from './../../../../shared/models/maintenance-state';
import { EventEmitter } from '@angular/core';
import { ActionTypeService } from './../../../../shared/services/api/action-type.service';
import { ActionType } from './../../../../shared/models/action-type';
import { ActionLine } from './../../../../shared/models/action-line';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { RoundPipe } from 'ngx-pipes';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-edit',
  templateUrl: './action-edit.component.html',
  styleUrls: ['./action-edit.component.css'],

})
export class ActionEditComponent implements OnInit {
  page = 0;
  size = 8;
  @Input() selectedAction = new ActionMaintenance();
   @Input() editMode = false;
  @Output() showDialog   =  new EventEmitter<boolean>();
  @Output() actionEdited = new EventEmitter<ActionMaintenance>();
  @Output() lineActionEdited = new EventEmitter<ActionMaintenance>();
  selectedActionType = new ActionType();
  showDialogprdt: boolean;
  actionForm: FormGroup;
  MaintenancestateList: Array<MaintenanceState> = [];
  MaintenancestateLists: Array<MaintenanceState> = [];

  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier une action';
  actionList: Array<ActionMaintenance> = [];
  actionSearch: ActionMaintenance;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private actionTpeService: ActionTypeService,
    private confirmationService: ConfirmationService,
    private maintenanceStateService : MaintenanceStateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roundPipe: RoundPipe
  ) { }

  ngOnInit() {
    this.title = 'Ajouter une action';
    this.displayDialog = true;

    this.maintenanceStateService.findAll().subscribe((data) => {
      this.MaintenancestateList =  data ; })

 if(!this.editMode){
     this.selectedAction = new ActionMaintenance();

   }

    this.initForm();

  }
  initForm() {
    this.actionForm = this.formBuilder.group({
      'FcodeType': new FormControl(
        this.selectedAction.actionType,
        Validators.required
      ),
      'fState': new FormControl(
        this.selectedAction.maintenanceState,

      ),


    });
  }
  onSelectMaintenanceState(event) {
    this.selectedAction.maintenanceState = event.value as MaintenanceState;
  }
  onActionCodeSearch(event) {
    this.actionTpeService.find(`code~${event.query}`).subscribe((data) => {
      this.actionList = data;
    });
  }
  onActionDescriptionSearch(event) {
    this.actionTpeService.find('description~' + event.query).subscribe((data) => {
      this.actionList = data;
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.actionForm.invalid) {
      return;
    }

    this.selectedAction.actionType = this.actionForm.value['FcodeType'];

    this.lineActionEdited.emit(this.selectedAction);

    this.displayDialog = false;

  }

  onLineEditedPrdt(line: ActionLineMaintenance) {
    this.selectedAction.actionLineMaintenances = this.selectedAction.actionLineMaintenances.filter(
      (l) => l.product.id !== line.product.id
    );
    this.selectedAction.actionLineMaintenances.push(line);
  }

  onDeleteMaintenanceLine(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Supprimer?',
      accept: () => {
        this.selectedAction.actionLineMaintenances = this.selectedAction.actionLineMaintenances.filter(
          (l) => l.product.id !== id
        );
      },
    });
  }

  onSelect(event) {
    this.selectedActionType = event;
    this.selectedActionType = this.selectedActionType;
  }
  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);

    this.displayDialog = false;
  }

  onShowDialogPrdt(line,event) {
     this.showDialogprdt = true;
     this.editMode = event;
     this.actionEdited=(line);

  }
  onHideDialogPrdt(event) {
    this.showDialogprdt = event;
  }


}
