import { BadgeTypeService } from './../../../../shared/services/api/badge-type.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BadgeTypeDriver } from './../../../../shared/models/badge-Type-Driver';
import { BadgeType } from './../../../../shared/models/badge-Type';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-driver-badgetype-line-edit',
  templateUrl: './driver-badgetype-line-edit.component.html',
  styleUrls: ['./driver-badgetype-line-edit.component.css']
})
export class DriverBadgetypeLineEditComponent implements OnInit {

  @Input() selectedBadgeDriver = new BadgeTypeDriver();
  @Input() editMode: boolean;
  @Output() badgeDriverAdd = new EventEmitter<BadgeTypeDriver>();
  selectedBadgeType = new BadgeType();
  closeResult: String;
  badgeTypeDriverForm: FormGroup;
  badgeTypeList: BadgeType[] = [];
fr: any;
  modal: NgbModalRef;
  isFormSubmitted = false;
  constructor(private badgeTypeService: BadgeTypeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initForm();
    this.fr = {
      firstDayOfWeek: 1,
      dayNames: ['dimanche', 'lundi', 'mardi ', 'mercredi', 'mercredi ', 'vendredi ', 'samedi '],
      dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      monthNamesShort: ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jui', 'aoû', 'sep', 'oct', 'nov', 'dic'],
      today: 'Aujourd hui',
      clear: 'Supprimer'
    };
    console.log('avant badge tye');

  this.loadBadgetype();


  }

  initForm() {
    this.badgeTypeDriverForm = new FormGroup({
      'fBadgeType': new FormControl(this.selectedBadgeDriver.badgeType, Validators.required),
      'fNumBadge': new FormControl(this.selectedBadgeDriver.badgeNumber, Validators.required),
      'fDateDelivrance': new FormControl(this.selectedBadgeDriver.deliveranceDate, Validators.required),
      'DateFin': new FormControl(this.selectedBadgeDriver.validityEndDate, Validators.required)

    });
  }

  OnSubmitForm() {
console.log('debut');

    this.isFormSubmitted = true;
    if (this.badgeTypeDriverForm.invalid) { return; }

    this.spinner.show();

    this.selectedBadgeDriver.badgeNumber = this.badgeTypeDriverForm.value['fNumBadge'];
    this.selectedBadgeDriver.deliveranceDate = this.badgeTypeDriverForm.value['fDateDelivrance'];
    this.selectedBadgeDriver.validityEndDate = this.badgeTypeDriverForm.value['DateFin'];
     console.log('Form');
    console.log(this.selectedBadgeDriver);

    this.badgeDriverAdd.emit(this.selectedBadgeDriver);

    if (this.modal) {
      this.modal.close();
    }

        this.isFormSubmitted = false;
        this.spinner.hide();


  }



  open(content) {
    if (!this.editMode) {
      this.selectedBadgeDriver = new BadgeTypeDriver();
    }
    this.initForm();
    this.modal = this.modalService.open(content, { backdrop: 'static', centered: true});
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

  loadBadgetype() {
    this.badgeTypeService.findAll().subscribe(
      data => {

        this.badgeTypeList = data;


      }
    );
  }

  onSelectBadgeType(event) {
    console.log(event);
    this.selectedBadgeDriver.badgeType = event.value;
    console.log('badge type sl');

    console.log(this.selectedBadgeDriver.badgeType);

  }
}
