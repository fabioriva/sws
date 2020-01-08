import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Empty } from 'antd'
import { Chart } from 'react-google-charts'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend } from 'recharts'

const Chart_ = ({ data, label, showModal }) => {
  const chartData = [['Alarm Id', 'Count', { type: 'string', role: 'tooltip', p: { html: true } }]]
  for (let i = 0; i < data.length; i += 1) {
    let tooltip = `
    <div style="padding:12px; width:250px">
    <p><strong>${data[i].name}</strong></p>
    <p>Count:<br /><strong>${data[i].total}</strong></p>
    <p>${data[i].info}</p>
    </div>
    `
    chartData.push([data[i].name, data[i].total, tooltip])
  }
  // const chartData = [['Alarm Id', 'Count']]
  // for (let i = 0; i < data.length; i += 1) {
  //   chartData.push([data[i].name, data[i].total])
  // }
  return (
    <Card
      // actions={[
      //   <Icon type='setting' onClick={() => showModal()} disabled />,
      //   <Icon type='reload' onClick={() => showModal()} disabled />,
      //   <Icon type='search' onClick={() => showModal()} />
      // ]}
      // extra={<Icon type='search' style={{ fontSize: '16px' }} onClick={() => showModal()} />}
      // headStyle={{ background: '#fafafa', borderBottom: '1px solid #e8e8e8' }}
    >
      { data.length > 0 && 
        // <BarChart width={480} height={320} data={data} layout='horizontal' margin={{ top: 5, right: 5, left: 0, bottom: 20 }}>
        //   <CartesianGrid strokeDasharray='3 3' />
        //   <XAxis dataKey='name' height={100} interval={0} angle={-90} textAnchor='end'>
        //     <Label value={label} offset={0} position='insideBottom' />
        //   </XAxis>
        //   <YAxis />
        //   <Tooltip />
        //   <Legend verticalAlign='top' />
        //   <Bar dataKey='total' stackId='a' fill='#ff0000' barSize={64} label />
        // </BarChart>
        <Chart
          width={'500px'}
          height={'300px'}
          chartType='BarChart'
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            title: 'Statistics',
            chartArea: { width: '60%' },
            hAxis: {
              title: 'Total events',
              minValue: 0,
            },
            vAxis: {
              title: 'Alarm',
            },
            tooltip: {
              isHtml: true
            },
            colors: ['#ff0000']
          }}
          // For tests
          rootProps={{ 'data-testid': '1' }}
        />
      }
    </Card>
  )
}

Chart.propTypes = {
  data: PropTypes.array.isRequired
}

export default Chart_
