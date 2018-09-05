import React, { Component } from 'react'
import Stall from './MapStall'

export default class Level extends Component {
  render () {
    var stalls = []
    this.props.level.stalls.forEach((stall, i) => {
      stalls.push(
        <Stall
          stall={stall}
          key={i}
          side={this.props.side}
          visibilityFilter={this.props.visibilityFilter}
          openModal={this.props.openModal}
        />
      )
    })
    return (
      <span>
        <strong>{this.props.level.label}: {this.props.level.min} - {this.props.level.max}</strong>
        <div className={this.props.side + '-l l'} id={'l-' + this.props.level.nr}>
          <span>{stalls}</span>
        </div>
      </span>
    )
  }
}
