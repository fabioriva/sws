import * as def from 'src/constants/wareham'
import { SERVICE } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import withCards from '/src/hocs/with-cards'

const Page = () => (<></>)

Page.getInitialProps = async () => {
  return {
    activeItem: '3',
    def: def,
    pageRole: SERVICE
  }
}

export default withAuthSync(withCards(Page))
