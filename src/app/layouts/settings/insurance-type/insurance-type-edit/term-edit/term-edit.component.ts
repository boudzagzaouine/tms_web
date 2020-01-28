import { InsuranceTypeTerms } from './../../../../../shared/models/insurance-type-terms';
import { InsuranceTypeTermsService } from './../../../../../shared/services/api/insurance-type-term.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsuranceTermService } from './../../../../../shared/services/api/insurance-term.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsuranceTerm } from './../../../../../shared/models/insurance-term';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-term-edit',
  templateUrl: './term-edit.component.html',
  styleUrls: ['./term-edit.component.css']
})
export class TermEditComponent implements OnInit {



    @Input() selectedinsuranceTypeTerm = new InsuranceTypeTerms();
    @Input() editMode: boolean;
    @Output() insuranceTypeTermAdded = new EventEmitter<InsuranceTypeTerms>();

    closeResult: String;
    insuranceTypeTermForm: FormGroup;

    modal: NgbModalRef;
    isFormSubmitted = false;
    insuranceTermList: Array<InsuranceTerm> = [];

    constructor(
      private insuranceTermeService: InsuranceTermService,
      private insuranceTypeTermsService:InsuranceTypeTermsService,
      private modalService: NgbModal,
      private spinner: NgxSpinnerService,
      private toastr: ToastrService) { }

    ngOnInit() {
      this.initForm();
      this.insuranceTermeService.findAll().subscribe(
        data => {
          this.insuranceTermList = data;
        }
      );

    }

    initForm() {
      this.insuranceTypeTermForm = new FormGroup({
        'fTerm': new FormControl(this.selectedinsuranceTypeTerm.insuranceTerm, Validators.required),
        'fAmount': new FormControl({value :this.selectedinsuranceTypeTerm.amount,disabled: true},Validators.required)
      });
    }
    onSubmit() {
      this.isFormSubmitted = true;
      if (this.insuranceTypeTermForm.invalid) {return; }

      this.spinner.show();
      this.selectedinsuranceTypeTerm.amount = this.insuranceTypeTermForm.value['fAmount'];


      console.log(this.selectedinsuranceTypeTerm);


          this.insuranceTypeTermAdded.emit(this.selectedinsuranceTypeTerm);
          if (this.modal) {
            this.modal.close();
          }

              this.isFormSubmitted = false;
              this.spinner.hide();

    }

    open(content) {
      if (!this.editMode) {
        this.selectedinsuranceTypeTerm = new InsuranceTypeTerms();
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

    onSelecInsuranceTerm(event: any) {
      console.log(event);

      this.selectedinsuranceTypeTerm.insuranceTerm = event.value;
      console.log(this.selectedinsuranceTypeTerm.insuranceTerm);

      if (this.selectedinsuranceTypeTerm.insuranceTerm.roofed) {
        this.insuranceTypeTermForm.controls['fAmount'].enable();
      } else {
        this.insuranceTypeTermForm.controls['fAmount'].disable();
      }

    }

}
