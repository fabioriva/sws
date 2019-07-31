import * as def from 'src/constants/muse'
import { SERVICE } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import AppUi from '/src/templates/plc'

const data = [
  {
    title: 'PLC I/O Rack 1',
    description: 'Main control panel digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 2',
    description: 'Elevator 1 main control panel digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 3',
    description: 'Elevator 1 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 4',
    description: 'Elevator 2 main control panel digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 5',
    description: 'Elevator 2 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 6',
    description: 'Elevator 3 main control panel digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 7',
    description: 'Elevator 3 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 8',
    description: 'Elevator 3 on board control panel (KKS) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 9',
    description: 'Elevator 4 main control panel digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 10',
    description: 'Elevator 4 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 11',
    description: 'Elevator 4 on board control panel (KKS) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  }
]

export default withAuthSync(AppUi(def, SERVICE, data))
