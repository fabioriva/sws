import * as def from 'src/constants/nyu'
import { SERVICE } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import AppUi from '/src/templates/alarms'

export default withAuthSync(AppUi(def, SERVICE))
