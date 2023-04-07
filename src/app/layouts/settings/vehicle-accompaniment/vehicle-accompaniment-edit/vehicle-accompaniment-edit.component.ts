import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { VehicleAccompanimentService } from './../../../../shared/services/api/vehicle-accompaniment.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleAccompaniment } from './../../../../shared/models/vehicle-accompaniment';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-vehicle-accompaniment-edit',
  templateUrl: './vehicle-accompaniment-edit.component.html',
  styleUrls: ['./vehicle-accompaniment-edit.component.scss']
})
export class VehicleAccompanimentEditComponent implements OnInit {

  @Input() selectedVehicleAccompaniment = new VehicleAccompaniment();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  vehicleAccompanimentForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Moyen d accompagnement';
  subscriptions= new Subscription();

  constructor(private vehicleAccompanimentService: VehicleAccompanimentService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedVehicleAccompaniment = new VehicleAccompaniment();
      this.title = 'Ajouter Moyen d accompagnement';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.vehicleAccompanimentForm = new FormGroup({
      'code': new FormControl(this.selectedVehicleAccompaniment.code, Validators.required),
      'description': new FormControl(this.selectedVehicleAccompaniment.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.vehicleAccompanimentForm.invalid) { return; }
    this.spinner.show();
    this.selectedVehicleAccompaniment.code = this.vehicleAccompanimentForm.value['code'];
    this.selectedVehicleAccompaniment.description = this.vehicleAccompanimentForm.value['description'];
 this.selectedVehicleAccompaniment.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedVehicleAccompaniment.owner);

    this.subscriptions.add( this.vehicleAccompanimentService.set(this.selectedVehicleAccompaniment).subscribe(
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
