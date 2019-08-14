import { Row, Col } from 'antd'
import * as def from 'src/constants/trumpeldor'
import { VALET } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import withMap from 'src/hocs/with-map'

const Page = ({ levels, occupancy }) => (
  <Row>
    <Col xs={24} sm={24} md={24} lg={16} xl={16} style={{ marginBottom: 16 }}>
      {levels[2]}
      {levels[1]}
      {levels[0]}
    </Col>
    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
      {occupancy}
    </Col>
    <style jsx global>{`
      .l {
        position: relative;
        background-color: #F0F0F0;
        border: 1px solid #888;
        margin-bottom: 14px;
        /*margin-left: auto;
        margin-right: auto;*/
        height: 166px;
        width: 456px;
      
      }
      .s {
        position: absolute;
        border: 1px solid #000;
        height: 30px;
        width: 40px;
        text-align: center;
        vertical-align: middle;
        line-height: 30px;
      }
      .el {
        position: absolute;
        background-color: #C0C0C0;
        border: 1px solid #000;
        font-weight: bold;
        height: 32px;
        width: 40px;
        text-align: center;
        vertical-align: middle;
        line-height: 32px;
      }
      .sh {
        position: absolute;
        background-color: #C0C0C0;
        border: 1px solid #000;
        font-weight: bold;
        height: 30px;
        width: 54px;
        text-align: center;
        vertical-align: middle;
        line-height: 30px;
      }
      .st {
        font-size: 12px;
        font-weight: bold;
      }
      .st:hover {
        cursor: pointer;
        text-decoration: none;
        font-size: 16px;
      }
      /* status */
      .s-free {
        background-color: #00FF00;
      }
      .s-busy {
        background-color: #FF0000;
      }
      .s-lock {
        background-color: #FF00FF;
      }
      .s-rsvd {
        background-color: #FFFF00;
      }
      .s-papa {
        background-color: #00FFFF;
      }
      /* sizes */
      .s-typ1 {
        background-color: #b8daff;
      }
      .s-typ2 {
        background-color: #fff3cd;
      }
        .s-typ3 {
          background-color: #FF9900;
      }
      // .s-typ4 {
      //   background-color: #66CCFF;
      // }
      // .s-typ5 {
      //   background-color: #0099FF;
      // }
      // .s-typ6 {
      //   background-color: #00FFFF;
      // }
      /* Level -3 */
      #el-3 { top: 65px; left: 43px; }
      #s-1	{ top: 33px; left: 2px }
      #s-2	{ top: 99px; left: 2px }
      #s-3	{ top: 2px; left: 43px }
      #s-4	{ top: 33px; left: 43px }
      #s-5	{ top: 99px; left: 43px }
      #s-6	{ top: 2px; left: 84px }
      #s-7	{ top: 33px; left: 84px }
      #s-8	{ top: 99px; left: 84px }
      #s-9	{ top: 2px; left: 125px }
      #s-10	{ top: 33px; left: 125px }
      #s-11	{ top: 99px; left: 125px }
      #s-12	{ top: 2px; left: 166px }
      #s-13	{ top: 33px; left: 166px }
      /* Level -2 */
      #el-2 { top: 65px; left: 43px; }
      #s-14	{ top: 33px; left: 2px }
      #s-15	{ top: 99px; left: 2px }
      #s-16	{ top: 2px; left: 43px }
      #s-17	{ top: 33px; left: 43px }
      #s-18	{ top: 99px; left: 43px }
      #s-19	{ top: 2px; left: 84px }
      #s-20	{ top: 33px; left: 84px }
      #s-21	{ top: 99px; left: 84px }
      #s-22	{ top: 2px; left: 125px }
      #s-23	{ top: 33px; left: 125px }
      #s-24	{ top: 99px; left: 125px }
      #s-25	{ top: 2px; left: 166px }
      #s-26	{ top: 33px; left: 166px }
      /* Level -1 */
      #el-1 { top: 65px; left: 43px; }
      #s-27	{ top: 2px; left: 2px }
      #s-28	{ top: 33px; left: 2px }
      #s-29	{ top: 99px; left: 2px }
      #s-30	{ top: 2px; left: 43px }
      #s-31	{ top: 33px; left: 43px }
      #s-32	{ top: 99px; left: 43px }
      #s-33	{ top: 2px; left: 84px }
      #s-34	{ top: 33px; left: 84px }
      #s-35	{ top: 99px; left: 84px }
      #s-36	{ top: 2px; left: 125px }
      #s-37	{ top: 33px; left: 125px }
      #s-38	{ top: 99px; left: 125px }
      #s-39	{ top: 2px; left: 166px }
      #s-40	{ top: 33px; left: 166px }
    `}</style>
  </Row>
)

Page.getInitialProps = async () => {
  const props = {
    activeItem: '2',
    def: def,
    pageRole: VALET
  }
  return props
}

export default withAuthSync(withMap(Page))