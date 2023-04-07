import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { VehicleTrayService } from './../../../../shared/services/api/vehicle-tray.service';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { VehicleTray } from './../../../../shared/models/vehicle-tray';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-vehicle-tray-edit',
  templateUrl: './vehicle-tray-edit.component.html',
  styleUrls: ['./vehicle-tray-edit.component.scss']
})
export class VehicleTrayEditComponent implements OnInit {

  @Input() selectedVehicleTray = new VehicleTray();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  vehicleTrayForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de remorque';
  subscriptions= new Subscription();

  constructor(private vehicleTrayService: VehicleTrayService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedVehicleTray = new VehicleTray();
      this.title = 'Ajouter un type de Remorque';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.vehicleTrayForm = new FormGroup({
      'code': new FormControl(this.selectedVehicleTray.code, Validators.required),
      'description': new FormControl(this.selectedVehicleTray.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.vehicleTrayForm.invalid) { return; }
    this.spinner.show();
    this.selectedVehicleTray.code = this.vehicleTrayForm.value['code'];
    this.selectedVehicleTray.description = this.vehicleTrayForm.value['description'];
 this.selectedVehicleTray.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedVehicleTray.owner);

    this.subscriptions.add( this.vehicleTrayService.set(this.selectedVehicleTray).subscribe(
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
