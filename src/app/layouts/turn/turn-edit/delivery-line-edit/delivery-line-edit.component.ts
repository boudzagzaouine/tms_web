import { SaleOrder } from './../../../../shared/models/sale-order';
import { MessageService } from 'primeng/api';
import { DeliveryLineService as SaleOrderLineService } from './../../../../shared/services/api/delivery-line.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeliveryService as SaleOrderService } from './../../../../shared/services/api/Delivery.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SaleOrderLine } from './../../../../shared/models/sale-order-line';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delivery-line-edit',
  templateUrl: './delivery-line-edit.component.html',
  styleUrls: ['./delivery-line-edit.component.css']

})
export class DeliveryLineEditComponent implements OnInit {

  @Input() selectedSaleOrder = new SaleOrder();
  @Input() editMode: boolean;
  @Output() lineEdited =new EventEmitter<SaleOrderLine>();
  saleOrder: number;

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery: string;
  closeResult: String;
  saleOrderLineList: SaleOrderLine[] = [];
  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(

    private messageService: MessageService,
    private modalService: NgbModal,
   ) { }

  ngOnInit() {

  }

  onRowEditInit(saleOrderLine: SaleOrderLine) {
    this.saleOrderLineList[saleOrderLine.product.code] = { ...saleOrderLine };
  }

  onRowEditSave(saleOrderLine: SaleOrderLine) {
    if (saleOrderLine.quantity > 0) {
      delete this.saleOrderLineList[saleOrderLine.product.code];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Car is updated' });
    } else if (saleOrderLine.quantity < 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Year is required' });
    }
  }

  onRowEditCancel(saleOrderLine: SaleOrderLine, index: number) {
    this.saleOrderLineList[index] = this.saleOrderLineList[saleOrderLine.product.code];
    delete this.saleOrderLineList[saleOrderLine.product.code];
  }


  open(content) {

    this.saleOrder = this.selectedSaleOrder.id;
    this.saleOrderLineList = this.selectedSaleOrder.lines;
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
