import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/http/account.service';
import { routerTransition } from '../../router.animations';
import { Account } from '../../shared';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
    animations: [routerTransition()]
})
export class ClientsComponent implements OnInit {
    clientsList: Account[];
    pageNumber = 1;
    pageSize = 20;
    collectionSize: number;
    search = '';
    constructor(
        private accountService: AccountService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.spinner.show();

        this.onPageChanged();
        this.accountService.accountListChanged.subscribe(
            data => (this.clientsList = data)
        );
    }
    delete(account: Account) {
        console.log('Account deleted : ' + account.code);
        if (confirm('Êtes vous sûr de vouloir supprimer ?')) {
            this.accountService.delete(account);
        }
    }

    onPageChanged() {
        this.spinner.show();
        this.accountService
            .sizeSearch(this.search)
            .subscribe(data => (this.collectionSize = data));
        this.accountService
            .findPagination(this.pageNumber - 1, this.pageSize, this.search)
            .subscribe(
                data => {
                    this.clientsList = data;
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    this.toastr.error('Erreur de connexion', 'Erreur');
                }
            );
    }

    onSearchChanged(f: NgForm) {
        this.spinner.show();
        const accountCode = f.value['searchQuery'] as string;
        if (accountCode !== '') {
            this.search = 'name~' + accountCode;
            this.onPageChanged();
        } else {
            this.search = '';
            this.onPageChanged();
        }
    }
}
