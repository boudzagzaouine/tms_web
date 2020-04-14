import { element } from 'protractor';
import { Driver } from './../../../../shared/models/driver';
import { InsuranceTypeTerms } from './../../../../shared/models/insurance-type-terms';
import { InsuranceTypeTermsService } from './../../../../shared/services/api/insurance-type-term.service';
import { InsuranceTermService } from './../../../../shared/services/api/insurance-term.service';
import { InsuranceTerm } from './../../../../shared/models/insurance-term';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsuranceTypeService } from './../../../../shared/services/api/insurance-type.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsuranceType } from './../../../../shared/models/insurance-Type';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-insurance-type-edit',
  templateUrl: './insurance-type-edit.component.html',
  styleUrls: ['./insurance-type-edit.component.css']
})
export class InsuranceTypeEditComponent implements OnInit {


  @Input() selectedinsuranceType = new InsuranceType();
  @Input() editMode: boolean;
  @Input() insertOrUpdate: String;
  @Output() insuranceTypeAdded = new EventEmitter<InsuranceType>();
  insurannceTypeTerms: InsuranceTypeTerms[] = [];
  insurancetypee: number;
  page = 0;
  size = 10;
  collectionSize: number;

  searchQuery: string;

  closeResult: String;
  insuranceTypeForm: FormGroup;
  selectInsurannceTypeTerms: any;
  insuranceTypeTermsList: Array<InsuranceTypeTerms> = [];
  insuranceTypeTermsListC: Array<InsuranceTypeTerms> = [];

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(
    private insuranceTypeService: InsuranceTypeService,
    private insuranceTermService: InsuranceTermService,
    private insuranceTypeTermsService: InsuranceTypeTermsService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();


  }

  initForm() {
    this.insuranceTypeForm = new FormGroup({
      'code': new FormControl(this.selectedinsuranceType.code, Validators.required),
      'description': new FormControl(this.selectedinsuranceType.description)
    });
  }

  onDeleteLine(insuranceTerms: InsuranceTypeTerms) {


    this.insuranceTypeTermsList = this.insuranceTypeTermsList.filter(
      p => p.insuranceTerm.id !== insuranceTerms.insuranceTerm.id);
    console.log("delete");

    console.log(this.insuranceTypeTermsList);



  }
  /* loadData() {

     this.spinner.show();

     this.insuranceTypeTermsService.findAllPagination().subscribe(
       data => {
         console.log("find with id insurance type");
         this.insuranceTypeTermsList = data;
         console.log(data);

         this.spinner.hide();
       },
       error => {


         this.spinner.hide();
       },
       () => this.spinner.hide()
     );
   }*/
  /* loadDataLazy(event) {
     this.page = event.first / this.size;
     console.log('first : ' + event.first);
     this.loadData(this.searchQuery);
   }*/
  onLineEdited(insuranceTerms: InsuranceTypeTerms) {

    console.log(insuranceTerms.id);

    this.insuranceTypeTermsList = this.insuranceTypeTermsList.filter(
      p => p.insuranceTerm.id !== insuranceTerms.insuranceTerm.id);

    this.insuranceTypeTermsList.push(insuranceTerms);

    console.log('line edited');

    console.log(this.insuranceTypeTermsList);
  }

  onSubmit() {
    console.log(this.selectedinsuranceType.insuranceTypeTermsSet);

    if (this.insuranceTypeForm.invalid) { return; }

    this.spinner.show();
    this.selectedinsuranceType.code = this.insuranceTypeForm.value['code'];
    this.selectedinsuranceType.description = this.insuranceTypeForm.value['description'];


    console.log(this.selectedinsuranceType);

    this.insuranceTypeService.set(this.selectedinsuranceType).subscribe(
      dataIt => {
        this.insuranceTypeAdded.emit(dataIt);
        console.log(dataIt);
        if (this.editMode) {

         this.insuranceTypeTermsListC.forEach(eleme=>{
                 this.insuranceTypeTermsService.delete(eleme.id).subscribe(
                       d=>{
                        console.log(eleme.id);

                       }
                 );
                });
        }
        if (this.insuranceTypeTermsList.length) {
          console.log(this.insuranceTypeTermsList.length);

          this.insuranceTypeTermsList.forEach(
            element => {
              console.log("element");

              console.log(element.insuranceTerm.code + dataIt.id);
              this.selectInsurannceTypeTerms = new InsuranceTypeTerms(dataIt, element.insuranceTerm, element.amount);
              console.log(this.selectInsurannceTypeTerms);

              this.insuranceTypeTermsService.set(this.selectInsurannceTypeTerms).subscribe(
                data => {
                  console.log(data);

                });
            });

        }
        this.toastr.success('Elément Enregistré avec succès', 'Edition');
        if (this.modal) { this.modal.close(); }
        this.isFormSubmitted = false;
        this.spinner.hide();
        console.log("insertion Type");
        console.log(this.selectedinsuranceType);




      },
      error => {
        this.toastr.error(error.error.message);
        console.log(error);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );
  }

  open(content) {
    if (!this.editMode) {
      this.selectedinsuranceType = new InsuranceType();
      this.insuranceTypeTermsList = [];
    }
    else {
      this.insuranceTypeTermsList = [];
      this.insurancetypee = this.selectedinsuranceType.id;
      console.log(this.insurancetypee);

      this.insuranceTypeTermsService.findAllPagination(this.page, this.size).subscribe(
        data => {
          console.log("find with id insurance type");
          this.insuranceTypeTermsList = data;
          this.insuranceTypeTermsList = this.insuranceTypeTermsList.filter(
            p =>
              ((p.insuranceType.id === this.selectedinsuranceType.id))


          );
          this.insuranceTypeTermsListC = this.insuranceTypeTermsList;
          console.log(data);

          this.spinner.hide();
        },
      );

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

  /*onInsuranceTermAdded(event) {
    this.loadData();
  }*/

}
