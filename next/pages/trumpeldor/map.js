import React from 'react'
import Layout from 'src/components/Layout'
// import MapList from 'src/components/MapList'
import Level from 'src/components/MapLevel'
import Edit from 'src/components/MapEdit'
import Occupancy from 'src/components/MapOccupancy'
import { Row, Col, Radio } from 'antd'
import { Mobile, Default } from 'src/constants/mediaQueries'
import { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/trumpeldor'
import { CARDS, STALLS, STALL_STATUS } from 'src/constants/trumpeldor'
import { SERVICE, VALET } from 'src/constants/roles'
import parseCookies from 'src/lib/parseCookies'
import withAuth from 'src/lib/withAuth'

class AppUi extends React.Component {
  static async getInitialProps (ctx) {
    ctx.store.dispatch({ type: 'UI_SIDEBAR_SET_MENU', item: '2' })
    // check if diagnostic is active
    const { diagnostic } = parseCookies(ctx)
    ctx.store.dispatch({ type: 'UI_NAVBAR_SET_DIAG', status: diagnostic })
    if (diagnostic) {
      const res = await fetch(`${BACKEND_URL}/aps/${APS}/diagnostic?id=${diagnostic}`)
      const json = await res.json()
      return {
        diagnostic: diagnostic,
        map: json.map, // setStallLabel(json.map, 'SHOW_NUMBERS'),
        occupancy: json.map.statistics[0]
      }
    }
    // if diagnostic is not active fetch data
    const res = await fetch(`${BACKEND_URL}/aps/${APS}/map`)
    const statusCode = res.statusCode > 200 ? res.statusCode : false
    const json = await res.json()
    const map = json  // JSON.parse(json)
    return {
      statusCode,
      map: map, // setStallLabel(map, 'SHOW_NUMBERS'),
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
        if (key === 'comm') this.setState({ comm: data[key] })
        if (key === 'diag') this.setState({ diag: data[key] })
        if (key === 'mesg') openNotification(data[key])
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
  
    // if (this.props.message.roles.find(e => e === 'service' || e === 'admin')) {
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
    // console.log('handleChange', stall, card)
    this.setState({
      editModal: {
        stall: stall,
        value: card,
        visible: true
      }
    })
  }
  handleMapOk = (stall, card) => {
    // console.log('handleOk', stall, card)
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
    console.log('onRadioChange', e.target.value)
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
              {/* <div>{levels[3]}</div> */}
              <div>{levels[2]}</div>
              <div>{levels[1]}</div>
              <div>{levels[0]}</div>
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
              <h3>Map Occupancy</h3>
              <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '6px', margin: '16px 0', padding: '16px' }}>
                <Occupancy data={occupancy} />
            </div>
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
      </Layout>
    )
  }
}

export default withAuth(AppUi, VALET)
