import { AccountService } from './../../../../shared/services/api/account.service';
import { AddressService } from './../../../../shared/services/api/address.service';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from './../../../../shared/services/api/contact.service';
import { Account } from './../../../../shared/models/account';
import { Contact } from './../../../../shared/models/contact';
import { AddressContactOrderTransportInfo } from './../../../../shared/models/address-contact-order-transport-nfo';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Address } from './../../../../shared/models/address';

@Component({
  selector: 'app-generate-address-contact',
  templateUrl: './generate-address-contact.component.html',
  styleUrls: ['./generate-address-contact.component.scss']
})
export class GenerateAddressContactComponent implements OnInit {

  @Output() showDialog = new EventEmitter<boolean>();
  @Output () addressContactDeliveryInfo =new EventEmitter<AddressContactOrderTransportInfo>();
  @Input () selectedAccount : Account = new Account();
  contactList :Contact[]= [];

  selectedContact :Contact = new Contact();
  selectedAddress:Address = new Address();
  addressList :Address[]=[];
  displayDialog: boolean;
  title :string ;
  showDialogContact :Boolean =false;
  showDialogAddress :Boolean=false;
  constructor(
    private contactService :ContactService,
    private addressService:AddressService,
    private toastr :ToastrService,
    private accountService :AccountService,
  ) { }



  ngOnInit() {

//     let contactAccount : Contact = new Contact;
//     contactAccount.name=this.selectedAccount.name;
//     contactAccount.tel1=this.selectedAccount.telephone;
//     contactAccount.email=this.selectedAccount.email;
//  this.contactList.push(contactAccount);

this.accountService.find('id:'+this.selectedAccount.id).subscribe(
  data =>{
  this.contactList=data[0].contacts;
  this.addressList=data[0].addresses;

  }
);



    // this.contactList.push(...this.selectedAccount.contacts);
    // this.addressList.push(...this.selectedAccount.addresses);
    this.displayDialog = true;
  }

  onSubmit(){
    let addressContactDeliveryInfo = new AddressContactOrderTransportInfo();
 let contact = new Contact();
 contact = this.selectedContact.code !=null ?this.selectedContact :   this.contactList[0];

addressContactDeliveryInfo.name=contact.name;
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


  onShowdialogContact(){
    this.showDialogContact=true
  }



  onHideDialogContact(event) {
    this.showDialogContact = event;
  }
  onLineEditedContact(line: Contact) {
    console.log(this.selectedAccount);
 line.account =this.selectedAccount;
    this.contactService.set(line).subscribe(
      data=> {
              console.log(data);
              this.contactList.push(line);
              this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
      }
    );

     console.log(line);
  }

  onShowdialogAddress(){
    this.showDialogAddress=true
  }
  onHideDialogAddress(event){
    this.showDialogAddress = event;

  }

  onLineEditedAddress(line: Address) {
    console.log(this.selectedAccount);
 line.account =this.selectedAccount;
    this.addressService.set(line).subscribe(
      data=> {
              console.log(data);
              this.addressList.push(line);
              this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
      }
    );

     console.log(line);
  }

}
