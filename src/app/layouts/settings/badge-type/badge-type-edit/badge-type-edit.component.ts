import { ConfirmationService, MessageService } from 'primeng/api';
import { Badge } from './../../../../shared/models/badge';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BadgeType } from '../../../../shared/models';
import { AuthenticationService, BadgeTypeService } from '../../../../shared/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-badge-type-edit',
  templateUrl: './badge-type-edit.component.html',
  styleUrls: ['./badge-type-edit.component.css']
})
export class BadgeTypeEditComponent implements OnInit {

  @Input() selectedBadgeType = new BadgeType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  badgeTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de badge';
  subscriptions= new Subscription();

  constructor(private badgeTypeService: BadgeTypeService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedBadgeType = new BadgeType();
      this.title = 'Ajouter un type de badge';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.badgeTypeForm = new FormGroup({
      'code': new FormControl(this.selectedBadgeType.code, Validators.required),
      'description': new FormControl(this.selectedBadgeType.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.badgeTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedBadgeType.code = this.badgeTypeForm.value['code'];
    this.selectedBadgeType.description = this.badgeTypeForm.value['description'];
 this.selectedBadgeType.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");
 
 console.log(this.selectedBadgeType.owner);
 
    this.subscriptions.add( this.badgeTypeService.set(this.selectedBadgeType).subscribe(
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
