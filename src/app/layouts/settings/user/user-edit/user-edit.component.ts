import { UserGroup } from './../../../../shared/models/user-group';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { UserService } from './../../../../shared/services/api/user.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './../../../../shared/models/user';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @Input() selectedUser = new User();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  userForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Utilisateur';
  subscriptions= new Subscription();
  groupList :UserGroup[]=[];
  constructor(private userService: UserService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedUser = new User();
      this.title = 'Ajouter Utilisateur';
    }

    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.userForm = new FormGroup({
      'code': new FormControl(this.selectedUser.code, Validators.required),
      'password': new FormControl(this.selectedUser.password, Validators.required),
      'group': new FormControl(this.selectedUser.userGroup),
      'name': new FormControl(this.selectedUser.name, Validators.required),
      'surName': new FormControl(this.selectedUser.surName, Validators.required),
      'email': new FormControl(this.selectedUser.email, Validators.required),
      'tele': new FormControl(this.selectedUser.tel),


    })

  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.userForm.invalid) { return; }
    this.spinner.show();
    this.selectedUser.code = this.userForm.value['code'];
//  this.selectedUser.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

//  console.log(this.selectedUser.owner);

    this.subscriptions.add( this.userService.set(this.selectedUser).subscribe(
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

  onGroupSearch(event: any) {
    this.userService
      .find('code~' + event.query)
      .subscribe(data => (this.groupList = data));
  }

  onSelectGroup(event) {
    this.selectedUser.userGroup= event;

  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
