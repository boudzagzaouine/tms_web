import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLoginRoutingModule } from './login-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, AppLoginRoutingModule, InputTextModule, ButtonModule, FormsModule, NgxSpinnerModule
  ]
})
export class LoginModule { }
