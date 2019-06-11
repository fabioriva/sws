import * as def from 'src/constants/nyu'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'
import AppUi from '/src/templates/alarms'

export default withAuth(AppUi(def, SERVICE))
