import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  constructor(private tostr: ToastrService) { }

  ngOnInit() {
  }

  onPrimaryClick1() {
    this.tostr.success('Holaaaaa', 'Title');
  }

  onPrimaryClick2() {
    this.tostr.warning('Holaaaaa', 'Title');
  }

  onPrimaryClick3() {
    this.tostr.error('Holaaaaa', 'Title');
  }

  onPrimaryClick4() {
    this.tostr.info('Holaaaaa', 'Title');
  }

}
