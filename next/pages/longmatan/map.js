import React from 'react'
import Layout from 'src/components/Layout'
// import MapList from 'src/components/MapList'
import Level from 'src/components/MapLevel'
import Edit from 'src/components/MapEdit'
import Occupancy from 'src/components/charts/Occupancy'
import { Row, Col, Radio } from 'antd'
import { Mobile, Default } from 'src/constants/mediaQueries'
import { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/longmatan'
import { CARDS, STALLS, STALL_STATUS } from 'src/constants/longmatan'
import { SERVICE, VALET } from 'src/constants/roles'
import nextCookie from 'next-cookies'
import { withAuthSync } from 'src/lib/auth'

class AppUi extends React.Component {
  static async getInitialProps (ctx) {
    const props = {
      activeItem: '2',
      pageRole: VALET
    }
    // check if diagnostic is active
    const { diagnostic } = nextCookie(ctx)
    if (diagnostic) {
      const res = await fetch(`${BACKEND_URL}/aps/${APS}/diagnostic?id=${diagnostic}`)
      if (res.ok) {
        const json = await res.json()
        return {
          ...props,
          diagnostic: diagnostic,
          map: json.map,
          occupancy: json.map.statistics[0]
        }
      }
    }
    // if diagnostic is not active fetch data
    const res = await fetch(`${BACKEND_URL}/aps/${APS}/map`)
    // if not fetch return error
    if (!res.ok) {
      return {
        ...props,
        statusCode: 404
      }
    }
    // if fetch return data
    const map = await res.json()
    // const map = json  // JSON.parse(json)
    return {
      ...props,
      map: map,
      occupancy: map.statistics[0]
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      map: props.map,
      occupancy: this.props.occupancy,
      visibilityFilter: 'SHOW_NUMBERS',
      editModal: {
        stall: 0,
        value: 0,
        visible: false
      }
    }
  }
  componentDidMount () {
    const { diagnostic } = this.props
    this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
    this.ws.onerror = e => console.log(e)
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      Object.keys(data).forEach((key) => {
        if (!diagnostic && key === 'map') {
          const { map } = data
          this.setState({
            isFetching: false,
            map: map, // setStallLabel(map, this.state.visibilityFilter),
            occupancy: map.statistics[0]
          })
        }
      })
    }
  }
  componentWillUnmount () {
    this.ws.close()
  }
  showModal = (stall, card) => {
    if (this.props.currentUser.role <= SERVICE) {
    this.setState({
      editModal: {
        stall: stall,
        value: card >= 1 && card <= CARDS ? card : 1,
        visible: true
      }
    })

    }
  }
  handleMapCancel = (e) => {
    this.setState({
      editModal: {
        stall: 0,
        value: 0,
        visible: false
      }
    })
  }
  handleMapChange = (stall, card) => {
    this.setState({
      editModal: {
        stall: stall,
        value: card,
        visible: true
      }
    })
  }
  handleMapOk = (stall, card) => {
    this.setState({
      editModal: {
        stall: 0,
        value: 0,
        visible: false
      }
    })
    this.ws.send(
      JSON.stringify({
        event: 'edit-stall',
        data: {
          stall: stall,
          card: card
        }
      })
    )
  }
  onRadioChange = (e) => {
    this.setState({
      visibilityFilter: e.target.value,
      // map: setStallLabel(this.state.map, e.target.value)
    })
  }
  render () {
    const { map, editModal, visibilityFilter, occupancy } = this.state
    const levels = []
    map.levels.forEach((l, i) => {
      levels.push(
        <Level
          level={l}
          key={i}
          stallStatus={STALL_STATUS}
          visibilityFilter={visibilityFilter}
          openModal={this.showModal}
        />
      )
    })
    return (
      <Layout
        aps={APS_TITLE}
        pageTitle='System Map'
        sidebarMenu={SIDEBAR_MENU}
        socket={`${WEBSOCK_URL}?channel=ch2`}
      >
        <Mobile>
          {/* <div id='#top'>
            <a href='#level-1'>[Piano 1]</a>
            <a href='#level-2'>[Piano 2]</a>
            <a href='#level-3'>[Piano 3]</a>
            <a href='#level-4'>[Piano 4]</a>
            <a href='#level-5'>[Piano 5]</a>
          </div>
          <MapList 
            map={map}
            openModal={this.showModal}
          />
          <Edit
            data={editModal}
            onCancel={this.handleMapCancel}
            onChange={this.handleMapChange}
            onConfirm={this.handleMapOk}
          /> */}
          <Occupancy data={occupancy} />
        </Mobile>
        <Default>
        <Row>
            <Col xs={24} sm={24} md={24} lg={16} xl={16} style={{ marginBottom: 16 }}>
              <Row>
                <Col span={8}>{levels[8]}</Col>
                <Col span={8}>{levels[7]}</Col>
                <Col span={8}>{levels[6]}</Col>
              </Row>
              <Row>
                <Col span={8}>{levels[5]}</Col>
                <Col span={8}>{levels[4]}</Col>
                <Col span={8}>{levels[3]}</Col>
              </Row>
              <Row>
                <Col span={8}>{levels[2]}</Col>
                <Col span={8}>{levels[1]}</Col>
                <Col span={8}>{levels[0]}</Col>
              </Row>
              <Radio.Group onChange={this.onRadioChange} value={visibilityFilter}>
                <Radio value={'SHOW_NUMBERS'}>
                  Number
                </Radio>
                <Radio value={'SHOW_CARDS'}>
                  Card
                </Radio>
                <Radio value={'SHOW_SIZES'}>
                  Size
                </Radio>
              </Radio.Group>
              <Edit
                cards={CARDS}
                stalls={STALLS}
                stallStatus={STALL_STATUS}
                data={editModal}
                onCancel={this.handleMapCancel}
                onChange={this.handleMapChange}
                onConfirm={this.handleMapOk}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <Occupancy data={occupancy} />
              {/* <Row gutter={8} style={{ marginBottom: 8 }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Occupancy data={map.statistics[1]} title='EL1' />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Occupancy data={map.statistics[2]} title='EL2' />
                </Col>
              </Row>
              <Row gutter={8} style={{ marginBottom: 8 }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Occupancy data={map.statistics[3]} title='EL3' />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Occupancy data={map.statistics[4]} title='EL4' />
                </Col>
              </Row> */}
            </Col>
          </Row>
        </Default>
        <style jsx global>{`
          .l {
            position: relative;
            background-color: #F0F0F0;
            border: 1px solid #888;
            margin-bottom: 14px;
            /*margin-left: auto;
            margin-right: auto;*/
            height: 191px;
            width: 333px;
          
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
            height: 30px;
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
            background-color: #C78917;
          }
          .s-typ2 {
            background-color: #E29A19;
          }
          .s-typ3 {
            background-color: #E8A62F;
          }
          .s-typ4 {
            background-color: #ECB148;
          }
          .s-typ5 {
            background-color: #EFBC61;
          }
          .s-typ6 {
            background-color: #F2C77A;
          }
          .s-typ7 {
            background-color: #F5D294;
          }
          .s-typ8 {
            background-color: #F7DDAD;
          }

          #el-1 { top: 95px; left: 207px; }
          #el-2 { top: 64px; left: 207px; }
          #el-3 { top: 157px; left: 43px; }
          #el-4 { top: 2px; left: 43px; }

          /* Level -1 */
          #s-1	{ top: 157px; left: 289px }
          #s-5	{ top: 126px; left: 289px }
          #s-9	{ top: 95px;  left: 289px }
          #s-12	{ top: 64px;  left: 289px }
          #s-15	{ top: 33px;  left: 289px }
          #s-18	{ top: 2px;   left: 289px }

          #s-2	{ top: 157px; left: 248px }
          #s-6	{ top: 126px; left: 248px }
          #s-10	{ top: 95px;  left: 248px }
          #s-13	{ top: 64px;  left: 248px }
          #s-16	{ top: 33px;  left: 248px }
          #s-19	{ top: 2px;   left: 248px }
          
          #s-3	{ top: 157px; left: 166px }
          #s-7	{ top: 126px; left: 166px }
          #s-11	{ top: 95px;  left: 166px }
          #s-14	{ top: 64px;  left: 166px }
          #s-17	{ top: 33px;  left: 166px }
          #s-20	{ top: 2px;   left: 166px }

          #s-4	{ top: 157px; left: 125px }
          #s-8	{ top: 126px; left: 125px }
          #s-165	{ top: 95px;  left: 125px }
          #s-168	{ top: 64px;  left: 125px }
          #s-171	{ top: 33px;  left: 125px }
          #s-174	{ top: 2px;   left: 125px }

          #s-166	{ top: 95px;  left: 84px }
          #s-169	{ top: 64px;  left: 84px }
          #s-172	{ top: 33px;  left: 84px }
          #s-175	{ top: 2px;   left: 84px }

          #s-167	{ top: 95px;  left: 2px }
          #s-170	{ top: 64px;  left: 2px }
          #s-173	{ top: 33px;  left: 2px }
          #s-176	{ top: 2px;   left: 2px }

          /* Level +1 */
          #s-21	{ top: 157px; left: 289px }
          #s-24	{ top: 126px; left: 289px }
          #s-27	{ top: 95px;  left: 289px }
          #s-30	{ top: 64px;  left: 289px }
          #s-33	{ top: 33px;  left: 289px }
          #s-36	{ top: 2px;   left: 289px }

          #s-22	{ top: 157px; left: 248px }
          #s-25	{ top: 126px; left: 248px }
          #s-28	{ top: 95px;  left: 248px }
          #s-31	{ top: 64px;  left: 248px }
          #s-34	{ top: 33px;  left: 248px }
          #s-37	{ top: 2px;   left: 248px }
          
          #s-23	{ top: 157px; left: 166px }
          #s-26	{ top: 126px; left: 166px }
          #s-29	{ top: 95px;  left: 166px }
          #s-32	{ top: 64px;  left: 166px }
          #s-35	{ top: 33px;  left: 166px }
          #s-38	{ top: 2px;   left: 166px }

          #s-177	{ top: 157px; left: 125px }
          #s-180	{ top: 126px; left: 125px }
          #s-183	{ top: 95px;  left: 125px }
          #s-186	{ top: 64px;  left: 125px }
          #s-189	{ top: 33px;  left: 125px }
          #s-192	{ top: 2px;   left: 125px }

          #s-178	{ top: 157px; left: 84px }
          #s-181	{ top: 126px; left: 84px }
          #s-184	{ top: 95px;  left: 84px }
          #s-187	{ top: 64px;  left: 84px }
          #s-190	{ top: 33px;  left: 84px }
          #s-193	{ top: 2px;   left: 84px }

          #s-179	{ top: 157px; left: 2px }
          #s-182	{ top: 126px; left: 2px }
          #s-185	{ top: 95px;  left: 2px }
          #s-188	{ top: 64px;  left: 2px }
          #s-191	{ top: 33px;  left: 2px }
          #s-194	{ top: 2px;   left: 2px }

          /* Level +2 */
          #s-39	{ top: 157px; left: 289px }
          #s-42	{ top: 126px; left: 289px }
          #s-45	{ top: 95px;  left: 289px }
          #s-48	{ top: 64px;  left: 289px }
          #s-51	{ top: 33px;  left: 289px }
          #s-54	{ top: 2px;   left: 289px }

          #s-40	{ top: 157px; left: 248px }
          #s-43	{ top: 126px; left: 248px }
          #s-46	{ top: 95px;  left: 248px }
          #s-49	{ top: 64px;  left: 248px }
          #s-52	{ top: 33px;  left: 248px }
          #s-55	{ top: 2px;   left: 248px }
          
          #s-41	{ top: 157px; left: 166px }
          #s-44	{ top: 126px; left: 166px }
          #s-47	{ top: 95px;  left: 166px }
          #s-50	{ top: 64px;  left: 166px }
          #s-53	{ top: 33px;  left: 166px }
          #s-56	{ top: 2px;   left: 166px }

          #s-195	{ top: 157px; left: 125px }
          #s-198	{ top: 126px; left: 125px }
          #s-201	{ top: 95px;  left: 125px }
          #s-204	{ top: 64px;  left: 125px }
          #s-207	{ top: 33px;  left: 125px }
          #s-210	{ top: 2px;   left: 125px }

          #s-196	{ top: 157px; left: 84px }
          #s-199	{ top: 126px; left: 84px }
          #s-202	{ top: 95px;  left: 84px }
          #s-205	{ top: 64px;  left: 84px }
          #s-208	{ top: 33px;  left: 84px }
          #s-211	{ top: 2px;   left: 84px }

          #s-197	{ top: 157px; left: 2px }
          #s-200	{ top: 126px; left: 2px }
          #s-203	{ top: 95px;  left: 2px }
          #s-206	{ top: 64px;  left: 2px }
          #s-209	{ top: 33px;  left: 2px }
          #s-212	{ top: 2px;   left: 2px }

          /* Level +3 */
          #s-57	{ top: 157px; left: 289px }
          #s-60	{ top: 126px; left: 289px }
          #s-63	{ top: 95px;  left: 289px }
          #s-66	{ top: 64px;  left: 289px }
          #s-69	{ top: 33px;  left: 289px }
          #s-72	{ top: 2px;   left: 289px }

          #s-58	{ top: 157px; left: 248px }
          #s-61	{ top: 126px; left: 248px }
          #s-64	{ top: 95px;  left: 248px }
          #s-67	{ top: 64px;  left: 248px }
          #s-70	{ top: 33px;  left: 248px }
          #s-73	{ top: 2px;   left: 248px }
          
          #s-59	{ top: 157px; left: 166px }
          #s-62	{ top: 126px; left: 166px }
          #s-65	{ top: 95px;  left: 166px }
          #s-68	{ top: 64px;  left: 166px }
          #s-71	{ top: 33px;  left: 166px }
          #s-74	{ top: 2px;   left: 166px }

          #s-213	{ top: 157px; left: 125px }
          #s-216	{ top: 126px; left: 125px }
          #s-219	{ top: 95px;  left: 125px }
          #s-222	{ top: 64px;  left: 125px }
          #s-225	{ top: 33px;  left: 125px }
          #s-228	{ top: 2px;   left: 125px }

          #s-214	{ top: 157px; left: 84px }
          #s-217	{ top: 126px; left: 84px }
          #s-220	{ top: 95px;  left: 84px }
          #s-223	{ top: 64px;  left: 84px }
          #s-226	{ top: 33px;  left: 84px }
          #s-229	{ top: 2px;   left: 84px }

          #s-215	{ top: 157px; left: 2px }
          #s-218	{ top: 126px; left: 2px }
          #s-221	{ top: 95px;  left: 2px }
          #s-224	{ top: 64px;  left: 2px }
          #s-227	{ top: 33px;  left: 2px }
          #s-230	{ top: 2px;   left: 2px }

          /* Level +4 */
          #s-75	{ top: 157px; left: 289px }
          #s-78	{ top: 126px; left: 289px }
          #s-81	{ top: 95px;  left: 289px }
          #s-84	{ top: 64px;  left: 289px }
          #s-87	{ top: 33px;  left: 289px }
          #s-90	{ top: 2px;   left: 289px }

          #s-76	{ top: 157px; left: 248px }
          #s-79	{ top: 126px; left: 248px }
          #s-82	{ top: 95px;  left: 248px }
          #s-85	{ top: 64px;  left: 248px }
          #s-88	{ top: 33px;  left: 248px }
          #s-91	{ top: 2px;   left: 248px }
          
          #s-77	{ top: 157px; left: 166px }
          #s-80	{ top: 126px; left: 166px }
          #s-83	{ top: 95px;  left: 166px }
          #s-86	{ top: 64px;  left: 166px }
          #s-89	{ top: 33px;  left: 166px }
          #s-92	{ top: 2px;   left: 166px }

          #s-231	{ top: 157px; left: 125px }
          #s-234	{ top: 126px; left: 125px }
          #s-237	{ top: 95px;  left: 125px }
          #s-240	{ top: 64px;  left: 125px }
          #s-243	{ top: 33px;  left: 125px }
          #s-246	{ top: 2px;   left: 125px }

          #s-232	{ top: 157px; left: 84px }
          #s-235	{ top: 126px; left: 84px }
          #s-238	{ top: 95px;  left: 84px }
          #s-241	{ top: 64px;  left: 84px }
          #s-244	{ top: 33px;  left: 84px }
          #s-247	{ top: 2px;   left: 84px }

          #s-233	{ top: 157px; left: 2px }
          #s-236	{ top: 126px; left: 2px }
          #s-239	{ top: 95px;  left: 2px }
          #s-242	{ top: 64px;  left: 2px }
          #s-245	{ top: 33px;  left: 2px }
          #s-248	{ top: 2px;   left: 2px }

          /* Level +5 */
          #s-93	{ top: 157px; left: 289px }
          #s-96	{ top: 126px; left: 289px }
          #s-99	{ top: 95px;  left: 289px }
          #s-102	{ top: 64px;  left: 289px }
          #s-105	{ top: 33px;  left: 289px }
          #s-108	{ top: 2px;   left: 289px }

          #s-94	{ top: 157px; left: 248px }
          #s-97	{ top: 126px; left: 248px }
          #s-100	{ top: 95px;  left: 248px }
          #s-103	{ top: 64px;  left: 248px }
          #s-106	{ top: 33px;  left: 248px }
          #s-109	{ top: 2px;   left: 248px }
          
          #s-95	{ top: 157px; left: 166px }
          #s-98	{ top: 126px; left: 166px }
          #s-101	{ top: 95px;  left: 166px }
          #s-104	{ top: 64px;  left: 166px }
          #s-107	{ top: 33px;  left: 166px }
          #s-110	{ top: 2px;   left: 166px }

          #s-249	{ top: 157px; left: 125px }
          #s-252	{ top: 126px; left: 125px }
          #s-255	{ top: 95px;  left: 125px }
          #s-258	{ top: 64px;  left: 125px }
          #s-261	{ top: 33px;  left: 125px }
          #s-264	{ top: 2px;   left: 125px }

          #s-250	{ top: 157px; left: 84px }
          #s-253	{ top: 126px; left: 84px }
          #s-256	{ top: 95px;  left: 84px }
          #s-259	{ top: 64px;  left: 84px }
          #s-262	{ top: 33px;  left: 84px }
          #s-265	{ top: 2px;   left: 84px }

          #s-251	{ top: 157px; left: 2px }
          #s-254	{ top: 126px; left: 2px }
          #s-257	{ top: 95px;  left: 2px }
          #s-260	{ top: 64px;  left: 2px }
          #s-263	{ top: 33px;  left: 2px }
          #s-266	{ top: 2px;   left: 2px }

          /* Level +6 */
          #s-111	{ top: 157px; left: 289px }
          #s-114	{ top: 126px; left: 289px }
          #s-117	{ top: 95px;  left: 289px }
          #s-120	{ top: 64px;  left: 289px }
          #s-123	{ top: 33px;  left: 289px }
          #s-126	{ top: 2px;   left: 289px }

          #s-112	{ top: 157px; left: 248px }
          #s-115	{ top: 126px; left: 248px }
          #s-118	{ top: 95px;  left: 248px }
          #s-121	{ top: 64px;  left: 248px }
          #s-124	{ top: 33px;  left: 248px }
          #s-127	{ top: 2px;   left: 248px }
          
          #s-113	{ top: 157px; left: 166px }
          #s-116	{ top: 126px; left: 166px }
          #s-119	{ top: 95px;  left: 166px }
          #s-122	{ top: 64px;  left: 166px }
          #s-125	{ top: 33px;  left: 166px }
          #s-128	{ top: 2px;   left: 166px }

          #s-267	{ top: 157px; left: 125px }
          #s-270	{ top: 126px; left: 125px }
          #s-273	{ top: 95px;  left: 125px }
          #s-276	{ top: 64px;  left: 125px }
          #s-279	{ top: 33px;  left: 125px }
          #s-282	{ top: 2px;   left: 125px }

          #s-268	{ top: 157px; left: 84px }
          #s-271	{ top: 126px; left: 84px }
          #s-274	{ top: 95px;  left: 84px }
          #s-277	{ top: 64px;  left: 84px }
          #s-280	{ top: 33px;  left: 84px }
          #s-283	{ top: 2px;   left: 84px }

          #s-269	{ top: 157px; left: 2px }
          #s-272	{ top: 126px; left: 2px }
          #s-275	{ top: 95px;  left: 2px }
          #s-278	{ top: 64px;  left: 2px }
          #s-281	{ top: 33px;  left: 2px }
          #s-284	{ top: 2px;   left: 2px }

          /* Level +7 */
          #s-129	{ top: 157px; left: 289px }
          #s-132	{ top: 126px; left: 289px }
          #s-135	{ top: 95px;  left: 289px }
          #s-138	{ top: 64px;  left: 289px }
          #s-141	{ top: 33px;  left: 289px }
          #s-144	{ top: 2px;   left: 289px }

          #s-130	{ top: 157px; left: 248px }
          #s-133	{ top: 126px; left: 248px }
          #s-136	{ top: 95px;  left: 248px }
          #s-139	{ top: 64px;  left: 248px }
          #s-142	{ top: 33px;  left: 248px }
          #s-145	{ top: 2px;   left: 248px }
          
          #s-131	{ top: 157px; left: 166px }
          #s-134	{ top: 126px; left: 166px }
          #s-137	{ top: 95px;  left: 166px }
          #s-140	{ top: 64px;  left: 166px }
          #s-143	{ top: 33px;  left: 166px }
          #s-146	{ top: 2px;   left: 166px }

          #s-285	{ top: 157px; left: 125px }
          #s-288	{ top: 126px; left: 125px }
          #s-291	{ top: 95px;  left: 125px }
          #s-294	{ top: 64px;  left: 125px }
          #s-297	{ top: 33px;  left: 125px }
          #s-300	{ top: 2px;   left: 125px }

          #s-286	{ top: 157px; left: 84px }
          #s-289	{ top: 126px; left: 84px }
          #s-292	{ top: 95px;  left: 84px }
          #s-295	{ top: 64px;  left: 84px }
          #s-298	{ top: 33px;  left: 84px }
          #s-301	{ top: 2px;   left: 84px }

          #s-287	{ top: 157px; left: 2px }
          #s-290	{ top: 126px; left: 2px }
          #s-293	{ top: 95px;  left: 2px }
          #s-296	{ top: 64px;  left: 2px }
          #s-299	{ top: 33px;  left: 2px }
          #s-302	{ top: 2px;   left: 2px }

          /* Level +8 */
          #s-147	{ top: 157px; left: 289px }
          #s-150	{ top: 126px; left: 289px }
          #s-153	{ top: 95px;  left: 289px }
          #s-156	{ top: 64px;  left: 289px }
          #s-159	{ top: 33px;  left: 289px }
          #s-162	{ top: 2px;   left: 289px }

          #s-148	{ top: 157px; left: 248px }
          #s-151	{ top: 126px; left: 248px }
          #s-154	{ top: 95px;  left: 248px }
          #s-157	{ top: 64px;  left: 248px }
          #s-160	{ top: 33px;  left: 248px }
          #s-163	{ top: 2px;   left: 248px }
          
          #s-149	{ top: 157px; left: 166px }
          #s-152	{ top: 126px; left: 166px }
          #s-155	{ top: 95px;  left: 166px }
          #s-158	{ top: 64px;  left: 166px }
          #s-161	{ top: 33px;  left: 166px }
          #s-164	{ top: 2px;   left: 166px }

          #s-303	{ top: 157px; left: 125px }
          #s-306	{ top: 126px; left: 125px }
          #s-309	{ top: 95px;  left: 125px }
          #s-312	{ top: 64px;  left: 125px }
          #s-315	{ top: 33px;  left: 125px }
          #s-318	{ top: 2px;   left: 125px }

          #s-304	{ top: 157px; left: 84px }
          #s-307	{ top: 126px; left: 84px }
          #s-310	{ top: 95px;  left: 84px }
          #s-313	{ top: 64px;  left: 84px }
          #s-316	{ top: 33px;  left: 84px }
          #s-319	{ top: 2px;   left: 84px }

          #s-305	{ top: 157px; left: 2px }
          #s-308	{ top: 126px; left: 2px }
          #s-311	{ top: 95px;  left: 2px }
          #s-314	{ top: 64px;  left: 2px }
          #s-317	{ top: 33px;  left: 2px }
          #s-320	{ top: 2px;   left: 2px }
        `}</style>
      </Layout>
    )
  }
}

export default withAuthSync(AppUi)
