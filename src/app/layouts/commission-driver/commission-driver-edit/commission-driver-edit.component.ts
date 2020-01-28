import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommissionType } from './../../../shared/models/commissionType';
import { FormGroup } from '@angular/forms';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-commission-driver-edit',
  templateUrl: './commission-driver-edit.component.html',
  styleUrls: ['./commission-driver-edit.component.css']
})
export class CommissionDriverEditComponent implements OnInit {


  //@Input() selectedcommission = new Commission();
  @Input() editMode: boolean;
 // @Output() commissionAdd = new EventEmitter<Commission>();

  closeResult: String;
  commissionForm: FormGroup;
  commmissionTypeList: CommissionType[] = [];

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor( private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }


  onSubmitForm(){




  }

  initForm(){

  }
  open(content) {
    if (!this.editMode) {
    //  this.selectedcommission = new Commission();
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

  loadTypeCommision(){



  }


}
