import * as def from 'src/constants/trumpeldor'
import { SERVICE } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import withStatistics from '/src/hocs/with-statistics'

const Page = () => (<></>)

Page.getInitialProps = async () => {
  return {
    activeItem: '7',
    def: def,
    pageRole: SERVICE
  }
}

export default withAuthSync(withStatistics(Page))
