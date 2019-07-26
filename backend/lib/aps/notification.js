import moment from 'moment'

export default function notification (document) {
  const { alarm, card, date, device, mode, operation, stall } = document

  switch (operation.id) {
    case 1:
    case 2:
      return {
        type: operation.id,
        message: device.name,
        description: `${operation.info} ID ${alarm.id} ${alarm.info !== undefined ? alarm.info : ''}`
      }
    case 3:
      return {
        type: operation.id,
        message: device.name,
        description: `${operation.info} >> ${mode.info}`
      }
    case 4:
      return {
        type: operation.id,
        message: device.name,
        description: `Card ${card} ${operation.info}`
      }
    case 5:
    case 6:
    case 7:
    case 8:
      return {
        type: operation.id,
        message: device.name,
        description: `${operation.info} card ${card} stall ${stall}`,
        card: card,
        stall: stall
      }
    case 10:
      return {
        type: operation.id,
        message: device.name,
        description: `${operation.info} Card ${card}`,
        card: card,
        stall: stall
      }
    case 11:
    case 12:
      return {
        type: operation.id,
        message: device.name,
        description: `${operation.info} Card ${card}`,
        card: card,
        stall: stall
      }
    default:
      return {
        type: operation.id,
        message: device.name,
        description: `${moment(date).format('YYYY-MM-DD HH:mm:ss')}`
      }
  }
}
