import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { AgencyService } from './../../../../shared/services/api/agency.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Agency } from './../../../../shared/models/agency';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agency-edit',
  templateUrl: './agency-edit.component.html',
  styleUrls: ['./agency-edit.component.scss']
})
export class AgencyEditComponent implements OnInit {

  @Input() selectedAgency = new Agency();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  agencyForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Agence';
  subscriptions= new Subscription();

  constructor(private agencyService: AgencyService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedAgency = new Agency();
      this.title = 'Ajouter Agence';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.agencyForm = new FormGroup({
      'code': new FormControl(this.selectedAgency.code, Validators.required),
      'description': new FormControl(this.selectedAgency.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.agencyForm.invalid) { return; }
    this.spinner.show();
    this.selectedAgency.code = this.agencyForm.value['code'];
    this.selectedAgency.description = this.agencyForm.value['description'];

 console.log("owner");


    this.subscriptions.add( this.agencyService.set(this.selectedAgency).subscribe(
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
