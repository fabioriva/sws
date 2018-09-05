import React, { Component } from 'react'
import { Row, Col, Badge, Button, Card, Icon, Popconfirm, Radio, Tag, Tooltip } from 'antd'
// import Blink from './Blink'
// import Carousel from 'nuka-carousel'
import classnames from 'classnames'

// import '../styles/Elevator.css'

// const divStyle = {
//   // background: '#FFEE00',
//   border: '1px solid #e9e9e9',
//   textAlign: 'center',
//   minHeight: 38
// }

// const divRadioStyle = {
//   border: '1px solid #e9e9e9',
//   padding: 6
// }

class Device extends Component {
  // onChange = (e) => {
  //   onChangeRadio(e.target.value)
  //   // this.setState({
  //   //   value: e.target.value,
  //   // })
  // }
  render () {
    const { device } = this.props
    const { id, name, card, mode, operation, size, stall } = device.a
    const autTag =
      <Tooltip title='Automatic'>
        <Tag color='#108ee9' style={{ width: 32, textAlign: 'center', color: '#fff' }}>A</Tag>
      </Tooltip>
    const manTag =
      <Tooltip title={mode}>
        <Tag color='#ffff00' style={{ width: 32, textAlign: 'center', color: '#000' }}>M</Tag>
      </Tooltip>
    const modeTag =
      <span>
        { mode !== 'Automatic' ? manTag : autTag }
      </span>
    // const entryIcon =
    //   <Tooltip title='Car In'>
    //     <Icon type='swap-right' style={{ color: '#000000', marginLeft: 6 }} />
    //   </Tooltip>
    // const exitIcon =
    //   <Tooltip title='Car Out'>
    //     <Icon type='swap-left' style={{ color: '#000000', marginLeft: 6 }} />
    //   </Tooltip>
    // const shuffleIcon =
    //   <Tooltip title='Car Shuffle'>
    //     <Icon type='swap' style={{ color: '#000000', marginLeft: 6 }} />
    //   </Tooltip>
    const title = <span>{name}</span>
    const extra =
      <div>
        { modeTag }
        {/* { operation === 1 ? entryIcon : operation === 2 ? exitIcon : operation === 3 ? shuffleIcon : null } */}
        <Tooltip title={device.c[2].status ? 'Alarm Lamp' : 'Alarm Lamp'}>
          <Icon
            theme='filled'
            type='close-circle'
            className={classnames({
              'lamp lamp-alarm-on': device.c[2].status,
              'lamp lamp-alarm-off': !device.c[2].status
            })}
          />
        </Tooltip>
        <Tooltip title={device.c[1].status ? 'Ready' : 'Not Ready'}>
          <Icon
            theme='filled'
            type='check-circle'
            className={classnames({
              'lamp lamp-center-on': device.c[1].status,
              'lamp lamp-center-off': !device.c[1].status
            })}
          />
        </Tooltip>
        <Tooltip title={device.c[0].status ? 'System On' : 'System Off'}>
          <Icon
            theme='filled'
            type='check-circle'
            className={classnames({
              'lamp lamp-ready-on': device.c[0].status,
              'lamp lamp-ready-off': !device.c[0].status
            })}
          />
        </Tooltip>
        {/* <Badge count={0}>
          <Icon type='warning' style={{ color: '#000000', marginLeft: 6 }} />
        </Badge> */}
      </div>
    const buttons = []
    device.d.forEach((b, i) => {
      const { merker, icon } = b
      buttons.push(
        <Button
          type='primary'
          disabled={!merker.status}
          icon={icon !== undefined && icon}
          key={i}
          onClick={() => this.props.action !== undefined && this.props.action(id)}
        >
          {b.label}
        </Button>
      )
    })
    const pos = []
    device.b.forEach((b, i) => {
      pos.push(
        <Card.Grid
          className={classnames({
            'device-info': true,
            'device-info-1': operation === 1,
            'device-info-2': operation === 2,
            'device-info-3': operation === 3
          })}
          key={i}
        >
          <span className='device-title'>
            {b.name}
          </span>
          <p className='device-value'>
            <span>{b.position}<Icon style={{ margin: '0 6px' }} type='arrow-right' />{b.destination}</span>
          </p>
        </Card.Grid>
      )
    })
    return (
      <div>
        <Card
          title={title}
          extra={extra}
          actions={buttons}
        >
          <Card.Grid
            className={classnames({
              'device-info': true,
              'device-info-1': operation === 1,
              'device-info-2': operation === 2,
              'device-info-3': operation === 3
            })}
          >
            <span className='device-title'>
              Card
            </span>
            <p className='device-value'>
              {card}
            </p>
          </Card.Grid>
          {/* <Card.Grid
            className={classnames({
              'device-info': true,
              'device-info-1': operation === 1,
              'device-info-2': operation === 2,
              'device-info-3': operation === 3
            })}
          >
            <span className='device-title'>
              Size
            </span>
            <p className='device-value'>
              {size}
            </p>
          </Card.Grid> */}
          <Card.Grid
            className={classnames({
              'device-info': true,
              'device-info-1': operation === 1,
              'device-info-2': operation === 2,
              'device-info-3': operation === 3
            })}
          >
            <span className='device-title'>
              Destination
            </span>
            <p className='device-value'>
              {stall}
            </p>
          </Card.Grid>
          { pos }
        </Card>
        <style jsx global>{`
          .ant-card {
            margin-bottom: 16px!important;
          }
          .ant-card-head {
            padding: 0 16px !important;
            background-color: #c0c0c0 !important;
            background-color: ##6c757d!important;
          }
          .ant-card-head-title {
            font-weight: bolder!important;
          }
          .ant-card-extra {
            position: absolute;
            right: 16px !important;
            top: 2px !important;
          }
          .ant-card-body {
            padding: 0!important;
          }
          .ant-card-grid {
            padding: 2px!important;
          }
          .lamp {
            margin-left: 6px;
          }
          .lamp-alarm-on {
            color: #f04134;
          }
          .lamp-alarm-off {
            color: #e9e9e9;
          }
          .lamp-center-on {
            color: #ffbf00;
          }
          .lamp-center-off {
            color: #e9e9e9;
          }
          .lamp-ready-on {
            color: #00a854;
          }
          .lamp-ready-off {
            color: #e9e9e9;
          }
          .device-info {
            text-align: center;
            width: 50%!important;
          }
          .device-info-1 {
            background-color: #d4edda;
          }
          .device-info-2 {
            background-color: #f8d7da;
          }
          .device-info-3 {
            background-color: #d1ecf1;
          }
          .device-title {
            font-size: 14px;
          }
          .device-value {
            font-size: 16px;
            font-weight: bold;
            color: #364d79;
            margin: 2px!important;
          }
        `}</style>
      </div>
    )
  }
}

export default Device
