import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CommissionTypeService } from './../../../../shared/services/api/commisionType.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommissionType } from './../../../../shared/models/commissionType';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AuthenticationService } from './../../../../shared/services';

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
  title = 'Modifier un type de commission';
  subscriptions= new Subscription();

  constructor(private commissionTypeService: CommissionTypeService,
    private authentificationService :AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    if (this.editMode === 1) {
      this.selectedCommissionType = new CommissionType();
      this.title = 'Ajouter un type de commission';

    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.commissionTypeForm = new FormGroup({
      'code': new FormControl(this.selectedCommissionType.code, Validators.required),
      'description': new FormControl(this.selectedCommissionType.description),
      'fAmount': new FormControl(this.selectedCommissionType.percentage, Validators.required),
      'fMinDistance': new FormControl(this.selectedCommissionType.minDistance, Validators.required),
      'fMaxDistance': new FormControl(this.selectedCommissionType.maxDistance, Validators.required),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.commissionTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedCommissionType.code = this.commissionTypeForm.value['code'];
    this.selectedCommissionType.description = this.commissionTypeForm.value['description'];
    this.selectedCommissionType.percentage = this.commissionTypeForm.value['fAmount'];
    this.selectedCommissionType.minDistance = this.commissionTypeForm.value['fMinDistance'];
    this.selectedCommissionType.maxDistance = this.commissionTypeForm.value['fMaxDistance'];
  this.selectedCommissionType.owner=this.authentificationService.getDefaultOwner();
    this.subscriptions.add(this.commissionTypeService.set(this.selectedCommissionType).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

       // this.toastr.success('Elément est Enregistré avec succès', 'Edition');
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

}
