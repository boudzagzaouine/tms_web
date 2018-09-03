import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MaintenancePlanComponent } from "./maintenancePlan-edit.component";

const routes: Routes = [
    {
        path: "",
        component: MaintenancePlanComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenancePlanRoutingModule {}
