import { ActionTypeRepair } from './../../../../shared/models/action-type-repair';
import { SupplierService } from './../../../../shared/services/api/supplier.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActionType } from './../../../../shared/models/action-type';
import { ActionTypeService } from '../../../../shared/services/api/action-type.service';
import { AuthenticationService } from '../../../../shared/services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Supplier } from './../../../../shared/models';

@Component({
  selector: 'app-action-type-edit',
  templateUrl: './action-type-edit.component.html',
  styleUrls: ['./action-type-edit.component.scss']
})
export class ActionTypeEditComponent implements OnInit {

  @Input() selectedActionType = new ActionType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  actionTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type action';
  subscriptions= new Subscription();
  showDialogRepair: boolean;
  editModeActionTypeRepair: boolean;
  selectedActionTypeRepair :ActionTypeRepair= new ActionTypeRepair();
  idActionTypeRepair :number=0;
  constructor(private actionTypeService: ActionTypeService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService:ConfirmationService

  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedActionType = new ActionType();
      this.title = 'Ajouter un type action';
      this.selectedActionType.actionTypeRepairs= [];
    }else {
      if(this.selectedActionType.actionTypeRepairs ==null){
      this.selectedActionType.actionTypeRepairs= [];
      }
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.actionTypeForm = new FormGroup({
      'code': new FormControl(this.selectedActionType.code, Validators.required),
      'description': new FormControl(this.selectedActionType.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.actionTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedActionType.code = this.actionTypeForm.value['code'];
    this.selectedActionType.description = this.actionTypeForm.value['description'];
  this.selectedActionType.owner=this.authentificationService.getDefaultOwner();
    this.subscriptions.add( this.actionTypeService.set(this.selectedActionType).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

        //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }


  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onLineEditedActionTypeRepair(line: ActionTypeRepair) {
    console.log(line);

    this.selectedActionType.actionTypeRepairs = this.selectedActionType.actionTypeRepairs.filter(
      (l) => l.id !== line.id
    );
  this.idActionTypeRepair--;
   line.id=this.idActionTypeRepair;
    this.selectedActionType.actionTypeRepairs.push(line);

   console.log(this.selectedActionType.actionTypeRepairs);


  }
  onDeleteActionTypeRepair (id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.selectedActionType.actionTypeRepairs = this.selectedActionType.actionTypeRepairs.filter(
          (l) => l.id !== id
        );

      },
    });
  }
  onHideDialogActionTypeRepair(event) {
    this.showDialogRepair = event;
  }

  onShowDialogActionTypeRepair(line, mode) {
    this.showDialogRepair = true;

    if (mode == true) {
      console.log("true");
      console.log(line);

      this.selectedActionTypeRepair = line;
      this.editModeActionTypeRepair = true;

    } else if(mode ==false) {
      console.log("false");
      this.selectedActionTypeRepair=new ActionTypeRepair();
      this.editModeActionTypeRepair = false;

    }

  }

}
