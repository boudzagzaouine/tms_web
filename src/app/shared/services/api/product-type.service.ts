import { ProductType } from './../../models/product-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Driver } from '../../models/driver';

@Injectable()
export class ProductTypeService  extends EmsService<ProductType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'productTypes');
  }

}
