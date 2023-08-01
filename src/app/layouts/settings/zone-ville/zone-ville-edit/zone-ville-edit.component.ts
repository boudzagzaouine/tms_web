import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../../shared/services';
import { ZoneVille } from './../../../../shared/models/zone-ville';
import { ZoneVilleService } from './../../../../shared/services/api/zone-ville.service';
import { Zone } from './../../../../shared/models/Zone';

import { Ville } from './../../../../shared/models/Ville';
import { ZoneServcie } from './../../../../shared/services/api/zone.service';
import { VilleService } from './../../../../shared/services/api/ville.service';

@Component({
  selector: 'app-zone-ville-edit',
  templateUrl: './zone-ville-edit.component.html',
  styleUrls: ['./zone-ville-edit.component.css']
})
export class ZoneVilleEditComponent implements OnInit {


  @Input() selectedzonevilles  = new ZoneVille();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  zoneVilleForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  zoneList:Zone[];
  villeSearch:Ville;
  zoneSearch:Zone
  villeList:Ville[]
  title = 'Modifier une zone et ville';
  subscriptions= new Subscription();

  constructor(private zoneVilleService: ZoneVilleService,
    private villeService:VilleService,
       private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
     private zoneService:ZoneServcie,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedzonevilles  = new ZoneVille();
      this.title = 'Ajouter une zone et ville';

    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.zoneVilleForm = new FormGroup({
      'zone': new FormControl(this.selectedzonevilles.zone, Validators.required),
      'ville': new FormControl(this.selectedzonevilles.ville,Validators.required),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.zoneVilleForm.invalid) { return; }
    this.spinner.show();
    this.selectedzonevilles.zone = this.zoneVilleForm.value['zone'];
    this.selectedzonevilles.ville = this.zoneVilleForm.value['ville'];
    console.log(    this.selectedzonevilles );
    
    this.subscriptions.add( this.zoneVilleService.set(this.selectedzonevilles ).subscribe(
      data => {
        console.log(data);
        
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
  onZoneSearch(event: any) {
    this.subscriptions.add(this.zoneService.find('code~' + event.query).subscribe(
      data => this.zoneList = data
    ));
  }
  onVilleSearch(event: any) {
    this.subscriptions.add(this.villeService.find('code~' + event.query).subscribe(
      data => this.villeList = data
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
