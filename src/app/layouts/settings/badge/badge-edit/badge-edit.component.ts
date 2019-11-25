import { BadgeTypeService, BadgeService } from './../../../../shared/services';
import { BadgeType, Badge } from './../../../../shared/models';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-badge-edit',
  templateUrl: './badge-edit.component.html',
  styleUrls: ['./badge-edit.component.css']
})
export class BadgeEditComponent implements OnInit {

  @Input() selectedBadge = new Badge();
  @Input() editMode: boolean;
  closeResult: String;
  badgeForm: FormGroup;
  badgeTypeList: BadgeType[] = [];

  modal: NgbModalRef;

  constructor(
    private badgeService: BadgeService,
    private badgeTypeService: BadgeTypeService,
    private modalService: NgbModal) { }

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
      'code': new FormControl(this.selectedBadge.code),
      'badgeType': new FormControl(this.selectedBadge.badgeType),
      'description': new FormControl(this.selectedBadge.description)
    });
  }
  onSubmit() {
    this.selectedBadge.code = this.badgeForm.value['code'];
    this.selectedBadge.description = this.badgeForm.value['description'];


    console.log(this.selectedBadge);
    const s = this.badgeService.set(this.selectedBadge);

    if (this.modal) { this.modal.close(); }
  }

  onSelectBadgeType(event: any) {
    console.log(event);
    this.selectedBadge.badgeType = event.value;
    console.log(this.selectedBadge.badgeType);
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
