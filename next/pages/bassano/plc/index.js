import * as def from 'src/constants/bassano'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'
import AppUi from '/src/templates/plc'

const data = [
  {
    title: 'PLC I/O Rack 1',
    description: 'Elevatore A stato I/O digitali',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 2',
    description: 'Elevatore B stato I/O digitali',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 3',
    description: 'Torre stato I/O digitali',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 4',
    description: 'Torre (KKP) stato I/O digitali',
    image: '/static/im155_6.png',
    type: 's'
  }
]

export default withAuth(AppUi(def, SERVICE, data))
