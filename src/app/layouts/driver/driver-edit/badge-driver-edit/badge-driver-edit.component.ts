import { ConfirmationService } from 'primeng/api';
import { BadgeTypeDriverService } from './../../../../shared/services/api/badge-type-driver.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BadgeTypeService } from './../../../../shared/services/api/badge-type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BadgeTypeDriver } from './../../../../shared/models/badge-Type-Driver';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { BadgeType } from './../../../../shared/models/badge-Type';

@Component({
  selector: 'app-badge-driver-edit',
  templateUrl: './badge-driver-edit.component.html',
  styleUrls: ['./badge-driver-edit.component.css'],
  providers: [ConfirmationService]
})
export class BadgeDriverEditComponent implements OnInit {


   selectedBadgeDriver = new BadgeTypeDriver();

  badgeDriverAdd = new BadgeTypeDriver();
  selectedBadgeType = new BadgeType();
  closeResult: String;
  badgeTypeDriverForm: FormGroup;
  badgeTypeList: BadgeType[] = [];
  badgeTypeDriverList: BadgeTypeDriver[] = [];
  @Output()badgeTypedriverListEdit = new EventEmitter<BadgeTypeDriver[]>();
  fr: any;
  @Input() idDriver:number;

  isFormSubmitted = false;
  page = 0;
  size = 8;
  collectionSize: number;
  searchQuery:string;
  constructor(private badgeTypeService: BadgeTypeService,
    private badgeTypeDriverService:BadgeTypeDriverService,
    private confirmationService: ConfirmationService,
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

    this.loadBadgetype();
    this.badgeTypeDriverService.find('driver.id:' + this.idDriver).subscribe(
      data => {
        this.badgeTypeDriverList = data;
        console.log(this.idDriver);

        console.log(this.badgeTypeDriverList);

      }
    );






  }

  initForm() {
    const d = new Date(this.selectedBadgeDriver.deliveranceDate);
    const dd = new Date(this.selectedBadgeDriver.validityEndDate);
    this.badgeTypeDriverForm = new FormGroup({
      'fBadgeType': new FormControl(this.selectedBadgeDriver.badgeType, Validators.required),
      'fNumBadge': new FormControl(this.selectedBadgeDriver.badgeNumber, Validators.required),
      'fDateDelivrance': new FormControl(d, Validators.required),
      'DateFin': new FormControl(dd, Validators.required)

    });
  }

  OnSubmitForm() {
console.log('debut');

    this.isFormSubmitted = true;
    if (this.badgeTypeDriverForm.invalid) { return; }



    this.selectedBadgeDriver.badgeNumber = this.badgeTypeDriverForm.value['fNumBadge'];
    this.selectedBadgeDriver.deliveranceDate = this.badgeTypeDriverForm.value['fDateDelivrance'];
    this.selectedBadgeDriver.validityEndDate = this.badgeTypeDriverForm.value['DateFin'];

    console.log(this.selectedBadgeDriver);
    console.log(this.badgeTypeDriverList);


    this.badgeTypeDriverList = this.badgeTypeDriverList.filter(
      p => p.badgeType.id  !== this.selectedBadgeDriver.badgeType.id );

    this.badgeTypeDriverList.push(this.selectedBadgeDriver);

   this.badgeTypedriverListEdit.emit(this.badgeTypeDriverList);

     console.log( this.badgeTypedriverListEdit);

        this.isFormSubmitted = false;
    this.selectedBadgeDriver= new BadgeTypeDriver();

    this.badgeTypeDriverForm.reset();
  }
  /*onLineEdited() {



    this.badgedriverList = this.badgedriverList.filter(
      p => p.badgeType.id  !== badgeL.badgeType.id );

    this.badgedriverList.push(badgeL);


  }*/

  onDeleteLine(badgeL: BadgeTypeDriver) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
    this.badgeTypeDriverList = this.badgeTypeDriverList.filter(
      p => p.badgeType.id  !== badgeL.badgeType.id );

      this.badgeTypedriverListEdit.emit(this.badgeTypeDriverList);
    }
  });

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
