import { BadgeType } from './../../models/badge-type';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class BadgeTypeService {
    controller = 'badgeTypes';

    private badgeTypeList: BadgeType[] = [];

    badgeTypeListChanged = new Subject<BadgeType[]>();
    constructor(private proxy: ProxyService, private toastr: ToastrService) {}

    private emitChanges() {
        this.findAll().subscribe(data => {
            this.badgeTypeList = data;
            this.badgeTypeListChanged.next(this.badgeTypeList);
        });
    }

    findAll(): Observable<BadgeType[]> {
        console.log('from driver service findAll');
        return this.proxy.findAll(this.controller);
    }

    find(search: string) {
        return this.proxy.find(this.controller, search);
    }

    findById(id: number): Observable<BadgeType> {
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

    set(badgeType: BadgeType): BadgeType {
        this.proxy.set(this.controller, badgeType).subscribe(
            data => {
                this.emitChanges();
                this.toastr.success('Item was saved successfully', 'Save');
                return data;
            },
            error =>
                this.toastr.error(
                    'Item could not be saved successfully',
                    'Save'
                )
        );
        return null;
    }

    setManually(badgeType: BadgeType) {
        return this.proxy.set(this.controller, badgeType);
    }

    add(badgeType: BadgeType): BadgeType {
        this.proxy.add(this.controller, badgeType).subscribe(
            data => {
                this.emitChanges();
                this.toastr.success('Item was saved successfully', 'Save');
                return data;
            },
            error =>
                this.toastr.error(
                    'Item could not be saved successfully',
                    'Save'
                )
        );
        return null;
    }

    delete(badgeType: BadgeType) {
        this.proxy.delete(this.controller, badgeType.id).subscribe(
            data => {
                this.emitChanges();
                this.toastr.success(
                    'Elément supprimé avec succès',
                    'Suppression'
                );
            },
            error =>
                this.toastr.error(
                    'Erreur de suppression' + error,
                    'Suppression'
                )
        );
    }
}
