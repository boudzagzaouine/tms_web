import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import {
    RoadService,
    SaleOrderService,
    VehicleService,
    DriverService
} from "../../../shared/services";
import { routerTransition } from "../../../router.animations";
import { Road, Driver, Vehicle } from "../../../shared";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";

@Component({
    selector: "app-roads-manual",
    templateUrl: "./roads-manual.component.html",
    styleUrls: ["./roads-manual.component.scss"],
    animations: [routerTransition()],
    providers: [RoadService, SaleOrderService]
})
export class RoadsManualComponent implements OnInit {
    code: string;
    road: Road;
    driver: Driver;
    vehicle: Vehicle;
    startDate: any;
    totalTonnage: number;
    orderList: Array<any> = [];
    productList: Array<any> = [];
    vehicles: Array<Vehicle> = [];
    drivers: Array<Driver> = [];

    MAX_ITEM_PER_PAGE: number = 5;
    currentPage: number = 1;
    pageOrders: Array<Array<any>> = [];
    currentPageOrders: Array<any>;

    constructor(
        private roadService: RoadService,
        private orderService: SaleOrderService,
        private driverService: DriverService,
        private vehicleService: VehicleService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    async ngOnInit() {
        await this.load();
        this.driver = this.drivers[0];
        this.vehicle = this.vehicles[0];
        this.code = String(1).padStart(4,"0");

        for (const [i, item] of Object.entries(this.orderList)) {
            if (i % this.MAX_ITEM_PER_PAGE === 0) {
                console.log("PUSH");
                this.pageOrders.push([]);
            }
            this.pageOrders[this.pageOrders.length - 1].push(item);
        }
        console.log("this.pageOrders :", this.pageOrders);
        this.currentPageOrders = this.pageOrders[0];
    }

    async load() {
        this.orderList = await this.orderService.findAll().toPromise();
        this.drivers = await this.driverService.findAll().toPromise();
        this.vehicles = await this.vehicleService.findAll().toPromise();
        console.log("this.orderList :", this.orderList);
    }
}
