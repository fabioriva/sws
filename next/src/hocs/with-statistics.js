import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import { List, Card, DatePicker } from 'antd'
import Layout from 'src/components/Layout'
import Operations from 'src/components/charts/Operations'

const withStatistics = Page => {
  return class extends React.Component {
    static async getInitialProps (ctx) {
      const props = Page.getInitialProps ? await Page.getInitialProps(ctx) : {}
      const { BACKEND_URL } = props.def
      const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
      const url = `${BACKEND_URL}/statistics?dateString=${yesterday}`
      const res = await fetch(url)
      const json = await res.json()
      return {
        ...props,
        statistics: {
          data: json,
          dateString: yesterday
        }
      }
    }

    state = {
      statistics: this.props.statistics
    }

    render () {
      const { APS_TITLE, SIDEBAR_MENU, WEBSOCK_URL } = this.props.def
      const { data, dateString } = this.state.statistics
      return (
        <Layout
          aps={APS_TITLE}
          pageTitle='Statistics'
          sidebarMenu={SIDEBAR_MENU}
          socket={`${WEBSOCK_URL}?channel=ch2`}
        >
          {
            data !== undefined &&
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 2,
                xxl: 2,
              }}
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Card
                    title={item.title}
                    extra={<DatePicker defaultValue={moment(dateString)} onChange={this.handleChange} />}
                    style={{ width: '100%', height: 400 }}
                  >
                    <Operations
                      data={item.data}
                      label={item.label}
                      showModal={this.openModal}
                    />
                  </Card>
                </List.Item>
              )}
            />
          }
        </Layout>
      )
    }

    handleChange = async (date, dateString) => {
      console.log(date, dateString)
      const { BACKEND_URL } = this.props.def
      const url = `${BACKEND_URL}/statistics?dateString=${dateString}`
      const res = await fetch(url)
      const json = await res.json()
      this.setState({
        statistics: {
          data: json,
          date: dateString
        }
      })
    }
  }
}

export default withStatistics