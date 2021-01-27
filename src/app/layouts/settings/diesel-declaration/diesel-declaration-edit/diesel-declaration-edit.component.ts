import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Driver, PurchaseOrder, Vehicle } from './../../../../shared/models';
import { AuthenticationService, DriverService, VehicleService } from './../../../../shared/services';
import { DieselDeclaration } from './../../../../shared/models/diesel-declaration';
import { DieselDeclarationService } from './../../../../shared/services/api/dieselDeclaration.service';
import { PatrimonyService } from './../../../../shared/services/api/patrimony-service';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionCard } from './../../../../shared/models/subscription-card';
import { SubscriptionCardService } from './../../../../shared/services/api/subscription-card.service';
import { PurchaseOrderService } from './../../../../shared/services/api/purchase-order.service';

@Component({
  selector: 'app-diesel-declaration-edit',
  templateUrl: './diesel-declaration-edit.component.html',
  styleUrls: ['./diesel-declaration-edit.component.scss']
})
export class DieselDeclarationEditComponent implements OnInit {

  @Input() selectedDieselDeclaration = new DieselDeclaration();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  editModee :Boolean;
  vehicleList: Vehicle[] = [];
  driverList: Driver[] = [];
  showDialogBon: boolean;
  subscriptionCardList: SubscriptionCard[] = [];
  purchaseOrderList: PurchaseOrder[] = [];

  type: any;
  dieselDeclarationForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier déclaration Gasoil';
  types: any[];
  selectType:number;
  activeState: boolean[] = [false, false, false];
  
  constructor(private dieselDeclarationService: DieselDeclarationService,
    private  subscriptionCardService:SubscriptionCardService,
    private purchaseOrderService:PurchaseOrderService,
    private driverService:DriverService,
    private authentificationService:AuthenticationService,
    private patrimonyService :PatrimonyService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private config: PrimeNGConfig, private translateService: TranslateService
  ) { }


  ngOnInit() {

    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));

    if (this.editMode === 1) {
      this.selectedDieselDeclaration = new DieselDeclaration();
      this.title = 'Ajouter déclaration Gasoil';
      this.editModee=false;
      this.dieselDeclarationService.generateCode().subscribe(
        code => {
       this.selectedDieselDeclaration.code = code;
        this.initForm();
    });

    }else if (this.editMode === 2){
      
          this.editModee=true;
          this.title = 'Modifier déclaration Gasoil';
    }

 this.types=[

        {name:'Carte abonnement',code:1},
        {name:'Bon',code:2},
 ]
    this.displayDialog = true;
    this.initForm();
    this.selectType=this.selectedDieselDeclaration.typeDeclaration;
  }

  initForm() {
    this.dieselDeclarationForm = new FormGroup({
      'code': new FormControl(this.selectedDieselDeclaration.code, Validators.required),
      'vehicle': new FormControl(this.selectedDieselDeclaration.vehicle, Validators.required),
      'amount': new FormControl(this.selectedDieselDeclaration.amount, Validators.required),
      'date': new FormControl(new Date(this.selectedDieselDeclaration.dieselDeclarationDate), Validators.required),
      'km': new FormControl(this.selectedDieselDeclaration.mileage, Validators.required),
      'driver': new FormControl(this.selectedDieselDeclaration.driver, Validators.required),
      'card': new FormControl(this.selectedDieselDeclaration.subscriptionCard),
      'bon': new FormControl(this.selectedDieselDeclaration.purshaseOrder),
      'type': new FormControl(this.selectedDieselDeclaration.typeDeclaration),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.dieselDeclarationForm.invalid) { return; }
    this.spinner.show();
    this.selectedDieselDeclaration.code = this.dieselDeclarationForm.value['code'];
    this.selectedDieselDeclaration.amount = this.dieselDeclarationForm.value['amount'];
    this.selectedDieselDeclaration.dieselDeclarationDate = this.dieselDeclarationForm.value['date'];
    this.selectedDieselDeclaration.mileage = this.dieselDeclarationForm.value['km'];
    if(this.selectType==1){
      this.selectedDieselDeclaration.subscriptionCard = this.dieselDeclarationForm.value['card'];
      this.selectedDieselDeclaration.typeDeclaration=1;

    }
    else if(this.selectType==2){
     this.selectedDieselDeclaration.purshaseOrder = this.dieselDeclarationForm.value['bon'];
     this.selectedDieselDeclaration.typeDeclaration=2;

    }

    
   this.selectedDieselDeclaration.owner=this.authentificationService.getDefaultOwner();
    const s = this.dieselDeclarationService.set(this.selectedDieselDeclaration).subscribe(
      data => {
        this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }

  onCodePurchaseOrder(event: PurchaseOrder){
       console.log(event);

       this.dieselDeclarationForm.patchValue({
        bon: event,
        amount:event.totalPriceHT,
      });
       
  }

  onCodeVehicleSearch(event: any) {
    this.patrimonyService.find('code~' + event.query).subscribe(
      data => this.vehicleList = data.filter(f=> f.patrimony_type=='vehicule')
    );
  }


  onCodeCardSearch(event: any) {
    this.subscriptionCardService.find('code~' + event.query).subscribe(
      data => this.subscriptionCardList = data
    );
  }

  onCodePurchaseOrderSearch(event: any) {
    this.purchaseOrderService.find('code~' + event.query).subscribe(
      data => this.purchaseOrderList = data
    );
  }

  onCodeDriverSearch(event: any) {
    this.driverService.find('name~' + event.query).subscribe(
      data => this.driverList = data
    );
  }

  onSelectVehicle(event) {
    this.selectedDieselDeclaration.vehicle = event;    
  }

  onSelectDriver(event) {
    this.selectedDieselDeclaration.driver = event;    
  }

  onSelectCard(event) {
    this.selectedDieselDeclaration.subscriptionCard = event;    
  }

  onSelectPurchaseOrder(event) {
    this.selectedDieselDeclaration.purshaseOrder = event;  
   // console.log(this.selectedDieselDeclaration.purshaseOrder);
      
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  onselectType(event){
  this.selectType=(event.option.code) as number;
  this.selectedDieselDeclaration.typeDeclaration=this.selectType;
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
}

onShowDialogBon(event) {

  this.showDialogBon = event;

}

}
