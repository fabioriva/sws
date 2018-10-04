var commOpen = (plc, s7client, callback) => {
  s7client.ConnectTo(plc.ip, plc.rack, plc.slot, function (err) {
    if (err) return callback(err)
    callback(err, true)
  })
}

var commError = (err, plc, s7client) => {
  console.log(`${plc.ip} >> Error Code # ${err} - ${s7client.ErrorText(err)}`)
  if (err === 665420) {
    console.log(`${plc.ip} >> Disconnect # ${s7client.Disconnect()}`)
    // plc.isOnline = false
  }
  plc.isOnline = false
  return err
}

export {
  commError,
  commOpen
}
