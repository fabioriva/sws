import * as def from 'src/constants/longmatan'
import { SERVICE } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import { withRacks } from '/src/hocs/with-rack-list'

const data = [
  {
    title: 'PLC I/O Rack 1',
    description: 'System digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 2',
    description: 'Elevator 1 (Main) digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 3',
    description: 'Elevator 1 (Shuttle) digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 4',
    description: 'Elevator 2 (Main) digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 5',
    description: 'Elevator 2 (Shuttle) digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 6',
    description: 'Elevator 3 (Main) digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 7',
    description: 'Elevator 3 (Shuttle) digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 8',
    description: 'Elevator 4 (Main) digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 9',
    description: 'Elevator 4 (Shuttle) digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  }
]

const Page = () => (<></>)

Page.getInitialProps = async () => {
  return {
    activeItem: '4',
    def: def,
    pageRole: SERVICE,
    data: data
  }
}

export default withAuthSync(withRacks(Page))
