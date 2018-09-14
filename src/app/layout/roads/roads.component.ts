import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { RoadService } from "../../shared/services";
import { routerTransition } from "../../router.animations";
import { Road } from "../../shared";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { SaleOrder } from "../../shared/models/saleOrder";
import { SaleOrderService } from "../../shared/services";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-roads",
    templateUrl: "./roads.component.html",
    styleUrls: ["./roads.component.scss"],
    animations: [routerTransition()],
    providers: [RoadService, SaleOrderService]
})
export class RoadsComponent implements OnInit {
    roadsList: Road[];
    pageNumber = 1;
    pageSize = 20;
    collectionSize: number;
    search = "";

    orderList: SaleOrder[];
    closeResult: string;

    constructor(
        private roadService: RoadService,
        private saleService: SaleOrderService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private modalService: NgbModal,
        private router: Router
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.onPageChanged();
        this.roadService.roadListChanged.subscribe(data => {
            console.log("Roads: ", data);
            this.roadsList = data;
        });
    }

    onPageChanged() {
        this.spinner.show();
        this.roadService.size().subscribe(data => (this.collectionSize = data));
        this.roadService
            .findAllPagination(this.pageNumber - 1, this.pageSize)
            .subscribe(
                data => {
                    console.log("Roads: ", data);
                    this.roadsList = data;
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    this.toastr.error("Erreur de connexion", "Erreur");
                }
            );
    }

    onSearchChanged(f: NgForm) {
        this.spinner.show();
        const driverCode = f.value["searchQuery"] as string;
        if (driverCode !== "") {
            this.search = "name~" + driverCode;
            this.onPageChanged();
        } else {
            this.search = "";
            this.onPageChanged();
        }
    }

    editPage(driver: Road) {
        this.router.navigate(["/drivers-edit"], {
            queryParams: { id: driver.id }
        });
    }

    async seeDetails(content, road: Road) {
        let orders = await this.saleService.findAll().toPromise();
        console.log("orders :", orders);
        this.orderList = orders.filter(o => o.roadId === road.id);
        this.modalService
            .open(content, { ariaLabelledBy: "modal-basic-title" })
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
