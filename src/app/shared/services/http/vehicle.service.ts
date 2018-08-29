import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import {Vehicle} from '../../models/vehicle';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class VehicleService {
    controller = 'vehicles';

    private vehicleList: Vehicle[] = [];

    driverListChanged = new Subject<Vehicle[]>();
    constructor(private proxy: ProxyService,
                private toastr: ToastrService,
           ) {}

    private emitChanges() {
        this.findAll().subscribe(data => {
            this.vehicleList = data;
            this.driverListChanged.next(this.vehicleList);
        });
    }

    findAll(): Observable<Vehicle[]> {
      console.log('from vehicle service findAll');
      return this.proxy.findAll(this.controller);
    }

    find(search: string) {
        return this.proxy.find(this.controller, search);
    }

    findById(id: number): Observable<Vehicle> {
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
    set(vehicle: Vehicle): Vehicle {
        this.proxy.set(this.controller, vehicle).subscribe(
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


    add(vehicle: Vehicle): Vehicle {
        this.proxy.add(this.controller, vehicle).subscribe(
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

    delete(vehicle: Vehicle) {
        this.proxy.delete(this.controller, vehicle.id).subscribe(
            data => {
                this.emitChanges();
                  this.toastr.success(
                    'Elément supprimé avec succès',
                    'Suppression'
                );
            },
            error => this.toastr.error('Erreur de suppression' + error, 'Suppression')
        );
    }


}
