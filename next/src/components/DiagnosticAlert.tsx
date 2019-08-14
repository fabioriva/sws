import * as React from 'react'
import { Alert } from 'antd'

type Props = {
  message: string
  onClose: () => void
}

const DiagnosticAlert: React.FunctionComponent<Props> = (props) => (
  <Alert
    style={{ margin: '6px 12px 0 12px' }}
    message={`Diagnostic is active for alarm id ${props.message}`}
    type='error'
    closeText='Close Diagnostic'
    onClose={props.onClose}
    showIcon
  />
)

export default DiagnosticAlert