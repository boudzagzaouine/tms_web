import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../../shared/services';
import { NotificationType } from './../../../../shared/models/notificationType';
import { NotificationTypeService } from './../../../../shared/services/api/notificationType.service';

@Component({
  selector: 'app-notification-type-edit',
  templateUrl: './notification-type-edit.component.html',
  styleUrls: ['./notification-type-edit.component.scss']
})
export class NotificationTypeEditComponent implements OnInit {

  @Input() selectedNotificationType = new NotificationType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  notificationTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de notification';
  subscriptions= new Subscription();

  constructor(private notificationTypeService: NotificationTypeService,
    private athentificationService : AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedNotificationType = new NotificationType();
      this.title = 'Ajouter un type de notification';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.notificationTypeForm = new FormGroup({
      'code': new FormControl(this.selectedNotificationType.code, Validators.required),
      'mail': new FormControl(this.selectedNotificationType.email,Validators.required),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.notificationTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedNotificationType.code = this.notificationTypeForm.value['code'];
    this.selectedNotificationType.email = this.notificationTypeForm.value['mail'];
    this.selectedNotificationType.owner =this.athentificationService.getDefaultOwner();
    console.log(this.selectedNotificationType.owner);
    
    this.subscriptions.add( this.notificationTypeService.set(this.selectedNotificationType).subscribe(
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
