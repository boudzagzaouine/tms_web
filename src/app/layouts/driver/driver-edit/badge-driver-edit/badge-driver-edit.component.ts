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
  styleUrls: ['./badge-driver-edit.component.css']
})
export class BadgeDriverEditComponent implements OnInit {


   selectedBadgeDriver = new BadgeTypeDriver();

  @Output() badgeDriverAdd = new EventEmitter<BadgeTypeDriver>();
  selectedBadgeType = new BadgeType();
  closeResult: String;
  badgeTypeDriverForm: FormGroup;
  badgeTypeList: BadgeType[] = [];
  @Input()badgedriverList: BadgeTypeDriver[] = [];
fr: any;

  isFormSubmitted = false;
  page = 0;
  size = 8;
  collectionSize: number;
  searchQuery:string;
  constructor(private badgeTypeService: BadgeTypeService,
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
    console.log('avant comission  tye');

  this.loadBadgetype();

   console.log(this.badgeTypeList);


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



    this.selectedBadgeDriver.badgeNumber = this.badgeTypeDriverForm.value['fNumBadge'];
    this.selectedBadgeDriver.deliveranceDate = this.badgeTypeDriverForm.value['fDateDelivrance'];
    this.selectedBadgeDriver.validityEndDate = this.badgeTypeDriverForm.value['DateFin'];
     console.log('Form bdge');
    console.log(this.selectedBadgeDriver);



    this.badgedriverList = this.badgedriverList.filter(
      p => p.badgeType.id  !== this.selectedBadgeDriver.badgeType.id);

       this.badgedriverList.push(this.selectedBadgeDriver);
     this.badgeDriverAdd.emit(this.selectedBadgeDriver)




        this.isFormSubmitted = false;
    this.selectedBadgeDriver= new BadgeTypeDriver();

  }
  /*onLineEdited(line: BadgeTypeDriver) {

    console.log(line.id);

    this.badgedriverList = this.badgedriverList.filter(
      p => p.badgeType.id  !== line.badgeType.id );

    this.badgedriverList.push(line);

    console.log('line edited');

   // console.log(this.selectedDriver.badgeTypeDrivers);
  }*/

  onDeleteLine(line: BadgeTypeDriver) {

    this.badgedriverList = this.badgedriverList.filter(
      p => p.badgeType.id  !== line.badgeType.id );


  }
  loadBadge(search: string = '') {
    this.spinner.show();
    this.badgeTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.badgeTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.badgeTypeList = data;
        this.spinner.hide();
      },
      error => {


        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    //  this.loading = true;

    // this.page = this.drivers.slice(event.first, (event.first + event.rows));
    // this.loading = false;
    this.page = event.first / this.size;

    this.loadBadge(this.searchQuery);

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
