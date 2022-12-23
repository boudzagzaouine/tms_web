import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { ActivityAreaService } from './../../../../shared/services/api/activity-area.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivityArea } from './../../../../shared/models/activity-area';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-activity-area-edit',
  templateUrl: './activity-area-edit.component.html',
  styleUrls: ['./activity-area-edit.component.scss']
})
export class ActivityAreaEditComponent implements OnInit {

  @Input() selectedActivityArea = new ActivityArea();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  activityAreaForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier Secteur d'activité";
  subscriptions= new Subscription();

  constructor(private activityAreaService: ActivityAreaService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedActivityArea = new ActivityArea();
      this.title = "Ajouter Secteur d'activité";
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.activityAreaForm = new FormGroup({
      'code': new FormControl(this.selectedActivityArea.code, Validators.required),
      'description': new FormControl(this.selectedActivityArea.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.activityAreaForm.invalid) { return; }
    this.spinner.show();
    this.selectedActivityArea.code = this.activityAreaForm.value['code'];
    this.selectedActivityArea.description = this.activityAreaForm.value['description'];
 this.selectedActivityArea.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedActivityArea.owner);

    this.subscriptions.add( this.activityAreaService.set(this.selectedActivityArea).subscribe(
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
