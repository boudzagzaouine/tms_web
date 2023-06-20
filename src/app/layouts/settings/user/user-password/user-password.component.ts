import { saveAs } from 'file-saver';
import { MessageService } from 'primeng/api';
import { UserService } from './../../../../shared/services/api/user.service';
import { log } from 'console';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { User } from './../../../../shared/models/user';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {

  selectedUser = new User();
  userForm: FormGroup;

  currentPassword : string ;
  newPassword: string ;
  confirmPassword : string ;
  constructor(private authenticationService:AuthenticationService,
              private userService:UserService,
              private messageService: MessageService
              ) { }

  ngOnInit() {
    this.selectedUser=this.authenticationService.getCurrentUser();
  }



  onSubmit(){
    let curPass ,nPass,CPass : string ;
    curPass=this.currentPassword? Md5.hashStr(this.currentPassword).toString():null;
    nPass=this.newPassword?Md5.hashStr(this.newPassword).toString():null;
    CPass=this.confirmPassword?Md5.hashStr(this.confirmPassword).toString():null;

     if(CPass==null ||nPass ==null || curPass==null){
      this.messageService.add({severity:'error', summary: 'password', detail: 'remplir les champs'});

    }
    else if( curPass !=  this.selectedUser.password){
      this.messageService.add({severity:'error', summary: 'password', detail: 'échec du mot de passe actuel '});

    }
   else if(  nPass !=  CPass){
      this.messageService.add({severity:'error', summary: 'password', detail: 'échec confirmation du mot de passe'});

    }

   else {
this.save(CPass);

    }



    console.log(curPass);
    console.log(nPass);
    console.log(CPass);

  }
  save(password :string){
    this.selectedUser.password=password;
    this.userService.set( this.selectedUser).subscribe(
      data=>{
        this.selectedUser=data;
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});
      this.authenticationService.login(this.selectedUser.email,this.confirmPassword);
      }
    );
  }
}
