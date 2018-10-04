import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const appInitialState = {
  navbar: {
    user: {}
  },
  sidebar: {
    activeItem: '0',
    collapsed: false,
    collapsedWidth: 80
  }
}

export const actionTypes = {
  UI_NAVBAR_SET_USER: 'UI_NAVBAR_SET_USER',
  UI_SIDEBAR_SET_MENU: 'UI_SIDEBAR_SET_MENU',
  UI_SIDEBAR_TOGGLE: 'UI_SIDEBAR_TOGGLE'
}

// REDUCERS
export const reducer = (state = appInitialState, action) => {
  switch (action.type) {
    case actionTypes.UI_NAVBAR_SET_USER:
      // console.log('UI_NAVBAR_SET_USER', action)
      return Object.assign({}, state, {
        navbar: {
          ...state.navbar,
          user: action.user
        }
      })
    case actionTypes.UI_SIDEBAR_SET_MENU:
      // console.log('UI_SIDEBAR_SET_MENU', action)
      return Object.assign({}, state, {
        sidebar: {
          ...state.sidebar,
          activeItem: action.item
        }
      })
    case actionTypes.UI_SIDEBAR_TOGGLE:
      // console.log('UI_SIDEBAR_TOGGLE', action)
      return Object.assign({}, state, {
        sidebar: {
          ...state.sidebar,
          collapsed: action.status,
          collapsedWidth: action.status ? 0 : 80
        }
      })
    default: return state
  }
}

// ACTIONS
export const navbarSetUser = (user) => dispatch => {
  return dispatch({ type: actionTypes.UI_NAVBAR_SET_USER, user: user })
}
export const sidebarSetMenu = (item) => dispatch => {
  return dispatch({ type: actionTypes.UI_SIDEBAR_SET_MENU, item: item })
}
export const sidebarToggle = (status) => dispatch => {
  return dispatch({ type: actionTypes.UI_SIDEBAR_TOGGLE, status: status })
}

export const initStore = (initialState = appInitialState, options) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
