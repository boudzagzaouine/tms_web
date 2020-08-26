import { ProductPack } from './../../models/product-pack';
import { Product } from './../../models/product';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable({
  providedIn: 'root'
})
export class ProductPackService extends EmsService<ProductPack> {

  constructor(proxy: ProxyService) {
    super(proxy, 'productPacks');
  }

}
