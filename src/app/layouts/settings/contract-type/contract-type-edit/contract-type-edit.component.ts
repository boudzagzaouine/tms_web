import { ContractType } from './../../../../shared/models/contract-type';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ContractTypeService } from '../../../../shared/services';

@Component({
  selector: 'app-contract-type-edit',
  templateUrl: './contract-type-edit.component.html',
  styleUrls: ['./contract-type-edit.component.css']
})
export class ContractTypeEditComponent implements OnInit {

  @Input() selectedContractType = new ContractType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  contractTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Type de Contrat';

  constructor(
    private contractTypeService: ContractTypeService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    if (this.editMode === 1) {
      this.selectedContractType = new ContractType();
      this.title = 'Ajouter Type de  Contrat';
    }

    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.contractTypeForm = new FormGroup({
      'code': new FormControl(this.selectedContractType.code, Validators.required),
      'description': new FormControl(this.selectedContractType.description)
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.contractTypeForm.invalid) { return; }

    this.spinner.show();
    this.selectedContractType.code = this.contractTypeForm.value['code'];
    this.selectedContractType.description = this.contractTypeForm.value['description'];

    this.contractTypeService.set(this.selectedContractType).subscribe(
      data => {
        this.toastr.success('Elément Enregistré avec succès', 'Edition');
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message);
        console.log(error);
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
