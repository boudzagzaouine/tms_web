import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private router: Router) { }

  ngOnInit() {
    $('body').addClass('empty-layout bg-silver-300');
  }

  ngAfterViewInit() {
    $('#login-form').validate({
      errorClass: 'help-block',
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true
        }
      },
      highlight: function (e) {
        $(e).closest('.form-group').addClass('has-error');
      },
      unhighlight: function (e) {
        $(e).closest('.form-group').removeClass('has-error');
      },
    });
  }

  ngOnDestroy() {
    $('body').removeClass('empty-layout bg-silver-300');
  }

  onSubmit(f: NgForm) {
    //sessionStorage.removeItem('currentUser');
    sessionStorage.setItem('currentUser', 'coco');
      console.log(f);
      const email = f.controls['email'].value;
      const password = f.controls['password'].value;
      console.log(`email : ${email}, password: ${password}`);


      this.router.navigate(['/']);



  }

}
