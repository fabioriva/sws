import { Row, Col } from 'antd'
import * as def from 'src/constants/longmatan'
import { VALET } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'
import AppUi from '/src/templates/overview'

const MainView = ({ devices, exitQueue }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={16} xl={16}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            { devices[0] }
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            { devices[1] }
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            { devices[2] }
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            { devices[3] }
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        { exitQueue }
      </Col>
    </Row>
  )
}

export default withAuth(AppUi(def, VALET, MainView))

// import React from 'react'
// import Layout from 'src/components/Layout'
// import Device from 'src/components/Device'
// import Queue from 'src/components/ExitQueue'
// import Operation from 'src/components/OperationModal'
// import { Row, Col } from 'antd'
// import { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL, CARDS } from 'src/constants/longmatan'
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
//               <Col  xs={24} sm={24} md={24} lg={16} xl={16}>
//                 <Row gutter={16}>
//                   <Col  xs={24} sm={24} md={24} lg={12} xl={12}>
//                     <Device
//                       device={devices[0]}
//                       actions={[
//                         this.showOperationModal,
//                         this.handleRollback
//                       ]}
//                     />
//                   </Col>
//                   <Col  xs={24} sm={24} md={24} lg={12} xl={12}>
//                     <Device
//                       device={devices[1]}
//                       actions={[
//                         this.showOperationModal,
//                         this.handleRollback
//                       ]}
//                     />
//                   </Col>
//                 </Row>
//                 <Row gutter={16}>
//                   <Col  xs={24} sm={24} md={24} lg={12} xl={12}>
//                     <Device
//                       device={devices[2]}
//                       actions={[
//                         this.showOperationModal,
//                         this.handleRollback
//                       ]}
//                     />
//                   </Col>
//                   <Col  xs={24} sm={24} md={24} lg={12} xl={12}>
//                     <Device
//                       device={devices[3]}
//                       actions={[
//                         this.showOperationModal,
//                         this.handleRollback
//                       ]}
//                     />
//                   </Col>
//                 </Row>
//               </Col>
//               <Col  xs={24} sm={24} md={24} lg={8} xl={8}>
//                 <Queue
//                     exitQueue={exitQueue}
//                     showModal={this.showOperationModal}
//                   />
//               </Col>
//             </Row>
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
