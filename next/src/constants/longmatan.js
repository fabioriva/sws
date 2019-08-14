import * as roles from 'src/constants/roles'

const dev = process.env.NODE_ENV !== 'production'
export const BACKEND_URL = dev ? `${process.env.BACKEND_URL}/aps/longmatan` : 'https://www.sotefinservice.com/aps/longmatan'
export const WEBSOCK_URL = dev ? `${process.env.WEBSOCKET_URL}/ws/longmatan` : 'wss://www.sotefinservice.com/ws/longmatan'
// export const APS = 'longmatan'
export const APS_ID = 77 // ?????
export const APS_TITLE = 'Longmatan&nbsp;&middot;&nbsp;Luzhou&nbsp;&middot;&nbsp;China'
export const CARDS = 500
export const STALLS = 320
export const STALL_SIZES = {
  TYPE_01: 1,
  TYPE_02: 2,
  TYPE_03: 3,
  TYPE_04: 4,
  TYPE_05: 5,
  TYPE_06: 6,
  TYPE_07: 7,
  TYPE_08: 8
}
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997, // 65533
  RSVD: 998, // 65534
  LOCK: 999 // 65535
}
export const SIDEBAR_MENU = [
  {
    href: '/longmatan/overview',
    icon: 'home',
    label: 'Overview',
    role: roles.VALET
  },
  {
    href: '/longmatan/map',
    icon: 'car',
    label: 'System Map',
    role: roles.VALET
  },
  {
    href: '/longmatan/cards',
    icon: 'user',
    label: 'Cards Management',
    role: roles.SERVICE
  },
  {
    href: '/longmatan/racks',
    icon: 'database',
    label: 'PLC Digital I/O',
    role: roles.SERVICE
  },
  {
    href: '/longmatan/alarms',
    icon: 'warning',
    label: 'System Alarms',
    role: roles.SERVICE
  },
  {
    href: '/longmatan/history',
    icon: 'search',
    label: 'Operations History',
    role: roles.SERVICE
  },
  {
    href: '/longmatan/statistics',
    icon: 'bar-chart',
    label: 'Statistics',
    role: roles.SERVICE
  }
]
