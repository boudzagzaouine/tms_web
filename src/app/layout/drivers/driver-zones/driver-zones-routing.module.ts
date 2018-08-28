import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DriverZonesComponent } from "./driver-zones.component";

const routes: Routes = [
    {
        path: "",
        component: DriverZonesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DriverZonesRoutingModule {}
