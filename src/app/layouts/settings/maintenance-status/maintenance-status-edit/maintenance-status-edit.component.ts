import { Badge } from './../../../../shared/models/badge';
import { MaintenanceStateService } from './../../../../shared/services/api/maintenance-states.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaintenanceState } from './../../../../shared/models/maintenance-state';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-maintenance-status-edit',
  templateUrl: './maintenance-status-edit.component.html',
  styleUrls: ['./maintenance-status-edit.component.css']
})
export class MaintenanceStatusEditComponent implements OnInit {

  @Input() selectedMaintenanceState = new MaintenanceState();
  @Input() editMode: boolean;
  closeResult: String;
  maintenanceStateForm: FormGroup;
  maintenanceStateList: MaintenanceState[] = [];
 submitted=false;
  modal: NgbModalRef;
  constructor(private maintenanceStateService: MaintenanceStateService,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.maintenanceStateService.findAll().subscribe(
      data => {
        this.maintenanceStateList = data;
      }
    );

    this.initForm();
  }
  onSubmit() {
    this.submitted=true;
    if (this.maintenanceStateForm.invalid) {
      return;
  }
    this.selectedMaintenanceState.code = this.maintenanceStateForm.value['code'];
    this.selectedMaintenanceState.description = this.maintenanceStateForm.value['description'];


    console.log(this.selectedMaintenanceState);
    const s = this.maintenanceStateService.set(this.selectedMaintenanceState);

    if (this.modal) { this.modal.close();}

  }
  initForm() {
    this.maintenanceStateForm = new FormGroup({
      'code': new FormControl(this.selectedMaintenanceState.code,Validators.required),
      'description': new FormControl(this.selectedMaintenanceState.description)
    });
  }
  open(content) {
this.submitted=false;
    if(!this.editMode){
      this.selectedMaintenanceState = new MaintenanceState();
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

