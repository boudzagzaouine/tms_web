import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ZoneServcie } from '../../../../shared/services/api/zone.service';
import { Zone } from './../../../../shared/models/Zone';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../../shared/services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.css']
})
export class ZoneEditComponent implements OnInit {

  @Input() selectedzones = new Zone();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  zoneForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier une zone';
  subscriptions= new Subscription();

  constructor(private zoneService: ZoneServcie,
       private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,

    private toastr: ToastrService,
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedzones = new Zone();
      this.title = 'Ajouter une zone';

    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.zoneForm = new FormGroup({
      'code': new FormControl(this.selectedzones.code, Validators.required),
      'description': new FormControl(this.selectedzones.code),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.zoneForm.invalid) { return; }
    this.spinner.show();
    this.selectedzones.code = this.zoneForm.value['code'];
    this.selectedzones.description = this.zoneForm.value['description'];
   this.selectedzones.owner=this.authentificationService.getDefaultOwner();
    this.subscriptions.add( this.zoneService.set(this.selectedzones).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

        //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
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
