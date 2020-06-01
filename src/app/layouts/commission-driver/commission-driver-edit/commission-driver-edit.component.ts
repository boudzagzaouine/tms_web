import { Driver } from './../../../shared/models/driver';
import { DriverService } from './../../../shared/services/api/driver.service';
import { CommissionTypeService } from './../../../shared/services/api/commisionType.service';
import { CommissionDriverService } from './../../../shared/services/api/commision-driver.service';
import { CommissionDriver } from './../../../shared/models/commission-driver';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommissionType } from './../../../shared/models/commissionType';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-commission-driver-edit',
  templateUrl: './commission-driver-edit.component.html',
  styleUrls: ['./commission-driver-edit.component.css']
})
export class CommissionDriverEditComponent implements OnInit {


  @Input() selectedCommissionDriver = new CommissionDriver();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  closeResult: String;
  commissionDriverForm: FormGroup;
  commissionDriverList: CommissionDriver[] = [];
  commissionDriverListC: CommissionDriver[] = [];

  commissionTypeList: CommissionType[] = [];
  DriverList: Driver[] = [];
  fr:any;

  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Commission chauffeur';

  constructor(
    private commisionDriverService: CommissionDriverService,
    private commissionTypeService: CommissionTypeService,
    private driverService: DriverService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    console.log(this.editMode);

    if (this.editMode === 1) {
      this.selectedCommissionDriver = new CommissionDriver();
      this.title = 'Ajouter Commission chauffeur';

    }

    this.displayDialog = true;
    this.initForm();
 this.loadCommissionType();
 this.loadDriver();

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
  }

  initForm() {
    let d=new Date(this.selectedCommissionDriver.datee);
    this.commissionDriverForm = new FormGroup({
      'fDate': new FormControl(d, Validators.required),
      'fDriver': new FormControl(this.selectedCommissionDriver.driver, Validators.required),
      'fcommissionType': new FormControl(this.selectedCommissionDriver.commissionType, Validators.required),

    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.commissionDriverForm.invalid) { return; }

    this.spinner.show();
    this.selectedCommissionDriver.datee = this.commissionDriverForm.value['fDate'];


    console.log(this.selectedCommissionDriver);

    const s = this.commisionDriverService.set(this.selectedCommissionDriver).subscribe(
      data => {

        this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        // this.loadData();
        this.displayDialog = false;
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


  loadCommissionType() {

    this.commissionTypeService.findAll().subscribe(
      data => {

        this.commissionTypeList = data;
      }
    );

  }
  onSelectCommmissioType(event) {

    this.selectedCommissionDriver.commissionType = event.value;
  }

  loadDriver() {

    this.driverService.findAll().subscribe(
      data => {

        this.DriverList = data;
      }
    );

  }
  onSelectdriver(event) {

    this.selectedCommissionDriver.driver = event.value;
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }




}
