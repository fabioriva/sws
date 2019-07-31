import { compose } from 'redux'
import { withRouter } from 'next/router'
import * as def from 'src/constants/trumpeldor'
import { SERVICE } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import AppUi from '/src/templates/rack'

export default compose(
  withRouter,
  withAuthSync
)(AppUi(def, SERVICE))
