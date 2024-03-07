import { SelectObject } from './../../../../shared/models/select-object';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { VehicleService } from './../../../../shared/services/api/vehicle.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vehicle } from './../../../../shared/models/vehicle';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vehicle-availability-edit',
  templateUrl: './vehicle-availability-edit.component.html',
  styleUrls: ['./vehicle-availability-edit.component.scss']
})
export class VehicleAvailabilityEditComponent implements OnInit {

  @Input() selectedVehicle = new Vehicle();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  vehicleForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = '';
  subscriptions= new Subscription();
  status:SelectObject[]=[];
  constructor(private vehicleService: VehicleService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.status = [new SelectObject(1,"En Trajet"), new SelectObject(2,"En Panne"), new SelectObject(3,"En Maintenance"), new SelectObject(4,"Disponible")];


    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.vehicleForm = new FormGroup({
      'code': new FormControl(this.selectedVehicle.disponibilityName, Validators.required),
    });
  }
  onSelectStatus(event){

    console.log(event.value);

    this.selectedVehicle.disponible=event.value;

  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.vehicleForm.invalid) { return; }
    this.spinner.show();
 this.selectedVehicle.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedVehicle.owner);

    this.subscriptions.add( this.vehicleService.set(this.selectedVehicle).subscribe(
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
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
