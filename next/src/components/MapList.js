import React, { Component } from 'react'
import classnames from 'classnames'
import { Avatar, Icon, List } from 'antd'

const IconText = (props) => (
  <span>
    <Icon
      type={props.type}
      style={{ marginRight: 8 }}
      onClick={props.action}
    />
    {props.text}
  </span>
)

class Level extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (stall, card) {
    console.log(stall, card)
    this.props.openModal(stall, card)
  }
  renderList (item) {
    // console.log(item)
    const title = <span>Stall {item.nr}</span>
    const description = item.status === 0 ? (
      <span>Stall is vacant</span>
    ) : item.status === 999 ? <span>This stall is locked since {item.date}</span> : <span>This stall is busy since {item.date}</span>
    return (
      <List.Item
        actions={[
          <IconText
            type='edit'
            text='Edit'
            action={() => this.handleClick(item.nr, item.status)}
          />
        ]}
      >
        <List.Item.Meta
          avatar={
            <Avatar
              style={{ fontWeight: 'bold' }}
              className={classnames({
                's-busy': item.status !== 0,
                's-free': item.status === 0,
                's-lock': item.status === 999,
                's-papa': item.status === 997,
                's-rsvd': item.status === 998
              })}
            >
              {item.status === 999 ? <span>LCK</span> : item.status}
            </Avatar>
          }
          title={title}
          description={description || <span>No Description</span>}
        />
      </List.Item>
    )
  }
  render () {
    return (
      <span>
        <div id={'level-' + this.props.level.nr}>
          <strong>Level {this.props.level.label}: {this.props.level.min} - {this.props.level.max}</strong>
        </div>
        <List
          itemLayout='horizontal'
          dataSource={this.props.level.stalls}
          renderItem={item => this.renderList(item)}
        />
        <p><a href='#top'>[Top]</a></p>
      </span>
    )
  }
}

export default class Map extends Component {
  render () {
    const levels = []
    this.props.map.levels.forEach((level, i) => {
      levels.push(
        <Level
          level={level}
          key={i}
          side={this.props.side}
          visibilityFilter={this.props.visibilityFilter}
          openModal={this.props.openModal}
        />
      )
    })
    return (
      <div>
        {levels}
      </div>
    )
  }
}
