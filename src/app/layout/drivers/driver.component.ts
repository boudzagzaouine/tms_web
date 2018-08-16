import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  message: string;
  tableau: Array<number>;

  constructor() {
    this.message = "Salut Asmae";  
    this.tableau = [18,3,25,89];
  }

  ngOnInit() {
  }

}
