import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// interface User {

// }

export interface NavbarState {
  user: any;
}

export interface SidebarState {
  activeItem: string;
  collapsed: boolean;
  collapsedWidth: number;
}

export interface StoreState {
  navbar: NavbarState;
  sidebar: SidebarState;
}

export const actionTypes = {
  UI_NAVBAR_SET_USER: 'UI_NAVBAR_SET_USER',
  UI_SIDEBAR_SET_MENU: 'UI_SIDEBAR_SET_MENU',
  UI_SIDEBAR_TOGGLE: 'UI_SIDEBAR_TOGGLE'
}

// APP INITIAL STATE
const appInitialState = {
  NavbarState: {
    user: {}
  },
  SidebarState: {
    activeItem: '0',
    collapsed: false,
    collapsedWidth: 80
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

// REDUCERS
export const reducer = (state = appInitialState, action) => {
  switch (action.type) {
    case actionTypes.UI_NAVBAR_SET_USER:
      return Object.assign({}, state, {
        navbar: {
          ...state.NavbarState,
          user: action.user
        }
      })
    case actionTypes.UI_SIDEBAR_SET_MENU:
      return Object.assign({}, state, {
        sidebar: {
          ...state.SidebarState,
          activeItem: action.item
        }
      })
    case actionTypes.UI_SIDEBAR_TOGGLE:
      return Object.assign({}, state, {
        sidebar: {
          ...state.SidebarState,
          collapsed: action.status,
          collapsedWidth: action.status ? 0 : 80
        }
      })
    default: return state
  }
}

// INITIALIZE STORE
export function initializeStore (initialState = appInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}