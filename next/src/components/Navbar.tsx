import * as React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import { Layout, Badge, Icon, Tag, Tooltip } from 'antd'
import Alert from 'components/DiagnosticAlert'
import Comm from 'components/NavbarComm'
import { NavbarState, SidebarState, sidebarToggle } from 'src/store'
import { logout } from 'lib/auth'
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

interface Props {
  navbar: NavbarState;
  sidebar: SidebarState;
  sidebarToggle: (collapsed: boolean) => void;
  socket: string;
}

type comm = {
  isOnline: boolean
}

type diag = {
  alarmCount: number
}

interface State {
  comm: comm,
  diag: diag,
  initDone: boolean,
  navbarComm: number,
  socket: WebSocket
}

class Navbar extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      comm: {
        isOnline: false
      },
      diag: {
        alarmCount: 0
      },
      initDone: false,
      navbarComm: 0,
      socket: null
    }

    const currentLocale = props.navbar.user.locale
    intl.init({
      currentLocale,
      locales
    }).then(() => {
      this.setState({ initDone: true }) // After loading CLDR locale data, start to render
    })
  }

  componentDidMount () {
    const socket = new WebSocket(this.props.socket)
    this.setState({ socket: socket })
    socket.onerror = e => console.log(e)
    socket.onmessage = e => {
      const data = JSON.parse(e.data)
      Object.keys(data).forEach((key) => {
        if (key === 'comm') this.setState({ comm: data[key] })
        if (key === 'diag') this.setState({ diag: data[key] })
        if (key === 'mesg') openNotification(data[key])
        if (key === 'comm') this.setState(state => ({
          navbarComm: state.comm.isOnline && state.navbarComm < 100 ? state.navbarComm + 10 : 0
        }))
      })
    }
  }

  componentWillUnmount () {
    this.state.socket.close()
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
    return (
      <div>
        <Header className='app-navbar'>
          <Icon
            className='app-navbar-trigger'
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => this.props.sidebarToggle(!collapsed)}
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
        <Comm percent={this.state.navbarComm} />
        {
          cookie.get('diagnostic') && <Alert message={cookie.get('diagnostic')} onClose={this.handleCloseDiagnostic} />
        }
        <style jsx global>{`
          .ant-layout-header {
            padding: 0 12px 0 0!important;
            background: '#ffffff';
            position: relative!important;
          }
          .app-navbar {
            padding: 0 12px 0 0;
            background: #fff;
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
            color: rgba(0,0,0,0.65);
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

const mapDispatchToProps = { sidebarToggle }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)