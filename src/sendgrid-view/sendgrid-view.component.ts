import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
  ViewChild,
  TemplateRef
} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Addon } from "@materia/addons";

@Addon({
  package: "@materia/sendgrid",
  name: "Sendgrid",
  logo: "https://thyb.github.io/materia-website-content/logo/addons/sendgrid.png",
  deps: []
})
@Component({
  selector: "materia-sendgrid-view",
  templateUrl: "./sendgrid-view.component.html",
  styleUrls: ["./sendgrid-view.component.scss"]
})

export class SendgridViewComponent implements OnInit {
  emails: any;
  nbEmails: number;
  subjectControl: FormControl;
  bodyControl: FormControl;
  toControl: FormControl;
  dialogRef: any;

  @Input() app;
  @Input() settings;
  @Input() baseUrl: string;

  @Output() openSetup = new EventEmitter<void>();

  @ViewChild('sendDialog') sendDialog: TemplateRef<any>;

  constructor(
    @Inject('HttpClient') private http: HttpClient,
    @Inject('MatDialog') private dialog: MatDialog,
    @Inject('MatSnackBar') private snackBar: MatSnackBar
) { }

  ngOnInit() {
    this.initForm();
    this.listEmails();
  }

  initForm() {
    this.subjectControl = new FormControl('', Validators.required);
    this.bodyControl = new FormControl('', Validators.required);
    this.toControl = new FormControl('', Validators.required);
  }

  listEmails() {
    this.runQuery('sendgrid', 'latest').run().then(response => {
      this.emails = response.data
      this.nbEmails = response.count
    }).catch((err) => {
      console.log('error', err, err.stack)
    });
  }

  openSendDialog() {
    this.initForm();
    this.dialogRef = this.dialog.open(this.sendDialog);
  }

  send() {
    this.runQuery('sendgrid', 'send', { subject: this.subjectControl.value, body: this.bodyControl.value, to: this.toControl.value }).then(() => {
			this.dialogRef.close();
			this.snackBar.open(`Email send`, null, { duration: 2000 });
			this.listEmails();
		});
  }

  private runQuery(entity: string, query: string, params?: any) {
    return this.http
      .post(`${this.baseUrl}/entities/${entity}/queries/${query}`, params)
      .toPromise()
  }
}
