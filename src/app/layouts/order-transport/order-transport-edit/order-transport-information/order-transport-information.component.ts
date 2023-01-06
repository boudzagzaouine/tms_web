import { VehicleTray } from './../../../../shared/models/vehicle-tray';
import { VehicleTrayService } from './../../../../shared/services/api/vehicle-tray.service';
import { LoadingTypeService } from './../../../../shared/services/api/loading-type.service';
import { LoadingType } from './../../../../shared/models/loading-type';
import { OrderTransportInfoService } from './../../../../shared/services/api/order-transport-info.service';
import { OrderTransportService } from "./../../../../shared/services/api/order-transport.service";
import { VehicleCategoryService } from "./../../../../shared/services/api/vehicle-category.service";
import { TurnStatusService } from "./../../../../shared/services/api/turn-status.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { CompanyService } from "./../../../../shared/services/api/company.service";
import { TurnTypeService } from "./../../../../shared/services/api/turn-type.service";
import { Company } from "./../../../../shared/models/company";
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

  loadingTypeList: LoadingType[] = [];
  turnTypeList: TurnType[] = [];
  turnStatusList: TurnStatus[] = [];
  vehicleCategoryList: VehicleCategory[] = [];
  companyList: Company[] = [];
  vehicleTrayList:VehicleTray[]=[];
  isFormSubmitted = false;
  index: number = 0;
  activeIndex: number = 0;
  home: MenuItem;
  items: MenuItem[];

  constructor(
    private turnTypeService: TurnTypeService,
    public OrderTransportService: OrderTransportService,
    private loadingTypeService:LoadingTypeService,
    private companyService: CompanyService,
    private vehicleTrayService :VehicleTrayService,
    private activatedRoute: ActivatedRoute,
    private turnStatusService: TurnStatusService,
    private vehicleCategoryService: VehicleCategoryService,
    private orderTransportInfoService :OrderTransportInfoService,
  ) {}

  ngOnInit() {

 this.load();
    let id = this.activatedRoute.snapshot.params["id"];
    if (id) {
      this.OrderTransportService.findById(id).subscribe((data) => {
        this.selectedOrderTransport = data;
        console.log(this.selectedOrderTransport);

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
          value: this.selectedOrderTransport.loadingType
        },
        Validators.required
      ),
      turnType: new FormControl(
        this.selectedOrderTransport.turnType,
        Validators.required
      ),
      company: new FormControl(
        this.selectedOrderTransport.company,
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

  onCompanySearch(event: any) {
    this.companyService
      .find("name~" + event.query)
      .subscribe((data) => (this.companyList = data));
  }
  onSelectCompany(event: any) {
    this.selectedOrderTransport.company = event;
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
  load(){
    this.loadingTypeService.findAll().subscribe((data) => {
      this.loadingTypeList = data;
      this.selectedOrderTransport.loadingType=this.loadingTypeList[0];
      this.initForm();

    });
    this.turnTypeService.findAll().subscribe((data) => {
      this.turnTypeList = data;
    });
    this.turnStatusService.findAll().subscribe((data) => {
      this.turnStatusList = data;
    });
    this.vehicleCategoryService.findAll().subscribe((data) => {
      this.vehicleCategoryList = data;
    });

    this.vehicleTrayService.findAll().subscribe((data) => {
      this.vehicleTrayList = data;
    });
  }

  next() {
    this.loadForm();
  }
}
