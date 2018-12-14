import React, { Component } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sidebarSetMenu, sidebarToggle } from 'src/store'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

class Sidebar extends Component {
  render () {
    const { activeItem, collapsed, collapsedWidth } = this.props.sidebar
    const { user } = this.props.navbar
    const menu = this.props.sidebarMenu.map((item, key) =>
      user.role <= item.role &&
      <Menu.Item key={(key + 1)}>
        <Link href={item.href}>
          <a>
            <Icon type={item.icon} />
            <span>{item.label}</span>
          </a>
        </Link>
      </Menu.Item>
    )
    return (
      <Sider
        className='app-sider'
        trigger={null}
        // breakpoint='lg'
        collapsible
        collapsed
        collapsedWidth={collapsedWidth}
        onCollapse={() => this.props.sidebarToggle(collapsed)}
      >
        <div className='app-logo'>SWS</div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[activeItem]}
          onClick={(e) => this.props.sidebarSetMenu(e.key)}
        >
          {
            menu
          }
        </Menu>
        <style jsx global>{`
          .ant-layout-sider {
            box-shadow: 2px 0 6px rgba(0,21,41,.35)!important;
          }
          .ant-menu-item-selected {
            background-color: #001529!important;
          }
          .app-logo {
            position: relative;
            height: 64px;
            line-height: 64px;
            background: #002140;
            color: #ffcc00;
            font-size: 20px;
            text-align: center;
          }
          .link-disabled {
            pointer-events: none;
          }
        `}</style>
      </Sider>
    )
  }
}

const mapStateToProps = ({ navbar, sidebar }) => ({ navbar, sidebar })

const mapDispatchToProps = (dispatch) => {
  return {
    sidebarSetMenu: bindActionCreators(sidebarSetMenu, dispatch),
    sidebarToggle: bindActionCreators(sidebarToggle, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
