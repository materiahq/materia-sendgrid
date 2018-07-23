import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'materia-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  subjectControl: FormControl;
  bodyControl: FormControl;
  toControl: FormControl;

  @Input() baseUrl: string;
  @Output() close = new EventEmitter<void>();

  constructor(
    public snackBar: MatSnackBar,
    public http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.subjectControl = new FormControl('', Validators.required);
    this.bodyControl = new FormControl('', Validators.required);
    this.toControl = new FormControl('', Validators.required);
  }
  send() {
    this.runQuery('sendgrid', 'send', {
      subject: this.subjectControl.value,
      body: this.bodyControl.value,
      to: this.toControl.value
    }).then(() => {
      this.close.emit();
      this.snackBar.open(`Email sent`, null, { duration: 2000 });
    });
  }

  private runQuery(entity: string, query: string, params?: any) {
    return this.http
      .post(`${this.baseUrl}/entities/${entity}/queries/${query}`, params)
      .toPromise();
  }
}
