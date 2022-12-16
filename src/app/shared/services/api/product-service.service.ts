import { Product } from './../../models/product';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService extends EmsService<Product> {

  constructor(proxy: ProxyService) {
    super(proxy, 'productServiceServices');
  }

}
