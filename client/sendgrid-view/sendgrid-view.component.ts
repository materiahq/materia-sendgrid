import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { AddonView } from '@materia/addons';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SendEmailComponent } from '../send-email/send-email.component';
@AddonView('@materia/sendgrid')
@Component({
  selector: 'materia-sendgrid',
  templateUrl: './sendgrid-view.component.html',
  styleUrls: ['./sendgrid-view.component.scss']
})
export class SendgridViewComponent implements OnInit {
  nbEmails: number;

  dialogRef: any;

  data: any;

  @Input() app;
  @Input() settings;
  @Input() baseUrl: string;

  @Output() openSetup = new EventEmitter<void>();

  @ViewChild('sendDialog') sendDialog: TemplateRef<any>;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchStats();
  }

  private getSerie(name, displayName, data) {
    const series = [];
    data.forEach(row => {
      series.push({
        name: row.date,
        value: row.stats[0].metrics[name]
      });
    });
    return {
      name: displayName,
      series: series
    };
  }

  private countEmailsSent(data) {
    let result = 0;
    data.forEach(row => {
      result += row.stats[0].metrics['delivered'];
    });
    return result;
  }

  fetchStats() {
    this.runQuery('sendgrid', 'stats')
      .then((response: any) => {
        this.data = [
          this.getSerie('delivered', 'Emails delivered', response.data),
          this.getSerie('opens', 'Opens', response.data),
          this.getSerie('clicks', 'Clicks', response.data),
          this.getSerie('unsubscribes', 'Unsubscribes', response.data),
          this.getSerie('spam_reports', 'Spam Reports', response.data)
        ];
        this.nbEmails = this.countEmailsSent(response.data);
        console.log(this.data);
      })
      .catch(err => {
        console.log('error', err, err.stack);
      });
  }

  openSendDialog() {
    this.dialogRef = this.dialog.open(this.sendDialog, {
      data: {
        baseUrl: this.baseUrl
      },
      autoFocus: true
    });
  }

  closeSendDialog() {
    this.dialogRef.close();
    this.fetchStats();
  }

  private runQuery(entity: string, query: string, params?: any) {
    return this.http
      .post(`${this.baseUrl}/entities/${entity}/queries/${query}`, params)
      .toPromise();
  }
}
