import { CommissionDriver } from './../../../shared/models/commission-driver';
import { BadgeTypeDriver } from './../../../shared/models/badge-Type-Driver';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


import { ActivatedRoute, Router } from '@angular/router';
import { Badge, Driver, Contact } from './../../../shared/models';

import { DriverService } from '../../../shared/services/api/driver.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BadgeTypeDriverService } from '../../../shared/services/api/badge-type-driver.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../shared/services';




@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.css']
})
export class DriverEditComponent implements OnInit {

  driverForm: FormGroup;
  selectedDriver: Driver = new Driver();
  badgesList: Array<Badge> = [];
  isFormSubmitted = false;
  fr: any;
  idDriver: number;
  badgeDriverListEdited: BadgeTypeDriver[] = [];
  commissionDriverListEdited: CommissionDriver[] = [];
  items: MenuItem[];
  searchQuery = '';
  commissionForm: FormGroup;
  badgeForm: FormGroup;
  index: number = 0;
  page = 0;
  size = 8;
  valid = false;
  collectionSize: number;
  editModeTitle = 'Ajouter un Chaufeur';
  BadgeDriverList : BadgeTypeDriver[] = [];
  selectedBadgeDriver = new  BadgeTypeDriver();
  showDialog: boolean;
  editMode: boolean;
  subscriptions= new Subscription ();


  constructor(private formBuilder: FormBuilder,
    private driverService: DriverService,
    private badgeTypeDriverService : BadgeTypeDriverService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private authentificationService:AuthenticationService,
    ) { }

  ngOnInit() {



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

    this.initForm();

  

    if (this.route.snapshot.params['id'] >= 1) {
      this.idDriver = this.route.snapshot.params['id'];
      this.subscriptions.add(this.driverService.findById(this.idDriver).subscribe(
        data => {
          this.selectedDriver = data;
          this.editModeTitle = 'Modifier un chaufeur';

          this.initForm();
        }
      ));
      this.subscriptions.add(this.badgeTypeDriverService.find('driver.id:' + this.idDriver).subscribe(
        data => {
          this.BadgeDriverList = data;
   
        }))
    }else{

      this.subscriptions.add( this.driverService.generateCode().subscribe(
        code => {
       this.selectedDriver.code = code;
        this.initForm();
      }));
    }




  }
  initForm(close = false) {
    const d = new Date(this.selectedDriver.birthDate);
    const dd = new Date(this.selectedDriver.lastMedicalVisit);
    this.driverForm = this.formBuilder.group(
      {

        'cin': new FormControl(this.selectedDriver.cin, Validators.required),
        'code': new FormControl(this.selectedDriver.code, Validators.required),
        'dateNaissance': new FormControl(d),
        'visiteMedicale': new FormControl(dd),
        'nom': new FormControl(this.selectedDriver.name, Validators.required),
        'tele': new FormControl(this.selectedDriver.tele1),
        'fax': new FormControl(this.selectedDriver.fax),
        'email': new FormControl(this.selectedDriver.email),
        'carte': new FormControl(this.selectedDriver.carte),

      }
    );
  }
  // loadBadge(search: string = '') {

  // }
  loadDataLazy(event) {
 
    this.page = event.first / this.size;

   // this.loadBadge(this.searchQuery);

  }

  // onLoadBadge(badge: BadgeTypeDriver[]) {

  //   this.badgeDriverListEdited = badge;

  //   this.selectedDriver.badgeTypeDrivers = this.badgeDriverListEdited;

  // }

 
  onSubmitForm() {

    this.isFormSubmitted = true;

    // stop here if form is invalid
    if (this.driverForm.invalid) {
      return;
      this.valid = true;
    }


    this.spinner.show();
    const formValue = this.driverForm.value;
    this.selectedDriver.cin = formValue['cin'];
    this.selectedDriver.code = formValue['code'];
    this.selectedDriver.birthDate = formValue['dateNaissance'];
    this.selectedDriver.lastMedicalVisit = formValue['visiteMedicale'];
    //   this.selectedDriver.commission = formValue['comission'];
    this.selectedDriver.name = formValue['nom'];
    this.selectedDriver.email = formValue['email'];
    this.selectedDriver.tele1 = formValue['tele'];
    this.selectedDriver.fax = formValue['fax'];
    this.selectedDriver.carte = formValue['carte'];
  this.selectedDriver.owner=this.authentificationService.getDefaultOwner();
   this.selectedDriver.badgeTypeDrivers=this.BadgeDriverList;


    this.driverService.set(this.selectedDriver).subscribe(
      data => {
        
        this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');

        if (close) {
          this.router.navigate(['/core/drivers/list']);
        } else {

          this.router.navigate(['/core/drivers/edit']);
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );



    this.spinner.hide();
    this.selectedDriver = new Driver();
    //this.driverForm.reset();
  }




  onLineEditedBadge(line: BadgeTypeDriver) {
    this.BadgeDriverList = this.BadgeDriverList.filter(
      (l) => l.badgeType.id !== line.badgeType.id
    );
    this.BadgeDriverList.push(line);
    

  }

  onDeleteBadge(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {

        this.BadgeDriverList = this.BadgeDriverList.filter(
          (l) => l.id !== id
        );
       
      },
    });
  }

  onShowDialogBadge(line, mode) {

    this.showDialog = true;

    if (mode == true) {
      this.selectedBadgeDriver = line;
      this.editMode = true;

    } else {
      this.selectedBadgeDriver= new BadgeTypeDriver();
      this.editMode = false;

    }




  }
  onHideDialogBadge(event) {
    this.showDialog = event;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

