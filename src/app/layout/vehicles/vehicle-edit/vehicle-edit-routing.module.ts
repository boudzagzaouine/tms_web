import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VehicleEditComponent } from "./vehicle-edit.component";

const routes: Routes = [
    {
        path: "",
        component: VehicleEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehicleEditRoutingModule {}
