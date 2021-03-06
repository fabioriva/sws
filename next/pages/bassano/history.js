import * as def from 'src/constants/bassano'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'
import AppUi from '/src/templates/history'

export default withAuth(AppUi(def, SERVICE))
