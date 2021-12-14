import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoundPipe } from 'ngx-pipes';
import { Planning } from './../../../../../shared/models/planning';
import { AuthenticationService } from './../../../../../shared/services';

@Component({
  selector: 'app-planning-edit',
  templateUrl: './planning-edit.component.html',
  styleUrls: ['./planning-edit.component.scss']
})
export class PlanningEditComponent implements OnInit {

  @Input() selectedPlanning: Planning = new Planning();
  @Input() editMode = false;
  @Output() planningEdited = new EventEmitter<Planning>();
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Plan';
  planningForm: FormGroup;
  planningDays: Array<{ day: string }> = [];

  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthenticationService,

  ) { }

  ngOnInit() {

    this.planningDays = [ { day: 'LUNDI' }, { day: 'MARDI' }, { day: 'MERCREDI' }, { day: 'JEUDI' }, { day: 'Vendredi' }, { day: 'SAMEDI' }, { day: 'DIMANCHE' },]

    this.title = 'Ajouter un Plan';
    this.displayDialog = true;
    console.log(this.editMode);


    if (!this.editMode) {
      console.log("new");

      this.selectedPlanning = new Planning();
      this.selectedPlanning.everingTimeStart.setHours(0,0,0);
      this.selectedPlanning.everingTimeEnd.setHours(0,0,0);
      this.selectedPlanning.morningTimeStart.setHours(0,0,0);
     this.selectedPlanning.morningTimeEnd.setHours(0,0,0);

    }
    else{
      console.log("modif");
      
    }
    this.initForm();
    console.log(this.selectedPlanning);


  }
  onChangeClosing(event){
console.log(event.checked);
if(event.checked==true){

  // this.planningForm.patchValue({
  //   everingstart: new Date(),
  //   everingend:   new Date(),
  //   morningstart:   new Date(),
  //   morningend:   new Date(),

  // });

  

}
  }

  initForm() {
    let mstart = new Date(this.selectedPlanning.morningTimeStart);
    let mend = new Date(this.selectedPlanning.morningTimeEnd);
    let estart = new Date(this.selectedPlanning.everingTimeStart);
    let eend = new Date(this.selectedPlanning.everingTimeEnd);

    this.planningForm = this.formBuilder.group({

      day: this.formBuilder.control(this.selectedPlanning?.day),
      morning: this.formBuilder.control(this.selectedPlanning.morning),
      morningstart: this.formBuilder.control(mstart),
      morningend: this.formBuilder.control(mend),
      evering: this.formBuilder.control(this.selectedPlanning.morning),
      everingstart: this.formBuilder.control(estart),
      everingend: this.formBuilder.control(eend),
      closingday: this.formBuilder.control(this.selectedPlanning.closingDay),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.planningForm.invalid) {
      return;
    }

    // this.selectedPlanning.Day = this.planningForm.value['day'];
    this.selectedPlanning.morning = "Matin";
    this.selectedPlanning.morningTimeStart = this.planningForm.value['morningstart'];
    this.selectedPlanning.morningTimeEnd = this.planningForm.value['morningend'];
    this.selectedPlanning.evering = "Soir";
    this.selectedPlanning.everingTimeStart = this.planningForm.value['everingstart'];
    this.selectedPlanning.everingTimeEnd = this.planningForm.value['everingend'];
    this.selectedPlanning.closingDay = this.planningForm.value['closingday'];

    this.selectedPlanning.owner = this.authentificationService.getDefaultOwner();
    console.log(this.selectedPlanning);

    this.planningEdited.emit(this.selectedPlanning);
    this.displayDialog = false;

  }


  onSelectDay(event) {
    console.log(event.value.day);
    this.selectedPlanning.day = event.value.day;
  }


  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }
}
