import { Component, OnInit, Input } from "@angular/core";
import { VehicleCategory } from "../../../../shared/models";
import { CategoryService } from "../../../../shared/services";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-category",
    templateUrl: "./category-edit.component.html",
    styleUrls: ["./category-edit.component.scss"]
})
export class CategoryEditComponent implements OnInit {
    selectedCategory: VehicleCategory;
    categoryForm: FormGroup;
    formReady: boolean = false;

    constructor(
        private categoryService: CategoryService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    async ngOnInit() {
        await this.makeCurrentCategory();
        this.initForm();
        this.formReady = true;
    }

    async makeCurrentCategory() {
        let params = await this.getRouteQueries();
        console.log("params :", params);
        let id = Number(params["id"]);
        console.log("id :", id);
        if (isNaN(id)) {
            this.selectedCategory = null;
        } else {
            let categories = await this.categoryService.findAll().toPromise();
            this.selectedCategory = categories.find(d => d.id === id);
        }
    }

    getRouteQueries() {
        return new Promise((resolve, reject) => {
            this.route.queryParams.subscribe(
                params => {
                    resolve(params);
                },
                error => reject(error)
            );
        });
    }

    initForm() {
        this.categoryForm = new FormGroup({
            name: new FormControl(
                !!this.selectedCategory ? this.selectedCategory.name : ""
            ),
            consumption: new FormControl(
                !!this.selectedCategory ? this.selectedCategory.consumption : ""
            ),
            weight: new FormControl(
                !!this.selectedCategory ? this.selectedCategory.weight : ""
            ),
            width: new FormControl(
                !!this.selectedCategory ? this.selectedCategory.width : ""
            ),
            depth: new FormControl(
                !!this.selectedCategory ? this.selectedCategory.depth : ""
            ),
            tonnage: new FormControl(
                !!this.selectedCategory ? this.selectedCategory.tonnage : ""
            ),
            emptyWeight: new FormControl(
                !!this.selectedCategory ? this.selectedCategory.emptyWeight : ""
            ),
            totalWeight: new FormControl(
                !!this.selectedCategory ? this.selectedCategory.totalWeight : ""
            ),
            door: new FormControl(
                !!this.selectedCategory ? this.selectedCategory.door : ""
            )
        });
    }

    private onSubmit() {
        let form = this.categoryForm.value;
        console.log("form :", form);

        if (!this.selectedCategory) {
            this.selectedCategory = new VehicleCategory();
        }
        for (const [key, value] of Object.entries(form)) {
            this.selectedCategory[key] = value;
        }
        console.log("this.selectedCategory :", this.selectedCategory);
        this.categoryService.set(this.selectedCategory);
    }
}
