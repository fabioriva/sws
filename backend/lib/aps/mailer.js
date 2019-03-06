const nodemailer = require('nodemailer')

let account = {
  user: 'f.riva.phone@live.com',
  pass: 'h0savP6L.$'
}

let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secureConnection: false, // true for 465, false for other ports
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: account.user,
    pass: account.pass
  }
})

module.exports = async function main (system, doc) {
  const { logged, alarm, device } = doc

  let subject = `${system}: alarm notification ⚠️`

  let html = `
  <p>Log time <b>${logged}</b></p>
  <p>Device <b>${device.name}</b></p>
  <p>Alarm Id <b>${alarm.id} ${alarm.info !== undefined ? alarm.info : 'No description'}</b></p>
  <p>More details from <a href='https://www.sotefinservice.com'>https://www.sotefinservice.com</a></p>
  <hr />
  <p>THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY</p>
  `

  let mailOptions = {
    from: '"Sotefin Web Service" <f.riva.phone@live.com>',
    to: 'fabio@elesoft.it, f.riva@sotefin.ch',
    subject: subject,
    // text: 'Hello world?', // plain text body
    html: html
  }

  let info = await transporter.sendMail(mailOptions)
  console.log('Message sent: %s', info.messageId)
}
