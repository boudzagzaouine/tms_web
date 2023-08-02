import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from './../../../../shared/models/User';
import { Zone } from './../../../../shared/models/Zone';
import { Agency } from './../../../../shared/models/agency';
import { AgencyService } from './../../../../shared/services/api/agency.service';
import { UserService } from './../../../../shared/services/api/user.service';
import { ZoneServcie } from './../../../../shared/services/api/zone.service';

@Component({
  selector: 'app-agency-edit',
  templateUrl: './agency-edit.component.html',
  styleUrls: ['./agency-edit.component.scss']
})
export class AgencyEditComponent implements OnInit {

  @Input() selectedAgency = new Agency();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  zoneSearch: Zone;
  zoneList: Array<Zone>
  responsableList: Array<User>
  responsableSearch: User

  agencyForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier une Agence';
  subscriptions = new Subscription();

  constructor(private agencyService: AgencyService,
    private zoneService: ZoneServcie,
    private responsableService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedAgency = new Agency();
      this.title = 'Ajouter une Agence';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.agencyForm = new FormGroup({
      'code': new FormControl(this.selectedAgency.code, Validators.required),
      'description': new FormControl(this.selectedAgency.description),
      'zone': new FormControl(this.selectedAgency.zone, Validators.required),
      'responsable': new FormControl(this.selectedAgency.responsable, Validators.required),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.agencyForm.invalid) { return; }
    this.spinner.show();
    this.selectedAgency.code = this.agencyForm.value['code'];
    this.selectedAgency.description = this.agencyForm.value['description'];
    this.selectedAgency.zone = this.agencyForm.value['zone'];
    this.selectedAgency.responsable = this.agencyForm.value['responsable'];

  console.log("uffff"+this.selectedAgency.responsable.code);

    this.subscriptions.add(this.agencyService.set(this.selectedAgency).subscribe(
      data => {
        //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        this.messageService.add({ severity: 'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès' });

        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

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
  onResponsableSearch(event: any) {
    this.subscriptions.add(this.responsableService.find('surname~' + event.query).subscribe(
      data => this.responsableList = data
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
