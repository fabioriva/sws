import * as roles from 'src/constants/roles'

const dev = process.env.NODE_ENV !== 'production'
export const BACKEND_URL = dev ? `${process.env.BACKEND_URL}` : 'https://www.sotefinservice.com'
export const WEBSOCK_URL = dev ? `${process.env.WEBSOCKET_URL}/ws/trumpeldor` : 'wss://www.sotefinservice.com/ws/trumpeldor'
export const APS = 'trumpeldor'
export const APS_ID = 48 // ?????
export const APS_TITLE = 'Trumpeldor&nbsp;&middot;&nbsp;Tel Aviv'
export const CARDS = 39
export const STALLS = 40
export const STALL_SIZES = {
  TYPE_01: 1,
  TYPE_02: 2
}
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997, // 65533
  RSVD: 998, // 65534
  LOCK: 100 // 65535
}
export const SIDEBAR_MENU = [
  {
    href: '/trumpeldor/overview',
    icon: 'home',
    label: 'Overview',
    role: roles.VALET
  },
  {
    href: '/trumpeldor/map',
    icon: 'car',
    label: 'System Map',
    role: roles.VALET
  },
  {
    href: '/trumpeldor/cards',
    icon: 'user',
    label: 'Cards Management',
    role: roles.SERVICE
  },
  {
    href: '/trumpeldor/plc',
    icon: 'database',
    label: 'PLC Digital I/O',
    role: roles.SERVICE
  },
  {
    href: '/trumpeldor/alarms',
    icon: 'warning',
    label: 'System Alarms',
    role: roles.SERVICE
  },
  {
    href: '/trumpeldor/history',
    icon: 'search',
    label: 'Operations History',
    role: roles.SERVICE
  }
]
