import * as def from 'src/constants/nyu'
import { SERVICE } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import { withRacks } from '/src/hocs/with-rack-list'

const data = [
  {
    title: 'PLC I/O Rack 1',
    description: 'Main digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 2',
    description: 'System A1 digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 3',
    description: 'System A1 (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 4',
    description: 'System B2 digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 5',
    description: 'System B2 (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
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
