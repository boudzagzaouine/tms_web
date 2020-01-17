import { Subscription } from 'rxjs';
import { CommissionTypeService } from './../../../../shared/services/api/commisionType.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommissionType } from './../../../../shared/models/commissionType';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-commission-type-edit',
  templateUrl: './commission-type-edit.component.html',
  styleUrls: ['./commission-type-edit.component.css']
})
export class CommissionTypeEditComponent implements OnInit {


  @Input() selectedCommissionType = new CommissionType();
  @Input() editMode: boolean;
  @Output() commissionTypeAdd = new EventEmitter<CommissionType>();

  closeResult: String;
  commissionTypeForm: FormGroup;

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(private commissionTypeService: CommissionTypeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.commissionTypeForm = new FormGroup({
      'fCode': new FormControl(this.selectedCommissionType.code, Validators.required),
      'fDescription': new FormControl(this.selectedCommissionType.description)
    });
  }

  onSubmit() {

    this.isFormSubmitted = true;
    if (this.commissionTypeForm.invalid) { return; }

    this.spinner.show();

    this.selectedCommissionType.code = this.commissionTypeForm.value['fCode'];
    this.selectedCommissionType.description = this.commissionTypeForm.value['fDescription'];
    this.selectedCommissionType.percentage = 5;

    this.commissionTypeService.set(this.selectedCommissionType).subscribe(
      data => {
        this.commissionTypeAdd.emit(data);
        this.toastr.success('Elément Enregistré avec succès', 'Edition');
        if (this.modal) { this.modal.close(); }
        this.isFormSubmitted = false;
        this.spinner.hide();
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
      this.selectedCommissionType = new CommissionType();
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
