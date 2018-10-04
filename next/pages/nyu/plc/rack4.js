import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from 'src/components/Layout'
import List from 'src/components/PlcList'
import Rack from 'src/components/PlcRack'
import { Mobile, Default } from 'src/constants/mediaQueries'
import { APS, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/nyu'
import openNotification from 'src/lib/openNotification'
import withAuth from 'src/lib/withAuth'

class AppUi extends React.Component {
  static async getInitialProps () {
    const res = await fetch(`${BACKEND_URL}/aps/nyu/racks`)
    const statusCode = res.statusCode > 200 ? res.statusCode : false
    const json = await res.json()
    return {
      statusCode,
      racks: json
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      comm: { isOnline: false },
      diag: { alarmCount: 0 },
      racks: props.racks
    }
  }
  componentDidMount () {
    this.ws = new WebSocket(WEBSOCK_URL)
    this.ws.onerror = e => console.log(e)
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      Object.keys(data).forEach((key) => {
        if (key === 'comm') this.setState({ comm: data[key] })
        if (key === 'diag') this.setState({ diag: data[key] })
        if (key === 'mesg') openNotification(data[key])
        if (key === 'racks') {
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
    const rack = this.state.racks[3]
    return (
      <Layout
        aps={APS}
        pageTitle={`PLC Digital I/O - ${rack.title}`}
        sidebarMenu={SIDEBAR_MENU}
        comm={this.state.comm}
        diag={this.state.diag}
      >
        <Mobile>
          <List rack={rack} />
        </Mobile>
        <Default>
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
            cursor: help;
          }
          .bit-et200m-st {
            position: absolute;
            height: 18px;
            width: 12px;
            background-color: #C0C0C0;
            border-top: 1px solid #000000;
            border-bottom: 1px solid #000000;
            cursor: help;
          }
          .bit-et200m-nr {
            position: absolute;
            line-height: 18px;
            height: 18px;
            width: 12px;
            background-color: #E0E0E0;
            border: 1px solid #000000;
            cursor: help;
          }
          /* ET200S */
          .card-et200s {
            position: absolute;
            border: 1px solid #000000;
            height: 360px;
            width: 88px;
            background-color: #505050;
            color: #000000;
            text-align: center;
            vertical-align: middle;
            line-height: 16px;
          }
          .title-et200s {
            height: 18px;
            color: #ffff00;
          }
          .label-et200s {
            position: absolute;
            height: 18px;
            width: 65px;
            background-color: #FFFF00;
            border: 1px solid #000000;
            font-size: 14px;
          }
          .type-et200s {
            position: absolute;
            left: 4px;
            top: 342px;
            height: 18px;
            color: #F0F0F0;
            font-family: "Arial", Sans-Serif;
            font-size: 0.58em;
            text-align: left;
          }
          .bit-et200s-id {
            position: absolute;
            line-height: 18px;
            height: 18px;
            width: 65px;
            background-color: #FFFFFF;
            border: 1px solid #000000;
            font-size: 0.78em;
          }
          .bit-et200s-st {
            position: absolute;
            height: 18px;
            width: 12px;
            background-color: #C0C0C0;
            border-top: 1px solid #000000;
            border-bottom: 1px solid #000000;
          }
          .bit-et200s-nr {
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
          * Card 01
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

export default withAuth(AppUi)
