import { ConfirmationService } from 'primeng/api';
import { Pays } from './../../../../../shared/models/pays';
import { Ville } from './../../../../../shared/models/ville';
import { PaysService } from './../../../../../shared/services/api/pays.service';
import { VilleService } from './../../../../../shared/services/api/ville.service';
import { AddressService } from './../../../../../shared/services/api/address.service';
import { AuthenticationService } from './../../../../../shared/services/api/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address } from './../../../../../shared/models/address';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css'],
  providers:[ConfirmationService]
})
export class AddressEditComponent implements OnInit {

  @Input() selectedAddress: Address = new Address();
  @Input() editMode = false;
  @Output() addressEdited = new EventEmitter<Address>();
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Address';
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
    private confirmationService:ConfirmationService



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
      this.title = 'Ajouter un Address';

      console.log("new");
      this.selectedAddress = new Address();
  // this.addressService.generateCode().subscribe(
  //   data=> {

  //           this.addressCode = data;
  //           this.selectedAddress.code= this.addressCode;
  //           this.selectedAddress.addressType = 1; // 2 address Livraison

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
    this.selectedAddress.addressType=this.selectedAddress.addressTypeTms=="Livraison"?1:2;


  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.addressForm.invalid) {
      return;
    }
  this.selectedAddress.code = this.addressForm.value['code'];
  this.selectedAddress.name = this.selectedAddress.code;
  this.selectedAddress.addressType = 1;//livraison

    this.selectedAddress.line1 = this.addressForm.value['line1'];

    this.selectedAddress.line2 = this.addressForm.value['line2'];

    this.selectedAddress.zip = this.addressForm.value['zip'];
    this.selectedAddress.latitude = this.addressForm.value['latitude'];
    this.selectedAddress.longitude = this.addressForm.value['longtitude'];
    this.selectedAddress.owner = this.authentificationService.getDefaultOwner();
    console.log(this.selectedAddress);

    if(this.selectedAddress.latitude==null || this.selectedAddress.longitude==null){
  this.confirmationService.confirm({
      message: "Voulez-vous affecter coordonner de ville",
      accept: () => {
        this.selectedAddress.latitude = this.selectedAddress.ville.latitude;
        console.log(this.selectedAddress.latitude);

        this.selectedAddress.longitude = this.selectedAddress.ville.longitude;
        this.addressEdited.emit(this.selectedAddress);
        this.displayDialog = false;
      },
    });
    }else{
      this.addressEdited.emit(this.selectedAddress);
      this.displayDialog = false;
    }



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
   console.log( this.selectedAddress.city);


  }

}
