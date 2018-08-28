import { Component, OnInit, Input } from "@angular/core";
import { Zone } from "../../../shared/models";
import { ZoneService } from "../../../shared/services/http/zone.service";
import { routerTransition } from "../../../router.animations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-driver-zones",
    templateUrl: "./driver-zones.component.html",
    styleUrls: ["./driver-zones.component.scss"],
    animations: [routerTransition()]
})
export class DriverZonesComponent implements OnInit {
    zones: Array<Zone>;

    constructor(
        private zoneService: ZoneService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {
        this.zones = [];
    }

    ngOnInit() {
        this.spinner.show();
        this.zoneService.findAll().subscribe(
            data => {
                console.log("Zones Data: ", data);
                this.zones = data;
                this.spinner.hide();
            },
            error => {
                console.log('error :', error);
                this.spinner.hide();
                this.toastr.error("Erreur de connexion", "Erreur");
            }
        );
        this.zoneService.zoneListChanged.subscribe(data => {
            console.log("Data: ", data);
            this.zones = data;
        });
    }

    addZone() {
        const zone = new Zone();
        zone.id = this.zones.length;
        zone.name = "Nouvelle zone";
        this.zones.push(zone);
    }
}
