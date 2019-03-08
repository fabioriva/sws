import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Layout from 'src/components/Layout'
import Operations from 'src/components/ChartOperations'
import { APS, APS_TITLE, APS_ID, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/trumpeldor'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'

const Statistics = props => {
  console.log(props)
  const { data } = props
  // const operations = data.map((e) => {
  //   return {
  //     name: `${e._id.year}-${e._id.month}-${e._id.day}`,
  //     entries: e.entries,
  //     exits: e.exits
  //   }
  // })
  console.log(data)
  return (
    <Layout
      aps={APS_TITLE}
      pageTitle='Statistics'
      sidebarMenu={SIDEBAR_MENU}
      socket={`${WEBSOCK_URL}?channel=ch2`}
    >
      <Operations title='System Operations' data={data} />
    </Layout>
  )
}

Statistics.getInitialProps = async ctx => {
  // Current month
  const from = moment('2018-01-07').startOf('month').hours(0).minutes(0).seconds(0) // transform to Date object for mongoose aggregate
  const to = moment().endOf('month').hours(23).minutes(59).seconds(59) // transform to Date object for mongoose aggregate
  // Last month
  // const from = moment().subtract(1, 'months').startOf('month').hours(0).minutes(0).seconds(0) // transform to Date object for mongoose aggregate
  // const to = moment().subtract(1, 'months').endOf('month').hours(23).minutes(59).seconds(59) // transform to Date object for mongoose aggregate

  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const apiUrl = process.browser
    ? `${protocol}://${window.location.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
    : `${protocol}://${ctx.req.headers.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
  const res = await fetch(apiUrl)
  const json = await res.json()
  return {
    activeItem: '7',
    pageRole: SERVICE,
    data: json
  }
}

export default withAuth(Statistics)
