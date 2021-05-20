import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Pump } from './../../../../shared/models/pump';
import { AuthenticationService } from './../../../../shared/services';
import { PumpService } from './../../../../shared/services/api/pump.service';

@Component({
  selector: 'app-pump-edit',
  templateUrl: './pump-edit.component.html',
  styleUrls: ['./pump-edit.component.css']
})
export class PumpEditComponent implements OnInit {

  @Input() selectedPump = new Pump();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  pumpForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier  pompe  carburant';
  subscriptions= new Subscription();

  constructor(private pumpService: PumpService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedPump = new Pump();
      this.title = 'Ajouter  pompe  carburant';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.pumpForm = new FormGroup({
      'code': new FormControl(this.selectedPump.code, Validators.required),
      'description': new FormControl(this.selectedPump.description),
      'capacity': new FormControl(this.selectedPump.capacity),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.pumpForm.invalid) { return; }
    this.spinner.show();
    this.selectedPump.code = this.pumpForm.value['code'];
    this.selectedPump.description = this.pumpForm.value['description'];
    this.selectedPump.capacity = this.pumpForm.value['capacity'];

 this.selectedPump.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");
 
 console.log(this.selectedPump.owner);
 
    this.subscriptions.add( this.pumpService.set(this.selectedPump).subscribe(
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
