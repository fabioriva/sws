import * as def from 'src/constants/trumpeldor'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'
import AppUi from '/src/templates/operations'

export default withAuth(AppUi(def, SERVICE))