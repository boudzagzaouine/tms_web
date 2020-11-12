import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from './../../../../shared/models';
import { VehicleService } from './../../../../shared/services';
import { DieselDeclaration } from './../../../../shared/models/diesel-declaration';
import { DieselDeclarationService } from './../../../../shared/services/api/dieselDeclaration.service';
import { PatrimonyService } from './../../../../shared/services/api/patrimony-service';

@Component({
  selector: 'app-diesel-declaration-edit',
  templateUrl: './diesel-declaration-edit.component.html',
  styleUrls: ['./diesel-declaration-edit.component.scss']
})
export class DieselDeclarationEditComponent implements OnInit {

  @Input() selectedDieselDeclaration = new DieselDeclaration();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  editModee :Boolean;
  vehicleList: Vehicle[] = [];

  dieselDeclarationForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = '';

  constructor(private dieselDeclarationService: DieselDeclarationService,
    private patrimonyService :PatrimonyService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedDieselDeclaration = new DieselDeclaration();
      this.title = 'Ajouter ';
      this.editModee=false;
      this.dieselDeclarationService.generateCode().subscribe(
        code => {
       this.selectedDieselDeclaration.code = code;
        this.initForm();
    });

    }else if (this.editMode === 2){
      console.log("modifier");
      
          this.editModee=true;
          this.title = 'Modifier ';
    }

 console.log(this.editModee);
 
    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.dieselDeclarationForm = new FormGroup({
      'code': new FormControl(this.selectedDieselDeclaration.code, Validators.required),
      'vehicle': new FormControl(this.selectedDieselDeclaration.vehicle, Validators.required),
      'amount': new FormControl(this.selectedDieselDeclaration.amount, Validators.required),
      'date': new FormControl(new Date(this.selectedDieselDeclaration.dieselDeclarationDate), Validators.required),
      'km': new FormControl(this.selectedDieselDeclaration.mileage, Validators.required),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.dieselDeclarationForm.invalid) { return; }
    this.spinner.show();
    this.selectedDieselDeclaration.code = this.dieselDeclarationForm.value['code'];
    this.selectedDieselDeclaration.amount = this.dieselDeclarationForm.value['amount'];
    this.selectedDieselDeclaration.dieselDeclarationDate = this.dieselDeclarationForm.value['date'];
    this.selectedDieselDeclaration.mileage = this.dieselDeclarationForm.value['km'];

    const s = this.dieselDeclarationService.set(this.selectedDieselDeclaration).subscribe(
      data => {
        this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }

  onCodeVehicleSearch(event: any) {
    this.patrimonyService.find('code~' + event.query).subscribe(
      data => this.vehicleList = data
    );
  }

  onSelectVehicle(event) {
    this.selectedDieselDeclaration.vehicle = event;
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }



}
