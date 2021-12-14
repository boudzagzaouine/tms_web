import { MessageService } from 'primeng/api';
import { DeliveryLineService as TurnSoPoLineService } from './../../../../shared/services/api/delivery-line.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeliveryService as TurnSoPoService } from './../../../../shared/services/api/Delivery.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TurnSoPo } from './../../../../shared/models/turn-so-po';
import { TurnLine } from './../../../../shared/models/turn-line';

@Component({
  selector: 'app-delivery-line-edit',
  templateUrl: './delivery-line-edit.component.html',
  styleUrls: ['./delivery-line-edit.component.css']

})
export class DeliveryLineEditComponent implements OnInit {

  @Input() selectedTurnSoPo = new TurnSoPo();
  @Input() editMode: boolean;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() selectedTurnSoPoEdited = new EventEmitter<TurnSoPo>();
  displayDialog: boolean;
  saleOrder: number;
  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery: string;
  closeResult: String;
  turnLineList: TurnLine[] = [];
  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(

    private messageService: MessageService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.displayDialog = true;
    console.log(this.selectedTurnSoPo);
    this.turnLineList = this.selectedTurnSoPo.turnLines;

  }
  onSubmit() {
    let sum: number = 0;
    let sumPriceHt: number = 0;
    let sumPriceTtc: number = 0;
    let vat: number;
    this.turnLineList.forEach(element => {
      console.log(element.vat);
      if (element.vat == null) {vat = 0;}
      else { vat = 20;}
      console.log("vat : " + vat);

      const priceHT = element.salePrice * element.quantityServed;
      const amountTva = (priceHT / 100) * vat;
      const priceTTC = priceHT + amountTva;
      sum += Number(element.quantityServed);
      sumPriceHt += priceHT;
      sumPriceTtc += priceTTC;
      element.totalPriceHT = priceHT;
      element.totalPriceTTC = priceTTC;

    });
    this.selectedTurnSoPo.totalQuantity = sum;
    this.selectedTurnSoPo.totalPriceHT = sumPriceHt;
    this.selectedTurnSoPo.totalPriceTTC = sumPriceTtc;
    this.selectedTurnSoPo.turnLines = this.turnLineList;
    this.selectedTurnSoPoEdited.emit(this.selectedTurnSoPo);
    this.showDialog.emit(false);
    this.displayDialog = false;
  }
  onRowEditInit(turnLine: TurnLine) {
    this.turnLineList[turnLine.product.code] = { ...turnLine };
  }

  onRowEditSave(turnLine: TurnLine) {
    if (turnLine.quantityServed > 0) {
      delete this.turnLineList[turnLine.product.code];
      // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Car is updated' });
    } else if (turnLine.quantityServed < 0) {
      //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Year is required' });
    }
  }

  onRowEditCancel(turnLine: TurnLine, index: number) {
    this.turnLineList[index] = this.turnLineList[turnLine.product.code];
    delete this.turnLineList[turnLine.product.code];
  }

  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }

}
