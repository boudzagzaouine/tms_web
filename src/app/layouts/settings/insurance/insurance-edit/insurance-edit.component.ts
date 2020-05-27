import { Subscription } from 'rxjs';
import { VehicleService } from './../../../../shared/services/api/vehicle.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsuranceService, InsuranceTermService, SupplierService } from '../../../../shared/services';
import { Insurance, InsuranceTerm, Supplier, Vehicle } from '../../../../shared/models';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-insurance-edit',
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.css']
})
export class InsuranceEditComponent implements OnInit {

  size = 5;
  page = 0;

  @Input() selectedInsurance = new Insurance();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  closeResult: String;
  insuranceForm: FormGroup;
  insuranceTermList: InsuranceTerm[] = [];
  vehicleList: Vehicle[] = [];
  supplierList: Supplier[] = [];
  isFormSubmitted = false;
  badgeTypeForm: FormGroup;
  displayDialog: boolean;
  title = 'Assurance';
  constructor(
    private insuranceService: InsuranceService,
    private insuranceTypeService: InsuranceTermService,
    private vehicleService: VehicleService,
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

    this.supplierService.findAll().subscribe(
      data => {
        this.supplierList = data;
      }
    );
    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.insuranceForm = new FormGroup({
      'code': new FormControl(this.selectedInsurance.code, Validators.required),
      'description': new FormControl(this.selectedInsurance.description),
      'startDate': new FormControl(new Date(this.selectedInsurance.startDate), Validators.required),
      'endDate': new FormControl(new Date(this.selectedInsurance.endDate), Validators.required),
      'amount': new FormControl(this.selectedInsurance.amount, Validators.required),
      'supplier': new FormControl(this.selectedInsurance.supplier != null ?
        this.selectedInsurance.supplier.code : null, Validators.required),
      'vehiclecode': new FormControl(

         this.selectedInsurance.patrimony.registrationNumber ? this.selectedInsurance.patrimony.registrationNumber
         : this.selectedInsurance.patrimony.code
       ),
      'typeinsurance':new FormControl(this.selectedInsurance.insuranceType.code),
      'insuranceTerm': new FormControl(this.selectedInsurance.insuranceTerm != null ?
        this.selectedInsurance.insuranceTerm.code : null, Validators.required)
    });
  }





  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

 }
