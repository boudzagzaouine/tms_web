import { DeliveryLine } from './../../models/delivery-line';
import { SaleOrder } from './../../models/sale-order';
import { Injectable } from '@angular/core';
import {Delivery} from '../../models';
import {ProxyService} from './proxy.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DeliveryService {

    controller = 'deliveries';
    constructor(private proxy: ProxyService) {
    }

    findAll(): Observable<Delivery[]> {
        console.log('from delivery service findAll');
        return this.proxy.findAll(this.controller);
    }

    find(search: string) {
        return this.proxy.find(this.controller, search);
    }

    findById(id: number): Observable<Delivery> {
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
    set(delivery: Delivery): Observable<Delivery> {
        return this.proxy.add(this.controller, delivery);
    }
    add(delivery: Delivery): Observable<Delivery> {
        return this.proxy.add(this.controller, delivery);
    }

    generateDeliveryFromSaleOrder(saleOrder: SaleOrder): Observable<Delivery> {
        return this.proxy.generateDeliveryFromSaleOrder(this.controller, saleOrder);
    }

    generateDeliveryLines(saleOrder: SaleOrder): DeliveryLine[] {
        const deliveryLines: DeliveryLine[] = [];
        saleOrder.lines.forEach(line => {
            const deliveryLine = new DeliveryLine();
            deliveryLine.lineNumber = line.lineNumber;
            deliveryLine.product = line.product;
            deliveryLine.quantityServed = 0;
            deliveryLine.orderedQuantity = line.quantity;
            deliveryLine.saleOrderLine = line;
            deliveryLine.uom = line.uom;
            deliveryLine.totalPriceHT = line.totalPriceHT;
            deliveryLine.totalPriceTTC = line.totalPriceTTC;
            deliveryLines.push(deliveryLine);
        });

        return deliveryLines;
    }

}
