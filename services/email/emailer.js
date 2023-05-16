import createTransport from './transport.js'
import SendInstance from './sendInstance.js'

export default class Emailer {

  constructor(host, port, auth) {
    this.transporter = createTransport(host, port, auth)
    this.sendInstance = new SendInstance(this.transporter)
  }

  send(to, subject, body, from) {
    return this.sendInstance.send(to, subject, body, from)
  }
}