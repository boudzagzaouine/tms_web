import { Component, OnInit } from '@angular/core';
import { NotificationTypeService } from './../../../shared/services/api/notificationType.service';
import { NotificationType } from './../../../shared/models/notificationType';
import { Template } from './../../../shared/models/template';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TemplateService } from './../../../shared/services/api/template.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../../shared/services';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-configMessage',
  templateUrl: './configMessage.component.html',
  styleUrls: ['./configMessage.component.scss']
})

export class ConfigMessageComponent implements OnInit {

  selectedTemplate = new Template();
  selectedNotificationType = new NotificationType();
  notificationTypeList:Array<NotificationType>=[];
  templatForm :FormGroup;
   sender:string ;
   subject :string;
   texte :string ;
   isFormSubmitted=false;

  constructor(private notificationTypeService:NotificationTypeService,
              private authentificationService : AuthenticationService,
               private templateService : TemplateService,
               private toastr: ToastrService,
               private messageService: MessageService) { }

  ngOnInit() {

       this.notificationTypeService.findAll().subscribe(
         data => {
          this.notificationTypeList=data;
         }
       );
  // this.initForm();

  }

  // initForm(){

  //   this.templatForm = new FormGroup({    
  //   'subject': new FormControl(this.selectedTemplate.subject,Validators.required),
  //   'texte': new FormControl(this.selectedTemplate.text,Validators.required),
  //   });

  // }

  onSubmit(){

    // this.isFormSubmitted = true;
    // if (this.templatForm.invalid) { return; }
 

    this.selectedTemplate.subject=this.subject;
    this.selectedTemplate.text=this.texte;
   this.selectedTemplate.owner=this.authentificationService.getDefaultOwner();
  //  console.log(this.selectedTemplate.ownOwner);
    
  this.templateService.set(this.selectedTemplate).subscribe(

    data=>{
      this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

      //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');

    }

  );


    
  }

  add(event: string) {
    this.texte = this.texte.trimRight() + ' {' + event + '} ';
  }
  onSelectType(event){
    this.selectedTemplate = new Template();
this.selectedNotificationType=event.value
   this.sender=this.selectedNotificationType.email;

   this.templateService.findById(this.selectedNotificationType.id).subscribe(
     data =>{
       this.selectedTemplate=data;
       this.subject=this.selectedTemplate.subject;
       this.texte=this.selectedTemplate.text;
       //this.initForm();
     },
     error => {
      this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});
      //this.toastr.error(error.error.message, 'Erreur');
    },
  );

  

  }
}
