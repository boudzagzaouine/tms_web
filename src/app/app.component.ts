import { GlobalService } from './shared/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private globalService: GlobalService) {
        localStorage.removeItem('isLoggedIn');
    }

    ngOnInit() {
        this.globalService.ngOnInit();
    }
}
