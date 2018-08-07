import { GlobalService } from './../../../shared/services/global.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Account, Contact, Address } from '../../../shared/models';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../../shared/services/http/account.service';
import { CardService } from '../../../shared';

@Component({
    selector: 'app-client-edit',
    templateUrl: './client-edit.component.html',
    styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
    closeResult: string;
    clientForm: FormGroup;
    isCollapsed = false;
    cardValid: string;
    @Input() selectedClient: Account;
    @Input() editMode: boolean;

    constructor(
        private accountService: AccountService,
        private cardService: CardService,
        private modalService: NgbModal,
        private globalService: GlobalService
    ) {}

    ngOnInit() {}

    initForm() {
        if (!this.editMode) {
            this.selectedClient = new Account();
            // this.selectedClient.deliveryAddress.country = 'Maroc';
        } else {
            console.log('Card number : ' );
            console.log(this.selectedClient != null && this.selectedClient.cards != null
             && this.selectedClient.cards.length
            ? this.selectedClient.cards[this.selectedClient.cards.length - 1].code
            : 'null');
        }

        this.clientForm = new FormGroup({
            code: new FormControl(
                this.selectedClient != null ? this.selectedClient.code : ''
            ),

            name: new FormControl(
                this.selectedClient != null ? this.selectedClient.name : ''
            ),

            contact: new FormGroup(
                {
                    contactEmail: new FormControl(
                        this.selectedClient != null && this.selectedClient.contact != null ? this.selectedClient.contact.email : ''
                    ),

                    contactTel: new FormControl(
                        this.selectedClient != null && this.selectedClient.contact != null ? this.selectedClient.contact.tel1 : ''
                    )
                }
            ),

            address: new FormGroup(
                {
                    addressLine1: new FormControl(
                        this.selectedClient != null && this.selectedClient.deliveryAddress != null
                        ? this.selectedClient.deliveryAddress.line1 : ''
                    ),
                    addressLine2: new FormControl(
                        this.selectedClient != null && this.selectedClient.deliveryAddress != null
                        ? this.selectedClient.deliveryAddress.line2 : ''
                    ),
                    addressZip: new FormControl(
                        this.selectedClient != null && this.selectedClient.deliveryAddress != null
                        ? this.selectedClient.deliveryAddress.zip : ''
                    ),
                    addressCity: new FormControl(
                        this.selectedClient != null && this.selectedClient.deliveryAddress != null
                        ? this.selectedClient.deliveryAddress.city : ''
                    ),
                    addressCountry: new FormControl(
                        this.selectedClient != null && this.selectedClient.deliveryAddress != null
                        ? this.selectedClient.deliveryAddress.country : ''
                    ),
                }
            ),
            active: new FormControl(
                this.selectedClient != null ? this.selectedClient.active : 'true'
            ),
            cardnumber: new FormControl(
                this.selectedClient != null && this.selectedClient.cards != null && this.selectedClient.cards.length
                    ? this.selectedClient.cards[this.selectedClient.cards.length - 1].code
                    : ''
            )
        });
    }

    private onSubmit() {
        if (!this.editMode) {

            this.selectedClient = new Account();

            this.selectedClient.contact = new Contact();

            this.selectedClient.deliveryAddress = new Address();

            this.selectedClient.owner = this.globalService.getDefaultOwner();

        } else {
            if (this.selectedClient.deliveryAddress == null) {

                this.selectedClient.deliveryAddress = new Address();
            }
            if (this.selectedClient.contact == null) {

                this.selectedClient.contact = new Contact();
            }
        }

        this.selectedClient.code = this.clientForm.value['code'];
        this.selectedClient.name = this.clientForm.value['name'];
       // this.selectedClient.email = this.clientForm.value['mail'];
        this.selectedClient.active = this.clientForm.value['active'];
        this.selectedClient.contact.email = this.clientForm.value['contact']['contactEmail'];
        this.selectedClient.contact.tel1 = this.clientForm.value['contact']['contactTel'];
        this.selectedClient.deliveryAddress.line1 = this.clientForm.value['address']['addressLine1'];
        this.selectedClient.deliveryAddress.line2 = this.clientForm.value['address']['addressLine2'];
        this.selectedClient.deliveryAddress.zip = this.clientForm.value['address']['addressZip'];
        this.selectedClient.deliveryAddress.city = this.clientForm.value['address']['addressCity'];
        this.selectedClient.deliveryAddress.country = this.clientForm.value['address']['addressCountry'];
        console.log(this.clientForm.value['contact']['contactEmail']);
        if (!this.editMode) {
            this.selectedClient.contact.name = this.selectedClient.name;
            this.selectedClient.contact.surName = this.selectedClient.name;
            this.selectedClient.deliveryAddress.code =  this.selectedClient.deliveryAddress.city +  (new Date()).getMilliseconds();
        }
            this.accountService.add(this.selectedClient);
    }

    private checkCardValidity() {
        const cardnumber = this.clientForm.value['cardnumber'];
        this.cardService.findByCode(cardnumber).subscribe(data => {
            console.log(data);
            if (data !== null && data.account === null) {
                this.cardValid = 'is-valid';
                if ( this.selectedClient.cards == null || this.selectedClient.cards === undefined) {
                    this.selectedClient.cards = [];
                }
                this.selectedClient.cards.push(data);
            } else {
                this.cardValid = 'is-invalid';
            }
        });
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
    }


}
