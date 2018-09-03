import { Component, OnInit, Input } from "@angular/core";
import { VehicleCategory } from "../../../../shared/models";
import { CategoryService} from "../../../../shared/services/http/category.service";
import { routerTransition } from "../../../../router.animations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { FormControl, FormGroup, NgForm } from "@angular/forms";

@Component({
    selector: "app-category",
    templateUrl: "././category.component.html",
    styleUrls: ["./category.component.scss"],
    animations: [routerTransition()]
})
export class CategoryEditComponent implements OnInit {
    editMode: boolean;
    selectedCategory: VehicleCategory;
    categoryForm: FormGroup;

    constructor(
        private categoryService: CategoryService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        if (!this.editMode) {
            this.selectedCategory = new VehicleCategory();
            // this.selectedDriver.deliveryAddress.country = 'Maroc';
        } else {
            /*console.log('Card number : ' );
            console.log(this.selectedDriver != null && this.selectedDriver.cards != null
             && this.selectedDriver.cards.length
            ? this.selectedDriver.cards[this.selectedDriver.cards.length - 1].code
            : 'null');*/
        }

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

    }
}
