import { notification } from 'antd'

function openNotification (mesg) {
  const { type, message, description } = mesg
  switch (type) {
    case 1:
      notification['error']({
        message: message,
        description: description
      })
      break
    case 2:
      notification['success']({
        message: message,
        description: description
      })
      break
    case 3:
    case 4:
      notification['warning']({
        message: message,
        description: description
      })
      break
    default:
      notification['info']({
        message: message,
        description: description
      })
  }
}

export default openNotification
