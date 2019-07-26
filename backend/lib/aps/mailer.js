const nodemailer = require('nodemailer')

// let account = {
//   user: 'f.riva.phone@live.com',
//   pass: 'h0savP6L.$'
// }

const account = {
  // user: 'info@sotefinservice.com',
  user: 'no-reply@sotefinservice.com',
  pass: 'aGep9I*h'
}

const transporter = nodemailer.createTransport({
  host: 'smtp.bweb.ch',
  port: 465,
  secure: true, // true for 465, false for other ports
  // tls: {
  //   ciphers: 'SSLv3',
  //   rejectUnathorized: false
  // },
  auth: {
    user: account.user,
    pass: account.pass
  },
  logger: true
})

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take our messages', success)
  }
})

module.exports = async function main (system, doc, recipient) {
  // try {
  const { logged, alarm, device } = doc

  const subject = `${system}: SWS notification`

  const html = `
  <p>Logged <b>${logged}</b></p>
  <p>System <b>${system}</b></p>
  <p>Device <b>${device.name}</b></p>
  <p>Alarm Id <b>${alarm.id} ${alarm.info !== undefined ? alarm.info : 'No description'}</b></p>
  <p>More details from <a href='https://www.sotefinservice.com'>https://www.sotefinservice.com</a></p>
  <hr />
  <p>This is an automated message - PLEASE DO NOT REPLY</p>
  `

  const mailOptions = {
    from: 'Sotefin Web Service <no-reply@sotefinservice.com>',
    to: recipient,
    subject: subject,
    // text: 'Hello world?', // plain text body
    html: html
  }

  const info = await transporter.sendMail(mailOptions)

  console.log('Message sent: %s', info.messageId)
  // } catch (error) {
  //   throw error
  // }
}
