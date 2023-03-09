import { Byte } from '@angular/compiler/src/util';
import { AuthenticationService } from './../../../../../shared/services/api/authentication.service';
import { DocumentTypeService } from './../../../../../shared/services/api/document-type.service';
import { DocumentType } from './../../../../../shared/models/document-type';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from './../../../../../shared/models/document';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-sinister-document-edit',
  templateUrl: './sinister-document-edit.component.html',
  styleUrls: ['./sinister-document-edit.component.scss']
})
export class SinisterDocumentEditComponent implements OnInit {

  @Input() selectedDocument: Document = new Document();
  @Input() editMode = false;
  @Output() documentEdited = new EventEmitter<Document>();
  @Output() showDialog = new EventEmitter<boolean>();
  documentTypeList : DocumentType[]=[];
  displayDialog: boolean;
  title = 'Modifier Document';
  DocumentForm: FormGroup;
  isFormSubmitted = false;
  uploadedFiles: any[] = [];
  file :any;

  constructor(  private documentTypeService:DocumentTypeService,
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,) { }


  ngOnInit(): void {
    console.log("edit ");

    this.title = 'Ajouter Document';
    this.displayDialog = true;

    this.documentTypeService.findAll().subscribe(
      data => {this.documentTypeList = data

      }

    );

if (!this.editMode) {
  this.selectedDocument=new Document();
}
else{
  this.uploadedFiles=this.selectedDocument.file;
}
console.log(this.selectedDocument);

this.initForm();


  }

  initForm() {


    this.DocumentForm = this.formBuilder.group({

      code: this.formBuilder.control(this.selectedDocument.code),
      description: this.formBuilder.control(this.selectedDocument.description),
      documentType: this.formBuilder.control(this.selectedDocument.documentType),
      file: this.formBuilder.control(this.selectedDocument.file),
      fileName: this.formBuilder.control(this.selectedDocument.fileName),
      date: this.formBuilder.control(new Date(this.selectedDocument.date)),


    });
  }
  onSubmit(){

    this.isFormSubmitted = true;
    if (this.DocumentForm.invalid) {
      return;
    }

    // this.selectedPlanning.Day = this.planningForm.value['day'];

    this.selectedDocument.code = this.DocumentForm.value['code'];
    this.selectedDocument.description = this.DocumentForm.value['description'];
    this.selectedDocument.date = this.DocumentForm.value['date'];

    this.selectedDocument.owner = this.authentificationService.getDefaultOwner();
    console.log(this.selectedDocument);

    this.documentEdited.emit(this.selectedDocument);
    this.displayDialog = false;
  }





    onSelectDocumentType(event) {
     this.selectedDocument.documentType = event.value;
     console.log( this.selectedDocument.documentType);

    }

    onHideDialog() {
      const a = false;
      this.showDialog.emit(a);
      this.displayDialog = false;

    }

    onSelectDocument(event) {
      let fileReader = new FileReader();
      var fl : any;
      for(let file of event.files) {
        console.log(file);

         // this.uploadedFiles.push(file);
          fileReader.readAsDataURL(file);
          this.selectedDocument.fileName=file.name;

          fileReader.onload =  ()=> {
            console.log(fileReader.result);
            this.selectedDocument.file=(fileReader.result as string).split(",")[1] as any;
            this.selectedDocument.fileType=file.type;
           console.log( this.selectedDocument.file);
        };

     }
  }


dowloand(){
  var url=this.selectedDocument.file;
  var binaryString = window.atob(url as any);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
     var ascii = binaryString.charCodeAt(i);
     bytes[i] = ascii;
  }
  const data=new Blob([bytes]);
let arrayOfBlob = new Array<Blob>();
arrayOfBlob.push(data);
 var file = new File(arrayOfBlob,this.selectedDocument.fileName,{
   type: this.selectedDocument.fileType });

  let fileReader = new FileReader();
  fileReader.readAsDataURL(file);
fileReader.onload =  ()=> {
  saveAs(fileReader.result,this.selectedDocument.fileName);
}
}



  deleteFile() {
console.log("delete");
    this.selectedDocument.file=null;
    this.selectedDocument.fileName=null;
    this.selectedDocument.fileType=null;


    }

}
