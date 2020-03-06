import * as def from 'src/constants/wareham'
import { SERVICE } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import withAlarms from '/src/hocs/with-alarms'

const Page = () => (<></>)

Page.getInitialProps = async () => {
  return {
    activeItem: '5',
    def: def,
    pageRole: SERVICE
  }
}

export default withAuthSync(withAlarms(Page))
