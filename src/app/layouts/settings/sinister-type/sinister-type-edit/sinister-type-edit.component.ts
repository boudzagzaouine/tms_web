import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { SinisterTypeService } from './../../../../shared/services/api/sinister-type.service';
import { SinisterType } from './../../../../shared/models/sinister-type';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sinister-type-edit',
  templateUrl: './sinister-type-edit.component.html',
  styleUrls: ['./sinister-type-edit.component.css']
})
export class SinisterTypeEditComponent implements OnInit {

  @Input() selectedSinisterType = new SinisterType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  sinisterTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de Sinistre';
  subscriptions= new Subscription();

  constructor(private sinisterTypeService: SinisterTypeService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedSinisterType = new SinisterType();
      this.title = 'Ajouter un type de Sinistre';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.sinisterTypeForm = new FormGroup({
      'code': new FormControl(this.selectedSinisterType.code, Validators.required),
      'description': new FormControl(this.selectedSinisterType.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.sinisterTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedSinisterType.code = this.sinisterTypeForm.value['code'];
    this.selectedSinisterType.description = this.sinisterTypeForm.value['description'];
 this.selectedSinisterType.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedSinisterType.owner);

    this.subscriptions.add( this.sinisterTypeService.set(this.selectedSinisterType).subscribe(
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
