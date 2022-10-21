import { ContainerType } from './../../../../shared/models/container-type';
import { ContainerTypeService } from './../../../../shared/services/api/container-type.service';
import { PackageDetail } from './../../../../shared/models/package-detail';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-package-detail-edit',
  templateUrl: './package-detail-edit.component.html',
  styleUrls: ['./package-detail-edit.component.scss']
})
export class PackageDetailEditComponent implements OnInit {

  @Input() selectedPackageDetail: PackageDetail;
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() packageDetailAdded = new EventEmitter<PackageDetail>();
  containerTypeList: ContainerType[] = [];

  packageDetailForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier detail emballage';
  subscrubtion = new Subscription();

  constructor(      private containerTypeService:ContainerTypeService
) { }

  ngOnInit() {
console.log(this.selectedPackageDetail);

    this.containerTypeService.findAll().subscribe((data) => {
      this.containerTypeList = data;
      console.log(data);

    });

    this.displayDialog = true;
    this.initForm();
  }



  initForm() {
    if (!this.editMode) {
      this.selectedPackageDetail = new PackageDetail();
    }
    this.packageDetailForm = new FormGroup({
      'containerType': new FormControl(this.selectedPackageDetail.containerType,Validators.required),
      'length': new FormControl(this.selectedPackageDetail.length,Validators.required),

      'width': new FormControl(this.selectedPackageDetail.width,Validators.required),
      'height': new FormControl(this.selectedPackageDetail.height,Validators.required),
   'numberOfPackages': new FormControl(this.selectedPackageDetail.numberOfPackages,Validators.required),
      'weight': new FormControl(this.selectedPackageDetail.weight,Validators.required),

  });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.packageDetailForm.invalid) {
      return;
    }

    let formValue =this.packageDetailForm.value;

    this.selectedPackageDetail.length=formValue['length'];
    this.selectedPackageDetail.width=formValue['width'];
    this.selectedPackageDetail.height=formValue['height'];
    this.selectedPackageDetail.numberOfPackages=formValue['numberOfPackages'];
    this.selectedPackageDetail.weight=formValue['weight'];


  this.packageDetailAdded.emit(this.selectedPackageDetail);
    this.displayDialog = false;


  }

  onSelectContainerType(event){
 console.log(event);

    this.selectedPackageDetail.containerType=event.value;
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }


  ngOnDestroy() {
    this.subscrubtion.unsubscribe();
  }


}
