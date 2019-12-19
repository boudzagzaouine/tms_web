import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


import { ActivatedRoute, Router } from '@angular/router';
import { Badge, Driver, Contact } from './../../../shared/models';
import { BadgeService } from '../../../shared/services/api/badge.service';

import { DriverService } from '../../../shared/services/api/driver.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.css']
})
export class DriverEditComponent implements OnInit {

  driverForm: FormGroup;
  selectedContact = new Contact();
  selectedDriver: Driver = new Driver();
  badgesList: Array<Badge> = [];
  selectedBadge: Badge;
  idDriver: number;
  isFormSubmitted = false;
  fr: any;

  constructor(private formBuilder: FormBuilder,
    private driverService: DriverService,
    private badgeService: BadgeService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {

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

    this.initForm();

    this.badgeService.findAll().subscribe(
      data => {
        this.badgesList = data;
      }
    );

    if (this.route.snapshot.params['id'] >= 1) {
      this.idDriver = this.route.snapshot.params['id'];
      this.driverService.findById(this.idDriver).subscribe(
        data => {
          this.selectedDriver = data;
          console.log("badge");
          console.log(this.selectedDriver.badge.code);
          
          
          this.initForm();
        }
      );
    }
   
    
    

  }
  initForm(close=false) {
    const d = new Date(this.selectedDriver.birthDate);
    const dd = new Date(this.selectedDriver.lastMedicalVisit);
    this.driverForm = this.formBuilder.group(
      {

        'cin': new FormControl(this.selectedDriver.cin, Validators.required),
        'code': new FormControl(this.selectedDriver.code, Validators.required),
        'dateNaissance': new FormControl(d),
        'visiteMedicale': new FormControl(dd),
        'comission': new FormControl(this.selectedDriver.commission),
        'nom': new FormControl(this.selectedDriver.name, Validators.required),
        'tele': new FormControl(this.selectedDriver.tele1),
        'fax': new FormControl(this.selectedDriver.fax),
        'email': new FormControl(this.selectedDriver.email),
        'badge': new FormControl(this.selectedDriver.badge, Validators.required),
      }
    );
  }
  loadBadge() {
  }


  onSubmitForm() {

    this.isFormSubmitted = true;

    // stop here if form is invalid
    if (this.driverForm.invalid) {
      return;
    }
    this.spinner.show();
    const formValue = this.driverForm.value;
    this.selectedDriver.cin = formValue['cin'];
    this.selectedDriver.code = formValue['code'];
    this.selectedDriver.birthDate = formValue['dateNaissance'];
    this.selectedDriver.lastMedicalVisit = formValue['visiteMedicale'];
    this.selectedDriver.commission = formValue['comission'];
    this.selectedDriver.name = formValue['nom'];
    this.selectedDriver.email = formValue['email'];
    this.selectedDriver.tele1 = formValue['tele'];
    this.selectedDriver.fax = formValue['fax'];

    this.driverService.set(this.selectedDriver).subscribe(
      data => {
        this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');

        if (close) {
          this.router.navigate(['/core/drivers/list']);
        } else {

          this.router.navigate(['/core/drivers/edit']);
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
    this.spinner.hide();
    this.selectedDriver = new Driver();
    this.driverForm.reset();
  }
  onSelectBadgeCode(event) {
    this.selectedDriver.badge = event.value;
  }
}

