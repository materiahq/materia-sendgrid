const SengridSender = require('../../lib/sendgrid')

class EmailModel {
	constructor(app, entity) {
		this.app = app;
		this.entity = entity;
		this.emailSender = new SendgridSender(app.addons.addonsConfig['email'].apikey, app.addons.addonsConfig['email'].from)
	}

	send(params) {
		return this.emailSender.send(params).then(() => {
			params.from = this.app.addons.addonsConfig['email'].from
			params.date_sent = new Date()
			return this.entity.getQuery('create')
				.run(params)
		})
	}
}

module.exports = EmailModel;