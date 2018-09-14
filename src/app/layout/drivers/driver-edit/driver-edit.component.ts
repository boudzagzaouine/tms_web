import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { Driver, Contact, Address, Zone } from "../../../shared/models";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ZoneService, DriverService } from "../../../shared/services/http";
import { Badge } from "../../../shared/models/badge";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import {
    ActivatedRoute,
    Router,
    ChildActivationEnd,
    RoutesRecognized
} from "@angular/router";
import { DateAdapterService } from "../../../shared/services/dateAdapter.service";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/take";
import { Vacation } from "../../../shared/models/vacation";

@Component({
    selector: "app-driver-edit",
    templateUrl: "./driver-edit.component.html",
    styleUrls: ["./driver-edit.component.scss"],
    providers: [DateAdapterService]
})
export class DriverEditComponent implements OnInit {
    driverForm: FormGroup;
    formReady: boolean = false;
    selectedDriver: Driver;
    badges: Array<Badge> = [];
    zones: Array<Zone> = [];
    drivers: Array<Driver> = [];

    currentZone: Zone;
    currentVacation: Vacation;

    constructor(
        private driverService: DriverService,
        private zoneService: ZoneService,
        private modalService: NgbModal,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private dateAdapter: DateAdapterService
    ) {
        this.driverForm = new FormGroup({});
    }

    async ngOnInit() {
        this.spinner.show();
        await this.makeCurrentDriver();
        await this.loadZones();
        this.spinner.hide();
        this.initForm();
        this.formReady = true;
        console.log("FORM READY");
    }

    async makeCurrentDriver() {
        let params = await this.getRouteQueries();
        console.log("params :", params);
        let id = Number(params["id"]);
        console.log("id :", id);
        if (isNaN(id)) {
            this.selectedDriver = null;
        } else {
            let drivers = await this.driverService.findAll().toPromise();
            console.log("drivers :", drivers);
            this.selectedDriver = drivers.find(d => d.id === id);
        }
    }

    getRouteQueries() {
        return new Promise((resolve, reject) => {
            this.route.queryParams.subscribe(
                params => {
                    resolve(params);
                },
                error => reject(error)
            );
        });
    }

    async loadZones() {
        try {
            this.zones = await this.zoneService.findAll().toPromise();
        } catch (error) {
            this.toastr.error("Erreur de connexion", "Erreur");
        }
        console.log("Zones: ", this.zones);
    }

    initForm() {
        this.currentZone = !!this.selectedDriver
            ? this.selectedDriver.workArea
            : null;
        this.currentVacation = !!this.selectedDriver
            ? this.selectedDriver.vacation
            : null;
        this.driverForm = new FormGroup({
            code: new FormControl(
                !!this.selectedDriver ? this.selectedDriver.code : ""
            ),
            cin: new FormControl(
                !!this.selectedDriver ? this.selectedDriver.cin : ""
            ),
            birthDate: new FormControl(
                !!this.selectedDriver ? this.selectedDriver.birthDate : ""
            ),
            lastMedicalVisit: new FormControl(
                !!this.selectedDriver
                    ? this.selectedDriver.lastMedicalVisit
                    : ""
            ),
            contact: new FormGroup({
                contactName: new FormControl(
                    !!this.selectedDriver && !!this.selectedDriver.contact
                        ? this.selectedDriver.contact.name
                        : ""
                ),

                contactSurname: new FormControl(
                    !!this.selectedDriver && !!this.selectedDriver.contact
                        ? this.selectedDriver.contact.surName
                        : ""
                )
            }),
            vacation: new FormGroup({
                type: new FormControl(
                    !!this.selectedDriver && !!this.selectedDriver.vacation
                        ? this.selectedDriver.vacation.type
                        : ""
                ),
                begin: new FormControl(
                    !!this.selectedDriver && !!this.selectedDriver.vacation
                        ? this.selectedDriver.vacation.begin
                        : ""
                ),
                end: new FormControl(
                    !!this.selectedDriver && !!this.selectedDriver.vacation
                        ? this.selectedDriver.vacation.end
                        : ""
                )
            }),
            working: new FormControl(
                !!this.selectedDriver ? this.selectedDriver.working : "true"
            ),
            commission: new FormControl(
                !!this.selectedDriver ? this.selectedDriver.commission : 0
            )
        });
    }

    private onSubmit() {
        let form = this.driverForm.value;
        console.log("form :", form);

        if (!this.selectedDriver) {
            this.selectedDriver = new Driver();
        }

        let contact = new Contact();
        contact.name = form["contact"]["contactName"];
        contact.surName = form["contact"]["contactSurname"];

        for (const property of ["code", "cin", "commission"]) {
            this.selectedDriver[property] = form[property];
        }
        this.selectedDriver.workArea = this.currentZone;
        this.selectedDriver.contact = contact;
        this.selectedDriver.badges = this.badges;
        this.selectedDriver.working = form["working"] === "true";
        this.selectedDriver.upDateDate = new Date(Date.now());
        this.selectedDriver.birthDate = this.dateAdapter.toDate(
            form["birthDate"]
        );
        this.selectedDriver.lastMedicalVisit = this.dateAdapter.toDate(
            form["lastMedicalVisit"]
        );

        let vacation = new Vacation();
        vacation.type = form["vacation"]["type"];
        vacation.begin = form["vacation"]["begin"];
        vacation.end = form["vacation"]["end"];
        this.selectedDriver.vacation = vacation;

        console.log("this.selectedDriver :", this.selectedDriver);
        this.save(this.selectedDriver);
    }

    public addBadge() {
        let badge = new Badge();
        badge.code = "Nouveau";
        this.badges.push(badge);
    }

    public removeBadge(badge: Badge) {
        this.badges = this.badges.filter(b => b !== badge);
    }

    public selectZone(zone: Zone) {
        this.currentZone = zone;
    }

    save(driver) {
        this.driverService.set(driver);
        /*this.spinner.show();
        this.driverService.setManually(driver).subscribe(
            data => {
                this.toastr.success("Driver was saved successfully", "Save");
                this.spinner.hide();
                this.router.navigate(["/drivers"]);
            },
            error => {
                this.toastr.error(
                    "Driver could not be saved successfully",
                    "Save"
                );
                console.log("error :", error);
                this.spinner.hide();
            }
        );*/
    }

    delete() {
        if (confirm("Êtes vous sûr de vouloir supprimer ?")) {
            this.driverService.delete(this.selectedDriver);
        }
    }
}
