import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { RoadService, SaleOrderService } from "../../../shared/services";
import { routerTransition } from "../../../router.animations";
import { Road, Driver } from "../../../shared";
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
    startDate: any;
    totalTonnage: number;
    orderList: Array<any> = [];
    productList: Array<any> = [];

    constructor(
        private roadService: RoadService,
        private orderService: SaleOrderService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    async ngOnInit() {
        this.orderList = await this.orderService.findAll().toPromise();
        console.log('this.orderList :', this.orderList);
    }
}
