import { SupplierProductService } from './../../../../shared/services/api/supplier-product.service';
import { SupplierProduct } from './../../../../shared/models/supplier-product';
import { ActivatedRoute, Router } from '@angular/router';
import { Day } from './../../../../shared/models/day';
import { DayService } from './../../../../shared/services/api/day.service';
import { SupplierType } from "./../../../../shared/models/supplier-type";
import { SupplierTypeService } from "./../../../../shared/services/api/supplier-type.service";
import { AddressService } from "./../../../../shared/services/api/address.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Address } from "./../../../../shared/models/address";
import { Contact } from "./../../../../shared/models/contact";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import { Supplier } from "../../../../shared/models/supplier";
import {
  AuthenticationService,
  SupplierService,
} from "../../../../shared/services";
import { Subscription } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";
import { Planning } from "./../../../../shared/models/planning";
import { DateComponent } from '@fullcalendar/angular';
import { LOADIPHLPAPI } from 'dns';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: "app-supplier-edit",
  templateUrl: "./supplier-edit.component.html",
  styleUrls: ["./supplier-edit.component.css"],
})
export class SupplierEditComponent implements OnInit {
  @Input() selectedSupplier = new Supplier();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  selectedContact = new Contact();
  selectedAddress = new Address();
  selectedSupplierProduct = new SupplierProduct();
    selectedPlanning: Planning = new Planning();

  closeResult: String;
  supplierForm: FormGroup;
  supplierTypeList: SupplierType[] = [];
  plannings :Array<Planning>=[];
  supplierProducts:Array<SupplierProduct>=[];
  days :Array<Day>=[];
  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier un Fournisseur";
  subscriptions = new Subscription();
  size: number;
  showDialogPlanning: boolean;
  showDialogSupplierProduct: boolean;
  editModePlannig: boolean;
  editModeSupplierProduct: boolean;

  editMd :boolean;
  constructor(
    private supplierService: SupplierService,
    private supplierProductService : SupplierProductService,
    private authentificationService: AuthenticationService,
    private addressService: AddressService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private supplierTypeService: SupplierTypeService,
    private dayService :DayService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {


    this.subscriptions.add(
      this.supplierTypeService.findAll().subscribe((data) => {
        this.supplierTypeList = data;

      })
    );

    this.subscriptions.add(
      this.dayService.findAll().subscribe((data) => {
        this.days = data.sort(function (a, b) {
          return (Number(a.value) - Number(b.value))
        });
        this.generatePlannings();
      })

    );
    console.log(this.editMode);
    let id = this.activatedRoute.snapshot.params["id"];
    if (!id) {

      this.editMd=false;
          this.title = "Ajouter un Fournisseur";
          console.log(this.editMd);

      this.selectedSupplier = new Supplier();
      this.selectedContact = new Contact();
      this.selectedAddress = new Address();


      this.selectedSupplier.plannings = this.plannings.sort(function (a, b) {
        return (Number(a.day.value) - Number(b.day.value))
      });

      this.subscriptions.add(
        this.supplierService.generateCode().subscribe((code) => {
          this.selectedSupplier.code = code;
          this.initForm();
        })
      );

      this.subscriptions.add(
        this.addressService.generateCode().subscribe((code) => {
          this.selectedAddress.code = code;
          this.initForm();
        })
      );
    } else {
      this.editMd=true;
      console.log(this.editMd);
      if (id) {
        console.log(id);
        this.supplierService.findById(id).subscribe((data) => {
          this.selectedSupplier = data;

          if (this.selectedSupplier.contact) {
            this.selectedContact = this.selectedSupplier.contact;
          }
          if (this.selectedSupplier.address) {
            this.selectedAddress = this.selectedSupplier.address;
          }

          if (this.selectedSupplier.plannings.length == 0) {
            this.selectedSupplier.plannings = this.plannings.sort(function (
              a,
              b
            ) {
              return Number(a.day.value) - Number(b.day.value);
            });
          }
          if (this.selectedSupplier.plannings.length >= 0) {
            this.selectedSupplier.plannings =
              this.selectedSupplier.plannings.sort(function (a, b) {
                return Number(a.day.value) - Number(b.day.value);
              });
          }
          this.initForm();
        });
      }




      // if (this.selectedSupplier.contact) {
      //   this.selectedContact = this.selectedSupplier.contact;
      // }
      // if (this.selectedSupplier.address) {
      //   this.selectedAddress = this.selectedSupplier.address;
      // }
      // console.log("planning");
      // console.log(this.selectedSupplier.plannings);

      // if(this.selectedSupplier.plannings.length ==0){
      //   this.selectedSupplier.plannings = this.plannings.sort(function (a, b) {
      //     return (Number(a.day.value) - Number(b.day.value))
      //   });
      // }
      // if(this.selectedSupplier.plannings.length >=0){
      //   this.selectedSupplier.plannings = this.selectedSupplier.plannings.sort(function (a, b) {
      //     return (Number(a.day.value) - Number(b.day.value))
      //   });
      // }
    }


    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    this.supplierForm = new FormGroup({
      code: new FormControl(this.selectedSupplier.code, Validators.required),
      name: new FormControl(this.selectedContact.name, Validators.required),
      tel1: new FormControl(this.selectedContact.tel1),
      email: new FormControl(this.selectedContact.email),
      line1: new FormControl(this.selectedAddress.line1, Validators.required),
      line2: new FormControl(this.selectedAddress.line2),
      zipCode: new FormControl(this.selectedAddress.zip),
      city: new FormControl(this.selectedAddress.city),
      country: new FormControl(this.selectedAddress.country),
      supplierType: new FormControl(this.selectedSupplier.supplierType,Validators.required ),


    });

  }

  onSubmit(clode=false) {
    this.isFormSubmitted = true;
    if (this.supplierForm.invalid) {
      return;
    }
    this.spinner.show();
    this.selectedSupplier.code = this.supplierForm.value["code"];
    this.selectedSupplier.owner =
      this.authentificationService.getDefaultOwner();
    this.selectedContact.name = this.supplierForm.value["name"];
    this.selectedContact.tel1 = this.supplierForm.value["tel1"];
    this.selectedContact.email = this.supplierForm.value["email"];

    this.selectedAddress.line1 = this.supplierForm.value["line1"];

    this.selectedAddress.line2 = this.supplierForm.value["line2"];
    this.selectedAddress.zip = this.supplierForm.value["zipCode"];
    this.selectedAddress.city = this.supplierForm.value["city"];
    this.selectedAddress.country = this.supplierForm.value["country"];

    if (this.selectedContact.name) {
      this.selectedContact.owner =
        this.authentificationService.getDefaultOwner();
      this.selectedSupplier.contact = this.selectedContact;
    }
    if (this.selectedAddress.line1) {
      this.selectedAddress.owner =
        this.authentificationService.getDefaultOwner();
      this.selectedSupplier.address = this.selectedAddress;
    }

    this.subscriptions.add(
      this.supplierService.set(this.selectedSupplier).subscribe(
        (data) => {
          this.messageService.add({
            severity: "success",
            summary: "Edition",
            detail: "Elément Enregistré Avec Succès",
          });

          //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');

          this.displayDialog = false;
          this.isFormSubmitted = false;
          this.spinner.hide();

          this.supplierForm.reset();
          if (close) {
            this.router.navigate(["/core/settings/suppliers"]);
          } else {
            this.editMode = 1;
            this.router.navigate(["/core/settings/supplier-edit"]);
            this.title = "Ajouter un Client";
          }

        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur",
          });

          // this.toastr.error(error.error.message);
          this.spinner.hide();
        },

        () => this.spinner.hide()
      )
    );
  }




  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSelectSupplierType(event) {

    this.selectedSupplier.supplierType = event.value as SupplierType;
  }

  onLineEditedPlanning(line: Planning) {
    if (
      this.selectedSupplier.plannings == null ||
      this.selectedSupplier.plannings == undefined
    ) {
      this.selectedSupplier.plannings = [];
    }
    this.selectedSupplier.plannings = this.selectedSupplier.plannings.filter(
      (l) => l.day.code !== line.day.code
    );
    this.selectedSupplier.plannings.push(line);
    this.selectedSupplier.plannings =  this.selectedSupplier.plannings.sort( (a, b)=> {
      return (Number(a.day.value) - Number(b.day.value))
    });
  }
  onDeletePlanning(day: string) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Supprimer?",
      accept: () => {
        this.selectedSupplier.plannings =
          this.selectedSupplier.plannings.filter((l) => l.day.code !== day);
      },
    });
  }
  onHideDialogPlanning(event) {
    this.showDialogPlanning = event;
  }

  onShowDialogPlanning(line, mode) {
    this.showDialogPlanning = true;

    if (mode == true) {


      this.selectedPlanning = line;
      this.editModePlannig = true;
    } else if (mode == false) {

      this.selectedPlanning = new Planning();
      this.editModePlannig = false;
    }
  }

  generatePlannings(){

    var planning : Planning;
   var datMD :Date = new Date();
   var datMF :Date = new Date();
   var datSD :Date = new Date();
   var datSF :Date = new Date();


this.days.forEach(element => {
  planning = new Planning()
   datMD.setHours(8);datMD.setMinutes(0);
   datMF.setHours(12);datMF.setMinutes(0);
   datSD.setHours(14);datSD.setMinutes(0);
   datSF.setHours(18);datSF.setMinutes(0);
  planning.day=element,
  planning.closingDay=false,
  planning.morningTimeStart=datMD,
  planning.morningTimeEnd=datMF,
  planning.everingTimeStart=datSD,
  planning.everingTimeEnd=datSF,

   this.plannings.push(planning);
});
  }




  onLineEditedSupplierProduct(line: SupplierProduct) {
    console.log(line);

    if (
      this.selectedSupplier.supplierProducts == null ||
      this.selectedSupplier.supplierProducts == undefined
    ) {
      this.selectedSupplier.supplierProducts = [];
    }
    this.selectedSupplier.supplierProducts = this.selectedSupplier.supplierProducts.filter(
      (l) => l.product.code !== line.product.code
    );
    this.selectedSupplier.supplierProducts.push(line);

  }
  onDeleteSupplierProduct(productCode: string) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Supprimer?",
      accept: () => {
        this.selectedSupplier.supplierProducts =
          this.selectedSupplier.supplierProducts.filter((l) => l.product.code !== productCode);
      },
    });
  }
  onHideDialogSupplierProduct(event) {
    this.showDialogSupplierProduct = event;
  }

  onShowDialogSupplierProduct(line, mode) {
    this.showDialogSupplierProduct = true;

    if (mode == true) {


      this.selectedSupplierProduct = line;
      this.editModeSupplierProduct = true;
    } else if (mode == false) {

      this.selectedSupplierProduct = new SupplierProduct();
      this.editModeSupplierProduct = false;
    }
  }











}
