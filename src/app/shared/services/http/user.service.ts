import { Injectable } from '@angular/core';
import { User } from '../../models';
import { ProxyService } from './proxy.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserService {
    private controller = 'users';
    private userList: User[] = [];

    userListChanged = new Subject<User[]>();

    constructor(private proxy: ProxyService,
                private toastr: ToastrService) {}

    private emitChanges() {
        console.log(this.userList);
        this.findAll().subscribe(data => {
            this.userList = data;
            this.userListChanged.next(this.userList);
        });
    }

    getUserList() {
        return this.userList;
    }

    findAll(): Observable<User[]> {
        console.log('from user service findAll');
        return this.proxy.findAll(this.controller);
    }

    find(search: string): Observable<User[]> {
        return this.proxy.find(this.controller, search);
    }

    findById(id: number): Observable<User> {
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
    // set(user: User) {
    //     this.proxy.set(this.controller, user).subscribe(
    //         (data: User) => {
    //             this.emitChanges();
    //             this.toastr.success('L\'élément est enrgistré avec succès', 'Edition');
    //         },
    //         error =>
    //             this.toastr.error(
    //                 'L\'élément n\'est pas enregistré ',
    //                 'Edition'
    //             )
    //     );
    // }
//
    // add(user: User) {
    //     this.proxy.add(this.controller, user).subscribe(
    //         (data: User) => {
    //             this.emitChanges();
    //             this.toastr.success('L\'élément est enrgistré avec succès', 'Edition');
    //         },
    //         error =>
    //         this.toastr.error(
    //             'L\'élément n\'est pas enregistré ',
    //             'Edition'
    //         )
    //     );
    // }
//
    // delete(user: User) {
    //     this.proxy.delete(this.controller, user.id).subscribe(
    //         data => {
    //             this.toastr.success(
    //                 'Elément supprimé avec succès',
    //                 'Suppression'
    //             );
    //             this.emitChanges();
    //         },
    //         error => this.toastr.error('Erreur de suppression', 'Suppression')
    //     );
    // }
}
