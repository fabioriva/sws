import * as def from 'src/constants/trumpeldor'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'
import AppUi from '/src/templates/plc'

const data = [
  {
    title: 'PLC I/O Rack 1',
    description: 'System digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 2',
    description: 'System (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  }
]

export default withAuth(AppUi(def, SERVICE, data))
