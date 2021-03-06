import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Layout from 'src/components/Layout'
import List from 'src/components/PlcList'
import Rack from 'src/components/PlcRack'
import { Mobile, Default } from 'src/constants/mediaQueries'

export default (def, role) => {
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
      return (
        <Layout
          aps={APS_TITLE}
          pageTitle={`PLC Digital I/O - ${rack.title}`}
          sidebarMenu={SIDEBAR_MENU}
          socket={`${WEBSOCK_URL}?channel=ch2`}
        >
          <Mobile>
            <Link href={`/${APS}/plc`}><a>[Back]</a></Link>
            <List rack={rack} />
          </Mobile>
          <Default>
            <Link href={`/${APS}/plc`}><a>[Back]</a></Link>
            <Rack rack={rack} />
          </Default>
          <style jsx global>{`
            .rack-container {
              position: relative;
              background-color: #c0c0c0;
              border: 1px solid #000000;
              height: 364px;
              width: 100%;
              left: 0px;
              top: 20px;
              text-align: center;
            }
            .rack {
              color: #808080;
              font-family: "Arial", Sans-Serif;
              font-size: 48px;
              font-weight: 600;
              vertical-align: middle;
              line-height: 364px;
            }
            /* ET200M */
            .card-et200m {
              position: absolute;
              border: 1px solid #000000;
              height: 360px;
              width: 160px;
              background-color: #505050;
              color: #000000;
              text-align: center;
              vertical-align: middle;
              line-height: 16px;
            }
            .title-et200m {
              height: 18px;
              color: #FFFF00;
            }
            .label-et200m {
              position: absolute;
              height: 18px;
              width: 69px;
              background-color: #FFFF00;
              border: 1px solid #000000;
              font-size: 14px;
            }
            .type-et200m {
              position: absolute;
              right: 10px;
              top: 342px;
              height: 18px;
              color: #F0F0F0;
              font-family: "Arial", Sans-Serif;
              font-size: 12px;
              text-align: center;
            }
            .bit-et200m-id {
              position: absolute;
              line-height: 18px;
              height: 18px;
              width: 45px;
              background-color: #FFFFFF;
              border: 1px solid #000000;
              font-size: 0.78em;
            }
            .bit-et200m-st {
              position: absolute;
              height: 18px;
              width: 12px;
              border-top: 1px solid #000000;
              border-bottom: 1px solid #000000;
            }
            .bit-et200m-nr {
              position: absolute;
              line-height: 18px;
              height: 18px;
              width: 12px;
              background-color: #E0E0E0;
              border: 1px solid #000000;
            }
            .bit-false {
              background-color: #C0C0C0;
            }
            .bit-true {
              background-color: #00FF00;
            }
            /**
            * Cards
            */
            .c1 {
              left: 1px;
              top: 1px;
            }
            .c2 {
              left: 162px;
              top: 1px;
            }
            .c3 {
              left: 323px;
              top: 1px;
            }
            .c4 {
              left: 484px;
              top: 1px;
            }
            .c5 {
              left: 645px;
              top: 1px;
            }
            .c6 {
              left: 806px;
              top: 1px;
            }
            .b0 {
              left: 10px;
              top: 159px;
            }
            .b0-i0-id {
              left: 34px;
              top: 23px;
            }
            .b0-i0-st {
              left: 22px;
              top: 23px;
            }
            .b0-i0-nr {
              left: 10px;
              top: 23px;
            }
            .b0-i1-id {
              left: 34px;
              top: 40px;
            }
            .b0-i1-st {
              left: 22px;
              top: 40px;
            }
            .b0-i1-nr {
              left: 10px;
              top: 40px;
            }
            .b0-i2-id {
              left: 34px;
              top: 57px;
            }
            .b0-i2-st {
              left: 22px;
              top: 57px;
            }
            .b0-i2-nr {
              left: 10px;
              top: 57px;
            }
            .b0-i3-id {
              left: 34px;
              top: 74px;
            }
            .b0-i3-st {
              left: 22px;
              top: 74px;
            }
            .b0-i3-nr {
              left: 10px;
              top: 74px;
            }
            .b0-i4-id {
              left: 34px;
              top: 91px;
            }
            .b0-i4-st {
              left: 22px;
              top: 91px;
            }
            .b0-i4-nr {
              left: 10px;
              top: 91px;
            }
            .b0-i5-id {
              left: 34px;
              top: 108px;
            }
            .b0-i5-st {
              left: 22px;
              top: 108px;
            }
            .b0-i5-nr {
              left: 10px;
              top: 108px;
            }
            .b0-i6-id {
              left: 34px;
              top: 125px;
            }
            .b0-i6-st {
              left: 22px;
              top: 125px;
            }
            .b0-i6-nr {
              left: 10px;
              top: 125px;
            }
            .b0-i7-id {
              left: 34px;
              top: 142px;
            }
            .b0-i7-st {
              left: 22px;
              top: 142px;
            }
            .b0-i7-nr {
              left: 10px;
              top: 142px;
            }
            .b1 {
              left: 10px;
              top: 176px;
            }
            .b1-i0-id {
              left: 34px;
              top: 193px;
            }
            .b1-i0-st {
              left: 22px;
              top: 193px;
            }
            .b1-i0-nr {
              left: 10px;
              top: 193px;
            }
            .b1-i1-id {
              left: 34px;
              top: 210px;
            }
            .b1-i1-st {
              left: 22px;
              top: 210px;
            }
            .b1-i1-nr {
              left: 10px;
              top: 210px;
            }
            .b1-i2-id {
              left: 34px;
              top: 227px;
            }
            .b1-i2-st {
              left: 22px;
              top: 227px;
            }
            .b1-i2-nr {
              left: 10px;
              top: 227px;
            }
            .b1-i3-id {
              left: 34px;
              top: 244px;
            }
            .b1-i3-st {
              left: 22px;
              top: 244px;
            }
            .b1-i3-nr {
              left: 10px;
              top: 244px;
            }
            .b1-i4-id {
              left: 34px;
              top: 261px;
            }
            .b1-i4-st {
              left: 22px;
              top: 261px;
            }
            .b1-i4-nr {
              left: 10px;
              top: 261px;
            }
            .b1-i5-id {
              left: 34px;
              top: 278px;
            }
            .b1-i5-st {
              left: 22px;
              top: 278px;
            }
            .b1-i5-nr {
              left: 10px;
              top: 278px;
            }
            .b1-i6-id {
              left: 34px;
              top: 295px;
            }
            .b1-i6-st {
              left: 22px;
              top: 295px;
            }
            .b1-i6-nr {
              left: 10px;
              top: 295px;
            }
            .b1-i7-id {
              left: 34px;
              top: 312px;
            }
            .b1-i7-st {
              left: 22px;
              top: 312px;
            }
            .b1-i7-nr {
              left: 10px;
              top: 312px;
            }
            .b2 {
              left: 78px;
              top: 159px;
            }
            .b2-i0-id {
              left: 78px;
              top: 23px;
            }
            .b2-i0-st {
              left: 123px;
              top: 23px;
            }
            .b2-i0-nr {
              left: 135px;
              top: 23px;
            }
            .b2-i1-id {
              left: 78px;
              top: 40px;
            }
            .b2-i1-st {
              left: 123px;
              top: 40px;
            }
            .b2-i1-nr {
              left: 135px;
              top: 40px;
            }
            .b2-i2-id {
              left: 78px;
              top: 57px;
            }
            .b2-i2-st {
              left: 123px;
              top: 57px;
            }
            .b2-i2-nr {
              left: 135px;
              top: 57px;
            }
            .b2-i3-id {
              left: 78px;
              top: 74px;
            }
            .b2-i3-st {
              left: 123px;
              top: 74px;
            }
            .b2-i3-nr {
              left: 135px;
              top: 74px;
            }
            .b2-i4-id {
              left: 78px;
              top: 91px;
            }
            .b2-i4-st {
              left: 123px;
              top: 91px;
            }
            .b2-i4-nr {
              left: 135px;
              top: 91px;
            }
            .b2-i5-id {
              left: 78px;
              top: 108px;
            }
            .b2-i5-st {
              left: 123px;
              top: 108px;
            }
            .b2-i5-nr {
              left: 135px;
              top: 108px;
            }
            .b2-i6-id {
              left: 78px;
              top: 125px;
            }
            .b2-i6-st {
              left: 123px;
              top: 125px;
            }
            .b2-i6-nr {
              left: 135px;
              top: 125px;
            }
            .b2-i7-id {
              left: 78px;
              top: 142px;
            }
            .b2-i7-st {
              left: 123px;
              top: 142px;
            }
            .b2-i7-nr {
              left: 135px;
              top: 142px;
            }
            .b3 {
              left: 78px;
              top: 176px;
            }
            .b3-i0-id {
              left: 78px;
              top: 193px;
            }
            .b3-i0-st {
              left: 123px;
              top: 193px;
            }
            .b3-i0-nr {
              left: 135px;
              top: 193px;
            }
            .b3-i1-id {
              left: 78px;
              top: 210px;
            }
            .b3-i1-st {
              left: 123px;
              top: 210px;
            }
            .b3-i1-nr {
              left: 135px;
              top: 210px;
            }
            .b3-i2-id {
              left: 78px;
              top: 227px;
            }
            .b3-i2-st {
              left: 123px;
              top: 227px;
            }
            .b3-i2-nr {
              left: 135px;
              top: 227px;
            }
            .b3-i3-id {
              left: 78px;
              top: 244px;
            }
            .b3-i3-st {
              left: 123px;
              top: 244px;
            }
            .b3-i3-nr {
              left: 135px;
              top: 244px;
            }
            .b3-i4-id {
              left: 78px;
              top: 261px;
            }
            .b3-i4-st {
              left: 123px;
              top: 261px;
            }
            .b3-i4-nr {
              left: 135px;
              top: 261px;
            }
            .b3-i5-id {
              left: 78px;
              top: 278px;
            }
            .b3-i5-st {
              left: 123px;
              top: 278px;
            }
            .b3-i5-nr {
              left: 135px;
              top: 278px;
            }
            .b3-i6-id {
              left: 78px;
              top: 295px;
            }
            .b3-i6-st {
              left: 123px;
              top: 295px;
            }
            .b3-i6-nr {
              left: 135px;
              top: 295px;
            }
            .b3-i7-id {
              left: 78px;
              top: 312px;
            }
            .b3-i7-st {
              left: 123px;
              top: 312px;
            }
            .b3-i7-nr {
              left: 135px;
              top: 312px;
            }
          `}
          </style>
        </Layout>
      )
    }
  }
}
