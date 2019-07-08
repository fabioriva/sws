import React, { Component } from 'react'
import classnames from 'classnames'
import { Card, Row, Col, Icon } from 'antd'

export default class Panel extends Component {
  render () {
    const [L1, L2, L3, L4, L5] = this.props.data
    console.log(L1)
    return (
      <div>
        {/* <Card
          title='Light Panel'
          style={{ textAlign: 'center', width: '320px' }}
        > */}
          <Row className='row-style' type='flex' justify='space-around' align='middle'>
            <Col span={24}>
              <Icon
                className={classnames({
                  'icon-style': true,
                  'icon-off': !L1.status,
                  'icon-on': L1.status
                })}
                type='arrow-up'
              />
            </Col>
          </Row>
          <Row className='row-style' type='flex' justify='space-around' align='middle'>
            <Col span={8}>
              <Icon
                className={classnames({
                  'icon-style': true,
                  'icon-off': !L5.status,
                  'icon-on': L5.status
                })}
                type='arrow-left'
              />
            </Col>
            <Col span={8}>
              <Icon
                className='icon-style'
                type='car'
                theme='twoTone'
                twoToneColor={L3.status ? '#ff0000' : '#c0c0c0'}
              />
            </Col>
            <Col span={8}>
              <Icon
                className={classnames({
                  'icon-style': true,
                  'icon-off': !L4.status,
                  'icon-on': L4.status
                })}
                type='arrow-right'
              />
            </Col>
          </Row>
          <Row className='row-style' type='flex' justify='space-around' align='middle'>
            <Col span={24}>
              <Icon
                className={classnames({
                  'icon-style': true,
                  'icon-off': !L2.status,
                  'icon-on': L2.status
                })}
                type='arrow-down'
              />
            </Col>
          </Row>
        {/* </Card> */}
        <style jsx global>{`
          .row-style {
            min-height: 48px;
          }
          .icon-style {
            font-size: 32px;
          }
          .icon-off {
            color: #c0c0c0;
          }
          .icon-on {
            color: #52c41a;
          }
        `}</style>
      </div>
    )
  }
}
