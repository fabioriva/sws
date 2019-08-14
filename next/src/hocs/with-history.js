import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Layout from 'src/components/Layout'
import History from 'src/components/History'
import Query from 'src/components/QueryModal'
import { ADMIN } from 'src/constants/roles'

const withHistory = Page => {
  return class extends React.Component {
    static async getInitialProps (ctx) {
      const props = Page.getInitialProps ? await Page.getInitialProps(ctx) : {}
      const { BACKEND_URL, APS_ID } = props.def
      const dateFrom = moment().hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss')
      const dateTo = moment().hours(23).minutes(59).seconds(59).format('YYYY-MM-DD HH:mm:ss')
      const url = `${BACKEND_URL}/history?system=${APS_ID}&dateFrom=${dateFrom}&dateTo=${dateTo}`
      const res = await fetch(url)
      const json = await res.json()
      return {
        ...props,
        history: json
      }
    }

    constructor (props) {
      super(props)
      const { history } = props
      this.state = {
        count: history.count,
        dateFrom: history.dateFrom,
        dateTo: history.dateTo,
        query: history.query,
        queryModal: {
          range: {
            value: []
          },
          filter: {
            value: 'a'
          },
          visible: false
        }
      }
    }

    render () {
      const { APS_TITLE, SIDEBAR_MENU, WEBSOCK_URL } = this.props.def
      const { count, dateFrom, dateTo, query, queryModal } = this.state
      return (
        <Layout
          aps={APS_TITLE}
          pageTitle='System Logs'
          sidebarMenu={SIDEBAR_MENU}
          socket={`${WEBSOCK_URL}?channel=ch2`}
        >
          <History
            count={count}
            dateFrom={dateFrom}
            dateTo={dateTo}
            query={query}
            queryModal={this.openModal}
            diagnostic={this.props.currentUser.role <= ADMIN}
          />
          <Query
            data={queryModal}
            onCancel={this.closeModal}
            onChange={this.handleChange}
            onConfirm={this.handleConfirm}
          />
        </Layout>
      )
    }

    openModal = () => {
      this.setState({
        queryModal: {
          range: {
            value: [moment().startOf('day'), moment().endOf('day')]
          },
          filter: {
            value: 'a'
          },
          visible: true
        }
      })
    }

    closeModal = () => {
      this.setState({
        queryModal: {
          ...this.state.queryModal,
          visible: false
        }
      })
    }

    handleChange = (fields) => {
      this.setState({
        queryModal: {
          ...this.state.queryModal,
          ...fields
        }
      })
    }

    handleConfirm = async (dateFrom, dateTo, filter) => {
      const { BACKEND_URL, APS_ID } = this.props.def
      const from = moment(dateFrom).format('YYYY-MM-DD HH:mm:ss')
      const to = moment(dateTo).format('YYYY-MM-DD HH:mm:ss')
      const url = `${BACKEND_URL}/history?system=${APS_ID}&dateFrom=${from}&dateTo=${to}&filter=${filter}`
      const res = await fetch(url)
      const history = await res.json()
      this.setState({
        count: history.count,
        dateFrom: history.dateFrom,
        dateTo: history.dateTo,
        query: history.query,
        queryModal: {
          range: {
            value: []
          },
          filter: {
            value: 'a'
          },
          visible: false
        }
      })
    }
  }
}

export default withHistory