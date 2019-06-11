import * as def from 'src/constants/muse'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'
import AppUi from '/src/templates/alarms'

export default withAuth(AppUi(def, SERVICE))

// import React from 'react'
// import fetch from 'isomorphic-unfetch'
// import Layout from 'src/components/Layout'
// import { Alert, Badge, Button, Tabs } from 'antd'
// import { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/muse'
// import { SERVICE } from 'src/constants/roles'
// import withAuth from 'src/lib/withAuth'

// const Alarm = (props) => {
//   const { a } = props
//   const clearBtn = a.cancel !== 0 && <Button type='danger' ghost className='alarm-clear-btn' icon='delete' onClick={this.alarmClear}>Clear</Button>
//   return (
//     <Alert
//       className='alarm-alert'
//       type='error'
//       message={<span>{a.class}&nbsp;{a.label}</span>}
//       description={<span>{a.date}&nbsp;{a.info}{clearBtn}</span>}
//       showIcon
//     />
//   )
// }

// const Ready = (props) => {
//   return (
//     <Alert
//       type='success'
//       message={props.label}
//       description='System Ready'
//       showIcon
//     />
//   )
// }

// class AppUi extends React.Component {
//   static async getInitialProps () {
//     const props = {
//       activeItem: '5',
//       pageRole: SERVICE
//     }
//     const res = await fetch(`${BACKEND_URL}/aps/${APS}/alarms`)
//     const json = await res.json()
//     return {
//       ...props,
//       alarms: json  //.alarms
//     }
//   }
//   constructor (props) {
//     super(props)
//     this.state = {
//       isFetching: true,
//       alarms: props.alarms
//     }
//   }
//   componentDidMount () {
//     this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
//     this.ws.onerror = e => console.log(e)
//     this.ws.onmessage = e => {
//       const data = JSON.parse(e.data)
//       Object.keys(data).forEach((key) => {
//         if (key === 'alarms') {
//           this.setState({
//             isFetching: false,
//             alarms: data[key]
//           })
//         }
//       })
//     }
//   }
//   componentWillUnmount () {
//     this.ws.close()
//   }
//   handleData = (data) => {
//     this.setState({
//       isFetching: false,
//       alarms: data.alarms
//     })
//   }
//   render () {
//     const { alarms } = this.state
//     const tabEL1 = <Badge count={alarms.groups[0].count}><span style={{ padding: 12 }}>Elevator 1</span></Badge>
//     const alarmsEL1 = alarms.groups[0].active.map((a, i) => {
//       return <Alarm a={a} key={i} />
//     })
//     const tabEL2 = <Badge count={alarms.groups[1].count}><span style={{ padding: 12 }}>Elevator 2</span></Badge>
//     const alarmsEL2 = alarms.groups[1].active.map((a, i) => {
//       return <Alarm a={a} key={i} />
//     })
//     const tabEL3 = <Badge count={alarms.groups[2].count}><span style={{ padding: 12 }}>Elevator 3</span></Badge>
//     const alarmsEL3 = alarms.groups[2].active.map((a, i) => {
//       return <Alarm a={a} key={i} />
//     })
//     const tabEL4 = <Badge count={alarms.groups[3].count}><span style={{ padding: 12 }}>Elevator 4</span></Badge>
//     const alarmsEL4 = alarms.groups[3].active.map((a, i) => {
//       return <Alarm a={a} key={i} />
//     })
//     return (
//       <Layout
//         aps={APS_TITLE}
//         pageTitle='System Alarms'
//         sidebarMenu={SIDEBAR_MENU}
//         socket={`${WEBSOCK_URL}?channel=ch2`}
//       >
//         <Tabs type='card'>
//           <Tabs.TabPane tab={tabEL1} key='1'>{alarmsEL1.length > 0 ? alarmsEL1 : <Ready label='Elevator 1' />}</Tabs.TabPane>
//           <Tabs.TabPane tab={tabEL2} key='2'>{alarmsEL2.length > 0 ? alarmsEL2 : <Ready label='Elevator 2' />}</Tabs.TabPane>
//           <Tabs.TabPane tab={tabEL3} key='3'>{alarmsEL3.length > 0 ? alarmsEL3 : <Ready label='Elevator 3' />}</Tabs.TabPane>
//           <Tabs.TabPane tab={tabEL4} key='4'>{alarmsEL4.length > 0 ? alarmsEL4 : <Ready label='Elevator 4' />}</Tabs.TabPane>
//         </Tabs>
//         <style jsx global>{`
//           .alarm-alert {
//             margin-bottom: 8px;
//           }
//         `}</style>
//       </Layout>
//     )
//   }
// }

// export default withAuth(AppUi)
