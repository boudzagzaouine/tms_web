import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { VatService } from './../../../../shared/services/api/vat.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vat } from './../../../../shared/models/vat';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vat-edit',
  templateUrl: './vat-edit.component.html',
  styleUrls: ['./vat-edit.component.css']
})
export class VatEditComponent implements OnInit {


  @Input() selectedVat = new Vat();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  vatForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier TVA';
  subscriptions= new Subscription();

  constructor(private vatService: VatService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedVat = new Vat();
      this.title = 'Ajouter TVA';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.vatForm = new FormGroup({
      'value': new FormControl(this.selectedVat.value, Validators.required),


    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.vatForm.invalid) { return; }
    this.spinner.show();
    this.selectedVat.value = this.vatForm.value['value'];

 console.log("owner");


    this.subscriptions.add( this.vatService.set(this.selectedVat).subscribe(
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
