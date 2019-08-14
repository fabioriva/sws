import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Layout from 'src/components/Layout'
import List from 'src/components/PlcList'
import Rack from 'src/components/PlcRack'
import { Mobile, Default } from 'src/constants/mediaQueries'

const withRack = Page => {
  return class extends React.Component {
    static async getInitialProps (ctx) {
      const props = Page.getInitialProps ? await Page.getInitialProps(ctx) : {}
      const { BACKEND_URL } = props.def
      const { diagnostic } = nextCookie(ctx)
      const url = diagnostic ? `${BACKEND_URL}/diagnostic?id=${diagnostic}` : `${BACKEND_URL}/racks`
      const res = await fetch(url)
      const json = await res.json()
      const data = diagnostic ? json.racks : json
      return {
        ...props,
        diagnostic: diagnostic,
        racks: data
      }
    }

    state = {
      racks: this.props.racks
    }

    subscribe = () => {
      const { diagnostic } = this.props
      const { WEBSOCK_URL } = this.props.def
      this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
      this.ws.onerror = e => console.log(e)
      this.ws.onmessage = e => {
        const data = JSON.parse(e.data)
        Object.keys(data).forEach((key) => {
          if (!diagnostic && key === 'racks') {
            this.setState({
              overview: data[key]
            })
          }
        })
      }
    }

    componentDidMount () {
      this.subscribe()
    }

    componentWillUnmount () {
      this.ws.close()
    }

    render () {
      const { APS_TITLE, SIDEBAR_MENU, WEBSOCK_URL } = this.props.def
      const { rackNumber } = this.props.router.query
      const rack = this.state.racks[rackNumber]
      const title = rack !== undefined ? `PLC Digital I/O - ${rack.title}` : `PLC Digital I/O`
      return (
        <Layout
          aps={APS_TITLE}
          pageTitle={title}
          sidebarMenu={SIDEBAR_MENU}
          socket={`${WEBSOCK_URL}?channel=ch2`}
        >
          {
            rack !== undefined &&
            <React.Fragment>
              <Mobile>
                <Link href={`/${this.props.currentUser.aps}/racks`}><a>[Back]</a></Link>
                <List rack={rack} />
              </Mobile>
              <Default>
                <Link href={`/${this.props.currentUser.aps}/racks`}><a>[Back]</a></Link>
                <Rack rack={rack} />
              </Default>
            </React.Fragment>
          }
        </Layout>
      )
    }
  }
}

export default withRack