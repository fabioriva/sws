import React, { Component } from 'react'
import classnames from 'classnames'
import { Tooltip } from 'antd'

const setLabel = (filter, stall) => {
  switch (filter) {
    case 'SHOW_NUMBERS':
      return stall.nr
    case 'SHOW_CARDS':
      return stall.status
    case 'SHOW_SIZES':
      return stall.size
    default:
      return '---'
  }
}

export default class Stall extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  render () {
    const { stall, stallStatus, visibilityFilter } = this.props
    const title = stall.status !== 0 ? 'Stall number ' + stall.nr + ' is busy with card ' + stall.status + ' since ' + stall.date : 'Stall is empty'
    const label = setLabel(visibilityFilter, stall)
    return (
      <Tooltip placement='top' title={title}>
        <div
          className={classnames({
            's': true,
            's-busy': stall.status !== 0,
            's-free': stall.status === stallStatus.FREE,
            's-lock': stall.status === stallStatus.LOCK,
            's-papa': stall.status === stallStatus.PAPA,
            's-rsvd': stall.status === stallStatus.RSVD,
            's-typ1': visibilityFilter === 'SHOW_SIZES' && stall.size === 1,
            's-typ2': visibilityFilter === 'SHOW_SIZES' && stall.size === 2,
            's-typ3': visibilityFilter === 'SHOW_SIZES' && stall.size === 3
          })}
          id={'s-' + stall.nr}
        >
          <span className='st' onClick={() => this.handleClick(stall.nr, stall.status)}>{stall.label}{label}</span>
        </div>
      </Tooltip>
    )
  }
  handleClick (stall, card) {
    this.props.openModal(stall, card)
  }
}
