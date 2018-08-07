import { Injectable } from '@angular/core';
import {Product, ProductType} from '../../models';
import {ProxyService} from './proxy.service';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductService {

  controller = 'products';
  productListChanged = new Subject<Product[]>();

  constructor(private proxy: ProxyService,
            private toastr: ToastrService) {

  }

  private emitChanges() {
    this.findAll().subscribe(
        data => this.productListChanged.next(data)
    );
  }

  findAll(): Observable<Product[]> {
    console.log('from product service findAll');
    return this.proxy.findAll(this.controller);
  }

  find(search: string): Observable<Product[]> {
    return this.proxy.find(this.controller, search);
  }

  findById(id: number): Observable<Product> {
    // let TOKEN = this.token.computeToken('ems@ems.com', 'EMS', '77d2896c3eb544541f9389fe42651b0d');
    return this.proxy.findById(this.controller, id);
  }

  size() {
    return this.proxy.size(this.controller);
  }

  findAllPagination(page: number, size: number) {
    return this.proxy.findAllPagination(this.controller, page, size);
  }

  findByProductType(prductType: ProductType) {
      return this.find('productType.code:' + prductType.code );
  }

  findPagination( page: number, size: number, search: string) {
    return this.proxy.findPagination(this.controller, search, page, size);
  }
  sizeSearch(search: string) {
    return this.proxy.sizeSearch(this.controller, search);
  }
  set(product: Product) {
    this.proxy.set(this.controller, product).subscribe(
        (data: Product) => {
            this.emitChanges();
            this.toastr.success('L\'élément est enrgistré avec succès', 'Edition');
        },
        error =>
        this.toastr.error(
            'L\'élément n\'est pas enregistré ',
            'Edition'
        )
    );
  }
  // add(product: Product) {
  //  this.proxy.add(this.controller, product).subscribe(
  //      (data: Product) => {
  //          this.emitChanges();
  //          this.toastr.success('L\'élément est enrgistré avec succès', 'Edition');
  //      },
  //      error =>
  //      this.toastr.error(
  //          'L\'élément n\'est pas enregistré ',
  //          'Edition'
  //      )
  //  );
  // }

}
