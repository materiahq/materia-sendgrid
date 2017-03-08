const SendgridSender = require('../../lib/sendgrid')

class SendgridModel {
	constructor(app, entity) {
		this.app = app;
		this.entity = entity;
		this.emailSender = new SendgridSender(app.addons.addonsConfig['@materia/sendgrid'].apikey, app.addons.addonsConfig['@materia/sendgrid'].from)
	}

	send(params) {
		return this.emailSender.send(params).then(() => {
			params.from = this.app.addons.addonsConfig['@materia/sendgrid'].from
			params.date_sent = new Date()
			return this.entity.getQuery('create')
				.run(params)
		})
	}
}

module.exports = SendgridModel;