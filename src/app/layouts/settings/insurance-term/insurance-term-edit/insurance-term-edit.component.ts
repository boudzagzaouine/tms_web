import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InsuranceTerm } from '../../../../shared/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsuranceTermService } from '../../../../shared/services';

@Component({
  selector: 'app-insurance-term-edit',
  templateUrl: './insurance-term-edit.component.html',
  styleUrls: ['./insurance-term-edit.component.css']
})
export class InsuranceTermEditComponent implements OnInit {
  @Input() selectedInsuranceTerm = new InsuranceTerm();
  @Input() editMode: boolean;
  @Input() insertOrUpdate: String;

  @Output() inssuranceTermAdd = new EventEmitter<InsuranceTerm>();
  closeResult: String;
  insuranceTermForm: FormGroup;
  insuranceTermTypeList: InsuranceTerm[] = [];

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(
    private insuranceTermService: InsuranceTermService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.insuranceTermForm = new FormGroup({
      'code': new FormControl(this.selectedInsuranceTerm.code, Validators.required),
      'description': new FormControl(this.selectedInsuranceTerm.description),
      'isvalue': new FormControl(this.selectedInsuranceTerm.roofed),
    });
  }
  onSubmit() {

    this.isFormSubmitted = true;
    if (this.insuranceTermForm.invalid) { return; }

    this.spinner.show();

    this.selectedInsuranceTerm.code = this.insuranceTermForm.value['code'];
    this.selectedInsuranceTerm.description = this.insuranceTermForm.value['description'];
    if (this.insuranceTermForm.value['isvalue'] === true) {
      this.selectedInsuranceTerm.roofed = true;
    } else {
      this.selectedInsuranceTerm.roofed = false;
    }
    console.log(this.insuranceTermForm.value['isvalue']);

    console.log(this.selectedInsuranceTerm);
    const s = this.insuranceTermService.set(this.selectedInsuranceTerm).subscribe(
      data => {
        this.inssuranceTermAdd.emit(data);
        this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        if (this.modal) { this.modal.close(); }
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );


    if (this.modal) { this.modal.close(); }
    this.isFormSubmitted = false;
  }

  open(content) {
    if (!this.editMode) {
      this.selectedInsuranceTerm = new InsuranceTerm();
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
