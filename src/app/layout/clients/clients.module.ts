import { NgxSpinnerModule } from 'ngx-spinner';
import { ClientsComponent } from './clients.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './client-routing.module';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ClientsRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [ClientsComponent, ClientEditComponent]
})
export class ClientsModule {}
