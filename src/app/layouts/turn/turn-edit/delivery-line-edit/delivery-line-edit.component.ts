import { MessageService } from 'primeng/api';
import { DeliveryLineService } from './../../../../shared/services/api/delivery-line.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeliveryService } from './../../../../shared/services/api/Delivery.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryLine } from './../../../../shared/models/delivery-line';
import { Delivery } from './../../../../shared/models/delivery';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delivery-line-edit',
  templateUrl: './delivery-line-edit.component.html',
  styleUrls: ['./delivery-line-edit.component.css']

})
export class DeliveryLineEditComponent implements OnInit {
  @Input() selectedDelivery = new Delivery();
  @Input() editMode: boolean;

  delivery: number;
  page = 0;
  size = 10;
  collectionSize: number;

  searchQuery: string;

  closeResult: String;
  // selectInsurannceTypeTerms: any;
  deliveryLineList: Array<DeliveryLine> = [];
  clonedD: { [s: string]: DeliveryLine; } = {};


  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(
    private deliveryService: DeliveryService,
    private deliveryLineService: DeliveryLineService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {



  }





  onRowEditInit(deliveryLine: DeliveryLine) {
    this.clonedD[deliveryLine.product.code] = { ...deliveryLine };
  }

  onRowEditSave(deliveryLine: DeliveryLine) {
    if (deliveryLine.orderedQuantity > 0) {
      delete this.clonedD[deliveryLine.product.code];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Car is updated' });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Year is required' });
    }
  }

  onRowEditCancel(deliveryLine: DeliveryLine, index: number) {
    this.deliveryLineList[index] = this.clonedD[deliveryLine.product.code];
    delete this.clonedD[deliveryLine.product.code];
  }


  open(content) {


    this.delivery = this.selectedDelivery.id;
    console.log(this.delivery);
    console.log(this.selectedDelivery);

    this.deliveryLineList = this.selectedDelivery.lines;
    console.log("deliv");

    console.log(this.deliveryLineList);



    this.modal = this.modalService.open(content, { backdrop: 'static', centered: true, size: 'lg' });
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
