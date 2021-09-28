import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReceptionLineService } from './reception-line.service';
import { ReceptionLine } from './../../models/reception-line';
import { ReceptionStock } from './../../models/reception-stock';
import { Reception } from './../../models/reception';
import { PurchaseOrder } from './../../models/purchase-order';
import { EmsService } from './ems.service';
import { InsuranceTerm } from '../../models/insurance-term';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';

@Injectable()
export class ReceptionStockService extends EmsService<ReceptionStock> {

  constructor(proxy: ProxyService,
      private receptionLineService: ReceptionLineService,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService


    ) {
    super(proxy, 'receptionStocks');
  }


private generateReceptionStocksFormReception(reception: Reception): ReceptionStock[] {
  const receptionStocks: ReceptionStock[] = [];
  reception.receptionLines.forEach(line => {
      if (line.quantity > line.quantityReceived) {
          receptionStocks.unshift(this.generateReceptionStockFomeReceptionLine(reception,line));
      }
  });
  return receptionStocks;
}


private generateReceptionStocksFormReceptionLines(reception: Reception, lines: ReceptionLine[]): ReceptionStock[] {
  const receptionStocks: ReceptionStock[] = [];
  console.log('generateReceptionStocksFormReception');
  if (lines != null) {
      lines.forEach(line => {
          if (line.quantity > line.quantityReceived) {
              receptionStocks.unshift(this.generateReceptionStockFomeReceptionLine(reception, line));
          }
      });
      console.log(receptionStocks);
      return receptionStocks;
  } else {
      return null;
  }
}

private generateReceptionStockFomeReceptionLine(reception: Reception, line: ReceptionLine): ReceptionStock {
  const rs = new ReceptionStock();
  rs.reception = reception;
  rs.product = line.product;
  rs.quantityReceived = line.quantity - line.quantityReceived;
  rs.uom = line.uom;

  rs.supplier = reception.supplier;
  //  rs.lineNumber = line.lineNumber;
  rs.receptionLine = line;
  rs.dlc = line.dlc;
  rs.owner = line.owner;
  rs.productPack = line.productPack;
  rs.warehouse = line.warehouse;
  //rs.color = line.color;
  rs.weight = line.weight;
  rs.uom = line.uom;
  rs.uomReceived = line.uomReceived;
  console.log("supplier rs");console.log(rs);

  return rs;
}
receive(reception: Reception) {

  this.receptionLineService.find('reception.id:' + reception.id).subscribe(
      lines => {
          const receptionStocks = this.generateReceptionStocksFormReceptionLines(reception, lines);

          if (receptionStocks != null) {
              this.saveAll(receptionStocks).subscribe(
                  data => {
                      console.log('reveived Successfuly');

                      this.toastr.success('Order validé avec succés', 'Validation');
                      this.spinner.hide();
                  },
                  error => {
                      console.log('not reveived');

                      this.toastr.error(
                          'Erreur de livrer la ligne',
                          'Validation'
                      );
                      this.spinner.hide();
                  },
                  () => {
                      console.log('finished reveiving');

                  this.spinner.hide();
                  //this.receptionService.emitChanges();
                  // console.log('after received ');
                  }
              );
          }
      }
  );


}
}
