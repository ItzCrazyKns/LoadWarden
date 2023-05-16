import nodemailer from 'nodemailer'

export default (host, port, auth) => {
  return nodemailer.createTransport({
    host: host,
    port: port,
    secureConnection: false,
    tls: {
      ciphers: 'SSLv3'
    },
    auth: auth,
  })
}