import * as def from 'src/constants/bassano'
import { SERVICE } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import AppUi from '/src/templates/statistics'

export default withAuthSync(AppUi(def, SERVICE))
