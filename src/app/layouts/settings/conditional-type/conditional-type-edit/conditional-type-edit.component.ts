import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { ConditionalType } from './../../../../shared/models/contional-Type';
import { AuthenticationService } from './../../../../shared/services';
import { ConditionalTypeService } from './../../../../shared/services/api/conditional-type.service';

@Component({
  selector: 'app-conditional-type-edit',
  templateUrl: './conditional-type-edit.component.html',
  styleUrls: ['./conditional-type-edit.component.css']
})
export class ConditionalTypeEditComponent implements OnInit {

  @Input() selectedConditionalType = new ConditionalType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  conditionalTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de Condition';
  subscriptions= new Subscription();

  constructor(private conditionalTypeService: ConditionalTypeService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedConditionalType = new ConditionalType();
      this.title = 'Ajouter un type de Condition';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.conditionalTypeForm = new FormGroup({
      'code': new FormControl(this.selectedConditionalType.code, Validators.required),
      'description': new FormControl(this.selectedConditionalType.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.conditionalTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedConditionalType.code = this.conditionalTypeForm.value['code'];
    this.selectedConditionalType.description = this.conditionalTypeForm.value['description'];
 this.selectedConditionalType.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");
 
 console.log(this.selectedConditionalType.owner);
 
    this.subscriptions.add( this.conditionalTypeService.set(this.selectedConditionalType).subscribe(
      data => {
        this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
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
