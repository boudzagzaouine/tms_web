import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { RoadService } from "../../../shared/services";
import { routerTransition } from "../../../router.animations";
import { Road } from "../../../shared";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";

@Component({
    selector: "app-roads-manual",
    templateUrl: "./roads-manual.component.html",
    styleUrls: ["./roads-manual.component.scss"],
    animations: [routerTransition()],
    providers: [RoadService]
})
export class RoadsManualComponent implements OnInit {

    constructor(
        private roadService: RoadService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit() {
    }
}
