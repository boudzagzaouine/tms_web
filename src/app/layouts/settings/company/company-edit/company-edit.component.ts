import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { CompanyService } from './../../../../shared/services/api/company.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from './../../../../shared/models/company';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  @Input() selectedCompany = new Company();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  companyForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Sociéte';
  subscriptions= new Subscription();

  constructor(private companyService: CompanyService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedCompany = new Company();
      this.title = 'Ajouter Sociéte';

this.companyService.generateCode().subscribe(
  data => {
         this.selectedCompany.code=data;
         console.log(data);

         this.initForm();
  }
);


    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.companyForm = new FormGroup({
      'code': new FormControl(this.selectedCompany.code, Validators.required),
      'description': new FormControl(this.selectedCompany.description),
      'name': new FormControl(this.selectedCompany.name),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.companyForm.invalid) { return; }
    this.spinner.show();
    this.selectedCompany.code = this.companyForm.value['code'];
    this.selectedCompany.description = this.companyForm.value['description'];
    this.selectedCompany.name = this.companyForm.value['name'];

 this.selectedCompany.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedCompany.owner);

    this.subscriptions.add( this.companyService.set(this.selectedCompany).subscribe(
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
