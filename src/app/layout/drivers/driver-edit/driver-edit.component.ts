import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { Driver, Contact, Address, Zone } from "../../../shared/models";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DriverService } from "../../../shared/services/http/driver.service";
import { ZoneService } from "../../../shared/services/http/zone.service";
import { Badge } from "../../../shared/models/badge";
import { BadgeEditComponent } from "../badge-edit/badge-edit.component";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-driver-edit",
    templateUrl: "./driver-edit.component.html",
    styleUrls: ["./driver-edit.component.scss"]
})
export class DriverEditComponent implements OnInit {
    closeResult: string;
    driverForm: FormGroup;
    isCollapsed = false;
    cardValid: string;
    @Input()
    selectedDriver: Driver;
    @Input()
    editMode: boolean;

    badges: Array<Badge> = [];
    zones: Array<Zone> = [];
    currentZone: Zone;

    constructor(
        private driverService: DriverService,
        private zoneService: ZoneService,
        private modalService: NgbModal,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.zoneService.findAll().subscribe(
            data => {
                console.log("Zones: ", data);
                this.zones = data;
                this.spinner.hide();
            },
            error => {
                this.spinner.hide();
                this.toastr.error("Erreur de connexion", "Erreur");
            }
        );
        this.initForm();
    }

    initForm() {
        if (!this.editMode) {
            this.selectedDriver = new Driver();
            // this.selectedDriver.deliveryAddress.country = 'Maroc';
        } else {
            /*console.log('Card number : ' );
            console.log(this.selectedDriver != null && this.selectedDriver.cards != null
             && this.selectedDriver.cards.length
            ? this.selectedDriver.cards[this.selectedDriver.cards.length - 1].code
            : 'null');*/
        }

        this.currentZone = !!this.selectedDriver
            ? this.selectedDriver.workArea
            : null;
        this.driverForm = new FormGroup({
            code: new FormControl(
                !!this.selectedDriver ? this.selectedDriver.code : ""
            ),
            cin: new FormControl(
                !!this.selectedDriver ? this.selectedDriver.cin : ""
            ),
            birthdate: new FormControl(
                !!this.selectedDriver ? this.selectedDriver.birthDate : ""
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
            working: new FormControl(
                !!this.selectedDriver ? this.selectedDriver.working : "true"
            )
        });
    }

    private onSubmit() {
        /*if (!this.editMode) {

            this.selectedDriver = new Driver();

            this.selectedDriver.contact = new Contact();

            this.selectedDriver.deliveryAddress = new Address();

        } else {
            if (this.selectedDriver.deliveryAddress == null) {

                this.selectedDriver.deliveryAddress = new Address();
            }
            if (this.selectedDriver.contact == null) {

                this.selectedDriver.contact = new Contact();
            }
        }

        this.selectedDriver.code = this.driverForm.value['code'];
        this.selectedDriver.name = this.driverForm.value['name'];
       // this.selectedDriver.email = this.driverForm.value['mail'];
        this.selectedDriver.active = this.driverForm.value['active'];
        this.selectedDriver.contact.email = this.driverForm.value['contact']['contactEmail'];
        this.selectedDriver.contact.tel1 = this.driverForm.value['contact']['contactTel'];
        this.selectedDriver.deliveryAddress.line1 = this.driverForm.value['address']['addressLine1'];
        this.selectedDriver.deliveryAddress.line2 = this.driverForm.value['address']['addressLine2'];
        this.selectedDriver.deliveryAddress.zip = this.driverForm.value['address']['addressZip'];
        this.selectedDriver.deliveryAddress.city = this.driverForm.value['address']['addressCity'];
        this.selectedDriver.deliveryAddress.country = this.driverForm.value['address']['addressCountry'];
        console.log(this.driverForm.value['contact']['contactEmail']);
        if (!this.editMode) {
            this.selectedDriver.contact.name = this.selectedDriver.name;
            this.selectedDriver.contact.surName = this.selectedDriver.name;
            this.selectedDriver.deliveryAddress.code =  this.selectedDriver.deliveryAddress.city +  (new Date()).getMilliseconds();
        }
            this.driverService.add(this.selectedDriver);*/
    }

    public addBadge() {
        let badge = new Badge();
        badge.code = "Nouveau";
        this.badges.push(badge);
        console.log("badges :", this.badges);
    }

    private openBadgeModal(badge) {
        let modal = this.modalService.open(BadgeEditComponent, {
            centered: true,
            backdrop: true
        });
        modal.result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    public selectZone(zone: Zone) {
        if (zone) {
            this.currentZone = zone;
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return "by pressing ESC";
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return "by clicking on a backdrop";
        } else {
            return `with: ${reason}`;
        }
    }
}
