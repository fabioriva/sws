import { compose } from 'redux'
import { withRouter } from 'next/router'
import * as def from 'src/constants/trumpeldor'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'
import AppUi from '/src/templates/et200m'

export default compose(
  withRouter,
  withAuth
)(AppUi(def, SERVICE))
