import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ZoneServcie } from './../../../../shared/services/api/zone.service';
import { Zone } from './../../../../shared/models/Zone';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  constructor(private zoneService: ZoneServcie,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

    console.log(this.editMode);

    if (this.editMode === 1) {
      this.selectedzones = new Zone();
      this.title = 'Ajouter une zone';

    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.zoneForm = new FormGroup({
      'name': new FormControl(this.selectedzones.name, Validators.required),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.zoneForm.invalid) { return; }
    this.spinner.show();
    this.selectedzones.name = this.zoneForm.value['name'];

    const s = this.zoneService.set(this.selectedzones).subscribe(
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
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }


}
