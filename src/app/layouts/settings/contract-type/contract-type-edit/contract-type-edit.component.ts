import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ContractTypeService } from '../../../../shared/services';
import { ContractType } from './../../../../shared/models';

@Component({
  selector: 'app-contract-type-edit',
  templateUrl: './contract-type-edit.component.html',
  styleUrls: ['./contract-type-edit.component.css']
})
export class ContractTypeEditComponent implements OnInit {

  @Input() selectedContractType = new ContractType();
  @Input() editMode: boolean;
  closeResult: String;
  contractTypeForm: FormGroup;
  contractTypeTypeList: ContractType[] = [];

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(
    private contractTypeService: ContractTypeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
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

    console.log(this.selectedContractType);
    const s = this.contractTypeService.set(this.selectedContractType).subscribe(
      data => {
        this.contractTypeService.emitChanges();
        this.toastr.success('Elément enregistré avec succès', 'Success');
        if (this.modal) { this.modal.close(); }
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(
          'Elément n\'est enregistré',
          'Erreur'
        );
        console.log(error);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );

  }

  open(content) {
    if (!this.editMode) {
      this.selectedContractType = new ContractType();
    }
    this.initForm();
    this.modal = this.modalService.open(content, { backdrop: 'static', centered: true, size: 'sm' });
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
