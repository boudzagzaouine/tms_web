import { AuthenticationService } from './../shared/services/api/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

const BODY_CLASSES = ['empty-layout', 'bg-silver-300'];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  submitting = false;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // Already logged in -> no reason to show the form.
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/core']);
      return;
    }
    document.body.classList.add(...BODY_CLASSES);
  }

  ngOnDestroy() {
    document.body.classList.remove(...BODY_CLASSES);
  }

  onSubmit(f: NgForm) {
    if (f.invalid || this.submitting) {
      f.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.spinner.show();
    const { email, password } = f.value;
    this.authService.login(email, password, () => this.submitting = false);
  }
}
