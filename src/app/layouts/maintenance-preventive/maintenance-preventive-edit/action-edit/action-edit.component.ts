import { ActionType } from './../../../../shared/models/action-type';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActionTypeService } from './../../../../shared/services/api/action-type.service';
import { ConfirmationService } from 'primeng/api';
import { MaintenanceStateService } from './../../../../shared/services/api/maintenance-states.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoundPipe } from 'ngx-pipes';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MaintenanceState } from './../../../../shared/models/maintenance-state';
import { ActionLine } from './../../../../shared/models/action-line';
import { Action } from './../../../../shared/models/action';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from './../../../../shared/services';

@Component({
  selector: 'app-action-edit',
  templateUrl: './action-edit.component.html',
  styleUrls: ['./action-edit.component.css'],
  providers: [RoundPipe]

})
export class ActionEditComponent implements OnInit {

  page = 0;
  size = 8;
  @Input() selectedAction = new Action();
   @Input() editMode = false;
  @Output() showDialog   =  new EventEmitter<boolean>();
  @Output() actionEdited = new EventEmitter<Action>();
  @Output() lineActionEdited = new EventEmitter<Action>();
  selectedActionType = new ActionType();
  showDialogprdt: boolean;
  actionForm: FormGroup;
  MaintenancestateList: Array<MaintenanceState> = [];

  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier une action';
  actionList: Array<Action> = [];
  actionSearch: Action;

  constructor(

    private actionTpeService: ActionTypeService,
    private confirmationService: ConfirmationService,
    private maintenanceStateService : MaintenanceStateService,
    private formBuilder: FormBuilder,
    private authentificationService:AuthenticationService,

  ) { }

  ngOnInit() {
    this.title = 'Ajouter une action';
    this.displayDialog = true;

 if(!this.editMode){
     this.selectedAction = new Action();
   }
    this.maintenanceStateService.findAll().subscribe((data) => {
      this.MaintenancestateList = data;
    })
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
        Validators.required
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

  onLineEditedPrdt(line: ActionLine) {
    this.selectedAction.actionLines = this.selectedAction.actionLines.filter(
      (l) => l.product.id !== line.product.id
    );
    this.selectedAction.actionLines.push(line);
  }

  onDeleteMaintenanceLine(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Supprimer?',
      accept: () => {
        this.selectedAction.actionLines = this.selectedAction.actionLines.filter(
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
