import React, { Component } from 'react'
import classnames from 'classnames'
import { Tooltip } from 'antd'

export default class Stall extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  render () {
    var title = this.props.stall.status !== 0 ? 'Stall number ' + this.props.stall.nr + ' is busy with card ' + this.props.stall.status + ' since ' + this.props.stall.date : 'Stall is empty'
    return (
      <Tooltip placement='top' title={title}>
        <div
          className={classnames({
            's': true,
            's-busy': this.props.stall.status !== 0,
            's-free': this.props.stall.status === 0,
            's-lock': this.props.stall.status === 999,
            's-papa': this.props.stall.status === 997,
            's-rsvd': this.props.stall.status === 998,
            's-typ1': this.props.visibilityFilter === 'SHOW_SIZES' && this.props.stall.size === 1,
            's-typ2': this.props.visibilityFilter === 'SHOW_SIZES' && this.props.stall.size === 2,
            's-typ3': this.props.visibilityFilter === 'SHOW_SIZES' && this.props.stall.size === 3
          })}
          id={'s-' + this.props.stall.nr}
        >
          <span className='st' onClick={() => this.handleClick(this.props.stall.nr, this.props.stall.status)}>{this.props.stall.label}</span>
        </div>
      </Tooltip>
    )
  }
  handleClick (stall, card) {
    this.props.openModal(stall, card)
  }
}
