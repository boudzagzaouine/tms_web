import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-corrective',
  templateUrl: './corrective.component.html',
  styleUrls: ['./corrective.component.css']
})
export class CorrectiveComponent implements OnInit {

  @Input()maintenacePlanForm:FormGroup;
  @Input() isFormSubmitted =false;

  constructor() { }

  ngOnInit() {
  }

}
