export default class Sendgrid {
  public static displayName = 'Sendgrid';
  public static logo =
    'https://thyb.github.io/materia-website-content/logo/addons/sendgrid.png';

  public static installSettings = [
    {
      name: 'apikey',
      description: 'Enter your apikey',
      type: 'string',
      required: true
    },
    {
      name: 'from',
      description: 'Enter the email address (sender) attached with your apikey',
      type: 'string',
      required: true
    }
  ];

  app: any;
  config: any;

  constructor(app, config) {}

  uninstall(app) {}
}
