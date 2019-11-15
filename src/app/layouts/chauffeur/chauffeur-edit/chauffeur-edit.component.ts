import { Driver } from './../../../shared/models/driver';
import { DriverService } from './../../../shared/services/api/driver.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chauffeur-edit',
  templateUrl: './chauffeur-edit.component.html',
  styleUrls: ['./chauffeur-edit.component.css']
})
export class ChauffeurEditComponent implements OnInit {


  driverForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private driverService: DriverService) { }

  ngOnInit() {
    this.initForm();

  }
  initForm() {

    this.driverForm = this.formBuilder.group(
      {

        'cin': new FormControl(),
        'code': new FormControl(),
        'dateNaissance': new FormControl(),
        'visiteMedicale': new FormControl(),
        'comission': new FormControl(),
        'contact': new FormControl(),
        'tele': new FormControl(),
        'fax': new FormControl(),
        'email': new FormControl()
      }
    );
  }


  onSubmitForm() {
    const formValue = this.driverForm.value;
    const newDriver = new Driver();
    newDriver.cin = formValue['cin'];
    newDriver.code = formValue['code'];
    newDriver.birthDate = formValue['dateNaissance'];
    newDriver.lastMedicalVisit = formValue['visiteMedicale'];
    newDriver.commission = formValue['comission'];
    newDriver.contact = newDriver.cin = formValue['contact'];

    console.log(newDriver);

    this.driverService.add(newDriver);
    console.log('inserted' + newDriver);

  }



}

