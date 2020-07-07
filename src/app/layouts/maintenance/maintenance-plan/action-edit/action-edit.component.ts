import { EventEmitter } from '@angular/core';
import { ActionTypeService } from './../../../../shared/services/api/action-type.service';
import { ActionType } from './../../../../shared/models/action-type';
import { ActionLine } from './../../../../shared/models/action-line';
import { Action } from './../../../../shared/models/action';
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
  providers: [RoundPipe],
})
export class ActionEditComponent implements OnInit {
  page = 0;
  size = 8;
  @Input() selectedAction = new Action();
  @Output() showDialog   =  new EventEmitter<boolean>();
  @Output() actionEdited = new EventEmitter<Action>();
  @Output() test = new EventEmitter<Action>();
  selectedActionType = new ActionType();
  showDialogprdt: boolean;
  actionForm: FormGroup;
  @Input() editMode = false;
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
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roundPipe: RoundPipe
  ) { }

  ngOnInit() {
    this.title = 'Ajouter une action';
    this.displayDialog = true;
 if(!this.editMode){
     this.selectedAction = new Action();
   }
    console.log(this.selectedAction);

    this.initForm();
  }
  initForm() {
    this.actionForm = this.formBuilder.group({
      Fcode: new FormControl(
        { value:  this.selectedAction.actionType, disabled: this.editMode },
        Validators.required
      ),
      FstatusMaintenance: new FormControl(
        this.selectedAction.maintenanceState
      ),
    });
  }

  onActionCodeSearch(event) {
    this.actionTpeService.find('code~' + event.query).subscribe((data) => {
      this.actionList = data;
    });
  }
  onActionDescriptionSearch(event) {
    this.actionTpeService.find('description~' + event.query).subscribe((data) => {
      this.actionList = data;
    });
  }

  onSubmit() {

   // this.test.emit(this.selectedAction);

    //this.displayDialog = false;
    this.isFormSubmitted = true;
    if (this.actionForm.invalid) {
      return;
    }

    console.log(this.selectedAction);
    this.selectedAction.actionType = this.selectedActionType;

    this.test.emit(this.selectedAction);

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
     console.log(line);

     this.actionEdited = line;

  }
  onHideDialogPrdt(event) {
    this.showDialogprdt = event;
  }


}
