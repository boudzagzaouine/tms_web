import { InsuranceTypeTerms } from './../../../../shared/models/insurance-type-terms';
import { MachineService } from './../../../../shared/services/api/machine.service';
import { InsuranceTypeService } from './../../../../shared/services/api/insurance-type.service';
import { InsuranceType } from './../../../../shared/models/insurance-Type';
import { Subscription } from 'rxjs';
import { VehicleService } from './../../../../shared/services/api/vehicle.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsuranceService, InsuranceTermService, SupplierService } from '../../../../shared/services';
import { Insurance, InsuranceTerm, Supplier, Vehicle } from '../../../../shared/models';
import { ToastrService } from 'ngx-toastr';
import { InsuranceTermsVehicle } from '../../../../shared/models/insurance-terms-vehicle';
import { InsuranceTypeTermsService } from '../../../../shared/services/api/insurance-type-term.service';
import { PatrimonyService } from '../../../../shared/services/api/patrimony-service';
import { Patrimony } from '../../../../shared/models/patrimony';
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
  editModee = true;
  closeResult: String;
  idinsurancetype: number;

  insuranceForm: FormGroup;
  insuranceTermList: InsuranceTerm[] = [];
  patrimonyList: Array<Patrimony> = [];
  supplierList: Supplier[] = [];
  insuranceTypeList: InsuranceType[] = [];
  isFormSubmitted = false;
  displayDialog: boolean;
  subscriptions = new Subscription();
  inssuranceTypeTermList: InsuranceTypeTerms[] = [];

  title = 'Modifier assurance';
  constructor(
    private insuranceService: InsuranceService,
    private insuranceTypeTermsService: InsuranceTypeTermsService,
    private insuranceType: InsuranceTypeService,
    private patrimonyService: PatrimonyService,

    private supplierService: SupplierService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit() {

    this.insuranceType.findAll().subscribe(
      data => {
        this.insuranceTypeList = data;
      }
    );





    if (this.editMode === 1) {
      this.selectedInsurance = new Insurance();
      this.title = 'Ajouter une assurance';
      this.editModee = false;
    }
    // if(this.editMode === 4){
    //   this.editModee = false;
    // }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.insuranceForm = new FormGroup({
      'code': new FormControl( this.selectedInsurance.code, Validators.required),
      'startDate': new FormControl(new Date(this.selectedInsurance.startDate), Validators.required),
      'endDate': new FormControl(new Date(this.selectedInsurance.endDate), Validators.required),
      'amount': new FormControl(this.selectedInsurance.amount, Validators.required),
      'supplier': new FormControl(this.selectedInsurance.supplier, Validators.required),
      'patrimony': new FormControl(
          this.selectedInsurance.patrimony, Validators.required
      ),
      'typeinsurance': new FormControl(this.selectedInsurance.insuranceType, Validators.required),
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.insuranceForm.invalid) { return; }
    this.spinner.show();
    this.selectedInsurance.code = this.insuranceForm.value['code'];
    this.selectedInsurance.supplier = this.insuranceForm.value['supplier'];
    this.selectedInsurance.patrimony = this.insuranceForm.value['patrimony'];
    this.selectedInsurance.insuranceType = this.insuranceForm.value['typeinsurance'];
    this.selectedInsurance.startDate = this.insuranceForm.value['startDate'];
    this.selectedInsurance.endDate = this.insuranceForm.value['endDate'];
    this.selectedInsurance.amount = this.insuranceForm.value['amount'];




    const s = this.insuranceService.set(this.selectedInsurance).subscribe(
      data => {
        this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        //this.loadData();
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

  onPatrimonySearch(event: any) {
    this.patrimonyService.find('code~' + event.query).subscribe(
      data =>{

        this.patrimonyList = data ;
      }
    );
  }

  onSupplierSearch(event: any) {
    this.supplierService.find('code~' + event.query).subscribe(
      data =>{
        this.supplierList = data;
      }
    );
  }

  onLineEdited(line: InsuranceTermsVehicle) {
    this.selectedInsurance.insuranceTermLignes = this.selectedInsurance.insuranceTermLignes.filter(
      p => p.insuranceTerm.code !== line.insuranceTerm.code);
    this.selectedInsurance.insuranceTermLignes.push(line);
  }

  onDeleteLine(line: InsuranceTermsVehicle) {
    this.selectedInsurance.insuranceTermLignes = this.selectedInsurance.insuranceTermLignes.filter(
      p => p.insuranceTerm.id !== line.insuranceTerm.id);
  }

  onloadByTypeTermInsurance(idinsurancetype: number) {
    if (this.editMode === 1) {
      this.selectedInsurance.insuranceTermLignes = [];
    }
    this.subscriptions.add(this.insuranceTypeTermsService.findAll().subscribe(
      data => {
        this.inssuranceTypeTermList = data;
        this.inssuranceTypeTermList = this.inssuranceTypeTermList.filter(p => p.insuranceType.id === idinsurancetype);
        this.inssuranceTypeTermList.forEach(element => {
          this.selectedInsurance.insuranceTermLignes.push(new InsuranceTermsVehicle(element.insuranceTerm, element.amount));
        });
      }
    ));
  }
  onSelectInsuranceType(event: any) {
    this.selectedInsurance.insuranceType = event.value;
    this.idinsurancetype = this.selectedInsurance.insuranceType.id;
    this.selectedInsurance.insuranceTermLignes = [];
    this.onloadByTypeTermInsurance(this.idinsurancetype);
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
