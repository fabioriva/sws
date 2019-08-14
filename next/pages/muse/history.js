import * as def from 'src/constants/muse'
import { SERVICE } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import withHistory from '/src/hocs/with-history'

const Page = () => (<></>)

Page.getInitialProps = async () => {
  return {
    activeItem: '6',
    def: def,
    pageRole: SERVICE
  }
}

export default withAuthSync(withHistory(Page))
