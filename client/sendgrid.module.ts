import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {
  MatButtonModule,
  MatRippleModule,
  MatSnackBarModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatTooltipModule
} from '@angular/material';

import { Addon } from '@materia/addons';

import { SendgridViewComponent } from './sendgrid-view/sendgrid-view.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { HttpClientModule } from '@angular/common/http';

@Addon('@materia/sendgrid')
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatRippleModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatTooltipModule,
    MatListModule,
    NgxChartsModule
  ],
  declarations: [SendgridViewComponent, SendEmailComponent],
  exports: [SendgridViewComponent],
  entryComponents: []
})
export class SendgridModule {}
