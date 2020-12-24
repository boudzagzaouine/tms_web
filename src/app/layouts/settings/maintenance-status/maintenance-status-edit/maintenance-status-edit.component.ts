import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Badge } from './../../../../shared/models/badge';
import { MaintenanceStateService } from './../../../../shared/services/api/maintenance-states.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaintenanceState } from './../../../../shared/models/maintenance-state';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../../shared/services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-maintenance-status-edit',
  templateUrl: './maintenance-status-edit.component.html',
  styleUrls: ['./maintenance-status-edit.component.css']
})
export class MaintenanceStatusEditComponent implements OnInit {

  @Input() selectedMaintenanceState = new MaintenanceState();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  maintenanceStateForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier état de maintenance';
  subscriptions= new Subscription();

  constructor(
    private maintenanceStateService: MaintenanceStateService,
    private authentificationService : AuthenticationService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private toastr: ToastrService) { }

  ngOnInit() {
    console.log(this.editMode);

    if (this.editMode === 1) {
      this.selectedMaintenanceState = new MaintenanceState();
      this.title = 'Ajouter état de maintenance';

    }

    this.displayDialog = true;
    this.initForm();
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.maintenanceStateForm.invalid) {
      return;
    }
    this.spinner.show();

    this.selectedMaintenanceState.code = this.maintenanceStateForm.value['code'];
    this.selectedMaintenanceState.description = this.maintenanceStateForm.value['description'];
  this.selectedMaintenanceState.owner=this.authentificationService.getDefaultOwner();

    console.log(this.selectedMaintenanceState);
    this.subscriptions.add(this.maintenanceStateService.set(this.selectedMaintenanceState).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est enregistré avec succès'});
        //this.toastr.success('Elément est enregistré avec succès', 'Edition');
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message);
        console.log(error);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    ));


  }
  initForm() {
    this.maintenanceStateForm = new FormGroup({
      'code': new FormControl(this.selectedMaintenanceState.code, Validators.required),
      'description': new FormControl(this.selectedMaintenanceState.description)
    });
  }


  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

