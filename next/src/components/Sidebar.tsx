import * as React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { NavbarState, SidebarState, sidebarSetMenu, sidebarToggle } from '../store'

const { Sider } = Layout

interface Props {
  navbar: NavbarState;
  sidebar: SidebarState;
  sidebarMenu: Array<any>
  sidebarSetMenu: (activeItem: string) => void
  sidebarToggle: (collapsed: boolean) => void
}

const Sidebar: React.FunctionComponent<Props> = ({
  navbar,
  sidebar,
  sidebarMenu,
  sidebarSetMenu,
  sidebarToggle
}) => {
  const { activeItem, collapsed, collapsedWidth } = sidebar
  const { user } = navbar
  return (
    <Sider
      className='app-sider'
      trigger={null}
      collapsible
      collapsed
      collapsedWidth={collapsedWidth}
      onCollapse={() => sidebarToggle(collapsed)}
    >
      <div className='app-logo'>SWS</div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[activeItem]}
        onClick={(e) => sidebarSetMenu(e.key)}
      >
        { 
          sidebarMenu.map(
            (item, key) => user.role <= item.role && (
              <Menu.Item key={(key + 1)}>
                <Link href={item.href}>
                  <a>
                    <Icon type={item.icon} />
                    <span>{item.label}</span>
                  </a>
                </Link>
              </Menu.Item>
            )
          )
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

const mapStateToProps = ({ navbar, sidebar }) => ({ navbar, sidebar })

const mapDispatchToProps = { sidebarSetMenu, sidebarToggle }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
