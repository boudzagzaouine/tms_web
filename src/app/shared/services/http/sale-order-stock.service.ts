import { Injectable } from '@angular/core';
import { SaleOrderStock, Delivery } from '../../models';
import { ProxyService } from './proxy.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../global.service';

@Injectable()
export class SaleOrderStockService {
    controller = 'saleOrderStocks';
    saleOrderStockListChanged = new Subject<SaleOrderStock[]>();
    constructor(private proxy: ProxyService,
                private toastr: ToastrService,
                private globalService: GlobalService) {}

    private emitChanges() {
        this.findAll().subscribe(data =>
            this.saleOrderStockListChanged.next(data)
        );
    }

    findAll(): Observable<SaleOrderStock[]> {
        console.log('from saleOrderStock service findAll');
        return this.proxy.findAll(this.controller);
    }

    find(search: string): Observable<SaleOrderStock[]> {
        return this.proxy.find(this.controller, search);
    }

    findById(id: number): Observable<SaleOrderStock> {
        // let TOKEN = this.token.computeToken('ems@ems.com', 'EMS', '77d2896c3eb544541f9389fe42651b0d');
        return this.proxy.findById(this.controller, id);
    }

    size() {
        return this.proxy.size(this.controller);
    }

    findAllPagination(page: number, size: number) {
        return this.proxy.findAllPagination(this.controller, page, size);
    }

    findPagination(page: number, size: number, search: string) {
        return this.proxy.findPagination(this.controller, search, page, size);
    }
    sizeSearch(search: string) {
        return this.proxy.sizeSearch(this.controller, search);
    }
    set(saleOrderStock: SaleOrderStock): Observable<SaleOrderStock> {
        return this.proxy.set(this.controller, saleOrderStock);
    }
    add(saleOrderStock: SaleOrderStock): Observable<SaleOrderStock> {
        return this.proxy.add(this.controller, saleOrderStock);
        /*  .subscribe(
        (data: SaleOrderStock) => {
            this.emitChanges();
            this.toastr.success('L\'élément est enrgistré avec succès', 'Edition');
        },
        error =>
            this.toastr.error(
                'L\'élément n\'est pas enregistré ',
                'Edition'
            )
     );*/
    }

    delete(user: SaleOrderStock) {
        this.proxy.delete(this.controller, user.id).subscribe(
            data => {
                this.toastr.success(
                    'Elément supprimé avec succès',
                    'Suppression'
                );
                this.emitChanges();
            },
            error => this.toastr.error('Erreur de suppression', 'Suppression')
        );
    }
    generateCode(): string {
        return 'SO' + (Date.now() / 100000000).toFixed();
    }

    deliver(delivery: Delivery) {
        delivery.lines.forEach(
            line =>  {
                const sos = new SaleOrderStock();
                sos.delivery = delivery;
                sos.product = line.product;
                sos.quantityServed = line.orderedQuantity;
                sos.uom = line.uom;
                sos.lineNumber = line.lineNumber;
                sos.deliveryLine = line;
                sos.dlc = line.dlc;
                sos.owner = line.owner;
                sos.warehouse = this.globalService.getDefaultWarehouse();
                this.add(sos).subscribe(
                    data => console.log('deliver saleOrderstock : ' + data)

                );
            }
        );

    }
}
