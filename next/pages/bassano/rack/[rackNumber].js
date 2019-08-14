import * as def from 'src/constants/bassano'
import { SERVICE } from 'src/constants/roles'
import { compose } from 'redux'
import { withRouter } from 'next/router'
import { withAuthSync } from 'src/lib/auth'
import withRack from '/src/hocs/with-rack'

const Page = () => (<></>)

Page.getInitialProps = async () => {
  return {
    activeItem: '4',
    def: def,
    pageRole: SERVICE
  }
}

export default compose(
  withRouter,
  withAuthSync,
  withRack
)(Page)
