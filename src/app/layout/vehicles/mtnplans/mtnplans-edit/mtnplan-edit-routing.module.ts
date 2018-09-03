import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MtnPlanEditComponent } from "./mtnplan-edit.component";

const routes: Routes = [
    {
        path: "",
        component: MtnPlanEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MtnPlanEditRoutingModule {}
