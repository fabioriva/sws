import React, {Component} from 'react'
import classnames from 'classnames'
import { Avatar, Icon, List } from 'antd'

const IconText = (props) => (
  <span>
    <Icon type={props.type} style={{ marginRight: 8 }} />
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
    // this.props.openModal(stall, card)
  }
  renderList (item) {
    // console.log(item)
    const title = <span>Stall {item.nr}</span>
    const description = item.card === 0 ? (
      <span>Stall is vacant</span>
    ) : item.card === 999 ? <span>This stall is locked since {item.date}</span> : <span>This stall is busy since {item.date}</span>
    return (
      <List.Item
        actions={[<IconText type='edit' text='Edit' />]}
      >
        <List.Item.Meta
          avatar={
            <Avatar
              style={{ fontWeight: 'bold' }}
              className={classnames({
                's-busy': item.card !== 0,
                's-free': item.card === 0,
                's-lock': item.card === 999,
                's-papa': item.card === 997,
                's-rsvd': item.card === 998
              })}
            >
              {item.card === 999 ? <span>LCK</span> : item.card}
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
