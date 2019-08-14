import * as React from 'react'
import { Layout } from 'antd'

const Header = Layout.Header

type Props = {
  percent: number
}

const NavbarComm: React.FunctionComponent<Props> = (props) => (
  <Header style={{ background:'#ffffff', height: 3 }}>
      <div className='bar-comm' style={{ background: '#87d068', height: 3, width: `${props.percent}%` }} />
  </Header>
)

export default NavbarComm