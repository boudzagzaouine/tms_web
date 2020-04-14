import { TurnLine } from './../../../../../shared/models/turn-line';
import { MessageService } from 'primeng/api';
import { ModalDismissReasons, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-delivery-line',
  templateUrl: './delivery-line.component.html',
  styleUrls: ['./delivery-line.component.css']
})
export class DeliveryLineComponent implements OnInit {
  @Input()   TurnLineList: TurnLine[] = [];
  @Input() editMode: boolean;

 // @Output() lineEdited =new EventEmitter<SaleOrderLine>();
  saleOrder: number;

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery: string;
  closeResult: String;
  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(

    private messageService: MessageService,
    private modalService: NgbModal,
   ) { }

  ngOnInit() {

  }


  open(content) {

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
