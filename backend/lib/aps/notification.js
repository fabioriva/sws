import moment from 'moment'

function notification (document) {
  const { alarm, card, date, device, mode, operation, stall } = document
  var description = `${moment(date).format('YYYY-MM-DD HH:mm:ss')} `
  switch (operation.id) {
    case 1:
    case 2:
      description += `${operation.info} ID ${alarm.id} ${alarm.info}`
      break
    case 3:
      description += `${operation.info} >> ${mode.info}`
      break
    case 4:
      description += `${operation.info} >> ${card}`
      break
    case 5:
    case 6:
    case 7:
    case 8:
      description += `${operation.info} card ${card} stall ${stall}`
      break
    case 10:
      description += `${operation.info} card ${card}`
      break
    case 11:
      description += `${operation.info} card ${card} stall ${stall}`
      break
    default:
      description.substring(-1)
      break
  }
  return {
    type: operation.id,
    message: device.name,
    description: description
  }
}

export default notification
