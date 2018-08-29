import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { DriverService } from "../../shared/services/http/driver.service";
import { routerTransition } from "../../router.animations";
import { Driver } from "../../shared";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: "app-driver",
    templateUrl: "./driver.component.html",
    styleUrls: ["./driver.component.scss"],
    animations: [routerTransition()]
})
export class DriverComponent implements OnInit {
    driversList: Driver[];
    pageNumber = 1;
    pageSize = 20;
    collectionSize: number;
    search = "";
    constructor(
        private driverService: DriverService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.spinner.show();

        this.onPageChanged();
        this.driverService.driverListChanged.subscribe(data => {
            console.log("Data: ", data);
            this.driversList = data;
        });
    }
    onPageChanged() {
        this.spinner.show();
        this.driverService
            .size()
            .subscribe(data => (this.collectionSize = data));
        this.driverService
            .findAllPagination(this.pageNumber - 1, this.pageSize)
            .subscribe(
                data => {
                    console.log("Data: ", data);
                    this.driversList = data;
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    this.toastr.error("Erreur de connexion", "Erreur");
                }
            );
    }

    delete(driver: Driver) {
        console.log("Driver deleted : " + driver.code);
        if (confirm("Êtes vous sûr de vouloir supprimer ?")) {
            this.driverService.delete(driver);
        }
    }

    onSearchChanged(f: NgForm) {
        this.spinner.show();
        const driverCode = f.value["searchQuary"] as string;
        if (driverCode !== "") {
            this.search = "name~" + driverCode;
            this.onPageChanged();
        } else {
            this.search = "";
            this.onPageChanged();
        }
    }
}
