import { notification } from 'antd'

function openNotification (mesg) {
  const { type, message, description } = mesg
  switch (type) {
    case 1:
      notification['error']({
        message: message,
        description: <span>{description}</span>
      })
      break
    case 2:
      notification['success']({
        message: message,
        description: <span>{description}</span>
      })
      break
    case 3:
    case 4:
      notification['warning']({
        message: message,
        description: <span>{description}</span>
      })
      break
    default:
      notification['info']({
        message: message,
        description: <span>{description}</span>,
        style: {
          width: 480,
          marginLeft: 335 - 480
        }
      })
  }
}

export default openNotification
