import React, { Component } from 'react'
import Stall from './MapStall'

export default class Level extends Component {
  render () {
    var elevators =
    this.props.level.elevators !== undefined &&
    this.props.level.elevators.map((el, i) => {
      return (
        <div className='el' id={el.id} key={i}>
          {el.label}
        </div>
      )
    })
    var stalls =
    this.props.level.stalls.map((stall, i) => {
      return (
        <Stall
          stall={stall}
          key={i}
          side={this.props.side}
          stallStatus={this.props.stallStatus}
          visibilityFilter={this.props.visibilityFilter}
          openModal={this.props.openModal}
        />
      )
    })
    return (
      <span>
        <strong>{this.props.level.label}: {this.props.level.min} - {this.props.level.max}</strong>
        <div className={this.props.side + '-l l'} id={'l-' + this.props.level.nr}>
          <span>{elevators}</span>
          <span>{stalls}</span>
        </div>
      </span>
    )
  }
}
