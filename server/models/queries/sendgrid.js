const sendgrid = require('@sendgrid/mail');
const sendgridClient = require('@sendgrid/client');

class SendgridModel {
  constructor(app, entity) {
    this.app = app;
    this.entity = entity;

    if (this.app.addons.addonsConfig['@materia/sendgrid']) {
      this.from = this.app.addons.addonsConfig['@materia/sendgrid'].from;
      sendgrid.setApiKey(app.addons.addonsConfig['@materia/sendgrid'].apikey);
      sendgridClient.setApiKey(
        app.addons.addonsConfig['@materia/sendgrid'].apikey
      );
    }
  }

  send(params) {
	params = params || {}
    const email = {
      to: params.to,
      from: this.from,
      subject: params.subject,
      text: params.body,
      html: params.html || params.body
    };
    return sendgrid.send(email).then(() => {
		return {email_sent: true}
	});
  }

  stats(params) {
	params = params || {}
	const now = new Date()
	const lastweek = new Date()
	lastweek.setDate(new Date().getDate() - 7);
    const queryParams = {
      aggregated_by: params.aggregated_by || 'day',
      end_date: params.end_date || now.toISOString().split("T")[0],
      limit: params.limit || 1,
      offset: params.offset || 1,
      start_date: params.start_date || lastweek.toISOString().split("T")[0],
	};
    const request = {
      qs: queryParams,
      method: 'GET',
      url: '/v3/stats'
    };
    return sendgridClient.request(request).then(([response, body]) => {
	  return response.body;
    });
  }
}

module.exports = SendgridModel;
