import { NgxSpinnerService } from 'ngx-spinner';
import { ContractTypeService } from '../../../../shared/services';
import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsuranceService, InsuranceTermService, SupplierService } from '../../../../shared/services';
import { Insurance, InsuranceTerm, ContractType, Supplier } from '../../../../shared/models';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-insurance-edit',
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.css']
})
export class InsuranceEditComponent implements OnInit {
  @Input() selectedInsurance = new Insurance();
  @Input() editMode: boolean;
  closeResult: String;
  insuranceForm: FormGroup;
  insuranceTermList: InsuranceTerm[] = [];
  contractTypeList: ContractType[] = [];
  supplierList: Supplier[] = [];
  isFormSubmitted = false;

  modal: NgbModalRef;

  constructor(
    private insuranceService: InsuranceService,
    private insuranceTypeService: InsuranceTermService,
    private contractTypeService: ContractTypeService,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.insuranceTypeService.findAll().subscribe(
      data => {
        this.insuranceTermList = data;
      }
    );

    this.contractTypeService.findAll().subscribe(
      data => {
        this.contractTypeList = data;
      }
    );

    this.initForm();

  }

  initForm() {
    this.insuranceForm = new FormGroup({
      'code': new FormControl(this.selectedInsurance.code, Validators.required),
      'description': new FormControl(this.selectedInsurance.description),
      'startDate': new FormControl(new Date(this.selectedInsurance.startDate), Validators.required),
      'endDate': new FormControl(new Date(this.selectedInsurance.endDate), Validators.required),
      'amount': new FormControl(this.selectedInsurance.amount, Validators.required),
      'supplier': new FormControl(this.selectedInsurance.supplier, Validators.required),
      'contractType': new FormControl(this.selectedInsurance.contractType, Validators.required),
      'insuranceTerm': new FormControl(this.selectedInsurance.insuranceTerm)
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.insuranceForm.invalid) {return; }

    this.spinner.show();
    this.selectedInsurance.code = this.insuranceForm.value['code'];
    this.selectedInsurance.description = this.insuranceForm.value['description'];
    this.selectedInsurance.amount = +this.insuranceForm.value['amount'];
    this.selectedInsurance.startDate = this.insuranceForm.value['startDate'] as Date;
    this.selectedInsurance.endDate = this.insuranceForm.value['endDate'] as Date;

    console.log(this.selectedInsurance);
    const s = this.insuranceService.set(this.selectedInsurance).subscribe(
      data => {
        this.toastr.success('Elément enregistré avec succès', 'Edition');
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

  onSelectSupplier(event: any) {
    console.log(event);
    this.selectedInsurance.supplier = event;
    console.log(this.selectedInsurance.supplier);
  }


  onSelectContractType(event: any) {
    console.log(event);
    this.selectedInsurance.contractType = event.value;
    console.log(this.selectedInsurance.contractType);
  }


  onSelectInsuranceTerm(event: any) {
    console.log(event);
    this.selectedInsurance.insuranceTerm = event.value;
    console.log(this.selectedInsurance.insuranceTerm);
  }

  OnSearchSupplier(event){
    this.supplierService.find('code~' + event.query).subscribe(
      data => this.supplierList = data
    );
  }


  open(content) {
    if (!this.editMode) {
      this.selectedInsurance = new Insurance();
    }
    this.initForm();
    this.modal = this.modalService.open(content, { backdrop: 'static', centered: true, size: 'lg' });
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
