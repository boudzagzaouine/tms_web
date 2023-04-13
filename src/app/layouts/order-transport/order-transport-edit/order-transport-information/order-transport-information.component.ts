import { OrderTransportAccompaniment } from "./../../../../shared/models/order-transport-accompaniment";
import { VehicleAccompaniment } from "./../../../../shared/models/vehicle-accompaniment";
import { VehicleAccompanimentService } from "./../../../../shared/services/api/vehicle-accompaniment.service";
import { SelectObject } from "./../../../../shared/models/select-object";
import { MarchandiseTypeService } from "./../../../../shared/services/api/marchandise-type.service";
import { TrajetService } from "./../../../../shared/services/api/trajet.service";
import { MarchandiseType } from "./../../../../shared/models/marchandise-type";
import { Responsability } from "./../../../../shared/models/responsability";
import { PackagingTypeService } from "./../../../../shared/services/api/packaging-type.service";
import { PackagingType } from "./../../../../shared/models/packagingType";
import { VilleService } from "./../../../../shared/services/api/ville.service";
import { Ville } from "./../../../../shared/models/ville";
import { ContactService } from "./../../../../shared/services/api/contact.service";
import { Contact } from "./../../../../shared/models/contact";
import { VehicleTray } from "./../../../../shared/models/vehicle-tray";
import { VehicleTrayService } from "./../../../../shared/services/api/vehicle-tray.service";
import { LoadingTypeService } from "./../../../../shared/services/api/loading-type.service";
import { LoadingType } from "./../../../../shared/models/loading-type";
import { OrderTransportInfoService } from "./../../../../shared/services/api/order-transport-info.service";
import { OrderTransportService } from "./../../../../shared/services/api/order-transport.service";
import { VehicleCategoryService } from "./../../../../shared/services/api/vehicle-category.service";
import { TurnStatusService } from "./../../../../shared/services/api/turn-status.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { AccountService } from "./../../../../shared/services/api/account.service";
import { TurnTypeService } from "./../../../../shared/services/api/turn-type.service";
import { Account } from "./../../../../shared/models/account";
import { VehicleCategory } from "./../../../../shared/models/vehicle-category";
import { TurnStatus } from "./../../../../shared/models/turn-status";
import { TurnType } from "./../../../../shared/models/turn-Type";
import { MenuItem, ConfirmationService, MessageService } from "primeng/api";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OrderTransport } from "./../../../../shared/models/order-transport";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import { isNumber } from "@ng-bootstrap/ng-bootstrap/util/util";

@Component({
  selector: "app-order-transport-information",
  templateUrl: "./order-transport-information.component.html",
  styleUrls: ["./order-transport-information.component.scss"],
})
export class OrderTransportInformationComponent implements OnInit {
  @Output() nextstep = new EventEmitter<Boolean>();
  @Output() turnTypeId = new EventEmitter<number>();

  selectedOrderTransport: OrderTransport = new OrderTransport();
  OrderTransportForm: FormGroup;

  loadingTypeList: LoadingType[] = [];
  turnTypeList: TurnType[] = [];
  packagingTypeList: PackagingType[] = [];
  turnStatusList: TurnStatus[] = [];
  vehicleCategoryList: VehicleCategory[] = [];
  accountList: Account[] = [];
  vehicleAccompanimentList: VehicleAccompaniment[] = [];

  vehicleTrayList: VehicleTray[] = [];
  isFormSubmitted = false;
  index: number = 0;
  activeIndex: number = 0;
  home: MenuItem;
  items: MenuItem[];
  contactList: Contact[] = [];
  villeList: Ville[] = [];
  villeSource: Ville;
  villeDestination: Ville;
  marchandiseTypeList: MarchandiseType[] = [];
  portList: Array<SelectObject> = [];
  showDialogAccount:boolean=false;
    showDialogContact:boolean=false;
  palletResponsibilityList: Array<SelectObject> = [];
  selectedContact: Contact = new Contact();
  constructor(
    private turnTypeService: TurnTypeService,
    private vehicleAccompanimentService: VehicleAccompanimentService,
    public OrderTransportService: OrderTransportService,
    private loadingTypeService: LoadingTypeService,
    private accountService: AccountService,
    private vehicleTrayService: VehicleTrayService,
    private villeService: VilleService,
    private vehicleCategoryService: VehicleCategoryService,
    private packagingTypeService: PackagingTypeService,
    private trajetService: TrajetService,
    private messageService: MessageService,
    private marchandiseTypeService: MarchandiseTypeService,
    private contactService:ContactService
  ) {}

  ngOnInit() {
    this.load();

    if (
      this.OrderTransportService.getOrderTransportCode() != null ||
      this.OrderTransportService.getOrderTransportCode() != undefined
    ) {
      this.selectedOrderTransport =
        this.OrderTransportService.getOrderTransport();

      this.selectedContact = this.selectedOrderTransport.contact;

      this.selectedOrderTransport.vehicleAccompaniments =
        this.selectedOrderTransport.orderTransportAccompaniments.map(
          (f) => f.vehicleAccompaniment
        );

      if (
        this.selectedOrderTransport.port?.trim() ===
        this.portList[0].code?.trim()
      ) {
        this.selectedOrderTransport.portObject = this.portList[0];
      } else if (
        this.selectedOrderTransport.port?.trim() ===
        this.portList[1].code?.trim()
      ) {
        this.selectedOrderTransport.portObject = this.portList[1];
      }

      if (
        this.selectedOrderTransport.palletResponsibility?.trim() ===
        this.palletResponsibilityList[0]?.code?.trim()
      ) {
        this.selectedOrderTransport.palletResponsibilityObject =
          this.palletResponsibilityList[0];
      } else if (
        this.selectedOrderTransport.palletResponsibility?.trim() ===
        this.palletResponsibilityList[1]?.code?.trim()
      ) {
        this.selectedOrderTransport.palletResponsibilityObject =
          this.palletResponsibilityList[1];
      }

      this.getVehicleCategoryTray(this.selectedOrderTransport.vehicleCategory);


      this.villeSource = this.selectedOrderTransport?.trajet?.villeSource;
      this.villeDestination =
        this.selectedOrderTransport?.trajet?.villeDestination;
      this.contactList = this.selectedOrderTransport?.account?.contacts;
      this.initForm();
    }
    this.initForm();
  }

  initForm() {
    this.OrderTransportForm = new FormGroup({
      contact: new FormControl(this.selectedOrderTransport.contact),
      remark: new FormControl(this.selectedOrderTransport.remark),
      villeSource: new FormControl(this.villeSource, Validators.required),
      villeDistination: new FormControl(
        this.villeDestination,
        Validators.required
      ),
      date: new FormControl(new Date(this.selectedOrderTransport.date)),
      loadingType: new FormControl(
        {
          value: this.selectedOrderTransport.loadingType,
        },
        Validators.required
      ),
      turnType: new FormControl(
        this.selectedOrderTransport.turnType,
        Validators.required
      ),
      account: new FormControl(
        this.selectedOrderTransport.account,
        Validators.required
      ),

      category: new FormControl(
        this.selectedOrderTransport.vehicleCategory,
        Validators.required
      ),
      vehicleTray: new FormControl(
        this.selectedOrderTransport.vehicleTray,
        Validators.required
      ),
      packagingType: new FormControl(
        this.selectedOrderTransport.packagingType,
        Validators.required
      ),
      marchandiseType: new FormControl(
        this.selectedOrderTransport.marchandiseType
      ),
      vehicleAccompaniments: new FormControl(
        this.selectedOrderTransport.vehicleAccompaniments
      ),
      consignment: new FormControl(this.selectedOrderTransport.consignment),
      portObject: new FormControl(this.selectedOrderTransport.portObject),
      palletResponsibilityObject: new FormControl(
        this.selectedOrderTransport.palletResponsibilityObject
      ),
    });
  }

  loadForm() {
    this.isFormSubmitted = true;

    if (this.OrderTransportForm.invalid) {
      return;
    }

    this.selectedOrderTransport.vehicleAccompaniments =
      this.OrderTransportForm.value["vehicleAccompaniments"];
    this.selectedOrderTransport.orderTransportAccompaniments = [];
    this.selectedOrderTransport.vehicleAccompaniments.forEach((element) => {
      let oTAccompaniment = new OrderTransportAccompaniment();
      oTAccompaniment.vehicleAccompaniment = element;
      this.selectedOrderTransport.orderTransportAccompaniments.push(
        oTAccompaniment
      );

      //  const otA =    this.selectedOrderTransport.orderTransportAccompaniments.find(
      //   line => line.vehicleAccompaniment.id ===   oTAccompaniment.vehicleAccompaniment.id
      // );
      // if (otA == null) {
      //   this.selectedOrderTransport.orderTransportAccompaniments.push(oTAccompaniment);
      // }
    });

    // const formValue = this.OrderTransportForm.value;


    this.trajetService
      .find(
        "villeSource.code~" +
          this.villeSource?.code +
          ",villeDestination.code~" +
          this.villeDestination?.code
      )
      .subscribe((data) => {

        if (data[0] != null) {
          this.selectedOrderTransport.trajet = data[0];
          this.OrderTransportService.addOrder(this.selectedOrderTransport);
          this.nextstep.emit(true);
          this.isFormSubmitted = false;
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Trajet n'existe pas ",
          });
        }
      });
  }

  onAccountSearch(event: any) {
    let search;
    if (!isNaN(event.query)) {
      search = "code~" + event.query;
    } else {
      search = "name~" + event.query;
    }
    this.accountService
      .find(search)
      .subscribe((data) => (this.accountList = data));
  }
  onSelectAccount(event: any) {

    this.selectedOrderTransport.account = event;
    this.contactList = this.selectedOrderTransport.account.contacts;
  }
  onSelectContact(event) {
    this.selectedOrderTransport.contact = event.value;
  }
  onSelectPackagingType(event) {
    this.selectedOrderTransport.packagingType = event.value;
  }
  onSelectMarchandiseType(event) {
    this.selectedOrderTransport.marchandiseType = event.value;
  }
  onSelectStatus(event) {
    this.selectedOrderTransport.turnStatus = event.value;
  }
  onSelectConsignment(event) {

    this.selectedOrderTransport.consignment = event.checked;
  }
  onSelectPort(event) {

    this.selectedOrderTransport.port = event.value.code;
  }
  onSelectPalletResponsibility(event) {

    this.selectedOrderTransport.palletResponsibility = event.value.code;
  }
  onSelectCategory(event) {

    this.selectedOrderTransport.vehicleCategory = event.value;
  this.getVehicleCategoryTray(this.selectedOrderTransport.vehicleCategory);
  }
  onSelectVehicleTray(event) {
    this.selectedOrderTransport.vehicleTray = event.value;
  }
  onSelectLoadingTypes(event) {
    this.selectedOrderTransport.loadingType = event.value;
  }

  onSelectType(event) {
    this.selectedOrderTransport.turnType = event.value ? event.value : event;
    this.turnTypeId.emit(this.selectedOrderTransport.turnType.id);
  }
  onSelectSource(event) {
    this.villeSource = event;
  }
  onSelectDistination(event) {
    this.villeDestination = event;
  }
  onSourceSearch(event) {
    this.villeService.find("code~" + event.query).subscribe((data) => {
      this.villeList = data;
    });
  }
  getVehicleCategoryTray(vehicleCategory:VehicleCategory) {
    if(vehicleCategory?.id !=null){
    this.vehicleCategoryService.findById(vehicleCategory?.id).subscribe((data) => {
      this.selectedOrderTransport.vehicleCategory=data;
      this.vehicleTrayList =
        this.selectedOrderTransport?.vehicleCategory?.vehicleCategoryTrays.map(
          (m) => m.vehicleTray
        );
    });
  }
  }
  load() {
    this.portList = [new SelectObject("Payé"), new SelectObject("Dû")];
    this.palletResponsibilityList = [
      new SelectObject("Transport"),
      new SelectObject("Client"),
    ];

    this.packagingTypeService.findAll().subscribe((data) => {
      this.packagingTypeList = data;
      if (
        this.selectedOrderTransport.packagingType == undefined &&
        this.selectedOrderTransport.packagingType == null
      ) {
        this.selectedOrderTransport.packagingType =
          this.packagingTypeList.filter((f) => f.id == 1)[0];
        this.initForm();
      }
    });
    this.marchandiseTypeService.findAll().subscribe((data) => {
      this.marchandiseTypeList = data;
    });

    this.vehicleAccompanimentService.findAll().subscribe((data) => {
      this.vehicleAccompanimentList = data;
    });
    this.loadingTypeService.findAll().subscribe((data) => {
      this.loadingTypeList = data;
      if (
        this.selectedOrderTransport.loadingType == null &&
        this.selectedOrderTransport.loadingType == undefined
      ) {
        this.selectedOrderTransport.loadingType = this.loadingTypeList[0];
        this.initForm();
      }
    });
    this.turnTypeService.findAll().subscribe((data) => {
      this.turnTypeList = data;
      if (
        this.selectedOrderTransport.turnType == null &&
        this.selectedOrderTransport.turnType == undefined
      ) {
        this.selectedOrderTransport.turnType = this.turnTypeList.filter(
          (f) => f.id == 1
        )[0];
        this.initForm();
      }
    });

    this.vehicleCategoryService.findAll().subscribe((data) => {
      this.vehicleCategoryList = data;
      if (
        this.selectedOrderTransport.vehicleCategory?.id == null &&
        this.selectedOrderTransport.vehicleCategory?.id == undefined
      ) {
        this.selectedOrderTransport.vehicleCategory =
          this.vehicleCategoryList.filter((f) => f.id == 1)[0];


          this.getVehicleCategoryTray(this.selectedOrderTransport.vehicleCategory);
        // this.vehicleTrayList= this.selectedOrderTransport?.vehicleCategory?.vehicleCategoryTrays.map(m=>m.vehicleTray);

        this.initForm();
      }
    });

    // this.vehicleTrayService.findAll().subscribe((data) => {
    //   this.vehicleTrayList = data;
    //   if (
    //     this.selectedOrderTransport.vehicleTray == null &&
    //     this.selectedOrderTransport.vehicleTray == undefined
    //   ) {
    //     this.selectedOrderTransport.vehicleTray = this.vehicleTrayList.filter(
    //       (f) => f.id == 1
    //     )[0];
    //     this.initForm();
    //   }
    // });
  }

  affectedAccountInsert(account :Account){



    this.selectedOrderTransport.account=account;
this.initForm();

  }
  onHideDialogAccount(){
    this.showDialogAccount=false;
  }

  affectedContactInsert(contact :Contact){
console.log("dkhal contact");

this.contactService.find('account.id:'+contact.account.id).subscribe(
  data=>{

this.contactList=[];
this.contactList=data
console.log(this.contactList);

  this.selectedOrderTransport.contact=this.contactList.filter(f=>f.id==contact.id)[0];
 console.log( this.selectedOrderTransport.contact.name);

this.initForm();
  }
)



  }
  onHideDialogContact(){
    this.showDialogContact=false;
  }

  onShowdialogAccount(){

   this.showDialogAccount=true;



  }
  onShowdialogContact(){
    if(  this.selectedOrderTransport.account){
       this.showDialogContact=true;
  }else{
    this.messageService.add({
      severity: "error",
      summary: "Erreur",
      detail: "Selectionner un Compte ",
    });
  }
  }

  next() {
    this.loadForm();
  }
}
