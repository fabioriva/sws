import * as def from 'src/constants/nyu'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'
import AppUi from '/src/templates/statistics'

export default withAuth(AppUi(def, SERVICE))
