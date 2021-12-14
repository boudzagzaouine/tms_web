import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { diffDates } from '@fullcalendar/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Holiday } from './../../../../shared/models/holiday';
import { AuthenticationService } from './../../../../shared/services';
import { HolidayService } from './../../../../shared/services/api/account-holiday.service';
import { AccountService } from './../../../../shared/services/api/account.service';

@Component({
  selector: 'app-holiday-edit',
  templateUrl: './holiday-edit.component.html',
  styleUrls: ['./holiday-edit.component.scss']
})
export class HolidayEditComponent implements OnInit {

  @Input() selectedHoliday = new Holiday();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  holidayForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier jour férier ';
  subscriptions = new Subscription();

  constructor(private holidayService: HolidayService,
    private authentificationService: AuthenticationService,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    if (this.editMode === 1) {
      this.selectedHoliday = new Holiday();
      this.title = 'Ajouter jour férier ';
    }
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    let dd = new Date(this.selectedHoliday.holidayDate)
    this.holidayForm = new FormGroup({
      'code': new FormControl(this.selectedHoliday.code),
      'description': new FormControl(this.selectedHoliday.description),
      'day': new FormControl(this.selectedHoliday.holidayDay),
      'month': new FormControl(this.selectedHoliday.holidayMonth),
      'holidayDate': new FormControl(dd),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.holidayForm.invalid) { return; }
    this.spinner.show();
    this.selectedHoliday.code = this.holidayForm.value['code'];

    this.selectedHoliday.description = this.holidayForm.value['description'];
    this.selectedHoliday.holidayDay = this.holidayForm.value['day'];
    this.selectedHoliday.holidayMonth = this.holidayForm.value['month'];
    this.selectedHoliday.owner = this.authentificationService.getDefaultOwner();
    console.log("owner");

    console.log(this.selectedHoliday);

    this.subscriptions.add(this.holidayService.set(this.selectedHoliday).subscribe(
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

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
