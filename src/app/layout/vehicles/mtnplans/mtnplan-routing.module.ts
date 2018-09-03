import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MtnPlanComponent } from "./mtnplan.component";

const routes: Routes = [
    {
        path: "",
        component: MtnPlanComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MtnPlanRoutingModule {}
