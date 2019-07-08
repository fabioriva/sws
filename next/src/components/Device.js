import React, { Component } from 'react'
import { Badge, Button, Card, Icon, Tag, Tooltip } from 'antd'
import classnames from 'classnames'
import intl from 'react-intl-universal'
// import Blink from './Blink'
// import Panel from 'src/components/ArrowsPanel'

class Device extends Component {
  render () {
    const { device } = this.props
    const { id, name, card, mode, operation, position, size, stall, step } = device.a
    // const stepTag = mode.id === 8 && <Tag color='geekblue'>{step}</Tag>
    const autTag =
      <Badge count={step} style={{ backgroundColor: '#52c41a' }}>
        <Tooltip title={intl.get('AUT')}>
          <Tag color='#108ee9' style={{ color: '#fff', marginLeft: '12px' }}>A</Tag>
        </Tooltip>
      </Badge>
    const manTag =
      <Tooltip title={mode.label}>
        <Tag color='#ffff00' style={{ color: '#000' }}>M</Tag>
      </Tooltip>
    const modeTag = mode.id !== 8 ? manTag : autTag
    const title = <span>{ name }</span>
    const extra =
      <div>
        {/* { stepTag } */}
        {/* { modeTag } */}
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
        {/*
        <Badge count={0}>
          <Icon type='warning' style={{ color: '#000000', marginLeft: 6 }} />
        </Badge>
        */}
        { modeTag }
      </div>

    const buttons = device.d.map((item, key) => {
      const { merker, icon, label } = item
      return (
        <Button
          type='primary'
          disabled={!merker.status}
          icon={icon !== undefined && icon}
          key={key}
          onClick={() => this.props.actions[item] !== undefined && this.props.actions[item](id)}
        >
          {label}
        </Button>
      )
    })

    const pos = device.b.map((item, key) =>
      <Card.Grid
        className={classnames({
          'device-info': true,
          'device-info-1': operation === 1,
          'device-info-2': operation === 2,
          'device-info-3': operation === 3
        })}
        key={key}
      >
        <span className='device-title'>
          {item.name}
        </span>
        <p className='device-value'>
          <span>{item.position}<Icon style={{ margin: '0 6px' }} type='caret-right' />{item.destination}</span>
        </p>
      </Card.Grid>
    )

    const deviceView = <span>
      <Card.Grid
        className={classnames({
          'device-info': true,
          'device-info-1': operation === 1,
          'device-info-2': operation === 2,
          'device-info-3': operation === 3
        })}
      >
        <span className='device-title'>
          {intl.get('MODE')}
        </span>
        <p className='device-value'>
          {mode.label}
        </p>
      </Card.Grid>
      <Card.Grid
        className={classnames({
          'device-info': true,
          'device-info-1': operation === 1,
          'device-info-2': operation === 2,
          'device-info-3': operation === 3
        })}
      >
        <span className='device-title'>
          {intl.get('CARD')}
        </span>
        <p className='device-value'>
          {card}
        </p>
      </Card.Grid>
      <Card.Grid
        className={classnames({
          'device-info': true,
          'device-info-1': operation === 1,
          'device-info-2': operation === 2,
          'device-info-3': operation === 3
        })}
      >
        <span className='device-title'>
          {intl.get('SIZE')}
        </span>
        <p className='device-value'>
          {size}
        </p>
      </Card.Grid>
      <Card.Grid
        className={classnames({
          'device-info': true,
          'device-info-1': operation === 1,
          'device-info-2': operation === 2,
          'device-info-3': operation === 3
        })}
      >
        <span className='device-title'>
          {intl.get('STALL')}
        </span>
        <p className='device-value'>
          {stall}
        </p>
      </Card.Grid>
      { pos }
    </span>

    const silomatView = device.e.map((item, key) =>
      <Tooltip
        title={item.info}
        key={key}
      >
        <Card.Grid
          // className={classnames({
          //   'device-info': false,
          //   'device-info-1': operation === 1,
          //   'device-info-2': operation === 2,
          //   'device-info-3': operation === 3
          // })}
          style={{ width: '25%', textAlign: 'center' }}
          // key={item}
        >
          <span className='device-title'>{item.label}</span>
          <div className='device-value'>
            <Icon
              theme='filled'
              type='check-circle'
              className={classnames({
                'lamp lamp-ready-on': item.status,
                'lamp lamp-ready-off': !item.status
              })}
            />
          </div>
        </Card.Grid>
      </Tooltip>
    )

    return (
      // this.state.initDone &&
      <div>
        <Card
          title={title}
          extra={extra}
          actions={buttons}
          headStyle={{ backgroundColor: '#c0c0c0' }}
        >
          { position === 0 ? deviceView : silomatView }
        </Card>
        <style jsx global>{`
          .ant-card {
            margin-bottom: 16px!important;
          }
          .ant-card-body {
            padding: 0!important;
          }
          .ant-card-grid {
            padding: 0!important;
          }
          .lamp {
            margin-left: 6px;
            font-size: 16px;
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
