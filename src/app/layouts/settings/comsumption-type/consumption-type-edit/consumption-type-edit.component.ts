import { ConsumptionType } from './../../../../shared/models/consumption-type';
import { ConsumptionTypeService } from './../../../../shared/services/api/consumption-type.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consumption-type-edit',
  templateUrl: './consumption-type-edit.component.html',
  styleUrls: ['./consumption-type-edit.component.css']
})
export class ConsumptionTypeEditComponent implements OnInit {

  @Input() selectedConsumptionType = new ConsumptionType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  consumptionTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de consommation';
  subscriptions= new Subscription();

  constructor(
    private consumptionTypeService: ConsumptionTypeService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }


  ngOnInit() {
    if (this.editMode === 1) {
      this.selectedConsumptionType = new ConsumptionType();
      this.title = 'Ajouter un type de consommation';

    }
    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    this.consumptionTypeForm = new FormGroup({
      'code': new FormControl(this.selectedConsumptionType.code, Validators.required),
      'description': new FormControl(this.selectedConsumptionType.description)
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.consumptionTypeForm.invalid) { return; }

    this.spinner.show();

    this.selectedConsumptionType.code = this.consumptionTypeForm.value['code'];
    this.selectedConsumptionType.description = this.consumptionTypeForm.value['description'];

    this.subscriptions.add( this.consumptionTypeService.set(this.selectedConsumptionType).subscribe(
      data => {

        this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message);

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
