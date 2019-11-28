import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
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
  closeResult: String;
  insuranceTermForm: FormGroup;
  insuranceTermTypeList: InsuranceTerm[] = [];

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(
    private insuranceTermService: InsuranceTermService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.insuranceTermForm = new FormGroup({
      'code': new FormControl(this.selectedInsuranceTerm.code, Validators.required),
      'description': new FormControl(this.selectedInsuranceTerm.description)
    });
  }
  onSubmit() {

    this.isFormSubmitted = true;
    if (this.insuranceTermForm.invalid) { return; }

    this.selectedInsuranceTerm.code = this.insuranceTermForm.value['code'];
    this.selectedInsuranceTerm.description = this.insuranceTermForm.value['description'];


    console.log(this.selectedInsuranceTerm);
    const s = this.insuranceTermService.set(this.selectedInsuranceTerm);

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
