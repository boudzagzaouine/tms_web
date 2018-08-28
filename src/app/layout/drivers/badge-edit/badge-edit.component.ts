import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Badge } from "../../../shared/models/badge";

@Component({
    selector: "app-badge-edit",
    templateUrl: "./badge-edit.component.html",
    styleUrls: ["./badge-edit.component.scss"]
})
export class BadgeEditComponent implements OnInit {
    closeResult: string;
    badgeForm: FormGroup;
    isCollapsed = false;
    @Input()
    selectedBadge: Badge;
    @Input()
    editMode: boolean;

    constructor(
        private modalService: NgbModal
    ) {}

    ngOnInit() {}

    initForm() {
        if (!this.editMode) {
            this.selectedBadge = new Badge();
        }

        this.badgeForm = new FormGroup({
            code: new FormControl(
                !!this.selectedBadge ? this.selectedBadge.code : ""
            ),
            type: new FormControl(
                !!this.selectedBadge ? this.selectedBadge.type : ""
            ),
            date: new FormControl(
                !!this.selectedBadge ? this.selectedBadge.date : ""
            )
        });
    }

    private onSubmit() {}

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
            return "by pressing ESC";
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return "by clicking on a backdrop";
        } else {
            return `with: ${reason}`;
        }
    }
}
