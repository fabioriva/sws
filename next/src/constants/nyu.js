import * as roles from 'src/constants/roles'

const dev = process.env.NODE_ENV !== 'production'
export const BACKEND_URL = dev ? `${process.env.BACKEND_URL}` : 'https://www.sotefinservice.com'
export const WEBSOCK_URL = dev ? `${process.env.WEBSOCKET_URL}/ws/nyu` : 'wss://www.sotefinservice.com/ws/nyu'
export const APS = 'NYU&nbsp;&middot;&nbsp;Langone Medical Center&nbsp;&middot;&nbsp;New York'
export const APS_ID = 68
export const CARDS = 119
export const STALLS = 121
export const STALL_STATUS = {
  FREE: 0,
  PAPA: 997, // 65533
  RSVD: 998, // 65534
  LOCK: 999 // 65535
}
export const SIDEBAR_MENU = [
  {
    href: '/nyu/overview',
    icon: 'home',
    label: 'Overview',
    role: roles.VALET
  },
  {
    href: '/nyu/map',
    icon: 'car',
    label: 'System Map',
    role: roles.VALET
  },
  {
    href: '/nyu/cards',
    icon: 'user',
    label: 'Cards Management',
    role: roles.SERVICE
  },
  {
    href: '/nyu/plc',
    icon: 'database',
    label: 'PLC Digital I/O',
    role: roles.SERVICE
  },
  {
    href: '/nyu/alarms',
    icon: 'warning',
    label: 'System Alarms',
    role: roles.SERVICE
  },
  {
    href: '/nyu/history',
    icon: 'search',
    label: 'Operations History',
    role: roles.SERVICE
  }
]
