import { Component, Input, OnInit } from '@angular/core';
import { Reception } from './../../../shared/models/reception';

@Component({
  selector: 'app-reception-generate-bon',
  templateUrl: './reception-generate-bon.component.html',
  styleUrls: ['./reception-generate-bon.component.css']
})
export class ReceptionGenerateBonComponent implements OnInit {

  @Input() selectedReception = new Reception();
  yDate = new Date();

  constructor() { }

  ngOnInit() {
  }

}
