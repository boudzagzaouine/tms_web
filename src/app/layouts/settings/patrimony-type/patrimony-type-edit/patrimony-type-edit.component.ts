import { PatrimonyType } from './../../../../shared/models/patrimony-type';
import { PatrimonyTypeService } from './../../../../shared/services/api/patrimony-type.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-patrimony-edit',
  templateUrl: './patrimony-type-edit.component.html',
  styleUrls: ['./patrimony-type-edit.component.css']
})
export class PatrimonyTypeEditComponent implements OnInit {

  @Input() selectedPatrimonyType = new PatrimonyType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  patrimonyTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Type Patrimoine';

  constructor(private patrimonyTypeService: PatrimonyTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

    console.log(this.editMode);

    if (this.editMode === 1) {
      this.selectedPatrimonyType = new PatrimonyType();
      this.title = 'Ajouter Type Patrimoine';

    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.patrimonyTypeForm = new FormGroup({
      'code': new FormControl(this.selectedPatrimonyType.code, Validators.required),
      'description': new FormControl(this.selectedPatrimonyType.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.patrimonyTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedPatrimonyType.code = this.patrimonyTypeForm.value['code'];
    this.selectedPatrimonyType.description = this.patrimonyTypeForm.value['description'];

    const s = this.patrimonyTypeService.set(this.selectedPatrimonyType).subscribe(
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
    );

  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
