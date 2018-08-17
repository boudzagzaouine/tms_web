
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Driver, Contact, Address } from '../../../shared/models';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DriverService } from '../../../shared/services/http/driver.service';

@Component({
    selector: 'app-driver-edit',
    templateUrl: './driver-edit.component.html',
    styleUrls: ['./driver-edit.component.scss']
})
export class DriverEditComponent implements OnInit {
    closeResult: string;
    driverForm: FormGroup;
    isCollapsed = false;
    cardValid: string;
    @Input() selectedDriver: Driver;
    @Input() editMode: boolean;

    constructor(
        private driverService: DriverService,
        private modalService: NgbModal,
    ) {}

    ngOnInit() {}

    initForm() {
        if (!this.editMode) {
            this.selectedDriver = new Driver();
            // this.selectedDriver.deliveryAddress.country = 'Maroc';
        /* } else {
            console.log('Card number : ' );
            console.log(this.selectedDriver != null && this.selectedDriver.cards != null
             && this.selectedDriver.cards.length
            ? this.selectedDriver.cards[this.selectedDriver.cards.length - 1].code
            : 'null');
        }*/

        this.driverForm = new FormGroup({
            code: new FormControl(
                this.selectedDriver != null ? this.selectedDriver.code : ''
            ),

            name: new FormControl(
                this.selectedDriver != null ? this.selectedDriver.contact.name : ''
            ),

            contact: new FormGroup(
                {
                    contactEmail: new FormControl(
                        this.selectedDriver != null && this.selectedDriver.contact != null ? this.selectedDriver.contact.email : ''
                    ),

                    contactTel: new FormControl(
                        this.selectedDriver != null && this.selectedDriver.contact != null ? this.selectedDriver.contact.tel1 : ''
                    )
                }
            ),

          /*  address: new FormGroup(
                {
                    addressLine1: new FormControl(
                        this.selectedDriver != null && this.selectedDriver.deliveryAddress != null
                        ? this.selectedDriver.deliveryAddress.line1 : ''
                    ),
                    addressLine2: new FormControl(
                        this.selectedDriver != null && this.selectedDriver.deliveryAddress != null
                        ? this.selectedDriver.deliveryAddress.line2 : ''
                    ),
                    addressZip: new FormControl(
                        this.selectedDriver != null && this.selectedDriver.deliveryAddress != null
                        ? this.selectedDriver.deliveryAddress.zip : ''
                    ),
                    addressCity: new FormControl(
                        this.selectedDriver != null && this.selectedDriver.deliveryAddress != null
                        ? this.selectedDriver.deliveryAddress.city : ''
                    ),
                    addressCountry: new FormControl(
                        this.selectedDriver != null && this.selectedDriver.deliveryAddress != null
                        ? this.selectedDriver.deliveryAddress.country : ''
                    ),
                }
            ),*/
            active: new FormControl(
                this.selectedDriver != null ? this.selectedDriver.working : 'true'
            ),
           /* cardnumber: new FormControl(
                this.selectedDriver != null && this.selectedDriver.cards != null && this.selectedDriver.cards.length
                    ? this.selectedDriver.cards[this.selectedDriver.cards.length - 1].code
                    : ''
            )*/
        });
    }

   /* private onSubmit() {
        if (!this.editMode) {

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
            this.driverService.add(this.selectedDriver);
    }

    private open(content) {
        this.initForm();
        this.modalService
            .open(content, { centered: true, backdrop: true })
            .result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(
                        reason
                    )}`;
                }
            );
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }*/

    }
}
