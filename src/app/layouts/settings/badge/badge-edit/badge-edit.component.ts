import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BadgeTypeService, BadgeService } from './../../../../shared/services';
import { BadgeType, Badge } from '../../../../shared/models';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-badge-edit',
  templateUrl: './badge-edit.component.html',
  styleUrls: ['./badge-edit.component.css']
})
export class BadgeEditComponent implements OnInit {

  @Input() selectedBadge = new Badge();
  @Input() editMode: boolean;
  @Output() badgeAdd = new EventEmitter<Badge>();

  closeResult: String;
  badgeForm: FormGroup;
  badgeTypeList: BadgeType[] = [];

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(
    private badgeService: BadgeService,
    private badgeTypeService: BadgeTypeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.badgeTypeService.findAll().subscribe(
      data => {
        this.badgeTypeList = data;
      }
    );

    this.initForm();

  }

  initForm() {
    this.badgeForm = new FormGroup({
      'code': new FormControl(this.selectedBadge.code, Validators.required),
      'badgeType': new FormControl(this.selectedBadge.badgeType),
      'description': new FormControl(this.selectedBadge.description)
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.badgeForm.invalid){ return; }

    this.spinner.show();

    this.selectedBadge.code = this.badgeForm.value['code'];
    this.selectedBadge.description = this.badgeForm.value['description'];

    console.log(this.selectedBadge);
    const s = this.badgeService.set(this.selectedBadge).subscribe(
      data => {
        this.badgeAdd.emit(data);
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



    this.selectedBadge = new Badge();
    if (this.modal) { this.modal.close(); }
    this.isFormSubmitted = false;
  }

  onSelectBadgeType(event: any) {
    console.log(event);
    this.selectedBadge.badgeType = event.value;
    console.log(this.selectedBadge.badgeType);
  }


  open(content) {
    if (!this.editMode) {
      this.selectedBadge = new Badge();
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
