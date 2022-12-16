import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceTypeService } from './../../../../shared/services/api/service-type.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceType } from './../../../../shared/models/service-type';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-service-type-edit',
  templateUrl: './service-type-edit.component.html',
  styleUrls: ['./service-type-edit.component.scss']
})
export class ServiceTypeEditComponent implements OnInit {

  @Input() selectedServiceType = new ServiceType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  serviceTypeParentList: ServiceType[] = [];


  serviceTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de Service';
  subscriptions = new Subscription();

  constructor(private serviceTypeService: ServiceTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,

    private authentificationService: AuthenticationService,
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedServiceType = new ServiceType();
      this.title = 'Ajouter un type de Service';

    }
console.log(this.selectedServiceType);

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.serviceTypeForm = new FormGroup({
      'code': new FormControl(this.selectedServiceType.code, Validators.required),
      'description': new FormControl(this.selectedServiceType.description),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.serviceTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedServiceType.code = this.serviceTypeForm.value['code'];
    this.selectedServiceType.description = this.serviceTypeForm.value['description'];
    this.selectedServiceType.owner=this.authentificationService.getDefaultOwner();
    this.subscriptions.add( this.serviceTypeService.set(this.selectedServiceType).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

       // this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        //this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }


  onServiceTypeSearch(event: any) {
    this.subscriptions.add( this.serviceTypeService
      .find('code~' + event.query)
      .subscribe(data => (this.serviceTypeParentList = data)));
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
