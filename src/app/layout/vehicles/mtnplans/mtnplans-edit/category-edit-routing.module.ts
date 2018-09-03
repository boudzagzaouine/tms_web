import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryEditComponent } from "./category-edit.component";

const routes: Routes = [
    {
        path: "",
        component: CategoryEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryEditRoutingModule {}
