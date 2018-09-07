import { notification } from 'antd'

function openNotification (mesg) {
  switch (mesg.type) {
    case 1:
      notification['error']({
        message: mesg.message,
        description: mesg.description
      })
      break
    case 2:
      notification['success']({
        message: mesg.message,
        description: mesg.description
      })
      break
    case 3:
    case 4:
      notification['warning']({
        message: mesg.message,
        description: mesg.description
      })
      break
    default:
      notification['info']({
        message: mesg.message,
        description: mesg.description
      })
  }
}

export default openNotification
