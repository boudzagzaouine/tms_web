import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { HabilitationService } from './../../../../shared/services/api/habilitation.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Habilitation } from './../../../../shared/models/habilitation';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-habilitation-edit',
  templateUrl: './habilitation-edit.component.html',
  styleUrls: ['./habilitation-edit.component.scss']
})
export class HabilitationEditComponent implements OnInit {
  @Input() selectedHabilitation = new Habilitation();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  habilitationForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier habilitation';
  subscriptions= new Subscription();
  parentList :Habilitation[]=[];
  constructor(private habilitationService: HabilitationService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedHabilitation = new Habilitation();
      this.title = 'Ajouter habilitation';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.habilitationForm = new FormGroup({
      'code': new FormControl(this.selectedHabilitation.code, Validators.required),
      'description': new FormControl(this.selectedHabilitation.description),
      'parent': new FormControl(this.selectedHabilitation.habilitation),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.habilitationForm.invalid) { return; }
    this.spinner.show();
    this.selectedHabilitation.code = this.habilitationForm.value['code'];
    this.selectedHabilitation.description = this.habilitationForm.value['description'];
    this.selectedHabilitation.active=true;
//  this.selectedHabilitation.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

//  console.log(this.selectedHabilitation.owner);

    this.subscriptions.add( this.habilitationService.set(this.selectedHabilitation).subscribe(
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

  onParentSearch(event: any) {
    this.habilitationService
      .find('code~' + event.query)
      .subscribe(data => (this.parentList = data));
  }

  onSelectParent(event) {
    this.selectedHabilitation.habilitation= event;

  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
