import { AccountService } from './../../../../shared/services/api/account.service';
import { Account } from './../../../../shared/models/account';
import { Ville } from './../../../../shared/models/ville';
import { CompanyService } from './../../../../shared/services/api/company.service';
import { AddressService } from './../../../../shared/services/api/address.service';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from './../../../../shared/services/api/contact.service';
import { Company } from './../../../../shared/models/company';
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
  accountList :Account[]= [];

  selectedContact :Contact = new Contact();
  selectedAddress:Address = new Address();
  addressList :Address[]=[];
  displayDialog: boolean;
  title :string ;
  showDialogContact :Boolean =false;
  showDialogAddress :Boolean=false;
  constructor(
    private contactService :ContactService,
    private accountService:AccountService,
    private addressService:AddressService,
    private toastr :ToastrService,
    private companyService :CompanyService,
  ) { }



  ngOnInit() {

console.log(this.selectedAccount);

this.accountService.findById(this.selectedAccount.id).subscribe(
  data =>{
    console.log(data);
  let contact :Contact=new Contact()
  this.contactList=data.contacts;
  contact.name=this.selectedAccount.name;
  contact.tel1=this.selectedAccount.telephone;
  contact.email=this.selectedAccount.email;
this.contactList.push(contact);

this.addressList=data.addresses.filter(f=>f.addressType==1);
  }
);



    this.displayDialog = true;
  }

  onSubmit(){
    let addressContactDeliveryInfo = new AddressContactOrderTransportInfo();
 let account = new Account();
//  contact = this.selectedContact.code !=null ?this.selectedContact :   this.contactList[0];

account = this.selectedAccount.code !=null ?this.selectedAccount :   this.accountList[0];

addressContactDeliveryInfo.name=account.name;
addressContactDeliveryInfo.email=account.email;
addressContactDeliveryInfo.tel1=account.telephone;
addressContactDeliveryInfo.company=this.selectedContact?.code;

addressContactDeliveryInfo.line1=this.selectedAddress.line1;
addressContactDeliveryInfo.city=this.selectedAddress?.ville?.code;
addressContactDeliveryInfo.zip=this.selectedAddress.zip;
addressContactDeliveryInfo.country=this.selectedAddress?.pays?.code;
addressContactDeliveryInfo.latitude=this.selectedAddress.latitude!=null ? this.selectedAddress.latitude :this.selectedAddress?.ville?.latitude;
console.log(this.selectedAddress?.ville?.latitude);

addressContactDeliveryInfo.longitude=this.selectedAddress.longitude !=null ? this.selectedAddress.longitude : this.selectedAddress?.ville?.longitude;
console.log(this.selectedAddress?.ville?.longitude);

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


   onSearchAddressName(search){
    console.log(search.query);

    let searchName =",name~"+search.query;
    this.addressService.find('addressType:'+1+searchName).subscribe(
      data =>{
      this.addressList=data;

      }
    );

   }

   onSelectAddress(event){
console.log(event.name);

    this.addressService.find('name:'+event.name).subscribe(
      data =>{
      this.addressList=data;

      }
    );


   }


}
