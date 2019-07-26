import React from 'react'
import { Button, Result } from 'antd'
import { logout } from 'src/lib/auth'

export default class Offline extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      comm: {
        isOnline: false
      }
    }
  }
  componentDidMount () {
    this.ws = new WebSocket(this.props.socket)
    this.ws.onerror = e => console.log(e)
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      Object.keys(data).forEach((key) => {
        if (key === 'comm') this.setState({ comm: data[key] })
      })
    }
  }
  componentWillUnmount () {
    this.ws.close()
  }
  render () {
    return (
      <div>
        {
          !this.state.comm.isOnline && (
            <Result
              status='warning'
              title='System is Offline'
              subTitle='Check the connectivity of the PLC to the external network'
              extra={<Button type='primary' onClick={logout}>Logout</Button>}
            />
          )
        }
      </div>
    )
  }
}
