import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { PaysService } from './../../../../shared/services/api/pays.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pays } from './../../../../shared/models/pays';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit {

  @Input() selectedPays = new Pays();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  paysForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Pays';
  subscriptions= new Subscription();

  constructor(private paysService: PaysService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedPays = new Pays();
      this.title = 'Ajouter Pays';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.paysForm = new FormGroup({
      'code': new FormControl(this.selectedPays.code, Validators.required),
      'description': new FormControl(this.selectedPays.description),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.paysForm.invalid) { return; }
    this.spinner.show();
    this.selectedPays.code = this.paysForm.value['code'];
    this.selectedPays.description = this.paysForm.value['description'];


 this.selectedPays.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedPays.owner);

    this.subscriptions.add( this.paysService.set(this.selectedPays).subscribe(
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
