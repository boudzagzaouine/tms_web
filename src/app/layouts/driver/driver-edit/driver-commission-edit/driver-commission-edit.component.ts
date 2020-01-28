import { CommissionTypeService } from './../../../../shared/services/api/commisionType.service';
import { CommissionDriver } from './../../../../shared/models/commission-driver';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommissionType } from './../../../../shared/models/commissionType';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-driver-commission-edit',
  templateUrl: './driver-commission-edit.component.html',
  styleUrls: ['./driver-commission-edit.component.css']
})
export class DriverCommissionEditComponent implements OnInit{






  selectedCommissionDriver = new CommissionDriver();

  @Output() commissionDriverAdd = new EventEmitter<CommissionDriver>();
  selectedCommissionType = new CommissionType();
  closeResult: String;
   commissionDriverForm: FormGroup;
  CommissionTypeList: CommissionType[] = [];
  @Input()commissiondriverList: CommissionDriver[] = [];

fr: any;

  isFormSubmitted = false;
  page = 0;
  size = 8;
  collectionSize: number;
  searchQuery:string;
  constructor(private commmissionTypeService: CommissionTypeService,
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

  this.loadCommissiontype();


  }

  initForm() {
    //const d = new Date(this.selectedCommissionDriver.datee);

    this.commissionDriverForm = new FormGroup({
      'fCommisionType': new FormControl(this.selectedCommissionDriver.commissionType, Validators.required),
      'fDateCommission': new FormControl(this.selectedCommissionDriver.datee, Validators.required),

    });
  }

  OnSubmitForm() {
console.log('debut');

    this.isFormSubmitted = true;
    if (this.commissionDriverForm.invalid) { return; }



    this.selectedCommissionDriver.datee = this.commissionDriverForm.value['fDateCommission'];
     console.log('Form commission');
     console.log(this.selectedCommissionDriver);


    /*this.commissiondriverList = this.commissiondriverList.filter(
      p => (p.id  !== this.selectedCommissionDriver.id));*/


    this.commissiondriverList.push(this.selectedCommissionDriver);
    this.commissionDriverAdd.emit(this.selectedCommissionDriver);



        this.isFormSubmitted = false;
    this.selectedCommissionDriver= new CommissionDriver();

  }
/*  onLineEdited() {

    console.log(line.id);

    this.badgedriverList = this.badgedriverList.filter(
      p => p.badgeType.id  !== line.badgeType.id );

    this.badgedriverList.push(line);

    console.log('line edited');

   // console.log(this.selectedDriver.badgeTypeDrivers);
  }*/

  onDeleteLine(line: CommissionDriver) {

    this.commissiondriverList = this.commissiondriverList.filter(
      p => p.commissionType.id  !== line.commissionType.id );
  }
  loadCommission(search: string = '') {
    this.spinner.show();
    this.commmissionTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.commmissionTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.CommissionTypeList = data;
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

    this.loadCommission(this.searchQuery);

  }


  loadCommissiontype() {
    this.commmissionTypeService.findAll().subscribe(
      data => {

        this.CommissionTypeList = data;


      }
    );
  }

  onSelectBadgeType(event) {
    console.log(event);
    this.selectedCommissionDriver.commissionType = event.value;




  }


}
