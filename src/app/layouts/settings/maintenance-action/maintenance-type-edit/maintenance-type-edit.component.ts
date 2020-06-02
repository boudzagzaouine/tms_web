import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaintenanceActionService } from '../../../../shared/services/api/maintenance-action.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaintenanceAction } from '../../../../shared/models/maintenance-action';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-maintenance-action-edit',
  templateUrl: './maintenance-action-edit.component.html',
  styleUrls: ['./maintenance-action-edit.component.css']
})
export class MaintenanceActionEditComponent implements OnInit {

  @Input() selectedMaintenanceAction = new MaintenanceAction();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  maintenanceActionForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de maintenance';


  constructor(private maintenanceActionService: MaintenanceActionService,

    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {

    if (this.editMode === 1) {
      this.selectedMaintenanceAction = new MaintenanceAction();
      this.title = 'Ajouter un type de maintenance';
    }

    this.displayDialog = true;
    this.initForm();
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.maintenanceActionForm.invalid) {
      return;
    }


    this.selectedMaintenanceAction.code = this.maintenanceActionForm.value['code'];
    this.selectedMaintenanceAction.description = this.maintenanceActionForm.value['description'];

      this.maintenanceActionService.set(this.selectedMaintenanceAction).subscribe(
      data => {

        this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message );
        console.log(error);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );
  }
  initForm() {
    this.maintenanceActionForm = new FormGroup({
      'code': new FormControl(this.selectedMaintenanceAction.code, Validators.required),
      'description': new FormControl(this.selectedMaintenanceAction.description)
    });
  }



  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }


}
