import { OrderTransportInfoService } from './../../../../shared/services/api/order-transport-info.service';
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
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

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

  loadingTypeList: string[] = [];
  turnTypeList: TurnType[] = [];
  turnStatusList: TurnStatus[] = [];
  vehicleCategoryList: VehicleCategory[] = [];
  accountList: Account[] = [];

  isFormSubmitted = false;
  index: number = 0;
  activeIndex: number = 0;
  home: MenuItem;
  items: MenuItem[];

  constructor(
    private turnTypeService: TurnTypeService,
    public OrderTransportService: OrderTransportService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private turnStatusService: TurnStatusService,
    private vehicleCategoryService: VehicleCategoryService,
    private orderTransportInfoService :OrderTransportInfoService,
  ) {}

  ngOnInit() {
    this.loadingTypeList = ["Complet"];

    this.turnTypeService.findAll().subscribe((data) => {
      this.turnTypeList = data;
    });
    this.turnStatusService.findAll().subscribe((data) => {
      this.turnStatusList = data;
    });
    this.vehicleCategoryService.findAll().subscribe((data) => {
      this.vehicleCategoryList = data;
    });

    let id = this.activatedRoute.snapshot.params["id"];
    if (id) {
      this.OrderTransportService.findById(id).subscribe((data) => {
        this.selectedOrderTransport = data;
        this.orderTransportInfoService.find('orderTransport.id:'+this.selectedOrderTransport.id).subscribe(
          data=>{
                    this.OrderTransportService.addOrderTransportInfoAller(data[0]);
          }
        );
        this.OrderTransportService.cloneOrderTransport(
          this.selectedOrderTransport
        );
        this.initForm();
      });
      this.initForm();
    } else {
      if (
        this.OrderTransportService.getOrderTransportCode() != null ||
        this.OrderTransportService.getOrderTransportCode() != undefined
      ) {
        this.selectedOrderTransport =
          this.OrderTransportService.getOrderTransport();
        this.initForm();
      } else {
        this.OrderTransportService.generateCode().subscribe((data) => {
          this.selectedOrderTransport.code = data;
          this.selectedOrderTransport.loadingType = this.loadingTypeList[0];
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
    }
    this.initForm();
  }
  ngOnChanges() {
    this.selectedOrderTransport =this.OrderTransportService.getOrderTransport();
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
          disabled: true,
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
  }

  onSelectStatus(event) {
    this.selectedOrderTransport.turnStatus = event.value;
  }
  onSelectCategory(event) {
    this.selectedOrderTransport.vehicleCategory = event.value;
  }

  onSelectLoadingTypes(event) {
    this.selectedOrderTransport.loadingType = event.value;
  }

  onSelectType(event) {
    this.selectedOrderTransport.turnType = event.value ? event.value : event;
    this.turnTypeId.emit(this.selectedOrderTransport.turnType.id);
  }

  next() {
    this.loadForm();
  }
}
