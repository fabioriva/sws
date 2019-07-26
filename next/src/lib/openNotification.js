import { notification } from 'antd'

function openNotification (mesg) {
  const { type, message, description, card, stall } = mesg
  switch (type) {
    case 1:
      notification['error']({
        message: message,
        description: <span>{description}</span>,
        // icon: <span style={{ fontSize: '24px' }}>&#x1F44E;&nbsp;</span>
      })
      break
    case 2:
      notification['success']({
        message: message,
        description: <span>{description}</span>,
        // icon: <span style={{ fontSize: '24px' }}>&#x1F44D;&nbsp;</span>
      })
      break
    case 3:
    case 4:
      notification['warning']({
        message: message,
        description: <span>{description}</span>,
        // icon: <span style={{ fontSize: '24px' }}>&#x26A0;&nbsp;</span>
      })
      break
    case 5:
      notification.open({
        message: <strong>Car In</strong>,
        description: <span>Stall <strong>{stall}</strong> Card <strong>{card}</strong></span>,
        icon: <span style={{ fontSize: '24px' }}>&#x1F698;&nbsp;</span>
      })
      break
    case 6:
      notification.open({
        message: <strong>Car Out</strong>,
        description: <span>Stall <strong>{stall}</strong></span>,
        icon: <span style={{ fontSize: '24px' }}>&#x1F698;&nbsp;</span>
      })
      break
    default:
      notification['info']({
        message: message,
        description: <span>{description}</span>,
        // style: {
        //   width: 480,
        //   marginLeft: 335 - 480
        // }
      })
  }
}

export default openNotification
