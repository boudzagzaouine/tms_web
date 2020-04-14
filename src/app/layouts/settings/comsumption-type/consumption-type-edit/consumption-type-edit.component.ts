import { ConsumptionType } from './../../../../shared/models/consumption-type';
import { ConsumptionTypeService } from './../../../../shared/services/api/consumption-type.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-consumption-type-edit',
  templateUrl: './consumption-type-edit.component.html',
  styleUrls: ['./consumption-type-edit.component.css']
})
export class ConsumptionTypeEditComponent implements OnInit {

  @Input() selectedConsumptionType = new ConsumptionType();
  @Input() editMode: boolean;
  @Output() conumptionTypeAdd = new EventEmitter<ConsumptionType>();

  closeResult: String;
  consumptionTypeForm: FormGroup;

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(
    private consumptionTypeService: ConsumptionTypeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }


  ngOnInit() {


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

    console.log(this.selectedConsumptionType);
    const s = this.consumptionTypeService.set(this.selectedConsumptionType).subscribe(
      data => {
        this.conumptionTypeAdd.emit(data);
        this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
        if (this.modal) { this.modal.close(); }
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message);

        this.spinner.hide();
      },

      () => this.spinner.hide()
    );



    this.selectedConsumptionType = new ConsumptionType();
    if (this.modal) { this.modal.close(); }
    this.isFormSubmitted = false;
  }



  open(content) {
    if (!this.editMode) {
      this.selectedConsumptionType = new ConsumptionType();
    }
    this.initForm();
    this.modal = this.modalService.open(content, { backdrop: 'static', centered: true, size: 'sm' });
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
