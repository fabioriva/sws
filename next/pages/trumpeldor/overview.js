import { Row, Col } from 'antd'
import * as def from 'src/constants/trumpeldor'
import { VALET } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import AppUi from '/src/templates/overview'

const MainView = ({ devices, exitQueue }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={12} lg={12} xl={{ span: 8, offset: 4 }}>
        { devices[0] }
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={{ span: 8, offset: 0 }}>
        { exitQueue }
      </Col>
    </Row>
  )
}

export default withAuthSync(AppUi(def, VALET, MainView))

// import React from 'react'
// import Layout from 'src/components/Layout'
// import Device from 'src/components/Device'
// import Queue from 'src/components/ExitQueue'
// import Operation from 'src/components/OperationModal'
// import { Row, Col } from 'antd'
// import { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL, CARDS } from 'src/constants/trumpeldor'
// import { VALET } from 'src/constants/roles'
// import nextCookie from 'next-cookies'
// import withAuth from 'src/lib/withAuth'

// class AppUi extends React.Component {
//   static async getInitialProps (ctx) {
//     const props = {
//       activeItem: '1',
//       pageRole: VALET
//     }
//     // check if diagnostic is active
//     const { diagnostic } = nextCookie(ctx)
//     if (diagnostic) {
//       const res = await fetch(`${BACKEND_URL}/aps/${APS}/diagnostic?id=${diagnostic}`)
//       if (res.ok) {
//         const json = await res.json()
//         return {
//           ...props,
//           diagnostic: diagnostic,
//           overview: json.overview
//         }
//       }
//     }
//     // if diagnostic is not active fetch data
//     const res = await fetch(`${BACKEND_URL}/aps/${APS}/overview`)
//     const json = await res.json()
//     return {
//       ...props,
//       overview: json  // json.data.overview
//     }
//   }
//   constructor (props) {
//     super(props)
//     this.state = {
//       isFetching: true,
//       overview: props.overview,
//       operationModal: {
//         card: {
//           min: 1,
//           max: CARDS,
//           value: 0
//         },
//         operationId: {
//           value: 0
//         },
//         visible: false
//       }
//     }
//   }
//   componentDidMount () {
//     const { diagnostic } = this.props
//     this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
//     this.ws.onerror = e => console.log(e)
//     this.ws.onmessage = e => {
//       const data = JSON.parse(e.data)
//       Object.keys(data).forEach((key) => {
//         if (!diagnostic && key === 'overview') {
//           this.setState({
//             isFetching: false,
//             overview: data[key]
//           })
//         }
//       })
//     }
//   }
//   componentWillUnmount () {
//     this.ws.close()
//   }
//   showOperationModal = (operationId) => {
//     this.setState({
//       operationModal: {
//         card: {
//           value: 0
//         },
//         operationId: {
//           value: operationId, // 0=Exit, 1=Entry 1, 2=Entry 2
//         },
//         visible: true
//       }
//     })
//   }
//   handleCancel = (e) => {
//     this.setState({
//       operationModal: {
//         card: {
//           value: 0
//         },
//         operationId: {
//           value: 0
//         },
//         visible: false
//       }
//     })
//   }
//   handleChange = (fields) => {
//     this.setState({
//       operationModal: {
//         ...this.state.operationModal, ...fields
//       }
//     })
//   }
//   handleConfirm = (card, operationId) => {
//     this.setState({
//       operationModal: {
//         card: {
//           value: 0
//         },
//         operationId: {
//           value: 0
//         },
//         visible: false
//       }
//     })
//     this.ws.send(
//       JSON.stringify({
//         event: 'overview-operation',
//         data: {
//           operation: operationId,
//           value: card
//         }
//       })
//     )
//   }
//   handleRollback = (system) => {
//     confirm(system, this.ws)
//   }
//   render () {
//     const { devices, exitQueue } = this.state.overview
//     return (
//       <Layout
//         aps={APS_TITLE}
//         pageTitle='Operations'
//         sidebarMenu={SIDEBAR_MENU}
//         socket={`${WEBSOCK_URL}?channel=ch2`}
//       >
//         <Row gutter={16}>
//           <Col  xs={24} sm={24} md={12} lg={12} xl={{ span: 8, offset: 4 }}>
//             <Device device={devices[0]} />
//           </Col>
//           <Col  xs={24} sm={24} md={12} lg={12} xl={{ span: 8, offset: 0 }}>
//             <Queue
//               exitQueue={exitQueue}
//               showModal={this.showOperationModal}
//             />
//           </Col>
//         </Row>
//         <Operation
//           data={this.state.operationModal}
//           onCancel={this.handleCancel}
//           onChange={this.handleChange}
//           onConfirm={this.handleConfirm}
//         />
//       </Layout>
//     )
//   }
// }

// export default withAuth(AppUi) // , VALET)
