import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PaysService } from './../../../../../shared/services/api/pays.service';
import { VilleService } from './../../../../../shared/services/api/ville.service';
import { AddressService } from './../../../../../shared/services/api/address.service';
import { AuthenticationService } from './../../../../../shared/services/api/authentication.service';
import { Pays } from './../../../../../shared/models/pays';
import { Ville } from './../../../../../shared/models/ville';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address } from './../../../../../shared/models/address';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generate-address-edit',
  templateUrl: './generate-address-edit.component.html',
  styleUrls: ['./generate-address-edit.component.scss']
})
export class GenerateAddressEditComponent implements OnInit {

  @Input() selectedAddress: Address = new Address();
  @Input() editMode = false;
  @Output() addressEdited = new EventEmitter<Address>();
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier une Adresse';
  addressForm: FormGroup;
  addressCode :string ;
  addressTypeList:any[]=[];
  cityList :Ville[]=[];
  countryList :Pays[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,
    private addressService : AddressService,
    private  villeService :VilleService ,
    private paysService :PaysService,
    private toastr :ToastrService,


  ) { }

  ngOnInit() {


    this.addressTypeList=["Livraison","Facturation"]


    this.displayDialog = true;
    console.log(this.editMode);

    this.paysService.findAll().subscribe(
      data => {
    this.countryList =data;

      }
    );

    if (!this.editMode) {
      this.title = 'Ajouter une Adresse';

      console.log("new");
      this.selectedAddress = new Address();
  // this.addressService.generateCode().subscribe(
  //   data=> {

  //           this.addressCode = data;
  //           this.selectedAddress.code= this.addressCode;
  //           console.log(this.selectedAddress.code);

  //   }
  // );


    }
    else{
      this.title = 'Modifier un Address';







    }
    this.initForm();
    console.log(this.selectedAddress);



  }

  initForm() {

    this.addressForm = this.formBuilder.group({
      code: this.formBuilder.control(this.selectedAddress.code),
      line1: this.formBuilder.control(this.selectedAddress.line1,Validators.required),
      line2: this.formBuilder.control(this.selectedAddress.line2),
      country: this.formBuilder.control(this.selectedAddress.country ,Validators.required),
      city: this.formBuilder.control(this.selectedAddress.city,Validators.required),
      zip: this.formBuilder.control(this.selectedAddress.zip),
      latitude: this.formBuilder.control(this.selectedAddress.latitude),
      longtitude: this.formBuilder.control(this.selectedAddress.longitude),
      fAddressType: this.formBuilder.control(this.selectedAddress.addressTypeTms),
    });
  }


  onSelectAddressType(event){

    this.selectedAddress.addressTypeTms=event.value;



  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.addressForm.invalid) {
      return;
    }
   // this.selectedAddress.code = this.addressCode;
   this.selectedAddress.code = this.addressForm.value['code'];

    this.selectedAddress.line1 = this.addressForm.value['line1'];
    this.selectedAddress.addressType = 1; // 1 address Livraison
    this.selectedAddress.delivery = true;

    this.selectedAddress.addressTypeTms = "Livraison";
    this.selectedAddress.line2 = this.addressForm.value['line2'];

    this.selectedAddress.zip = this.addressForm.value['zip'];
    this.selectedAddress.latitude = this.addressForm.value['latitude'];
    this.selectedAddress.longitude = this.addressForm.value['longtitude'];
    this.selectedAddress.owner = this.authentificationService.getDefaultOwner();
    console.log(this.selectedAddress);

    // this.addressService.set(  this.selectedAddress).subscribe(
    //   data=> {
    //     this.selectedAddress=data;
              this.addressEdited.emit(this.selectedAddress);
    //           this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
    //   }
    // );
    this.displayDialog = false;

  }



  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }

  onSelectCountry(event){
    this.selectedAddress.country=event.value.code;
    this.selectedAddress.pays=event.value;
console.log(this.selectedAddress.country);

 this.villeService.findAll().subscribe(
  data=> {
  this.cityList=data;
  console.log(data);

  }
  );

  }

  onSelectCity(event){
    this.selectedAddress.city=event.value.code;
    this.selectedAddress.ville=event.value;

    this.addressForm.patchValue({
      latitude: this.selectedAddress.ville.latitude,
      longtitude: this.selectedAddress.ville.longitude,

      });
      this.addressForm.updateValueAndValidity();

    this.selectedAddress.latitude=this.selectedAddress.ville.latitude;
    this.selectedAddress.longitude=this.selectedAddress.ville.longitude;



  }


}
