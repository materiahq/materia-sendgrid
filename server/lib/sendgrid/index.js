class SendgridSender {
    constructor(key, from) {
        //secret is undefined with sendgrid
        this.from = from

        this.sendgrid = require("sendgrid")(key)
    }

    send(params) {
        const sgReq = this.sendgrid.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: {
                personalizations: [{
                    to: [{ email: params.to }],
                    subject: params.subject
                }],
                from: { email: this.from },
                content: [{
                    type: 'text/plain',
                    value: params.body
                }]
            }
        })
        return new Promise((resolve, reject) => {
            this.sendgrid.API(sgReq, (err) => {
                if (err) {
                    return reject(err)
                }
                return resolve()
            })
        })
    }
}

module.exports = SendgridSender