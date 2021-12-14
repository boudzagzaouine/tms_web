import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { PurchaseOrder, PurchaseOrderLine } from './../../../../shared/models';

@Component({
  selector: 'app-purchase-line-edit',
  templateUrl: './purchase-line-edit.component.html',
  styleUrls: ['./purchase-line-edit.component.scss']
})
export class PurchaseLineEditComponent implements OnInit {

  @Input() selectedPurchaseOrder = new PurchaseOrder();
  @Input() editMode: boolean;
  @Output() lineEdited =new EventEmitter<PurchaseOrderLine>();
  PurchaseOrder: number;

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery: string;
  closeResult: String;
  PurchaseOrderLineList: PurchaseOrderLine[] = [];
  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(

    private messageService: MessageService,
    private modalService: NgbModal,
   ) { }

  ngOnInit() {

  }

  onRowEditInit(PurchaseOrderLine: PurchaseOrderLine) {
    this.PurchaseOrderLineList[PurchaseOrderLine.product.code] = { ...PurchaseOrderLine };
  }

  onRowEditSave(PurchaseOrderLine: PurchaseOrderLine) {
    if (PurchaseOrderLine.quantity > 0) {
      delete this.PurchaseOrderLineList[PurchaseOrderLine.product.code];
     // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Car is updated' });
    } else if (PurchaseOrderLine.quantity < 0) {
      //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Year is required' });
    }
  }

  onRowEditCancel(PurchaseOrderLine: PurchaseOrderLine, index: number) {
    this.PurchaseOrderLineList[index] = this.PurchaseOrderLineList[PurchaseOrderLine.product.code];
    delete this.PurchaseOrderLineList[PurchaseOrderLine.product.code];
  }


  open(content) {

    this.PurchaseOrder = this.selectedPurchaseOrder.id;
    this.PurchaseOrderLineList = this.selectedPurchaseOrder.purshaseOrderLines;
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
