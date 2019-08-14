import { Row, Col } from 'antd'
import * as def from 'src/constants/nyu'
import { VALET } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import withMap from 'src/hocs/with-map'

const Page = ({ levels, occupancy }) => (
  <Row>
    <Col xs={24} sm={24} md={24} lg={16} xl={16} style={{ marginBottom: 16 }}>
      {levels[3]}
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
      // .s-typ3 {
      //   background-color: #FF9900;
      // }
      // .s-typ4 {
      //   background-color: #66CCFF;
      // }
      // .s-typ5 {
      //   background-color: #0099FF;
      // }
      // .s-typ6 {
      //   background-color: #00FFFF;
      // }
      /* Level +1 */
      #el-b1 { top: 65px; left: 125px; }
      #el-a1 { top: 65px; left: 412px; }
      #s-1	{ top: 33px; left: 2px }
      #s-2	{ top: 2px; left: 2px }
      #s-3	{ top: 33px; left: 43px }
      #s-4	{ top: 2px; left: 43px }
      #s-5	{ top: 33px; left: 84px }
      #s-6	{ top: 2px; left: 84px }
      #s-7	{ top: 33px; left: 125px }
      #s-8	{ top: 2px; left: 125px }
      #s-9	{ top: 33px; left: 166px }
      #s-10	{ top: 2px; left: 166px }
      #s-11	{ top: 33px; left: 207px }
      #s-12	{ top: 2px; left: 207px }
      #s-13	{ top: 33px; left: 248px }
      #s-14	{ top: 2px; left: 248px }
      #s-15	{ top: 33px; left: 289px }
      #s-16	{ top: 2px; left: 289px }
      #s-17	{ top: 33px; left: 330px }
      #s-18	{ top: 2px; left: 330px }
      /* Level +2 */
      #el-b2 { top: 65px; left: 125px; }
      #el-a2 { top: 65px; left: 412px; }
      #s-19	{ top: 99px; left: 2px }
      #s-20	{ top: 33px; left: 2px }
      #s-21	{ top: 2px; left: 2px }
      #s-22	{ top: 99px; left: 43px }
      #s-23	{ top: 33px; left: 43px }
      #s-24	{ top: 2px; left: 43px }
      #s-25	{ top: 99px; left: 84px }
      #s-26	{ top: 33px; left: 84px }
      #s-27	{ top: 2px; left: 84px }
      #s-28	{ top: 99px; left: 125px }
      #s-29	{ top: 33px; left: 125px }
      #s-30	{ top: 2px; left: 125px }
      #s-31	{ top: 99px; left: 166px }
      #s-32	{ top: 33px; left: 166px }
      #s-33	{ top: 2px; left: 166px }
      #s-34	{ top: 99px; left: 207px }
      #s-35	{ top: 33px; left: 207px }
      #s-36	{ top: 2px; left: 207px }
      #s-37	{ top: 99px; left: 248px }
      #s-38	{ top: 33px; left: 248px }
      #s-39	{ top: 2px; left: 248px }
      #s-40	{ top: 99px; left: 289px }
      #s-41	{ top: 33px; left: 289px }
      #s-42	{ top: 2px; left: 289px }
      #s-43	{ top: 99px; left: 330px }
      #s-44	{ top: 33px; left: 330px }
      #s-45	{ top: 2px; left: 330px }
      /* Level +3 */
      #el-b3 { top: 98px; left: 125px; }
      #el-a3 { top: 98px; left: 412px; }
      #s-46	{ top: 132px; left: 2px }
      #s-47	{ top: 66px; left: 2px }
      #s-48	{ top: 33px; left: 2px }
      #s-49	{ top: 2px; left: 2px }
      #s-50	{ top: 132px; left: 43px }
      #s-51	{ top: 66px; left: 43px }
      #s-52	{ top: 33px; left: 43px }
      #s-53	{ top: 2px; left: 43px }
      #s-54	{ top: 132px; left: 84px }
      #s-55	{ top: 66px; left: 84px }
      #s-56	{ top: 33px; left: 84px }
      #s-57	{ top: 2px; left: 84px }
      #s-58	{ top: 132px; left: 125px }
      #s-59	{ top: 66px; left: 125px }
      #s-60	{ top: 33px; left: 125px }
      #s-61	{ top: 132px; left: 166px }
      #s-62	{ top: 66px; left: 166px }
      #s-63	{ top: 33px; left: 166px }
      #s-64	{ top: 132px; left: 207px }
      #s-65	{ top: 66px; left: 207px }
      #s-66	{ top: 33px; left: 207px }
      #s-67	{ top: 132px; left: 248px }
      #s-68	{ top: 66px; left: 248px }
      #s-69	{ top: 33px; left: 248px }
      #s-70	{ top: 132px; left: 289px }
      #s-71	{ top: 66px; left: 289px }
      #s-72	{ top: 33px; left: 289px }
      #s-73	{ top: 2px; left: 289px }
      #s-74	{ top: 132px; left: 330px }
      #s-75	{ top: 66px; left: 330px }
      #s-76	{ top: 33px; left: 330px }
      #s-77	{ top: 2px; left: 330px }
      #s-78	{ top: 132px; left: 371px }
      #s-79	{ top: 66px; left: 371px }
      #s-80	{ top: 33px; left: 371px }
      #s-81	{ top: 132px; left: 412px }
      #s-82	{ top: 66px; left: 412px }
      #s-83	{ top: 33px; left: 412px }
      /* Level +4 */
      #el-b4 { top: 98px; left: 125px; }
      #el-a4 { top: 98px; left: 412px; }
      #s-84	{ top: 132px; left: 2px }
      #s-85	{ top: 66px; left: 2px }
      #s-86	{ top: 33px; left: 2px }
      #s-87	{ top: 2px; left: 2px }
      #s-88	{ top: 132px; left: 43px }
      #s-89	{ top: 66px; left: 43px }
      #s-90	{ top: 33px; left: 43px }
      #s-91	{ top: 2px; left: 43px }
      #s-92	{ top: 132px; left: 84px }
      #s-93	{ top: 66px; left: 84px }
      #s-94	{ top: 33px; left: 84px }
      #s-95	{ top: 2px; left: 84px }
      #s-96	{ top: 132px; left: 125px }
      #s-97	{ top: 66px; left: 125px }
      #s-98	{ top: 33px; left: 125px }
      #s-99	{ top: 132px; left: 166px }
      #s-100	{ top: 66px; left: 166px }
      #s-101	{ top: 33px; left: 166px }
      #s-102	{ top: 132px; left: 207px }
      #s-103	{ top: 66px; left: 207px }
      #s-104	{ top: 33px; left: 207px }
      #s-105	{ top: 132px; left: 248px }
      #s-106	{ top: 66px; left: 248px }
      #s-107	{ top: 33px; left: 248px }
      #s-108	{ top: 132px; left: 289px }
      #s-109	{ top: 66px; left: 289px }
      #s-110	{ top: 33px; left: 289px }
      #s-111	{ top: 2px; left: 289px }
      #s-112	{ top: 132px; left: 330px }
      #s-113	{ top: 66px; left: 330px }
      #s-114	{ top: 33px; left: 330px }
      #s-115	{ top: 2px; left: 330px }
      #s-116	{ top: 132px; left: 371px }
      #s-117	{ top: 66px; left: 371px }
      #s-118	{ top: 33px; left: 371px }
      #s-119	{ top: 132px; left: 412px }
      #s-120	{ top: 66px; left: 412px }
      #s-121	{ top: 33px; left: 412px }
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