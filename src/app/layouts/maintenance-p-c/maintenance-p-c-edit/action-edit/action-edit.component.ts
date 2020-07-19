import { ActionLine } from './../../../../shared/models/action-line';
import { RoundPipe } from 'ngx-pipes';
import { Router, ActivatedRoute } from '@angular/router';
import { MaintenanceStateService } from './../../../../shared/services/api/maintenance-states.service';
import { ConfirmationService } from 'primeng/api';
import { ActionTypeService } from './../../../../shared/services/api/action-type.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaintenanceState } from './../../../../shared/models/maintenance-state';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActionType } from './../../../../shared/models/action-type';
import { Action } from './../../../../shared/models/action';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-edit',
  templateUrl: './action-edit.component.html',
  styleUrls: ['./action-edit.component.css']
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
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private actionTpeService: ActionTypeService,
    private confirmationService: ConfirmationService,
    private maintenanceStateService : MaintenanceStateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.title = 'Ajouter une action';
    this.displayDialog = true;

    console.log(this.editMode);
 if(!this.editMode){
     this.selectedAction = new Action();
   }
    console.log(this.selectedAction);
    this.maintenanceStateService.findAll().subscribe((data) => {
      this.MaintenancestateList = data;
    })
    this.initForm();
    console.log(this.actionForm);

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

    console.log(this.selectedAction);
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
      message: 'Voulez vous vraiment Suprimer?',
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
