import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Layout from 'src/components/Layout'
import List from 'src/components/PlcList'
import Rack from 'src/components/PlcRack'
import { Mobile, Default } from 'src/constants/mediaQueries'

export default function (def, role) {
  const { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } = def
  return class extends React.Component {
    static async getInitialProps (ctx) {
      const props = {
        activeItem: '4',
        pageRole: role
      }
      // check if diagnostic is active
      const { diagnostic } = nextCookie(ctx)
      if (diagnostic) {
        const res = await fetch(`${BACKEND_URL}/aps/${APS}/diagnostic?id=${diagnostic}`)
        if (res.ok) {
          const json = await res.json()
          return {
            ...props,
            diagnostic: diagnostic,
            racks: json.racks
          }
        }
      }
      // if diagnostic is not active fetch data
      const res = await fetch(`${BACKEND_URL}/aps/${APS}/racks`)
      const json = await res.json()
      return {
        ...props,
        racks: json
      }
    }

    constructor (props) {
      super(props)
      this.state = {
        isFetching: true,
        racks: props.racks
      }
    }

    componentDidMount () {
      const { diagnostic } = this.props
      this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
      this.ws.onerror = e => console.log(e)
      this.ws.onmessage = e => {
        const data = JSON.parse(e.data)
        Object.keys(data).forEach((key) => {
          if (!diagnostic && key === 'racks') {
            this.setState({
              isFetching: false,
              racks: data[key]
            })
          }
        })
      }
    }

    componentWillUnmount () {
      this.ws.close()
    }

    render () {
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
                <Link href={`/${APS}/racks`}><a>[Back]</a></Link>
                <List rack={rack} />
              </Mobile>
              <Default>
                <Link href={`/${APS}/racks`}><a>[Back]</a></Link>
                <Rack rack={rack} />
              </Default>
            </React.Fragment>
          }
        </Layout>
      )
    }
  }
}
