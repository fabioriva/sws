import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sidebarSetMenu, sidebarToggle } from 'src/store'

class Page extends Component {
  static getInitialProps ({ store, isServer, pathname, query }) {
    // component will be able to read from store's state when rendered
    store.dispatch({ type: 'UI_SIDEBAR_SET_MENU', item: '999' })
    // you can pass some custom props to component from here
    return {
      custom: 'custom'
    }
  }
  render () {
    console.log('props:', this.props)
    console.log('state:', this.state)
    return (
      <div>
        <div>Prop from Redux {this.props.sidebar.activeItem}</div>
        <div>Prop from getInitialProps {this.props.custom}</div>
        <button onClick={() => this.props.sidebarSetMenu(123)}>Sidebar</button>
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = (dispatch) => {
  return {
    sidebarSetMenu: bindActionCreators(sidebarSetMenu, dispatch),
    sidebarToggle: bindActionCreators(sidebarToggle, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)

// export default connect(state => state)(Page)
