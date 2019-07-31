import { Row, Col } from 'antd'
import * as def from 'src/constants/bassano'
import { VALET } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import AppUi from '/src/templates/overview'

const MainView = ({ devices, exitQueue }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={14} lg={18} xl={18}>
        <Row type='flex' justify='center' align='top' gutter={16}>
          <Col xs={24} sm={24} md={24} lg={10} xl={8}>
            { devices[0] }
          </Col>
          <Col xs={24} sm={24} md={24} lg={10} xl={8}>
            {/* <Device
              device={devices[1]}
              action={this.showOperationModal}
            /> */}
            { devices[1] }
          </Col>
        </Row>
        <Row type='flex' justify='center' align='middle' gutter={16}>
          <Col xs={24} sm={24} md={24} lg={10} xl={8}>
            { devices[2] }
          </Col>
          <Col xs={24} sm={24} md={24} lg={10} xl={8} />
        </Row>
      </Col>
      <Col xs={24} sm={24} md={10} lg={6} xl={6}>
        { exitQueue }
      </Col>
    </Row>
  )
}

export default withAuthSync(AppUi(def, VALET, MainView))
