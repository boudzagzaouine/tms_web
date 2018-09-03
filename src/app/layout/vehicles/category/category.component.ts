import { Component, OnInit, Input } from "@angular/core";
import { VehicleCategory } from "../../../shared/models";
import { CategoryService} from "../../../shared/services/http/category.service";
import { routerTransition } from "../../../router.animations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-category",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.scss"],
    animations: [routerTransition()]
})
export class CategoryComponent implements OnInit {
    categoryList: Array<VehicleCategory>;
    editMode: [number, boolean];

    constructor(
        private categoryService: CategoryService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {
        this.categoryList = [];
        this.editMode = [ 0, false ];
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

    addCategory() {
        const category = new VehicleCategory();
        category.id = 0;
        category.name = "Nouvelle categorie";
        this.categoryList.push(category);
        console.log("categorie :", category);
    }

    edit(category) {
        this.editMode[category.id] = true;
    }

    save(category) {
        this.categoryService.set(category);
        this.editMode[category.id] = false;
    }

    delete(catgeory) {
        this.categoryService.delete(catgeory);
    }
}
