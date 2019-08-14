import * as def from 'src/constants/trumpeldor'
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
    description: 'System (KKP) digital I/O status',
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
