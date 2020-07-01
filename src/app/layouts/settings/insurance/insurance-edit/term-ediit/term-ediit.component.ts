import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InsuranceTermService } from './../../../../../shared/services/api/insurance-term.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { InsuranceTermsVehicle } from './../../../../../shared/models/insurance-terms-vehicle';
import { ModalDismissReasons, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { InsuranceTerm } from './../../../../../shared/models/insurance-term';

@Component({
  selector: 'app-term-ediit',
  templateUrl: './term-ediit.component.html',
  styleUrls: ['./term-ediit.component.css']
})
export class TermEdiitComponent implements OnInit {

  modal: NgbModalRef;
  @Input() editMode: boolean;
  @Input() selectedTermLigne = new InsuranceTermsVehicle();
  @Output() insuranceTermLineAdded = new EventEmitter<InsuranceTermsVehicle>();

   valueamount: boolean;
  closeResult: String;
  insuranceTermLineForm: FormGroup;
  insuranceTermLineList: InsuranceTermsVehicle[] = [];
  insuranceTermList: InsuranceTerm[] = [];
  isFormSubmitted = false;
  title ='Modifier un terme assurance';
  constructor( private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
   // private insuranceTermLineService:InsuranceTermLineService,
    private insuranceTermService: InsuranceTermService) { }

  ngOnInit() {
 this.loadTermInsurance();

    this.initForm();


  }

  initForm() {
    this.insuranceTermLineForm = new FormGroup({
      'FTermInsurance': new FormControl(this.selectedTermLigne.insuranceTerm, Validators.required),
      'Famount': new FormControl({value: this.selectedTermLigne.amount, disabled: true}
        , Validators.required),
    });
  }

  onSubmit() {


    this.isFormSubmitted = true;

    if (this.insuranceTermLineForm.invalid) {
      return;
    }

   // this.selectedTermLigne.insuranceTerm.code= this.insuranceTermLineForm['FTermInsurance'];
   this.selectedTermLigne.amount = this.insuranceTermLineForm.value['Famount'];

   this.insuranceTermLineAdded.emit(this.selectedTermLigne);

   console.log('term assurance');

   console.log(this.selectedTermLigne.insuranceTerm.code);




    if (this.modal) {
      this.modal.close();
    }

        this.isFormSubmitted = false;



  }
  open(content) {
    this.isFormSubmitted = false;
    if (!this.editMode) {
      this.selectedTermLigne = new InsuranceTermsVehicle();
      this.title ='Ajouter un terme assurance';

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

  onSelectChangeTermInsurance(event) {
   this.selectedTermLigne.insuranceTerm = event.value;
console.log(event.value);
if (this.selectedTermLigne.insuranceTerm.roofed) {
  this.insuranceTermLineForm.controls['Famount'].enable();
} else {
  this.insuranceTermLineForm.controls['Famount'].disable();
}

   console.log('term assurance Selectionee ');
   console.log(this.selectedTermLigne.insuranceTerm);
  }

  loadTermInsurance() {
    console.log('chargement term insurance');

    this.insuranceTermService.findAll().subscribe(
      data => {
        this.insuranceTermList = data;
        console.log(this.insuranceTermList);

      }
    );
  }

}
