import { AuthenticationService } from './../shared/services/api/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor( private auth: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }
}
