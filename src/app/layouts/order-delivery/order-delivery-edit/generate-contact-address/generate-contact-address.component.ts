import { AddressContactDeliveryInfo } from './../../../../shared/models/address-contact-delivery-info';
import { Contact } from './../../../../shared/models/contact';
import { Address } from './../../../../shared/models/address';
import { Account } from './../../../../shared/models/account';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { runInNewContext } from 'vm';

@Component({
  selector: 'app-generate-contact-address',
  templateUrl: './generate-contact-address.component.html',
  styleUrls: ['./generate-contact-address.component.scss']
})
export class GenerateContactAddressComponent implements OnInit {

  @Output() showDialog = new EventEmitter<boolean>();
  @Output () addressContactDeliveryInfo =new EventEmitter<AddressContactDeliveryInfo>();
  @Input () selectedAccount : Account = new Account();
  contactList :Contact[]= [];
  selectedContact :Contact = new Contact();
  selectedAddress:Address = new Address();
  addressList :Address[]=[];
  displayDialog: boolean;
  title :string ;
  constructor() { }



  ngOnInit() {
console.log(this.selectedAccount);


    let contactAccount : Contact = new Contact;
    contactAccount.name=this.selectedAccount.name;
    contactAccount.tel1=this.selectedAccount.telephone;
    contactAccount.email=this.selectedAccount.email;
 this.contactList.push(contactAccount);

    this.contactList.push(...this.selectedAccount.contacts);
    this.addressList.push(...this.selectedAccount.addresses);
    this.displayDialog = true;
  }

  onSubmit(){
    let addressContactDeliveryInfo = new AddressContactDeliveryInfo();
 let contact = new Contact();
 contact = this.selectedContact.code !=null ?this.selectedContact :   this.contactList[0];

addressContactDeliveryInfo.name=this.selectedAccount.name;
addressContactDeliveryInfo.email=contact.email;
addressContactDeliveryInfo.tel1=contact.tel1;
addressContactDeliveryInfo.company=this.selectedAccount.company;

addressContactDeliveryInfo.line1=this.selectedAddress.line1;
addressContactDeliveryInfo.city=this.selectedAddress.city;
addressContactDeliveryInfo.zip=this.selectedAddress.zip;
addressContactDeliveryInfo.country=this.selectedAddress.country;
addressContactDeliveryInfo.latitude=this.selectedAddress.latitude;
addressContactDeliveryInfo.longitude=this.selectedAddress.longitude;
this.addressContactDeliveryInfo.emit(addressContactDeliveryInfo);

this.displayDialog=false;

  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }
}
