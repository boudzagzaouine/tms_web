import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { VilleService } from './../../../../shared/services/api/ville.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ville } from './../../../../shared/models/ville';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss']
})
export class CityEditComponent implements OnInit {

  @Input() selectedVille = new Ville();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  villeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Ville';
  subscriptions= new Subscription();

  constructor(private villeService: VilleService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedVille = new Ville();
      this.title = 'Ajouter Ville';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.villeForm = new FormGroup({
      'code': new FormControl(this.selectedVille.code, Validators.required),
      'description': new FormControl(this.selectedVille.description),
      'latitude': new FormControl(this.selectedVille.latitude),
      'longtitude': new FormControl(this.selectedVille.longitude),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.villeForm.invalid) { return; }
    this.spinner.show();
    this.selectedVille.code = this.villeForm.value['code'];
    this.selectedVille.description = this.villeForm.value['description'];

    this.selectedVille.latitude = this.villeForm.value['latitude'];
    this.selectedVille.longitude = this.villeForm.value['longtitude'];
 this.selectedVille.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedVille.owner);

    this.subscriptions.add( this.villeService.set(this.selectedVille).subscribe(
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
