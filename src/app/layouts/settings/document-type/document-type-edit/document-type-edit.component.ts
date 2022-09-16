import { DocumentType } from './../../../../shared/models/document-type';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { DocumentTypeService } from './../../../../shared/services/api/document-type.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.scss']
})
export class DocumentTypeEditComponent implements OnInit {


  @Input() selectedDocumentType = new DocumentType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  documentTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de Document';
  subscriptions= new Subscription();

  constructor(private documentTypeService: DocumentTypeService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedDocumentType = new DocumentType();
      this.title = 'Ajouter un type de Document';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.documentTypeForm = new FormGroup({
      'code': new FormControl(this.selectedDocumentType.code, Validators.required),
      'description': new FormControl(this.selectedDocumentType.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.documentTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedDocumentType.code = this.documentTypeForm.value['code'];
    this.selectedDocumentType.description = this.documentTypeForm.value['description'];
 this.selectedDocumentType.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedDocumentType.owner);

    this.subscriptions.add( this.documentTypeService.set(this.selectedDocumentType).subscribe(
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
