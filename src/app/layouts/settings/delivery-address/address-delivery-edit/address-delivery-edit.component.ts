import { PaysService } from './../../../../shared/services/api/pays.service';
import { VilleService } from './../../../../shared/services/api/ville.service';
import { Ville } from './../../../../shared/models/ville';
import { Pays } from './../../../../shared/models/pays';
import { Address } from './../../../../shared/models/address';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { AddressService } from './../../../../shared/services/api/address.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-delivery-edit',
  templateUrl: './address-delivery-edit.component.html',
  styleUrls: ['./address-delivery-edit.component.scss']
})
export class AddressDeliveryEditComponent implements OnInit {


  @Input() selectedAddress = new Address();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  addressForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier adresse de livraison';
  subscriptions= new Subscription();
  countryList : Pays[]=[];
  cityList : Ville[]=[];
  constructor(
    private addressService: AddressService,
    private villeService: VilleService,
    private paysService : PaysService,
    private auhtentificationService:AuthenticationService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,

    private spinner: NgxSpinnerService) { }


  ngOnInit() {

    this.villeService.findAll().subscribe(
      data=>{
        this.cityList = data;
      }
    );

    this.paysService.findAll().subscribe(
      data=>{
        this.countryList = data;
      }
    );


    if (this.editMode === 1) {
      this.selectedAddress = new Address();
      this.title = 'Ajouter adresse de livraison';

    }
    console.log(this.selectedAddress);

    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    this.addressForm = new FormGroup({
      code: this.formBuilder.control(this.selectedAddress.code),
      name: this.formBuilder.control(this.selectedAddress.name,Validators.required),

      line1: this.formBuilder.control(this.selectedAddress.line1,Validators.required),
      line2: this.formBuilder.control(this.selectedAddress.line2),
      country: this.formBuilder.control(this.selectedAddress.city ,Validators.required),
      city: this.formBuilder.control(this.selectedAddress.ville,Validators.required),
      zip: this.formBuilder.control(this.selectedAddress.zip),
      latitude: this.formBuilder.control(this.selectedAddress.latitude),
      longtitude: this.formBuilder.control(this.selectedAddress.longitude),
      fAddressType: this.formBuilder.control(this.selectedAddress.addressTypeTms),
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.addressForm.invalid) { return; }

    this.spinner.show();
    this.selectedAddress.addressType=1;
    this.selectedAddress.delivery=true;
    this.selectedAddress.line1 = this.addressForm.value['line1'];
    this.selectedAddress.line2 = this.addressForm.value['line2'];

    console.log(this.addressForm.value['name']);

    this.selectedAddress.name = this.addressForm.value['name'];
    this.selectedAddress.code = this.addressForm.value['name'];

    //this.selectedAddress.country= this.addressForm.value['country'];
    //this.selectedAddress.city = this.addressForm.value['city'];
    this.selectedAddress.zip = this.addressForm.value['zip'];
    this.selectedAddress.latitude = this.addressForm.value['latitude'];
    this.selectedAddress.longitude = this.addressForm.value['longtitude'];
  this.selectedAddress.owner=this.auhtentificationService.getDefaultOwner();
    this.subscriptions.add( this.addressService.set(this.selectedAddress).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});

     //   this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        //this.toastr.error(error.error.message);

        this.spinner.hide();
      },

      () => this.spinner.hide()
    ));

  }

  onSelectCountry(event){
    console.log(event);
    this.selectedAddress.pays=event.value;

    this.selectedAddress.country=event.value.code;

  }
  onSelectCity(event){
    console.log(event);
    this.selectedAddress.ville=event.value;

  this.selectedAddress.city=event.value.code;
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
