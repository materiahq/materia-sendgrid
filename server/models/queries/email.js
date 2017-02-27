const SengridSender = require('../../lib/sendgrid')

class EmailModel {
	constructor(app, entity) {
		this.app = app;
		this.entity = entity;
		this.emailSender = new SendgridSender(app.addons.addonsConfig['sendgrid'].apikey, app.addons.addonsConfig['sendgrid'].from)
	}

	send(params) {
		return this.emailSender.send(params).then(() => {
			params.from = this.app.addons.addonsConfig['sendgrid'].from
			params.date_sent = new Date()
			return this.entity.getQuery('create')
				.run(params)
		})
	}
}

module.exports = EmailModel;