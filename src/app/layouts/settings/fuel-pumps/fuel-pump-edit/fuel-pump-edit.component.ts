import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Product } from './../../../../shared/models';
import { FuelPump } from './../../../../shared/models/fuel-pump';
import { Pump } from './../../../../shared/models/pump';
import { AuthenticationService } from './../../../../shared/services';
import { FuelPumpService } from './../../../../shared/services/api/fuel-pump.service';
import { ProductService } from './../../../../shared/services/api/product.service';
import { PumpService } from './../../../../shared/services/api/pump.service';

@Component({
  selector: 'app-fuel-pump-edit',
  templateUrl: './fuel-pump-edit.component.html',
  styleUrls: ['./fuel-pump-edit.component.css']
})
export class FuelPumpEditComponent implements OnInit {

  @Input() selectFuelPump = new FuelPump();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  fuelPumpForm: FormGroup;
  pumpList: Pump[] = [];
  productList: Product[] = [];
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier ';
  product: string;
  pump: string;

  subscriptions= new Subscription();

  constructor(
    private fuelPumpService: FuelPumpService,
    private authentificationService:AuthenticationService,
    private pumpService: PumpService,
    private productService: ProductService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.subscriptions.add( this.pumpService.findAll().subscribe(
      data => {
        this.pumpList = data;
      }
    ));

    this.subscriptions.add(this.productService.findAll().subscribe(
      data => {
        this.productList = data;
      }
    ));
console.log(this.editMode);

    if (this.editMode === 1) {
      this.selectFuelPump = new FuelPump();
      this.title = 'Ajouter ';
    }

    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    this.fuelPumpForm = new FormGroup({
      'fCode': new FormControl(this.selectFuelPump.code, Validators.required),
      'fPump': new FormControl(this.selectFuelPump.pump, Validators.required),
      'fProduct': new FormControl(this.selectFuelPump.product, Validators.required),
      'fQuantity': new FormControl(this.selectFuelPump.quantity)
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.fuelPumpForm.invalid) { return; }

    this.spinner.show();


  
    if (this.editMode === 1) {

      this.existPump();
      console.log("existPump");
      
   } else if (this.editMode === 2) {
    console.log("insert");

          this.insertFuelPump();
   }

 


      this.selectFuelPump = new FuelPump();
  }

  existPump() {
    this.subscriptions.add( this.fuelPumpService.sizeSearch(`pump.code~${this.pump}`).subscribe(
      data => {

        if (data > 0) {
          this.messageService.add({severity:'error', summary: 'Edition', detail: 'Elément Existe Déja'});

         // this.toastr.error('Elément Existe Déja', 'Edition');
        } else {

          this.insertFuelPump();
        }
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

  insertFuelPump() {
    this.selectFuelPump.code = this.fuelPumpForm.value['fCode'];
    this.selectFuelPump.quantity = this.fuelPumpForm.value['fQuantity'];
    this.selectFuelPump.pump = this.fuelPumpForm.value['fPump'];
    this.selectFuelPump.product = this.fuelPumpForm.value['fProduct'];
    this.selectFuelPump.owner=this.authentificationService.getDefaultOwner();


    this.subscriptions.add( this.fuelPumpService.set(this.selectFuelPump).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});

        //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message);

        this.spinner.hide();
      },

      () => this.spinner.hide()
    ));
  }
  onSelectPump(event) {
    this.selectFuelPump.pump = event.value;
    this.pump = event.value.code;
    console.log(this.pump);
    
  }
  onSelectProduct(event : Product) {
    this.selectFuelPump.product = event;
 this.product = event.code;
 console.log(this.product);

  }
  onProductSearch(event: any) {
    this.productService
      .find('code~' + event.query)
      .subscribe(data => (this.productList = data));
  }


  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
