import { Component, OnInit, Input } from "@angular/core";
import { Traffic } from "../../../shared/models";
import { TrafficService} from "../../../shared/services/http/traffic.service";
import { routerTransition } from "../../../router.animations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-traffic-edit",
    templateUrl: "./traffic-edit.component.html",
    styleUrls: ["./traffic-edit.component.scss"],
    animations: [routerTransition()]
})
export class TrafficEditComponent implements OnInit {
    traffics: Array<Traffic>;
    editMode: [number, boolean];

    constructor(
        private trafficService: TrafficService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {
        this.traffics = [];
        this.editMode = [ 0, false ];
    }

    ngOnInit() {
        this.spinner.show();
        this.trafficService.findAll().subscribe(
            data => {
                console.log("Zones Data: ", data);
                this.traffics = data;
                this.spinner.hide();
            },
            error => {
                console.log("error :", error);
                this.spinner.hide();
                this.toastr.error("Erreur de connexion", "Erreur");
            }
        );
        this.trafficService.trafficListChanged.subscribe(data => {
            console.log("Data: ", data);
            this.traffics = data;
        });
    }

    addTraffic() {
        const traffic = new Traffic();
        traffic.id = 0;
        this.traffics.push(traffic);
        console.log("categorie :", traffic);
    }

    edit(traffic) {
        this.editMode[traffic.id] = true;
    }

    save(traffic) {
        this.trafficService.set(traffic);
        this.editMode[traffic.id] = false;
    }

    delete(catgeory) {
        this.trafficService.delete(catgeory);
    }
}
