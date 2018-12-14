import * as roles from 'src/constants/roles'

const dev = process.env.NODE_ENV !== 'production'
export const BACKEND_URL = dev ? process.env.BACKEND_URL : 'https://www.sotefinservice.com'
export const WEBSOCK_URL = dev ? `${process.env.WEBSOCKET_URL}/ws/bassano` : 'wss://www.sotefinservice.com/ws/bassano'
export const APS = 'Stallo S. Giovanni&nbsp;&middot;&nbsp;Bassano Del Grappa&nbsp;&middot;&nbsp;Italia'
export const APS_ID = 66
export const CARDS = 149
export const STALLS = 149
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997, // 65533
  RSVD: 998, // 65534
  LOCK: 999 // 65535
}
export const SIDEBAR_MENU = [
  {
    href: '/bassano/overview',
    icon: 'home',
    label: 'Overview',
    role: roles.VALET
  },
  {
    href: '/bassano/map',
    icon: 'car',
    label: 'System Map',
    role: roles.VALET
  },
  {
    href: '/bassano/cards',
    icon: 'tags',
    label: 'Cards Management',
    role: roles.SERVICE
  },
  {
    href: '/bassano/plc',
    icon: 'database',
    label: 'PLC Digital I/O',
    role: roles.SERVICE
  },
  {
    href: '/bassano/alarms',
    icon: 'warning',
    label: 'System Alarms',
    role: roles.SERVICE
  },
  {
    href: '/bassano/history',
    icon: 'search',
    label: 'Operations History',
    role: roles.SERVICE
  }
  // {
  //   href: '/bassano/admin',
  //   icon: 'user',
  //   label: 'User administration',
  //   role: roles.SERVICE
  // }
]
