import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../shared/services/api/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: jasmine.SpyObj<AuthenticationService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    auth = jasmine.createSpyObj('AuthenticationService', ['login', 'isAuthenticated']);
    auth.isAuthenticated.and.returnValue(false);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [FormsModule, TranslateModule.forRoot()],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthenticationService, useValue: auth },
        { provide: Router, useValue: router },
        { provide: NgxSpinnerService, useValue: jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']) },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not call the backend when the form is invalid', () => {
    component.onSubmit({ invalid: true, form: { markAllAsTouched: () => {} } } as any);
    expect(auth.login).not.toHaveBeenCalled();
  });

  it('logs in with the form values and blocks double submits', () => {
    const form = { invalid: false, value: { email: 'a@b.com', password: 'secret' } } as any;
    component.onSubmit(form);
    component.onSubmit(form);
    expect(auth.login).toHaveBeenCalledTimes(1);
    expect(auth.login.calls.mostRecent().args.slice(0, 2)).toEqual(['a@b.com', 'secret']);
    expect(component.submitting).toBeTrue();
  });

  it('redirects to /core when already logged in', () => {
    auth.isAuthenticated.and.returnValue(true);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/core']);
  });
});
