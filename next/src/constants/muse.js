const dev = process.env.NODE_ENV !== 'production'
export const BACKEND_URL = dev ? process.env.BACKEND_URL : 'https://www.sotefinservice.com'
export const WEBSOCK_URL = dev ? process.env.WEBSOCKET_URL : 'wss://www.sotefinservice.com'
export const APS = 'The Muse&nbsp;&middot;&nbsp;Miami&nbsp;&middot;&nbsp;Florida'
export const APS_ID = 61
export const CARDS = 208
export const STALLS = 208
export const StallStatus = {
  FREE: 0,
  PAPA: 997, // 65533
  RSVD: 998, // 65534
  LOCK: 999 // 65535
}
export const SIDEBAR_MENU = [
  {
    href: '/muse/overview',
    icon: 'home',
    label: 'Overview'
  },
  {
    href: '/muse/map',
    icon: 'car',
    label: 'System Map'
  },
  {
    href: '/muse/cards',
    icon: 'user',
    label: 'Cards Management'
  },
  {
    href: '/muse/plc',
    icon: 'database',
    label: 'PLC Digital I/O'
  },
  {
    href: '/muse/alarms',
    icon: 'warning',
    label: 'System Alarms'
  },
  {
    href: '/muse/history',
    icon: 'search',
    label: 'Operations History'
  }
]
