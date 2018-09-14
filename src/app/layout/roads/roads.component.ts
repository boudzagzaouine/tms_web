import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { RoadService } from "../../shared/services";
import { routerTransition } from "../../router.animations";
import { Road } from "../../shared";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";

@Component({
    selector: "app-roads",
    templateUrl: "./roads.component.html",
    styleUrls: ["./roads.component.scss"],
    animations: [routerTransition()],
    providers: [RoadService]
})
export class RoadsComponent implements OnInit {
    roadsList: Road[];
    pageNumber = 1;
    pageSize = 20;
    collectionSize: number;
    search = "";
    constructor(
        private roadService: RoadService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.onPageChanged();
        this.roadService.roadListChanged.subscribe(data => {
            console.log("Roads: ", data);
            this.roadsList = data;
        });
    }

    onPageChanged() {
        this.spinner.show();
        this.roadService
            .size()
            .subscribe(data => (this.collectionSize = data));
        this.roadService
            .findAllPagination(this.pageNumber - 1, this.pageSize)
            .subscribe(
                data => {
                    console.log("Roads: ", data);
                    this.roadsList = data;
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    this.toastr.error("Erreur de connexion", "Erreur");
                }
            );
    }

    onSearchChanged(f: NgForm) {
        this.spinner.show();
        const driverCode = f.value["searchQuery"] as string;
        if (driverCode !== "") {
            this.search = "name~" + driverCode;
            this.onPageChanged();
        } else {
            this.search = "";
            this.onPageChanged();
        }
    }

    editPage(driver: Road) {
        this.router.navigate(["/drivers-edit"], {
            queryParams: { id: driver.id }
        });
    }
}
