import React, { Component } from 'react'
import Level from './MapLevel'

export default class Map extends Component {
  render () {
    const levels =
    this.props.map.levels.map((level, i) => {
      return (
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
