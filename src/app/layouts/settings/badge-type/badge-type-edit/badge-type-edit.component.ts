import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BadgeType } from '../../../../shared/models';
import { BadgeTypeService } from '../../../../shared/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-badge-type-edit',
  templateUrl: './badge-type-edit.component.html',
  styleUrls: ['./badge-type-edit.component.css']
})
export class BadgeTypeEditComponent implements OnInit {

  @Input() selectedBadgeType = new BadgeType();
  @Input() editMode: boolean;
  @Input() insertOrUpdate: String;
  @Output() badgeTypeAdded = new EventEmitter<BadgeType>();

  closeResult: String;
  badgeTypeForm: FormGroup;
  badgeTypeTypeList: BadgeType[] = [];

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(
    private badgeTypeService: BadgeTypeService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.badgeTypeForm = new FormGroup({
      'code': new FormControl(this.selectedBadgeType.code, Validators.required),
      'description': new FormControl(this.selectedBadgeType.description)
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.badgeTypeForm.invalid) {return; }

    this.spinner.show();
    this.selectedBadgeType.code = this.badgeTypeForm.value['code'];
    this.selectedBadgeType.description = this.badgeTypeForm.value['description'];


    console.log(this.selectedBadgeType);

    const s = this.badgeTypeService.set(this.selectedBadgeType).subscribe(
      data => {
        this.badgeTypeAdded.emit(data);
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
      this.selectedBadgeType = new BadgeType();
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
