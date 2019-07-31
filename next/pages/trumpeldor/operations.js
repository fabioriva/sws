import * as def from 'src/constants/trumpeldor'
import { SERVICE } from 'src/constants/roles'
import { withAuthSync } from 'src/lib/auth'
import AppUi from '/src/templates/operations'

export default withAuthSync(AppUi(def, SERVICE))
