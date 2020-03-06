import * as roles from 'src/constants/roles'

const dev = process.env.NODE_ENV !== 'production'
export const BACKEND_URL = dev ? `${process.env.BACKEND_URL}/aps/wareham` : 'https://www.sotefinservice.com/aps/wareham'
export const WEBSOCK_URL = dev ? `${process.env.WEBSOCKET_URL}/ws/wareham` : 'wss://www.sotefinservice.com/ws/wareham'
// export const APS = 'wareham'
export const APS_ID = 76
export const APS_TITLE = 'Wareham 46&nbsp;&middot;&nbsp;Boston'
export const CARDS = 69
export const STALLS = 71
export const STALL_SIZES = {
  TYPE_01: 1,
  TYPE_02: 2
}
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997, // 65533
  RSVD: 998, // 65534
  LOCK: 999 // 65535
}
export const SIDEBAR_MENU = [
  {
    href: '/wareham/overview',
    icon: 'home',
    label: 'Overview',
    role: roles.VALET
  },
  {
    href: '/wareham/map',
    icon: 'car',
    label: 'System Map',
    role: roles.VALET
  },
  {
    href: '/wareham/cards',
    icon: 'user',
    label: 'Cards Management',
    role: roles.SERVICE
  },
  {
    href: '/wareham/racks',
    icon: 'database',
    label: 'PLC Digital I/O',
    role: roles.SERVICE
  },
  {
    href: '/wareham/alarms',
    icon: 'warning',
    label: 'System Alarms',
    role: roles.SERVICE
  },
  {
    href: '/wareham/history',
    icon: 'search',
    label: 'Operations History',
    role: roles.SERVICE
  },
  {
    href: '/wareham/statistics',
    icon: 'bar-chart',
    label: 'Statistics',
    role: roles.SERVICE
  }
]
