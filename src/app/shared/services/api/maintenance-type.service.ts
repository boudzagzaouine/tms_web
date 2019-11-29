import { MaintenanceType } from '../../models/maintenance-type';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MaintenanceTypeService {
    controller = 'maintenanceTypes';

    private MaintenanceTypeList: MaintenanceType[] = [];

    MaintenanceTypeListChanged = new Subject<MaintenanceType[]>();
    constructor(private proxy: ProxyService, private toastr: ToastrService) {}

    public emitChanges() {
        this.findAll().subscribe(data => {
            this.MaintenanceTypeList = data;
            this.MaintenanceTypeListChanged.next(this.MaintenanceTypeList);
        });
    }

    findAll(): Observable<MaintenanceType[]> {
        console.log('from driver service findAll');
        return this.proxy.findAll(this.controller);
    }

    find(search: string) {
        return this.proxy.find(this.controller, search);
    }

    findById(id: number): Observable<MaintenanceType> {
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
    set(maintenanceType: MaintenanceType): Observable<MaintenanceType> {
        return this.proxy.set(this.controller, maintenanceType);
    }

    add(maintenanceType: MaintenanceType): MaintenanceType {
        this.proxy.add(this.controller, maintenanceType).subscribe(
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

    delete(id:number) {
        this.proxy.delete(this.controller, id).subscribe(
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
