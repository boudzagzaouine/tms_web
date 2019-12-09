import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsuranceService, InsuranceTermService, ContractTypeService, SupplierService } from '../../../shared/services';
import { Insurance, InsuranceTerm, ContractType, Supplier } from '../../../shared/models';

@Component({
  selector: 'app-insurance-edit',
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.css']
})
export class InsuranceEditComponent implements OnInit {

  selectedInsurance = new Insurance();
  editMode: boolean;
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
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.initForm();
    let id = this.activatedRoute.snapshot.params['id'];
    this.spinner.show();
    if (id) {
      this.activatedRoute.params.subscribe(params => {
        id = params['id'];
        this.insuranceService.findById(id).subscribe(data => {
          this.selectedInsurance = data;
          this.initForm();
          console.log(data);
        });
      }
      );

    } else {
      this.initForm();
    }


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
    if (this.insuranceForm.invalid) { return; }

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

  OnSearchSupplier(event) {
    this.supplierService.find('code~' + event.query).subscribe(
      data => this.supplierList = data
    );
  }
}
