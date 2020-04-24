import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsuranceTermService } from './../../../../shared/services/api/insurance-term.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsuranceTerm } from './../../../../shared/models/insurance-term';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, DoCheck } from '@angular/core';

@Component({
  selector: 'app-insurance-term-ediit',
  templateUrl: './insurance-term-ediit.component.html',
  styleUrls: ['./insurance-term-ediit.component.css']
})
export class InsuranceTermEdiitComponent implements OnInit {

  @Input() selectedInsuranceTerm = new InsuranceTerm();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
   insuranceTermForm: FormGroup;
   isFormSubmitted = false;
   displayDialog: boolean;

  constructor(private insuranceTermService: InsuranceTermService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
 
    if(this.editMode == 1){
   this.selectedInsuranceTerm=new InsuranceTerm();
    }

    this.displayDialog = true;
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
    const s = this.insuranceTermService.set(this.selectedInsuranceTerm).subscribe(
      data => {
        this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        // this.loadData();
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
  onHideDialog() {
    let a = false;
    this.showDialog.emit(a);
  }






}
