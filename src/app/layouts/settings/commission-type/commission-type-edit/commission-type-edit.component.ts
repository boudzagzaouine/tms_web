import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CommissionTypeService } from './../../../../shared/services/api/commisionType.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommissionType } from './../../../../shared/models/commissionType';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-commission-type-edit',
  templateUrl: './commission-type-edit.component.html',
  styleUrls: ['./commission-type-edit.component.css']
})
export class CommissionTypeEditComponent implements OnInit {


  @Input() selectedCommissionType = new CommissionType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  commissionTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Type De Commission';
  constructor(private commissionTypeService: CommissionTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    if (this.editMode === 1) {
      this.selectedCommissionType = new CommissionType();
      this.title = 'Ajouter Type De Commission';

    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.commissionTypeForm = new FormGroup({
      'code': new FormControl(this.selectedCommissionType.code, Validators.required),
      'description': new FormControl(this.selectedCommissionType.description),
      'fAmount': new FormControl(this.selectedCommissionType.percentage, Validators.required),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.commissionTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedCommissionType.code = this.commissionTypeForm.value['code'];
    this.selectedCommissionType.description = this.commissionTypeForm.value['description'];
    this.selectedCommissionType.percentage = this.commissionTypeForm.value['fAmount'];

     this.commissionTypeService.set(this.selectedCommissionType).subscribe(
      data => {
        this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }


}
