import { Row, Col } from 'antd'
import * as def from 'src/constants/longmatan'
import { VALET } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import AppUi from '/src/templates/overview'

const MainView = ({ devices, exitQueue }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={16} xl={16}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            { devices[0] }
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            { devices[1] }
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            { devices[2] }
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            { devices[3] }
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        { exitQueue }
      </Col>
    </Row>
  )
}

export default withAuthSync(AppUi(def, VALET, MainView))
