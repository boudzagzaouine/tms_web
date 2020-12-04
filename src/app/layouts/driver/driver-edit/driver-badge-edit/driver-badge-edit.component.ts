import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoundPipe } from 'ngx-pipes';
import { Subscription } from 'rxjs';
import { BadgeType } from './../../../../shared/models/badge-Type';
import { BadgeTypeDriver } from './../../../../shared/models/badge-Type-Driver';
import { AuthenticationService, BadgeTypeService } from './../../../../shared/services';

@Component({
  selector: 'app-driver-badge-edit',
  templateUrl: './driver-badge-edit.component.html',
  styleUrls: ['./driver-badge-edit.component.scss']
})
export class DriverBadgeEditComponent implements OnInit {

  @Input() selectedBadgeDriver: BadgeTypeDriver = new BadgeTypeDriver();
  @Input() editMode = false;
  @Output() badgeDriverEdited = new EventEmitter<BadgeTypeDriver>();
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Badge';
  selectedBadgeType: BadgeType;
  badgeTypeDriverForm: FormGroup;
  badgeTypeList: BadgeType[] = [];
  subscriptions= new Subscription ();

  fr: any;

  constructor(
  private authentificationService:AuthenticationService,
    private badgeTypeService: BadgeTypeService,
   
  ) { }

  ngOnInit() {

    this.subscriptions.add( this.badgeTypeService.findAll().subscribe((data) => {
      this.badgeTypeList = data;
    }));


    this.fr = {
      firstDayOfWeek: 1,
      dayNames: ['dimanche', 'lundi', 'mardi ', 'mercredi', 'mercredi ', 'vendredi ', 'samedi '],
      dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      monthNamesShort: ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jui', 'aoû', 'sep', 'oct', 'nov', 'dic'],
      today: 'Aujourd hui',
      clear: 'Supprimer'
    };


    this.title = 'Ajouter un Badge';
    this.displayDialog = true;


    if (!this.editMode) {
      this.selectedBadgeDriver = new BadgeTypeDriver();

    }
    this.initForm();


  }

  initForm() {

    const d = new Date(this.selectedBadgeDriver.deliveranceDate);
    const dd = new Date(this.selectedBadgeDriver.validityEndDate);
    this.badgeTypeDriverForm = new FormGroup({
      'fBadgeType': new FormControl(this.selectedBadgeDriver.badgeType, Validators.required),
      'fNumBadge': new FormControl(this.selectedBadgeDriver.badgeNumber, Validators.required),
      'fDateDelivrance': new FormControl(d, Validators.required),
      'DateFin': new FormControl(dd, Validators.required)

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.badgeTypeDriverForm.invalid) {
      return;
    }

    this.selectedBadgeDriver.badgeNumber = this.badgeTypeDriverForm.value['fNumBadge'];
    this.selectedBadgeDriver.deliveranceDate = this.badgeTypeDriverForm.value['fDateDelivrance'];
    this.selectedBadgeDriver.validityEndDate = this.badgeTypeDriverForm.value['DateFin'];
 this.selectedBadgeDriver.owner=this.authentificationService.getDefaultOwner();
    this.badgeDriverEdited.emit(this.selectedBadgeDriver);
    this.displayDialog = false;

  }
  
 

  onSelectBadgeType(event) {
  
    this.selectedBadgeDriver.badgeType = event.value as BadgeType;
  
  }

 
  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
