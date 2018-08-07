import { PosService } from '../services/pos.service';
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';


@Injectable()
export class PaymentGuard implements CanActivate {
    constructor(private posService: PosService,
                private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean {
        if (this.posService.getSaleOrderLines().length) {
            return true;
        }
        this.router.navigate(['/pos']);
        return false;

    }
}
