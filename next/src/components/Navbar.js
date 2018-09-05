import React, { Component } from 'react'
import Link from 'next/link'
import cookie from 'cookie'
// import moment from 'moment'
import redirect from 'src/lib/redirect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sidebarToggle } from 'src/store'
import { Layout, Badge, Icon, Tag, Tooltip, notification } from 'antd'
const { Header } = Layout


// const openNotification = (mesg) => {
//   var message = `${mesg.device}`
//   var description = `${moment(mesg.date).format('YYYY-MM-DD HH:mm:ss')} `
//   switch (mesg.operationId) {
//     case 1:
//     case 2:
//       description += `${mesg.operation} Id ${mesg.alarm}`
//       break
//     case 3:
//       description += `${mesg.operation} >> ${mesg.mode}`
//       break
//     case 4:
//       description += `${mesg.operation} >> ${mesg.card}`
//       break
//     case 5:
//     case 6:
//     case 7:
//     case 8:
//       description += `${mesg.operation} stall ${mesg.stall} card ${mesg.card}`
//       break
//     default:
//       description.substring(-1)
//       break
//   }
//   notification.open({
//     message: message,
//     description: description,
//   })
// }

class Navbar extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     comm: { isOnline: false },
  //     diag: { alarmCount: 0 },
  //     mesg: { log: '' }
  //   }
  // }
  componentDidMount () {
    // ws
    // this.ws = new WebSocket('wss://www.sotefinservice.com/ws/demo')
    // this.ws.onerror = e => console.log(e)
    // this.ws.onmessage = e => {
    //   const data = JSON.parse(e.data)
    //   const eventName = Object.keys(data)[0]
    //   // if (eventName === 'comm') {
    //   //   this.handleComm(data)
    //   // }
    //   if (eventName === 'diag') {
    //     this.handleDiag(data)
    //   }
    //   if (eventName === 'mesg') {
    //     this.handleMesg(data)
    //   }
    // }
  }
  componentWillUnmount () {
    // ws
    // this.ws.close()
  }
  // handleComm = (data) => {
  //   const { comm } = data
  //   this.setState({
  //     comm: comm
  //   })
  // }
  // handleDiag = (data) => {
  //   const { diag } = data
  //   this.setState({
  //     diag: diag
  //   })
  // }
  // handleMesg = (message) => {
  //   console.log('mesg', message)
  //   const { mesg } = message    
  //   openNotification(mesg)
  // }
  signout = () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: 0 // 0= Delete cookie / -1= Expire the cookie immediately
    })
    // document.cookie = cookie.serialize('user', '', {
    //   maxAge: 0 // 0= Delete cookie / -1= Expire the cookie immediately
    // })
    // document.cookie = cookie.serialize('userContext', '', {
    //   maxAge: 0 // 0= Delete cookie / -1= Expire the cookie immediately
    // })
    redirect({}, '/')
  }
  render () {
    const comm = this.props.comm  // this.state.comm
    const commStatus = comm.isOnline ? <Tag color='#87d068'>ONLINE</Tag> : <Tag color='#f50'>OFFLINE</Tag>
    const commInfo = comm.isOnline ? <span>PLC {comm.ip} ONLINE</span> : <span>PLC OFFLINE</span>
    const diag = this.props.diag  // this.state.diag
    const { user } = this.props.navbar
    const { collapsed } = this.props.sidebar
    return (
      <Header className='app-navbar'>
        <Icon
          className='app-navbar-trigger'
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={() => this.props.sidebarToggle(!collapsed)}
        />
        <div className='app-navbar-right'>
          <span className='app-navbar-element'>
            <Badge count={diag.alarmCount}>
              <Link href='/muse/alarms'>
                <Icon className='app-navbar-icon' type='bell' />
              </Link>
            </Badge>
          </span>
          <span className='app-navbar-element'>
            <Tooltip title={'Sign out'}>
              <Icon className='app-navbar-icon' type='user' onClick={this.signout} />
            </Tooltip>
          </span>
          <span className='app-navbar-comm'>
            { commStatus }
          </span>
        </div>
        <style jsx global>{`
          .ant-layout-header {
            padding: 0 12px 0 0!important;
            background: #fff!important;
            // box-shadow: 0 2px 4px #fcfbfb!important;
            position: relative!important;
          }
          .app-navbar {
            padding: 0 12px 0 0;
            background: #fff;
            // box-shadow: 0 1px 4px #fcfbfb;
            position: relative;
          }
          .app-navbar-right {
            float: right;
            height: 64px;
            display: flex;
          }
          .app-navbar-comm {
            height: 64px;
            line-height: 64px;
          }
          .app-navbar-element {
            padding: 0;
            margin: 0 12px;
          }
          .app-navbar-icon {
            font-size: 22px;
            vertical-align: middle!important;
            cursor: pointer;
          }
          .app-navbar-trigger {
            font-size: 18px;
            line-height: 64px;
            padding: 0 16px;
            cursor: pointer;
            transition: color .3s;
          }
        `}</style>
      </Header>
    )
  }
}

const mapStateToProps = ({ navbar, sidebar }) => ({ navbar, sidebar })

const mapDispatchToProps = (dispatch) => {
  return {
    sidebarToggle: bindActionCreators(sidebarToggle, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
