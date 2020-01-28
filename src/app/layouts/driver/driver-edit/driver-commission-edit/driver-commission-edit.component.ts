import { CommissionDriverService } from './../../../../shared/services/api/commision-driver.service';
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
commissiondriverList: CommissionDriver[] = [];
@Output()commissionTypedriverListEdited = new EventEmitter<CommissionDriver[]>();

  @Input() idDriver:number;


fr: any;

  isFormSubmitted = false;
  page = 0;
  size = 8;
  collectionSize: number;
  searchQuery:string;
  constructor(private commmissionTypeService: CommissionTypeService,
     private commissiondriverService:CommissionDriverService,
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


  this.loadCommissiontype();
  this.commissiondriverService.find('driver.id:' + this.idDriver).subscribe(
    data => {
      this.commissiondriverList = data;
      console.log(this.idDriver);
      console.log(this.commissiondriverList);

    }
  );



  }

  initForm() {

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

     this.commissiondriverList = this.commissiondriverList.filter(
      p => ((p.commissionType.id  !== this.selectedCommissionDriver.commissionType.id))

       );

    this.commissiondriverList.push(this.selectedCommissionDriver);
    this.commissionTypedriverListEdited.emit(this.commissiondriverList);
    console.log( this.commissionTypedriverListEdited);

        this.isFormSubmitted = false;
        this.selectedCommissionDriver= new CommissionDriver();


  }


  onDeleteLine(commissionD: CommissionDriver) {

    this.commissiondriverList = this.commissiondriverList.filter(
      p => p.commissionType.id  !== commissionD.commissionType.id );

      this.commissionTypedriverListEdited.emit(this.commissiondriverList);

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
