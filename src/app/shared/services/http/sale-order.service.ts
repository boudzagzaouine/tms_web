import { Injectable } from '@angular/core';
import { SaleOrder } from '../../models';
import { ProxyService } from './proxy.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SaleOrderService {
    controller = 'saleOrders';
    saleOrderListChanged = new Subject<SaleOrder[]>();
    constructor(private proxy: ProxyService, private toastr: ToastrService) {}

    private emitChanges() {
        this.findAll().subscribe(data => this.saleOrderListChanged.next(data));
    }

    findAll(): Observable<SaleOrder[]> {
        console.log('from saleOrder service findAll');
        return this.proxy.findAll(this.controller);
    }

    find(search: string): Observable<SaleOrder[]> {
        return this.proxy.find(this.controller, search);
    }

    findById(id: number): Observable<SaleOrder> {
        // let TOKEN = this.token.computeToken('ems@ems.com', 'EMS', '77d2896c3eb544541f9389fe42651b0d');
        return this.proxy.findById(this.controller, id);
    }

    size() {
        return this.proxy.size(this.controller);
    }

    findAllPagination(page: number, size: number) {
        return this.proxy.findAllPagination(this.controller, page, size);
    }

    findPagination( page: number, size: number, search: string) {
        return this.proxy.findPagination(this.controller, search, page, size);
    }
    sizeSearch(search: string) {
        return this.proxy.sizeSearch(this.controller, search);
    }
    set(saleOrder: SaleOrder) {
        this.proxy.set(this.controller, saleOrder).subscribe(
            (data: SaleOrder) => {
                this.emitChanges();
                this.toastr.success(
                    'Elément est enrgistré avec succès',
                    'Edition'
                );
            },
            error =>
                this.toastr.error('Elément n\'est pas enregistré ', 'Edition')
        );
    }
    add(saleOrder: SaleOrder): Observable<SaleOrder> {
        return this.proxy.add(this.controller, saleOrder);
        /*  .subscribe(
            (data: SaleOrder) => {
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

    delete(user: SaleOrder) {
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
    generateCode() {
        return this.proxy.generateCode(this.controller);
    }
}
