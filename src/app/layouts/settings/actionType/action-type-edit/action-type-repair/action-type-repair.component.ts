import { AuthenticationService } from './../../../../../shared/services/api/authentication.service';
import { Supplier } from './../../../../../shared/models/supplier';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActionTypeRepair } from './../../../../../shared/models/action-type-repair';
import { SupplierService } from './../../../../../shared/services/api/supplier.service';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-type-repair',
  templateUrl: './action-type-repair.component.html',
  styleUrls: ['./action-type-repair.component.css']
})
export class ActionTypeRepairComponent implements OnInit {
  @Input() selectedActionTypeRepair: ActionTypeRepair = new ActionTypeRepair();
  @Input() editMode = false;
  @Output() actionTypeRepairEdited = new EventEmitter<ActionTypeRepair>();
  @Output() showDialog = new EventEmitter<boolean>();
  types: any[];
  selectType:string;
  supplierList : Supplier[]=[];
  displayDialog: boolean;
  title = 'Modifier Prestataire de Reparation';
  ActionTypeRepairForm: FormGroup;
  isFormSubmitted = false;

  constructor(  private supplierService:SupplierService,
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.title = 'Ajouter Prestataire de Reparation';
    this.displayDialog = true;
    this.types=[

      {name:'Interne'},
      {name:'Externe'},
]

if (!this.editMode) {
  this.selectedActionTypeRepair=new ActionTypeRepair();
}
this.initForm();

this.selectType=this.selectedActionTypeRepair.repairType;
console.log(this.selectType);

  }

  initForm() {


    this.ActionTypeRepairForm = this.formBuilder.group({

      repairType: this.formBuilder.control(this.selectedActionTypeRepair.repairType),
      workshop: this.formBuilder.control(this.selectedActionTypeRepair.workshop),
      supplier: this.formBuilder.control(this.selectedActionTypeRepair.supplier),
      city: this.formBuilder.control(this.selectedActionTypeRepair.city),
      price: this.formBuilder.control(this.selectedActionTypeRepair.price),
      duration: this.formBuilder.control(this.selectedActionTypeRepair.duration),


    });
  }
  onSubmit(){

    this.isFormSubmitted = true;
    if (this.ActionTypeRepairForm.invalid) {
      return;
    }

    // this.selectedPlanning.Day = this.planningForm.value['day'];

    this.selectedActionTypeRepair.workshop = this.ActionTypeRepairForm.value['workshop'];
    this.selectedActionTypeRepair.city = this.ActionTypeRepairForm.value['city'];
    this.selectedActionTypeRepair.price = this.ActionTypeRepairForm.value['price'];
    this.selectedActionTypeRepair.duration = this.ActionTypeRepairForm.value['duration'];

    this.selectedActionTypeRepair.owner = this.authentificationService.getDefaultOwner();
    console.log(this.selectedActionTypeRepair);

    this.actionTypeRepairEdited.emit(this.selectedActionTypeRepair);
    this.displayDialog = false;
  }


  onselectType(event){
     this.selectType=(event.option.name) as string;
     console.log(event.option.code);

    this.selectedActionTypeRepair.repairType=event.option.name;
    }

    onCodeSupplierSearch(event: any) {
      this.supplierService.find('contact.name~' + event.query).subscribe(
        data => this.supplierList = data
      );
    }

    onSelectSupplier(event) {
     this.selectedActionTypeRepair.supplier = event;
     console.log( this.selectedActionTypeRepair.supplier);

     this.ActionTypeRepairForm.patchValue({

      'city':this.selectedActionTypeRepair.supplier?.address?.city
    });
    this.ActionTypeRepairForm.updateValueAndValidity();
    }

    onHideDialog() {
      const a = false;
      this.showDialog.emit(a);
      this.displayDialog = false;

    }
}
