import React from 'react'
import Layout from 'src/components/Layout'
// import MapList from 'src/components/MapList'
import Level from 'src/components/MapLevel'
import Edit from 'src/components/MapEdit'
import Occupancy from 'src/components/MapOccupancy'
import { Row, Col, Radio } from 'antd'
import { Mobile, Default } from 'src/constants/mediaQueries'
import { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/muse'
import { CARDS, STALLS, STALL_STATUS } from 'src/constants/muse'
import { SERVICE, VALET } from 'src/constants/roles'
import parseCookies from 'src/lib/parseCookies'
import withAuth from 'src/lib/withAuth'

class AppUi extends React.Component {
  static async getInitialProps (ctx) {
    ctx.store.dispatch({type: 'UI_SIDEBAR_SET_MENU', item: '2'})
    // check if diagnostic is active
    const { diagnostic } = parseCookies(ctx)
    ctx.store.dispatch({ type: 'UI_NAVBAR_SET_DIAG', status: diagnostic })
    if (diagnostic) {
      const res = await fetch(`${BACKEND_URL}/aps/${APS}/diagnostic?id=${diagnostic}`)
      const json = await res.json()
      return {
        diagnostic: diagnostic,
        map: json.map,
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
    this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
    this.ws.onerror = e => console.log(e)
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      Object.keys(data).forEach((key) => {
        if (key === 'map') {
          const { map } = data
          this.setState({
            isFetching: false,
            map: map,
            occupancy: map.statistics[0]
          })
        }
      })
    }
  }
  componentWillUnmount () {
    this.ws.close()
  }
  // Map Modal
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
      visibilityFilter: e.target.value
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
        pageTitle='Map'
        sidebarMenu={SIDEBAR_MENU}
        socket={`${WEBSOCK_URL}?channel=ch2`}
      >
        <Mobile>
          {/* <div id='#top'>
            <a href='#level-1'>[G1]</a>
            <a href='#level-5'>[G5]</a>
            <a href='#level-10'>[G10]</a>
            <a href='#level-15'>[G15]</a>
            <a href='#level-20'>[G20]</a>
            <a href='#level-25'>[G25]</a>
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
            <Col xs={24} sm={24} md={24} lg={24} xl={18}>
              <div>
                <Row type='flex' justify='center' style={{ marginBottom: 16 }}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[0]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[1]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[2]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[3]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[4]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[5]}</Col>
                </Row>
                <Row type='flex' justify='center' style={{ marginBottom: 16 }}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[6]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[7]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[8]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[9]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[10]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[11]}</Col>
                </Row>
                <Row type='flex' justify='center' style={{ marginBottom: 16 }}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[12]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[13]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[14]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[15]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[16]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[17]}</Col>
                </Row>
                <Row type='flex' justify='center' style={{ marginBottom: 16 }}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[18]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[19]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[20]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[21]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[22]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[23]}</Col>
                </Row>
                <Row type='flex' justify='center' style={{ marginBottom: 16 }}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[24]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>{levels[25]}</Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}></Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}></Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}></Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}></Col>
                </Row>
                <Row type='flex' justify='start' style={{ marginBottom: 16 }}>
                <Radio.Group onChange={this.onRadioChange} value={visibilityFilter}>
                  <Radio value={'SHOW_NUMBERS'}>
                    Numbers
                  </Radio>
                  <Radio value={'SHOW_CARDS'}>
                    Cards
                  </Radio>
                  <Radio value={'SHOW_SIZES'}>
                    Sizes
                  </Radio>
                </Radio.Group>
                </Row>
                <Edit
                  cards={CARDS}
                  stalls={STALLS}
                  stallStatus={STALL_STATUS}
                  data={editModal}
                  onCancel={this.handleMapCancel}
                  onChange={this.handleMapChange}
                  onConfirm={this.handleMapOk}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
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
            height: 100px;
            width: 169px;
          
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
          #el-1 { top: 33px; left: 2px; }
          #el-2 { top: 33px; left: 125px; }
          /* Basement -2 */
          #s-1 { top: 66px; left: 2px }
          #s-2 { top: 2px; left: 2px }
          #s-3 { top: 66px; left: 43px }
          #s-4 { top: 2px; left: 43px }
          #s-5 { top: 66px; left: 84px }
          #s-6 { top: 2px; left: 84px }
          #s-7 { top: 66px; left: 125px }
          #s-8 { top: 2px; left: 125px }
          #s-9 { top: 66px; left: 2px }
          #s-10 { top: 2px; left: 2px }
          #s-11 { top: 66px; left: 43px }
          #s-12 { top: 2px; left: 43px }
          #s-13 { top: 66px; left: 84px }
          #s-14 { top: 2px; left: 84px }
          #s-15 { top: 66px; left: 125px }
          #s-16 { top: 2px; left: 125px }
          #s-17 { top: 66px; left: 2px }
          #s-18 { top: 2px; left: 2px }
          #s-19 { top: 66px; left: 43px }
          #s-20 { top: 2px; left: 43px }
          #s-21 { top: 66px; left: 84px }
          #s-22 { top: 2px; left: 84px }
          #s-23 { top: 66px; left: 125px }
          #s-24 { top: 2px; left: 125px }
          #s-25 { top: 66px; left: 2px }
          #s-26 { top: 2px; left: 2px }
          #s-27 { top: 66px; left: 43px }
          #s-28 { top: 2px; left: 43px }
          #s-29 { top: 66px; left: 84px }
          #s-30 { top: 2px; left: 84px }
          #s-31 { top: 66px; left: 125px }
          #s-32 { top: 2px; left: 125px }
          #s-33 { top: 66px; left: 2px }
          #s-34 { top: 2px; left: 2px }
          #s-35 { top: 66px; left: 43px }
          #s-36 { top: 2px; left: 43px }
          #s-37 { top: 66px; left: 84px }
          #s-38 { top: 2px; left: 84px }
          #s-39 { top: 66px; left: 125px }
          #s-40 { top: 2px; left: 125px }
          #s-41 { top: 66px; left: 2px }
          #s-42 { top: 2px; left: 2px }
          #s-43 { top: 66px; left: 43px }
          #s-44 { top: 2px; left: 43px }
          #s-45 { top: 66px; left: 84px }
          #s-46 { top: 2px; left: 84px }
          #s-47 { top: 66px; left: 125px }
          #s-48 { top: 2px; left: 125px }
          #s-49 { top: 66px; left: 2px }
          #s-50 { top: 2px; left: 2px }
          #s-51 { top: 66px; left: 43px }
          #s-52 { top: 2px; left: 43px }
          #s-53 { top: 66px; left: 84px }
          #s-54 { top: 2px; left: 84px }
          #s-55 { top: 66px; left: 125px }
          #s-56 { top: 2px; left: 125px }
          #s-57 { top: 66px; left: 2px }
          #s-58 { top: 2px; left: 2px }
          #s-59 { top: 66px; left: 43px }
          #s-60 { top: 2px; left: 43px }
          #s-61 { top: 66px; left: 84px }
          #s-62 { top: 2px; left: 84px }
          #s-63 { top: 66px; left: 125px }
          #s-64 { top: 2px; left: 125px }
          #s-65 { top: 66px; left: 2px }
          #s-66 { top: 2px; left: 2px }
          #s-67 { top: 66px; left: 43px }
          #s-68 { top: 2px; left: 43px }
          #s-69 { top: 66px; left: 84px }
          #s-70 { top: 2px; left: 84px }
          #s-71 { top: 66px; left: 125px }
          #s-72 { top: 2px; left: 125px }
          #s-73 { top: 66px; left: 2px }
          #s-74 { top: 2px; left: 2px }
          #s-75 { top: 66px; left: 43px }
          #s-76 { top: 2px; left: 43px }
          #s-77 { top: 66px; left: 84px }
          #s-78 { top: 2px; left: 84px }
          #s-79 { top: 66px; left: 125px }
          #s-80 { top: 2px; left: 125px }
          #s-81 { top: 66px; left: 2px }
          #s-82 { top: 2px; left: 2px }
          #s-83 { top: 66px; left: 43px }
          #s-84 { top: 2px; left: 43px }
          #s-85 { top: 66px; left: 84px }
          #s-86 { top: 2px; left: 84px }
          #s-87 { top: 66px; left: 125px }
          #s-88 { top: 2px; left: 125px }
          #s-89 { top: 66px; left: 2px }
          #s-90 { top: 2px; left: 2px }
          #s-91 { top: 66px; left: 43px }
          #s-92 { top: 2px; left: 43px }
          #s-93 { top: 66px; left: 84px }
          #s-94 { top: 2px; left: 84px }
          #s-95 { top: 66px; left: 125px }
          #s-96 { top: 2px; left: 125px }
          #s-97 { top: 66px; left: 2px }
          #s-98 { top: 2px; left: 2px }
          #s-99 { top: 66px; left: 43px }
          #s-100 { top: 2px; left: 43px }
          #s-101 { top: 66px; left: 84px }
          #s-102 { top: 2px; left: 84px }
          #s-103 { top: 66px; left: 125px }
          #s-104 { top: 2px; left: 125px }
          #s-105 { top: 66px; left: 2px }
          #s-106 { top: 2px; left: 2px }
          #s-107 { top: 66px; left: 43px }
          #s-108 { top: 2px; left: 43px }
          #s-109 { top: 66px; left: 84px }
          #s-110 { top: 2px; left: 84px }
          #s-111 { top: 66px; left: 125px }
          #s-112 { top: 2px; left: 125px }
          #s-113 { top: 66px; left: 2px }
          #s-114 { top: 2px; left: 2px }
          #s-115 { top: 66px; left: 43px }
          #s-116 { top: 2px; left: 43px }
          #s-117 { top: 66px; left: 84px }
          #s-118 { top: 2px; left: 84px }
          #s-119 { top: 66px; left: 125px }
          #s-120 { top: 2px; left: 125px }
          #s-121 { top: 66px; left: 2px }
          #s-122 { top: 2px; left: 2px }
          #s-123 { top: 66px; left: 43px }
          #s-124 { top: 2px; left: 43px }
          #s-125 { top: 66px; left: 84px }
          #s-126 { top: 2px; left: 84px }
          #s-127 { top: 66px; left: 125px }
          #s-128 { top: 2px; left: 125px }
          #s-129 { top: 66px; left: 2px }
          #s-130 { top: 2px; left: 2px }
          #s-131 { top: 66px; left: 43px }
          #s-132 { top: 2px; left: 43px }
          #s-133 { top: 66px; left: 84px }
          #s-134 { top: 2px; left: 84px }
          #s-135 { top: 66px; left: 125px }
          #s-136 { top: 2px; left: 125px }
          #s-137 { top: 66px; left: 2px }
          #s-138 { top: 2px; left: 2px }
          #s-139 { top: 66px; left: 43px }
          #s-140 { top: 2px; left: 43px }
          #s-141 { top: 66px; left: 84px }
          #s-142 { top: 2px; left: 84px }
          #s-143 { top: 66px; left: 125px }
          #s-144 { top: 2px; left: 125px }
          #s-145 { top: 66px; left: 2px }
          #s-146 { top: 2px; left: 2px }
          #s-147 { top: 66px; left: 43px }
          #s-148 { top: 2px; left: 43px }
          #s-149 { top: 66px; left: 84px }
          #s-150 { top: 2px; left: 84px }
          #s-151 { top: 66px; left: 125px }
          #s-152 { top: 2px; left: 125px }
          #s-153 { top: 66px; left: 2px }
          #s-154 { top: 2px; left: 2px }
          #s-155 { top: 66px; left: 43px }
          #s-156 { top: 2px; left: 43px }
          #s-157 { top: 66px; left: 84px }
          #s-158 { top: 2px; left: 84px }
          #s-159 { top: 66px; left: 125px }
          #s-160 { top: 2px; left: 125px }
          #s-161 { top: 66px; left: 2px }
          #s-162 { top: 2px; left: 2px }
          #s-163 { top: 66px; left: 43px }
          #s-164 { top: 2px; left: 43px }
          #s-165 { top: 66px; left: 84px }
          #s-166 { top: 2px; left: 84px }
          #s-167 { top: 66px; left: 125px }
          #s-168 { top: 2px; left: 125px }
          #s-169 { top: 66px; left: 2px }
          #s-170 { top: 2px; left: 2px }
          #s-171 { top: 66px; left: 43px }
          #s-172 { top: 2px; left: 43px }
          #s-173 { top: 66px; left: 84px }
          #s-174 { top: 2px; left: 84px }
          #s-175 { top: 66px; left: 125px }
          #s-176 { top: 2px; left: 125px }
          #s-177 { top: 66px; left: 2px }
          #s-178 { top: 2px; left: 2px }
          #s-179 { top: 66px; left: 43px }
          #s-180 { top: 2px; left: 43px }
          #s-181 { top: 66px; left: 84px }
          #s-182 { top: 2px; left: 84px }
          #s-183 { top: 66px; left: 125px }
          #s-184 { top: 2px; left: 125px }
          #s-185 { top: 66px; left: 2px }
          #s-186 { top: 2px; left: 2px }
          #s-187 { top: 66px; left: 43px }
          #s-188 { top: 2px; left: 43px }
          #s-189 { top: 66px; left: 84px }
          #s-190 { top: 2px; left: 84px }
          #s-191 { top: 66px; left: 125px }
          #s-192 { top: 2px; left: 125px }
          #s-193 { top: 66px; left: 2px }
          #s-194 { top: 2px; left: 2px }
          #s-195 { top: 66px; left: 43px }
          #s-196 { top: 2px; left: 43px }
          #s-197 { top: 66px; left: 84px }
          #s-198 { top: 2px; left: 84px }
          #s-199 { top: 66px; left: 125px }
          #s-200 { top: 2px; left: 125px }
          #s-201 { top: 66px; left: 2px }
          #s-202 { top: 2px; left: 2px }
          #s-203 { top: 66px; left: 43px }
          #s-204 { top: 2px; left: 43px }
          #s-205 { top: 66px; left: 84px }
          #s-206 { top: 2px; left: 84px }
          #s-207 { top: 66px; left: 125px }
          #s-208 { top: 2px; left: 125px }
        `}</style>
      </Layout>
    )
  }
}

// export default compose(withAuth(withRedux(initStore, null)(AppUi)))
export default withAuth(AppUi, VALET)
