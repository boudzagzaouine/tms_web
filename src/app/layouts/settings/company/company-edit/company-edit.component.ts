import { AccountPricing } from './../../../../shared/models/account-pricing';
import { ActivatedRoute } from '@angular/router';
import { ActivityAreaService } from './../../../../shared/services/api/activity-area.service';
import { Address } from './../../../../shared/models/address';
import { ActivityArea } from './../../../../shared/models/activity-area';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { CompanyService } from './../../../../shared/services/api/company.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from './../../../../shared/models/company';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  @Output() companyEdited = new EventEmitter<Company>();
   selectedCompany = new Company();
  editMode: number;
  activityAreaList:Array<ActivityArea>=[];
  accountPricingList:Array<AccountPricing>=[];
  showContrat :Boolean = false;
  companyForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Sociéte';
  subscriptions= new Subscription();
  selectedAddress :Address = new Address();
  constructor(private companyService: CompanyService,
    private authentificationService:AuthenticationService,
    private areaActivityService:ActivityAreaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
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

    }else{
this.companyService.findById(id).subscribe(
data=>{
  this.selectedCompany=data;
  this.selectedAddress=this.selectedCompany.address ?this.selectedCompany.address : new Address();
  this.initForm();
  this.showContrat=true;

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

      'nameAdd': new FormControl(this.selectedAddress.code, Validators.required),
      'line1': new FormControl(this.selectedAddress.line1, Validators.required),
      'line2': new FormControl(this.selectedAddress.line2),
      'zip': new FormControl(this.selectedAddress.zip),
      'city': new FormControl(this.selectedAddress.city),
      'country': new FormControl(this.selectedAddress.country),

      'tradeRegister': new FormControl(this.selectedCompany.tradeRegister, Validators.required),
      'tax': new FormControl(this.selectedCompany.professionalTax),
      'if': new FormControl(this.selectedCompany.fiscalIdentifier),
       'cnss': new FormControl(this.selectedCompany.cnssNumber),
       'fiscal': new FormControl(this.selectedCompany.fiscalIdentifier),
       'ice': new FormControl(this.selectedCompany.commonIdentifierOfCompany),







    });
  }


  onSubmit(close=false) {
    this.isFormSubmitted = true;
    if (this.companyForm.invalid) { return; }
    this.spinner.show();
    this.selectedCompany.name = this.companyForm.value['name'];

    this.selectedAddress.code = this.companyForm.value['nameAdd'];
    this.selectedAddress.line1 = this.companyForm.value['line1'];
    this.selectedAddress.line2 = this.companyForm.value['line2'];
    this.selectedAddress.zip = this.companyForm.value['zip'];
    this.selectedAddress.city = this.companyForm.value['city'];
    this.selectedAddress.country = this.companyForm.value['country'];

    this.selectedCompany.tradeRegister = this.companyForm.value['tradeRegister'];
this.selectedCompany.address=this.selectedAddress;
    this.selectedCompany.professionalTax = this.companyForm.value['tax'];
    this.selectedCompany.fiscalIdentifier = this.companyForm.value['if'];
    this.selectedCompany.cnssNumber = this.companyForm.value['cnss'];
    this.selectedCompany.fiscalIdentifier = this.companyForm.value['fiscal'];
    this.selectedCompany.commonIdentifierOfCompany = this.companyForm.value['ice'];



 this.selectedCompany.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedCompany.owner);

    this.subscriptions.add( this.companyService.set(this.selectedCompany).subscribe(
      data => {
        //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
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



  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
