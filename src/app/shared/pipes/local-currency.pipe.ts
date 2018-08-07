import { GlobalService } from './../services/global.service';
import { Currency } from './../models/currency';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'localCurrency'
})
export class LocalCurrencyPipe implements PipeTransform {
    currency = new Currency();

    constructor(private globalService: GlobalService) {}

    transform(value: any, args?: any): any {
        if (value != null && !isNaN(value)) {
            return  (value as number).toFixed(2) + ' ' + 'DH';
            // this.globalService.getDefaultCurrency().symbol != null ?
            // this.globalService.getDefaultCurrency().symbol : this.globalService.getDefaultCurrency().code;
        }
        return value;
    }
}
