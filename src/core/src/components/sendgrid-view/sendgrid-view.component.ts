const ngcore = (window as any).angular.core;
const Component = ngcore.Component;

@Component({
  selector: "materia-sendgrid-view",
  templateUrl: "./sendgrid-view.component.html",
  styleUrls: ["./sendgrid-view.component.scss"]
})

export class SendgridViewComponent {
  constructor() { }
}
