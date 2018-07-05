import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
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
  @Input() app;
  @Input() settings;
  @Input() baseUrl: string;

  @Output() openSetup = new EventEmitter<void>();
  emails: any;
  nbEmails: number;

  constructor(@Inject('HttpClient') private http: HttpClient) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.runQuery('sendgrid', 'latest').run().then(response => {
      this.emails = response.data
      this.nbEmails = response.count
    }).catch((err) => {
      console.log('error', err, err.stack)
    });
  }

  private runQuery(entity: string, query: string, params?: any) {
    return this.http
      .post(`${this.baseUrl}/entities/${entity}/queries/${query}`, params)
      .toPromise()
  }
}
