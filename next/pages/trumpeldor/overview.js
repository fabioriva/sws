import { Row, Col } from 'antd'
import * as def from 'src/constants/trumpeldor'
import { VALET } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import withOverview from 'src/hocs/with-overview'

const Page = ({ devices, exitQueue }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={12} lg={12} xl={{ span: 8, offset: 4 }}>
      { devices[0] }
    </Col>
    <Col xs={24} sm={24} md={12} lg={12} xl={{ span: 8, offset: 0 }}>
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