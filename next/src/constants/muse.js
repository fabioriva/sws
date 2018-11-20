import * as roles from 'src/constants/roles'

const dev = process.env.NODE_ENV !== 'production'
export const BACKEND_URL = dev ? process.env.BACKEND_URL : 'https://www.sotefinservice.com'
export const WEBSOCK_URL = dev ? `${process.env.WEBSOCKET_URL}/ws/muse` : 'wss://www.sotefinservice.com/ws/muse'
export const APS = 'The Muse&nbsp;&middot;&nbsp;Miami&nbsp;&middot;&nbsp;Florida'
export const APS_ID = 61
export const CARDS = 208
export const STALLS = 208
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997, // 65533
  RSVD: 998, // 65534
  LOCK: 999 // 65535
}
export const SIDEBAR_MENU = [
  {
    href: '/muse/overview',
    icon: 'home',
    label: 'Overview',
    role: roles.VALET
  },
  {
    href: '/muse/map',
    icon: 'car',
    label: 'System Map',
    role: roles.VALET
  },
  {
    href: '/muse/cards',
    icon: 'user',
    label: 'Cards Management',
    role: roles.SERVICE
  },
  {
    href: '/muse/plc',
    icon: 'database',
    label: 'PLC Digital I/O',
    role: roles.SERVICE
  },
  {
    href: '/muse/alarms',
    icon: 'warning',
    label: 'System Alarms',
    role: roles.SERVICE
  },
  {
    href: '/muse/history',
    icon: 'search',
    label: 'Operations History',
    role: roles.SERVICE
  }
]
