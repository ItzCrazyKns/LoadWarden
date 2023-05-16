export default class SendInstance {
    constructor(transporter) {
        this.transporter = transporter
    }

    send(to, subject, body, from) {
        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: body,
        }
        return this.transporter.sendMail(mailOptions)
    }
}