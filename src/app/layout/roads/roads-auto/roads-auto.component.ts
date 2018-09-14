import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import {
    RoadService,
    SaleOrderService,
    VehicleService,
    DriverService,
    MaintenancePlanService
} from "../../../shared/services";
import { routerTransition } from "../../../router.animations";
import { Road, Driver, Vehicle } from "../../../shared";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { SaleOrder } from "../../../shared/models/saleOrder";

@Component({
    selector: "app-roads-auto",
    templateUrl: "./roads-auto.component.html",
    styleUrls: ["./roads-auto.component.scss"],
    animations: [routerTransition()],
    providers: [RoadService, SaleOrderService]
})
export class RoadsAutoComponent implements OnInit {
    code: string;
    road: Road;
    driver: Driver;
    vehicle: Vehicle;
    startDate: any;
    totalTonnage: number = 0;
    orderList: Array<any> = [];
    productList: Array<any> = [];
    vehicles: Array<Vehicle> = [];
    drivers: Array<Driver> = [];

    MAX_ITEM_PER_PAGE: number = 7;
    currentPage: number = 1;
    pageOrders: Array<Array<any>> = [];
    currentPageOrders: Array<any>;

    headers: Array<any>;
    sortState: any = {};
    filterState: any = {};
    selectedOrders: any = {};

    constructor(
        private roadService: RoadService,
        private orderService: SaleOrderService,
        private driverService: DriverService,
        private vehicleService: VehicleService,
        private maintenanceService: MaintenancePlanService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router: Router
    ) {
        this.headers = [
            { text: "Selection", showSort: false, showFilter: false },
            { text: "Order", showSort: true, showFilter: true },
            { text: "Customer", showSort: true, showFilter: true },
            { text: "Tonnage", showSort: true, showFilter: true },
            { text: "Order Date", showSort: true, showFilter: true }
        ];
    }

    async ngOnInit() {
        await this.load();
        this.driver = this.drivers[0];
        this.vehicle = this.vehicles[0];
        this.code = String(1).padStart(4, "0");

        for (const [i, item] of Object.entries(this.orderList)) {
            if ((i as any) % this.MAX_ITEM_PER_PAGE === 0) {
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
        let plans = await this.maintenanceService.findAll().toPromise();
        this.vehicles = this.vehicles.filter(vehicle => {
            for (const plan of plans) {
                if (plan.vehicle && plan.vehicle.code === vehicle.code) {
                    return false;
                }
            }
            return true;
        });
        console.log("this.orderList :", this.orderList);
    }

    getOrderTonnage(order: any) {
        return (order.lines || []).reduce(
            (acc, curr) => acc + (curr.quantity || 0),
            0
        );
    }

    getOrderDate(order: any) {
        if (!order.expectedDate) {
            return "---";
        }
        return new Date(order.loadDate).toLocaleDateString();
    }

    updateProductList() {
        this.productList = [];
        let tonnage = 0;
        for (const [key, selected] of Object.entries(this.selectedOrders)) {
            if (!selected) {
                continue;
            }
            for (const order of this.orderList) {
                if (order.code === key) {
                    this.productList = this.productList.concat(order.lines);
                    tonnage += order.lines.reduce(
                        (acc, l) => acc + l.quantity,
                        0
                    );
                }
            }
        }
        this.totalTonnage = tonnage;
    }

    headerSortIcon(header) {
        let state = this.sortState[header];
        if (!state) {
            return "fa-sort";
        }
        return `fa-sort-${state}`;
    }

    changeSortState(header) {
        if (!this.sortState[header]) {
            this.sortState[header] = "up";
        } else if (this.sortState[header] === "up") {
            this.sortState[header] = "down";
        } else if (this.sortState[header] === "down") {
            this.sortState[header] = null;
        }
        this.sortOrders(header, this.sortState[header]);
    }

    sortOrders(header, state) {
        let getProp = item => {
            return {
                Order: item.code,
                Customer: item.account ? item.account.code : null,
                Tonnage: this.getOrderTonnage(item),
                "Order Date": item.loadDate
            }[header];
        };
        let applySort = (first, last) => {
            if (typeof first === "string") {
                return first.localeCompare(last);
            }
            return first - last;
        };
        this.orderList.sort((a, b) => {
            let aProp = getProp(a);
            let bProp = getProp(b);
            if (state === "down") {
                return applySort(bProp, aProp);
            } else if (state === "up") {
                return applySort(aProp, bProp);
            } else {
                return a.id - b.id;
            }
        });
    }
}
