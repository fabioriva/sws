import React, { Component } from 'react'
import Link from 'next/link'
import cookie from 'cookie'
import redirect from 'src/lib/redirect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarComm from './NavbarComm'
import { sidebarToggle } from 'src/store'
import { Layout, Badge, Icon, Tag, Tooltip } from 'antd'
import intl from 'react-intl-universal'
import en_US from 'src/locales/en-US.json'
import it_IT from 'src/locales/it-IT.json'
import openNotification from 'src/lib/openNotification'

const locales = {
  'en-US': en_US, // require('src/locales/en-US.json'),
  'it-IT': it_IT  // require('src/locales/it-IT.json')
}

const { Header } = Layout

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comm: {
        isOnline: false
      },
      diag: {
        alarmCount: 0
      },
      initDone: false,
      percent: 0
    }
    const { locale, user } = this.props.navbar
    const currentLocale = locale
    intl.init({
      currentLocale,
      locales
      // locales: {
      //   [currentLocale]: require(`src/locales/${currentLocale}.json`)
      // }
    })
    .then(() => {
       // After loading CLDR locale data, start to render
       this.setState({ initDone: true })
    })
  }
  componentDidMount () {
    this.ws = new WebSocket(this.props.socket)
    this.ws.onerror = e => console.log(e)
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      Object.keys(data).forEach((key) => {
        if (key === 'comm') this.setState({ comm: data[key] })
        if (key === 'diag') this.setState({ diag: data[key] })
        if (key === 'mesg') openNotification(data[key])
        if (key === 'comm') {
          this.state.percent < 100
          ?
          this.setState({ percent: this.state.percent + 10 })
          :
          this.setState({ percent: 0 })
        }
      })
    }
  }
  componentWillUnmount () {
    this.ws.close()
  }
  disableDiag = () => {
    this.ws.send(
      JSON.stringify({
        event: 'diag-disable'
      })
    )
  }
  signout = () => {
    const options = {
      maxAge: -1 // 0 = Delete cookie / -1 = Expire the cookie immediately
    }
    if (process.browser) {
      document.cookie = cookie.serialize('token', '', options)
    }
    // document.cookie = cookie.serialize('user', '', options)
    // document.cookie = cookie.serialize('userContext', '', options)
    redirect({}, '/')
  }
  render () {
    const comm = this.state.comm
    const commStatus = comm.isOnline ? <Tag color='#87d068'>ONLINE</Tag> : <Tag color='#f50'>OFFLINE</Tag>
    const diag = this.state.diag

    const { user } = this.props.navbar
    const { collapsed } = this.props.sidebar
    return (
      <div>
        <Header className='app-navbar'>
          <Icon
            className='app-navbar-trigger'
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => this.props.sidebarToggle(!collapsed)}
          />
          <div className='app-navbar-right'>
            { diag.isActive &&
            <span className='app-navbar-element'>
              <Tooltip title={`Deactivate Diagnostic`}>
                <Icon className='app-navbar-icon' type='thunderbolt' onClick={this.disableDiag} />
              </Tooltip>
            </span>
            }
            <span className='app-navbar-element'>
              <Badge count={diag.alarmCount}>
                <Link href={`/${user.aps}/alarms`}>
                  <Icon className='app-navbar-icon' type='bell' />
                </Link>
              </Badge>
            </span>
            <span className='app-navbar-element'>
              <Tooltip title={`Sign out ${user.username}`}>
                <Icon className='app-navbar-icon' type='user' onClick={this.signout} />
              </Tooltip>
            </span>
            <span className='app-navbar-comm'>
              { commStatus }
            </span>
          </div>
        </Header>
        <NavbarComm percent={this.state.percent}/>
        <style jsx global>{`
          .ant-layout-header {
            padding: 0 12px 0 0!important;
            background: ${ diag.isActive ? '#ffff00' : '#ffffff' }!important;
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
      </div>
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
