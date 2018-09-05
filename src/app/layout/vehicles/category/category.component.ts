import { Component, OnInit, Input } from "@angular/core";
import { VehicleCategory } from "../../../shared/models";
import { CategoryService} from "../../../shared/services/http/category.service";
import { routerTransition } from "../../../router.animations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
    selector: "app-category",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.scss"],
    animations: [routerTransition()]
})
export class CategoryComponent implements OnInit {
    categoryList: Array<VehicleCategory>;

    constructor(
        private categoryService: CategoryService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router: Router
    ) {
        this.categoryList = [];
    }

    ngOnInit() {
        this.spinner.show();
        this.categoryService.findAll().subscribe(
            data => {
                console.log("Categories Data: ", data);
                this.categoryList = data;
                this.spinner.hide();
            },
            error => {
                console.log("error :", error);
                this.spinner.hide();
                this.toastr.error("Erreur de connexion", "Erreur");
            }
        );
        this.categoryService.categoryListChanged.subscribe(data => {
            console.log("Data: ", data);
            this.categoryList = data;
        });
    }

    editPage(vehicle: VehicleCategory) {
        this.router.navigate(["/category-edit"], {
            queryParams: { id: vehicle.id }
        });
    }
}
