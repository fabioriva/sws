const commOpen = (plc, s7client, callback) => {
  const { ip, rack, slot } = plc
  s7client.ConnectTo(ip, rack, slot, function (err) {
    if (err) return callback(err)
    callback(err, true)
  })
}

const commError = (err, plc, s7client) => {
  console.log(`${plc.ip} >> Error Code # ${err} - ${s7client.ErrorText(err)}`)
  if (err === 665420) {
    console.log(`${plc.ip} >> Disconnect # ${s7client.Disconnect()}`)
  }
  plc.isOnline = false
  return err
}

export {
  commError,
  commOpen
}
