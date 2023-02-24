import { Pays } from './../../../../shared/models/pays';
import { PaysService } from './../../../../shared/services/api/pays.service';
import { VehicleTray } from './../../../../shared/models/vehicle-tray';
import { VehicleTrayService } from './../../../../shared/services/api/vehicle-tray.service';
import { LoadingType } from './../../../../shared/models/loading-type';
import { LoadingTypeService } from './../../../../shared/services/api/loading-type.service';
import { Trajet } from './../../../../shared/models/trajet';
import { TrajetService } from '../../../../shared/services/api/trajet.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VilleService } from './../../../../shared/services/api/ville.service';
import { VatService } from './../../../../shared/services/api/vat.service';
import { TransportServcie } from './../../../../shared/services/api/transport.service';
import { TurnTypeService } from './../../../../shared/services/api/turn-type.service';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { Vat } from './../../../../shared/models/vat';
import { Ville } from './../../../../shared/models/ville';
import { TurnType } from './../../../../shared/models/turn-Type';
import { Transport } from './../../../../shared/models/transport';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-trajet-edit',
  templateUrl: './trajet-edit.component.html',
  styleUrls: ['./trajet-edit.component.scss']
})
export class TrajetEditComponent implements OnInit {

  @Input() selectTrajet = new Trajet();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  trajetList: FormGroup;
  vehicleCategorieList: VehicleCategory[] = [];
  transportList: Transport[] = [];
  turnTypeList :TurnType[]=[];
  villeList: Ville[] = [];

  displayDialog: boolean;
  isFormSubmitted = false;
  title = 'Modifier  Trajet';

  villeSourceId : number;
  villeDestinationId : number ;

  paysList:Array<Pays>=[];
  constructor(
    private TrajetService: TrajetService,
    private authentificationService:AuthenticationService,

    private villeService: VilleService,
    private paysService:PaysService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,

    ) { }

  ngOnInit() {


      this.load();
    if (this.editMode === 1) {
      this.selectTrajet = new Trajet();
      this.title = 'Ajouter  Trajet';

    }

    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    this.trajetList = new FormGroup({
      'fCode': new FormControl(this.selectTrajet?.code, Validators.required),

      'fPaysSource': new FormControl(this.selectTrajet?.paysSource, Validators.required),
      'fVilleSource': new FormControl(this.selectTrajet?.villeSource, Validators.required),
      'fPaysDestination': new FormControl(this.selectTrajet?.paysDestination, Validators.required),
      'fVilleDestination': new FormControl(this.selectTrajet?.villeDestination, Validators.required),


    });
  }
  onSubmit() {
    console.log(this.trajetList);
    this.isFormSubmitted = true;
    if (this.trajetList.invalid) { return; }

    this.spinner.show();
console.log(this.editMode);


console.log(this.selectTrajet);

    if (this.editMode === 1) {


       this.existTransport();
    } else if (this.editMode === 2) {


           this.insertcatalogTransport();
    }


   // this.selectTrajet = new Trajet();


  }

  existTransport() {
    this.TrajetService.sizeSearch(`villeSource.id:${this.villeSourceId},villeDestination.id:${this.villeDestinationId}`).subscribe(
      data => {
console.log(data);

        if (data > 0) {
          this.messageService.add({severity:'error', summary: 'Edition', detail: 'Elément Existe Déja'});

          //this.toastr.error('Elément Existe Déja', 'Edition');
        } else {
          this.insertcatalogTransport();
        }
        this.spinner.hide();

      },
      error => {
       // this.toastr.error(error.error.message, 'Erreur');
       this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});


        this.spinner.hide();
      },

      () => this.spinner.hide()
    );
  }
  insertcatalogTransport(){

    this.selectTrajet.code = this.trajetList.value['fCode'];


      console.log(this.selectTrajet);

    this.TrajetService.set(this.selectTrajet).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});
 console.log(this.selectTrajet);

        //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error   => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail:'Erreur'});

       // this.toastr.error(error.error.message);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );
  }




  onVilleSourceSearch(event: any) {
    this.villeService
      .find('code~' + event.query)
      .subscribe(data => (this.villeList = data));
  }


  onSelectPaysSource(event){
    this.selectTrajet.paysSource = event.value;


  }
  onSelectVilleSource(event: any) {
    this.selectTrajet.villeSource = event;
    this.villeSourceId = this.selectTrajet.villeSource.id;
    this.selectTrajet.code= this.selectTrajet?.villeSource?.code+"-"+(this.selectTrajet?.villeDestination?.code ?this.selectTrajet?.villeDestination?.code:'') ;
    console.log(this.selectTrajet.code);
    this.initForm();
  }

  onSelectPaysDistination(event){
    this.selectTrajet.paysDestination = event.value;

  }
  onSelectVilleDestination(event: any) {
    this.selectTrajet.villeDestination = event;
    this.villeDestinationId = this.selectTrajet.villeDestination.id;
    this.selectTrajet.code= (this.selectTrajet?.villeSource?.code?this.selectTrajet?.villeSource?.code :'')+"-"+this.selectTrajet?.villeDestination?.code;
    console.log(this.selectTrajet.code);
    this.initForm();

  }



  load(){

    this.villeService.findAll().subscribe(
      data => {
        this.villeList = data;
      }
    );



    this.paysService.findAll().subscribe(
      data => {
        this.paysList = data;
      }
    );
  }


  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
