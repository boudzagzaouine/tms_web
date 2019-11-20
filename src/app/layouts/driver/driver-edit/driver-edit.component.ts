import { Badge, Driver, Contact} from './../../../shared/models';
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
  selectedDriver = new Driver();
  badgesList: Array<Badge> = [];
  selectedBadge: Badge;
  constructor(private formBuilder: FormBuilder,
    private driverService: DriverService,
    private badgeService: BadgeService) { }

  ngOnInit() {
    this.initForm();

    this.loadDataBadge();




  }
  initForm() {

    this.driverForm = this.formBuilder.group(
      {

        'cin': new FormControl(),
        'code': new FormControl(),
        'dateNaissance': new FormControl(),
        'visiteMedicale': new FormControl(),
        'comission': new FormControl(),
        'nom': new FormControl(),
        'tele': new FormControl(),
        'fax': new FormControl(),
        'email': new FormControl()
      }
    );
  }
  loadDataBadge() {

    this.badgeService.findAll().subscribe(

      data => {

        this.badgesList = data;
        console.log('badge :');
        console.log(this.badgesList);
      }
    );

  }

  onSubmitForm() {
    const formValue = this.driverForm.value;



    this.selectedDriver.cin = formValue['cin'];
    this.selectedDriver.code = formValue['code'];
    this.selectedDriver.birthDate = formValue['dateNaissance'];
    this.selectedDriver.lastMedicalVisit = formValue['visiteMedicale'];
    this.selectedDriver.commission = formValue['comission'];

    this.selectedContact.name = formValue['nom'];
    this.selectedContact.email = formValue['email'];
    this.selectedContact.tel1 = formValue['tele'];
    this.selectedContact.fax = formValue['fax'];


    this.selectedDriver.contact = this.selectedContact;
    this.driverService.add(this.selectedDriver);
    console.log('inserted');
    console.log(this.selectedDriver);


  }

  onSelectBadgeCode(event) {



    this.selectedDriver.badge = event.value;
    console.log('select change');
    console.log(event.value);
  }


}

