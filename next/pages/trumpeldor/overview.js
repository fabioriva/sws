import { Row, Col } from 'antd'
import * as def from 'src/constants/trumpeldor'
import { VALET } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import AppUi from '/src/templates/overview'

const MainView = ({ devices, exitQueue }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={12} lg={12} xl={{ span: 8, offset: 4 }}>
        { devices[0] }
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={{ span: 8, offset: 0 }}>
        { exitQueue }
      </Col>
    </Row>
  )
}

export default withAuthSync(AppUi(def, VALET, MainView))
