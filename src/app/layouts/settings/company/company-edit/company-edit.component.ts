import { TypeInfo } from './../../../../shared/enum/type-info.enum';
import { Ville } from './../../../../shared/models/ville';
import { Pays } from './../../../../shared/models/pays';
import { PaymentRuleService } from './../../../../shared/services/api/payment-rule.service';
import { VilleService } from './../../../../shared/services/api/ville.service';
import { PaysService } from './../../../../shared/services/api/pays.service';
import { AddressService } from './../../../../shared/services/api/address.service';
import { element } from 'protractor';
import { AccountPricingService } from './../../../../shared/services/api/account-pricing.service';
import { AccountPricing } from './../../../../shared/models/account-pricing';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityAreaService } from './../../../../shared/services/api/activity-area.service';
import { Address } from './../../../../shared/models/address';
import { ActivityArea } from './../../../../shared/models/activity-area';
import { MessageService, MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { CompanyService } from './../../../../shared/services/api/company.service';
import { of, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from './../../../../shared/models/company';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  @Input() accountPricingList :AccountPricing []= [];
   selectedCompany = new Company();
  editMode: number;
  activityAreaList:Array<ActivityArea>=[];
  showContrat :Boolean = false;
  showService :Boolean = false;
  companyForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Sociéte';
  subscriptions= new Subscription();
  selectedAddress :Address = new Address();
  paysList:Array<Pays>=[];
  villeList:Array<Ville>=[];

  items:MenuItem[];
  home:MenuItem;
  constructor(private companyService: CompanyService,
    private authentificationService:AuthenticationService,
    private areaActivityService:ActivityAreaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private accountPricingService:AccountPricingService,
    private addressService :AddressService,
    private paysService:PaysService,
    private villeService:VilleService,


  ) { }

  ngOnInit() {

    this.items = [
      { label: "Paramétrage" },
      { label: "Société", routerLink: "/core/settings/company-edit" },
    ];

    this.home = { icon: "pi pi-home" };
    this.areaActivityService.findAll().subscribe(
      data=>{
        this.activityAreaList=data;
      }
    );

    let id = this.activatedRoute.snapshot.params["id"];
    if (!id) {
    this.editMode === 1
      this.selectedCompany = new Company();
      this.title = 'Ajouter Sociéte';
      this.selectedAddress = new Address();


this.companyService.generateCode().subscribe(
  data => {
         this.selectedCompany.code=data;
         console.log(data);

         this.initForm();
  }
);



this.showContrat=true;
this.showService=true;

    }else{
this.companyService.findById(id).subscribe(
data=>{
  this.selectedCompany=data;
  this.selectedAddress=this.selectedCompany.address ?this.selectedCompany.address : new Address();
  this.initForm();
  this.showContrat=true;
  this.showService=true;console.log(this.selectedCompany);

}

);


    }


    this.initForm();


  }

  initForm() {
    this.companyForm = new FormGroup({
      'code': new FormControl(this.selectedCompany.code, Validators.required),
      'name': new FormControl(this.selectedCompany.name, Validators.required),
      'activityArea': new FormControl(this.selectedCompany.activityArea),

      'tel': new FormControl(this.selectedCompany.telephone, Validators.required),
      'email': new FormControl(this.selectedCompany.email ),
      'fax': new FormControl(this.selectedCompany.fax),


      'nameAdd': new FormControl(this.selectedAddress.code, Validators.required),
      'line1': new FormControl(this.selectedAddress.line1, Validators.required),
      'line2': new FormControl(this.selectedAddress.line2),
      'zip': new FormControl(this.selectedAddress.zip),
      'city': new FormControl(this.selectedAddress.ville),
      'country': new FormControl(this.selectedAddress.pays),

      'tradeRegister': new FormControl(this.selectedCompany.tradeRegister, Validators.required),
      'tax': new FormControl(this.selectedCompany.professionalTax),
      'if': new FormControl(this.selectedCompany.fiscalIdentifier),
       'cnss': new FormControl(this.selectedCompany.cnssNumber),
      // 'fiscal': new FormControl(this.selectedCompany.fiscalIdentifier),
       'ice': new FormControl(this.selectedCompany.commonIdentifierOfCompany),







    });
  }


  onSubmit(close=false) {
    this.isFormSubmitted = true;
    if (this.companyForm.invalid) { return; }
    this.spinner.show();
    this.selectedCompany.name = this.companyForm.value['name'];
    this.selectedCompany.telephone = this.companyForm.value['tel'];
    this.selectedCompany.fax = this.companyForm.value['fax'];
    this.selectedCompany.email = this.companyForm.value['email'];

    this.selectedAddress.addressType=2;
    this.selectedAddress.code = this.companyForm.value['nameAdd'];
    this.selectedAddress.name = this.companyForm.value['nameAdd'];

    this.selectedAddress.line1 = this.companyForm.value['line1'];
    this.selectedAddress.line2 = this.companyForm.value['line2'];
    this.selectedAddress.zip = this.companyForm.value['zip'];
    // this.selectedAddress.city = this.companyForm.value['city'];
    // this.selectedAddress.country = this.companyForm.value['country'];
    this.selectedCompany.tradeRegister = this.companyForm.value['tradeRegister'];
    console.log(this.selectedAddress);

 this.selectedCompany.professionalTax = this.companyForm.value['tax'];
    this.selectedCompany.fiscalIdentifier = this.companyForm.value['if'];
    this.selectedCompany.cnssNumber = this.companyForm.value['cnss'];
    this.selectedCompany.fiscalIdentifier = this.companyForm.value['fiscal'];
    this.selectedCompany.commonIdentifierOfCompany = this.companyForm.value['ice'];
 this.selectedCompany.owner=this.authentificationService.getDefaultOwner();

if(this.selectedAddress.code){
  console.log("address");

  this.selectedCompany.address=this.selectedAddress;

console.log(this.selectedAddress);

}
   this.saveCompany();










  }
saveAddressandCommpany(){
  this.subscriptions.add( this.addressService.set(this.selectedAddress).subscribe(
    data => {
      //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
      this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

      this.selectedAddress=data;
      this.selectedCompany.address=data;

      // this.loadData();
     this.saveCompany();


    },
    error => {
      this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

     // this.toastr.error(error.error.message, 'Erreur');
      this.spinner.hide();
    },
    () => this.spinner.hide()
  ));
}

  saveCompany(){
   // this.selectedCompany.address=this.selectedAddress;

    this.subscriptions.add( this.companyService.set(this.selectedCompany).subscribe(
      data => {
        //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});
//this.selectedAddress.company=data;

//this.saveAddressandCommpany();
        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();

        this.companyForm.reset();
        if (close) {
          this.router.navigate(['/core/settings/company']);
        } else {
          this.router.navigate(['/core/settings/company-edit']);
        }
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  onSelectActivityArea(event){
  this.selectedCompany.activityArea=event.value;
  }

  onAcountPricingEdited(acountPricings : AccountPricing[]){

    console.log(acountPricings);
    this.selectedCompany.accountPricingList=acountPricings;

  }
  onAcountServiceEdited(acountPricings : AccountPricingService[]){

    console.log(acountPricings);
    this.selectedCompany.accountPricingServiceList=acountPricings;


  }

  onPaysSearch(event: any) {
    this.paysService
      .find('code~' + event.query)
      .subscribe(data => (this.paysList = data));
  }

  onSelectPays(event){
    this.selectedAddress.pays=event;
    console.log( this.selectedAddress.pays);

  }

  onVilleSearch(event: any) {
    this.villeService
      .find('code~' + event.query)
      .subscribe(data => (this.villeList = data));
  }

  onSelectVille(event){
    this.selectedAddress.ville=event;
    console.log( this.selectedAddress.ville);

  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
