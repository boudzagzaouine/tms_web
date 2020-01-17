import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-consomtion-type-edit',
  templateUrl: './consomtion-type-edit.component.html',
  styleUrls: ['./consomtion-type-edit.component.css']
})
export class ConsomtionTypeEditComponent implements OnInit {

  
  closeResult: String;
  @Input() editMode: boolean;
  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(

    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {

  }


  onSubmit() {



  }

  open(content) {

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
