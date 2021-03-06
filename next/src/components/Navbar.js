import React, { Component } from 'react'
import Link from 'next/link'
import { logout } from 'src/lib/auth'
import cookie from 'js-cookie'
// import redirect from 'src/lib/redirect'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { sidebarToggle } from 'src/store'
import { Alert, Layout, Badge, Icon, Tag, Tooltip } from 'antd'
import openNotification from 'src/lib/openNotification'
// i18n
import intl from 'react-intl-universal'
import enUS from 'src/locales/en-US.json'
import itIT from 'src/locales/it-IT.json'

const locales = {
  'en-US': enUS,
  'it-IT': itIT
}

const { Header } = Layout

const Comm = (props) => {
  return (
    <Header
      className='app-comm'
    >
      <div className='bar-comm' />
      <style jsx global>{`
        .app-comm {
          background: #fff!important;
          height: 3px;
        }
        .bar-comm {
          background: #87d068;
          height: 3px;
          width: ${props.percent}%;
        }
      `}</style>
    </Header>
  )
}

const Diagnostic = (props) => {
  const message = `Diagnostic is active for alarm id ${props.message}`
  return (
    <Alert style={{ margin: '6px 12px 0 12px' }} message={message} type='error' closeText='Close Diagnostic' onClose={props.onClose} showIcon />
  )
}

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
      navbarComm: 0
    }
    const currentLocale = this.props.navbar.user.locale
    intl.init({
      currentLocale,
      locales
    }).then(() => {
      this.setState({ initDone: true }) // After loading CLDR locale data, start to render
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
          this.setState((state) => {
            return {
              navbarComm: state.comm.isOnline && state.navbarComm < 100 ? state.navbarComm + 10 : 0
            }
          })
        }
      })
    }
  }
  componentWillUnmount () {
    this.ws.close()
  }
  handleCloseDiagnostic = () => {
    window.location.href = this.props.navbar.user.url
    cookie.remove('diagnostic')
  }
  render () {
    const comm = this.state.comm
    const commStatus = comm.isOnline ? <Tag color='#87d068'>ONLINE</Tag> : <Tag color='#f50'>OFFLINE</Tag>
    const diag = this.state.diag
    const { user } = this.props.navbar
    const { collapsed } = this.props.sidebar
    const { dispatch } = this.props
    return (
      <div>
        <Header className='app-navbar'>
          <Icon
            className='app-navbar-trigger'
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => dispatch(sidebarToggle(!collapsed))}
          />
          <div className='app-navbar-right'>
            { cookie.get('diagnostic') &&
            <span className='app-navbar-element'>
              <Tooltip title='Diagnostic is active'>
                <Icon className='app-navbar-icon' type='thunderbolt' theme='twoTone' />
              </Tooltip>
            </span>
            }
            <span className='app-navbar-element'>
              <Badge count={diag.alarmCount}>
                <Link href={`/${user.aps}/alarms`}>
                  <a><Icon className='app-navbar-icon' type='bell' /></a>
                </Link>
              </Badge>
            </span>
            <span className='app-navbar-element'>
              <Tooltip title={`Sign out ${user.username}`}>
                <Icon className='app-navbar-icon' type='user' onClick={logout} />
              </Tooltip>
            </span>
            <span className='app-navbar-comm'>
              { commStatus }
            </span>
          </div>
        </Header>
        <Comm
          percent={this.state.navbarComm}
        />
        {
          // this.props.navbar.diag && <Diagnostic message={this.props.navbar.diag} onClose={this.handleClose} />
          // cookie.get('diagnostic') && <Diagnostic message={cookie.get('diagnostic')} onClose={() => cookie.remove('diagnostic')} />
          cookie.get('diagnostic') && <Diagnostic message={cookie.get('diagnostic')} onClose={this.handleCloseDiagnostic} />
        }
        <style jsx global>{`
          .ant-layout-header {
            padding: 0 12px 0 0!important;
            background: '#ffffff' // ${ this.props.navbar.diag ? '#fff1f0' : '#ffffff' }!important;
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

// const mapStateToProps = (state) => {
//   const { navbar, sidebar } = state
//   return { navbar, sidebar }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     navbarSetDiag: bindActionCreators(navbarSetDiag, dispatch),
//     sidebarToggle: bindActionCreators(sidebarToggle, dispatch)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default connect(mapStateToProps)(Navbar)
