import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaintenanceLineRefService } from '../../../../shared/services/api/maintenance-line-ref.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaintenanceLineRef } from '../../../../shared/models/maintenance-line-ref';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-maintenance-line-ref-edit',
  templateUrl: './maintenance-line-ref-edit.component.html',
  styleUrls: ['./maintenance-line-ref-edit.component.css']
})
export class MaintenanceLineRefEditComponent implements OnInit {

  @Input() selectedMaintenanceLineRef = new MaintenanceLineRef();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  maintenanceLineRefForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de maintenance';


  constructor(private maintenanceLineRefService: MaintenanceLineRefService,

    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {

    if (this.editMode === 1) {
      this.selectedMaintenanceLineRef = new MaintenanceLineRef();
      this.title = 'Ajouter un type de maintenance';
    }

    this.displayDialog = true;
    this.initForm();
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.maintenanceLineRefForm.invalid) {
      return;
    }


    this.selectedMaintenanceLineRef.code = this.maintenanceLineRefForm.value['code'];
    this.selectedMaintenanceLineRef.description = this.maintenanceLineRefForm.value['description'];

      this.maintenanceLineRefService.set(this.selectedMaintenanceLineRef).subscribe(
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
    this.maintenanceLineRefForm = new FormGroup({
      'code': new FormControl(this.selectedMaintenanceLineRef.code, Validators.required),
      'description': new FormControl(this.selectedMaintenanceLineRef.description)
    });
  }



  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }


}
