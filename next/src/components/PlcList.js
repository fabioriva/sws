import React, { Component } from 'react'
import { Avatar, List, Tooltip } from 'antd'

class Byte extends Component {
  renderList (item) {
    const status = item.status ? <Tooltip title='True'><Avatar style={{ backgroundColor: '#87d068', fontWeight: 'bold' }}>{item.status}</Avatar></Tooltip> : <Tooltip title='False'><Avatar>{item.status}</Avatar></Tooltip>
    const title = <span>{item.addr + ' ' + item.label}</span>
    return (
      <List.Item>
        <List.Item.Meta
          avatar={status}
          title={title}
          description={item.info || <span>No Description</span>}
        />
      </List.Item>
    )
  }

  render () {
    return (
      <List
        itemLayout='horizontal'
        dataSource={this.props.bits}
        renderItem={item => this.renderList(item)}
      />
    )
  }
}

class Card extends Component {
  render () {
    var id = 'r' + this.props.rack + '-c' + this.props.card
    var bytes = this.props.bytes.map((byte, i) => {
      return <Byte key={i} rack={this.props.rack} serie={this.props.serie} card={this.props.card} byte={i} label={byte.label} bits={byte.bits} />
    })
    return (
      <div className='' id={id}>
        <h3>Card {this.props.card} <span style={{ fontSize: '80%', color: '#636c72' }}>Type {this.props.type}</span></h3>
        <span>{bytes}</span>
      </div>
    )
  }
}

class Rack extends Component {
  render () {
    var cards = this.props.rack.cards.map((card, i) => {
      return <Card key={i} rack={this.props.rack.nr} serie={this.props.rack.serie} card={card.nr} type={card.type} bytes={card.bytes} />
    })
    return (
      <div id={'rack-' + this.props.rack.nr}>
        <h2>Simatic PLC Rack {this.props.rack.nr}</h2>
        <span>{cards}</span>
      </div>
    )
  }
}

export default Rack
