import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DriverEditComponent } from "./driver-edit.component";

const routes: Routes = [
    {
        path: "",
        component: DriverEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DriverEditRoutingModule {}
