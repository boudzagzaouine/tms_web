import { Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Supplier} from '../../models';
import { Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';

@Injectable()
export class SupplierService {
    controller = 'suppliers';
    supplierListChanged = new Subject<Supplier[]>();
    constructor(private proxy: ProxyService,
                private toastr: ToastrService) {
    }
    private emitChanges() {
        this.findAll().subscribe(
            data =>  this.supplierListChanged.next(data)
        );
    }

    findAll(): Observable<Supplier[]> {
      console.log('from supplier service findAll');
      return this.proxy.findAll(this.controller);
    }

    find(search: string) {
        return this.proxy.find(this.controller, search);
    }

    findById(id: number): Observable<Supplier> {
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
    set(supplier: Supplier) {
        this.proxy.set(this.controller, supplier).subscribe(
            data => {
                this.emitChanges();
                this.toastr.success('Elément est enrgistré avec succès', 'Edition');
            },
            error =>
                this.toastr.error(
                    'Elément n\'est pas enregistré ',
                    'Edition'
                )
        );
    }


    add(supplier: Supplier) {
        this.proxy.add(this.controller, supplier).subscribe(
            data => {
                this.emitChanges();
                this.toastr.success('Elément est enrgistré avec succès', 'Edition');
            },
            error =>
                this.toastr.error(
                    'Elément n\'est pas enregistré ',
                    'Edition'
                )
        );
    }

    delete(supplier: Supplier) {
        this.proxy.delete(this.controller, supplier.id).subscribe(
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
}
