import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SinisterService } from './../../../../shared/services/api/sinister.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from './../../../../shared/models/supplier';
import { SupplierService } from './../../../../shared/services/api/supplier.service';

import { DriverService } from './../../../../shared/services/api/driver.service';
import { Driver } from './../../../../shared/models/driver';
import { VehicleService } from './../../../../shared/services/api/vehicle.service';
import { Vehicle } from './../../../../shared/models/vehicle';
import { Subscription } from 'rxjs';
import { SinisterTypeService } from './../../../../shared/services/api/sinister-type.service';
import { SinisterType } from './../../../../shared/models/sinister-type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Sinister } from './../../../../shared/models/sinister';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sinister-edit',
  templateUrl: './sinister-edit.component.html',
  styleUrls: ['./sinister-edit.component.css']
})
export class SinisterEditComponent implements OnInit {

  @Input() selectedSinister = new Sinister();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() showDialogContactEvent = new EventEmitter<boolean>();

  sinisterForm: FormGroup;
  title = "Ajouter un Sinistre";
  isFormSubmitted = false;
  displayDialog: boolean;

  sinisterTypeList:Array<SinisterType> = [];
  vehicleList: Array<Vehicle>=[];
  driverList: Array<Driver>=[];
  supplierList: Array<Supplier>=[];

  subscriptions= new Subscription();

  constructor(private sinisterTypeService : SinisterTypeService,
              private sinisterService : SinisterService,
      private vehicleService : VehicleService,
      private driverService: DriverService,
      private supplierService: SupplierService,
      private activatedRoute: ActivatedRoute,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private spinner: NgxSpinnerService,
      private router: Router


    ) { }

  ngOnInit(): void {

 this.onLoadSinisterType();
 let id = this.activatedRoute.snapshot.params["id"];
 if (id) {
  this.title="Modifier Sinistre"
  console.log(id);
  this.sinisterService.findById(id).subscribe((data) => {
    this.selectedSinister = data;
    console.log(this.selectedSinister);

    this.initForm();
  });
}
    this.initForm();
  }

  initForm() {

    this.sinisterForm = new FormGroup({
      fcode: new FormControl(this.selectedSinister.code, Validators.required),
      fdesc: new FormControl(this.selectedSinister.description, Validators.required),
      fvehicle: new FormControl(this.selectedSinister.vehicle, Validators.required),
      fdriver: new FormControl(this.selectedSinister.driver, Validators.required),
      fsupplier: new FormControl(this.selectedSinister.supplier, Validators.required),
      fsinisterType: new FormControl({value:this.selectedSinister.sinisterType}, Validators.required),
      fvenue: new FormControl(this.selectedSinister.venue, Validators.required),
      fdate: new FormControl(new Date (this.selectedSinister.date), Validators.required),
      frepayment: new FormControl(this.selectedSinister.repayment, Validators.required),


    });

  }


  onSubmit(close =false){

    this.isFormSubmitted = true;
    if (this.sinisterForm.invalid) {
      return;
    }
    this.spinner.show();
    this.selectedSinister.code = this.sinisterForm.value["fcode"];
    this.selectedSinister.description = this.sinisterForm.value["fdesc"];

    //this.selectedSinister.owner = this.authentificationService.getDefaultOwner();
    this.selectedSinister.date = this.sinisterForm.value["fdate"];
    this.selectedSinister.repayment = this.sinisterForm.value["frepayment"];
    this.selectedSinister.venue = this.sinisterForm.value["fvenue"];

    console.log(this.selectedSinister);

    this.subscriptions.add(
      this.sinisterService.set(this.selectedSinister).subscribe(
        (data) => {
          this.messageService.add({
            severity: "success",
            summary: "Edition",
            detail: "Elément Enregistré Avec Succès",
          });

          //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');

          this.displayDialog = false;
          this.isFormSubmitted = false;
          this.spinner.hide();

          this.sinisterForm.reset();
          if (close) {
            this.router.navigate(["/core/settings/sinisters"]);
          } else {
            this.editMode = 1;
            this.router.navigate(["/core/settings/sinister-edit"]);
            this.title = "Ajouter un Sinistre";
          }
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur",
          });

          // this.toastr.error(error.error.message);
          this.spinner.hide();
        },

        () => this.spinner.hide()
      )
    );

  }

  onSelectSinisterType(event : any ){

  this.selectedSinister.sinisterType= event.value;
  console.log(event.value);

  }
  onLoadSinisterType(){

    this.subscriptions.add(

      this.sinisterTypeService.findAll().subscribe(
        data => {
             this.sinisterTypeList = data
        }
      )
    );
  }




  onSelectVehicle(event : any ){
this.selectedSinister.vehicle=event;
console.log(event);
  }

  onVehicleCodeSearch(event : any ){
    this.subscriptions.add(
      this.vehicleService.find('registrationNumber~'+ event.query).subscribe(
        data => {
  this.vehicleList= data ;
        }
      )
    );
  }



  onSelectDriver(event : any ){
    this.selectedSinister.driver=event;
    console.log(event);
      }


      onDriverNameSearch(event : any ){
        this.subscriptions.add(
          this.driverService.find('name~'+ event.query).subscribe(
            data => {
      this.driverList= data ;
            }
          )
        );
      }


      onSelectSupplier(event : any ){
        this.selectedSinister.supplier=event;
        console.log(event);
          }


          onSupplierNameSearch(event : any ){
            this.subscriptions.add(
              this.supplierService.find('contact.name~'+ event.query).subscribe(
                data => {
          this.supplierList= data ;
                }
              )
            );
          }

}
