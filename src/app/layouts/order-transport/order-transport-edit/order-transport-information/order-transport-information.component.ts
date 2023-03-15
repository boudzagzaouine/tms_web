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
import { MenuItem, ConfirmationService } from "primeng/api";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OrderTransport } from "./../../../../shared/models/order-transport";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";

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
  turnStatusList: TurnStatus[] = [];
  vehicleCategoryList: VehicleCategory[] = [];
  accountList: Account[] = [];
  vehicleTrayList: VehicleTray[] = [];
  isFormSubmitted = false;
  index: number = 0;
  activeIndex: number = 0;
  home: MenuItem;
  items: MenuItem[];
  contactList: Contact[] = [];
  selectedContact: Contact = new Contact();
  constructor(
    private turnTypeService: TurnTypeService,
    public OrderTransportService: OrderTransportService,
    private loadingTypeService: LoadingTypeService,
    private accountService: AccountService,
    private vehicleTrayService: VehicleTrayService,
    private turnStatusService: TurnStatusService,
    private vehicleCategoryService: VehicleCategoryService
  ) {}

  ngOnInit() {
    this.load();
    console.log(this.OrderTransportService.getOrderTransportCode());
    if (
      this.OrderTransportService.getOrderTransportCode() != null ||
      this.OrderTransportService.getOrderTransportCode() != undefined
    ) {
      this.selectedOrderTransport =
        this.OrderTransportService.getOrderTransport();
      this.selectedContact = this.selectedOrderTransport.contact;
      this.contactList = this.selectedOrderTransport?.account?.contacts;
      this.initForm();
    } else {
      this.OrderTransportService.generateCode().subscribe((data) => {
        this.selectedOrderTransport.code = data;
        this.selectedOrderTransport.turnStatus = this.turnStatusList.filter(
          (f) => f.id == 1
        )[0];
        this.selectedOrderTransport.turnType = this.turnTypeList.filter(
          (f) => f.id == 1
        )[0];
        this.initForm();
      });
      this.initForm();
    }
    // }
    this.initForm();
  }

  initForm() {
    this.OrderTransportForm = new FormGroup({
      code: new FormControl(
        { value: this.selectedOrderTransport.code, disabled: true },
        Validators.required
      ),
      date: new FormControl(
        new Date(this.selectedOrderTransport.date),
        Validators.required
      ),
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
      status: new FormControl(
        { value: this.selectedOrderTransport.turnStatus, disabled: true },
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
    });
  }

  loadForm() {
    this.isFormSubmitted = true;

    if (this.OrderTransportForm.invalid) {
      return;
    }
    const formValue = this.OrderTransportForm.value;
    this.selectedOrderTransport.date = formValue["date"];
    this.selectedOrderTransport.weightTotal = formValue["weight"];
    this.selectedOrderTransport.capacityTotal = formValue["capacite"];
    this.OrderTransportService.addOrder(this.selectedOrderTransport);
    this.nextstep.emit(true);
    this.isFormSubmitted = false;
  }

  onAccountSearch(event: any) {
    this.accountService
      .find("name~" + event.query)
      .subscribe((data) => (this.accountList = data));
  }
  onSelectAccount(event: any) {
    this.selectedOrderTransport.account = event;
    this.contactList = this.selectedOrderTransport.account.contacts;
  }
  onSelectContact() {
    this.selectedOrderTransport.contact = this.selectedContact;
  }

  onSelectStatus(event) {
    this.selectedOrderTransport.turnStatus = event.value;
  }
  onSelectCategory(event) {
    this.selectedOrderTransport.vehicleCategory = event.value;
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
  load() {
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
    });
    this.turnStatusService.findAll().subscribe((data) => {
      this.turnStatusList = data;
    });
    this.vehicleCategoryService.findAll().subscribe((data) => {
      this.vehicleCategoryList = data;
      if (
        this.selectedOrderTransport.vehicleCategory == null &&
        this.selectedOrderTransport.vehicleCategory == undefined
      ) {
        this.selectedOrderTransport.vehicleCategory =
          this.vehicleCategoryList.filter((f) => f.id == 1)[0];
        this.initForm();
      }
    });

    this.vehicleTrayService.findAll().subscribe((data) => {
      this.vehicleTrayList = data;
      if (
        this.selectedOrderTransport.vehicleTray == null &&
        this.selectedOrderTransport.vehicleTray == undefined
      ) {
        this.selectedOrderTransport.vehicleTray = this.vehicleTrayList.filter(
          (f) => f.id == 1
        )[0];
        this.initForm();
      }
    });
  }

  next() {
    this.loadForm();
  }
}
