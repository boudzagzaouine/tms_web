import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { UserGroupService } from './../../../../shared/services/api/user-group.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserGroup } from './../../../../shared/models/user-group';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {

  @Input() selectedUserGroup = new UserGroup();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  userGroupForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Groupe';
  subscriptions= new Subscription();
  parentList :UserGroup[]=[];
  constructor(private userGroupService: UserGroupService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedUserGroup = new UserGroup();
      this.title = 'Ajouter Groupe';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.userGroupForm = new FormGroup({
      'code': new FormControl(this.selectedUserGroup.code, Validators.required),
      'description': new FormControl(this.selectedUserGroup.description),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.userGroupForm.invalid) { return; }
    this.spinner.show();
    this.selectedUserGroup.code = this.userGroupForm.value['code'];
    this.selectedUserGroup.description = this.userGroupForm.value['description'];
//  this.selectedUserGroup.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

//  console.log(this.selectedUserGroup.owner);

    this.subscriptions.add( this.userGroupService.set(this.selectedUserGroup).subscribe(
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
