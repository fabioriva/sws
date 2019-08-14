import { Modal } from 'antd'

export function confirm (title, content, action, event, data) {
  Modal.confirm({
    title: title,
    content: content,
    onOk() {
      console.log('confirmed')
      action(event, data)
    },
    onCancel() {}
  })
}