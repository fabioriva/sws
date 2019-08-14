import { Row, Col } from 'antd'
import * as def from 'src/constants/nyu'
import { VALET } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import withOverview from 'src/hocs/with-overview'

const Page = ({ devices, exitQueue }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={14} lg={18} xl={18}>
      <Row type='flex' justify='center' align='top' gutter={16}>
        <Col xs={24} sm={24} md={24} lg={10} xl={8}>
          { devices[0] }
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={8}>
          { devices[1] }
        </Col>
      </Row>
      <Row type='flex' justify='center' align='middle' gutter={16}>
        <Col xs={24} sm={24} md={24} lg={10} xl={8} />
        <Col xs={24} sm={24} md={24} lg={10} xl={8} />
      </Row>
    </Col>
    <Col xs={24} sm={24} md={10} lg={6} xl={6}>
      { exitQueue }
    </Col>
  </Row>
)

Page.getInitialProps = async () => {
  const props = {
    activeItem: '1',
    def: def,
    pageRole: VALET
  }
  return props
}

export default withAuthSync(withOverview(Page))