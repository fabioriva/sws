const dev = process.env.NODE_ENV !== 'production'
export const BACKEND_URL = dev ? `${process.env.BACKEND_URL}` : 'https://www.sotefinservice.com/aps/nyu'
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
    label: 'Overview'
  },
  {
    href: '/nyu/map',
    icon: 'car',
    label: 'System Map'
  },
  {
    href: '/nyu/cards',
    icon: 'user',
    label: 'Cards Management'
  },
  {
    href: '/nyu/plc',
    icon: 'database',
    label: 'PLC Digital I/O'
  },
  {
    href: '/nyu/alarms',
    icon: 'warning',
    label: 'System Alarms'
  },
  {
    href: '/nyu/history',
    icon: 'search',
    label: 'Operations History'
  }
]