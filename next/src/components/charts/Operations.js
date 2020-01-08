import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { Chart } from 'react-google-charts'

const Stat = ({ data, label, title }) => {
  const chartData = [['Transactions', 'Entries', { role: 'annotation' }, 'Exits', { role: 'annotation' }, 'Total', { role: 'annotation' }]]
  for (let i = 0; i < data.length; i += 1) {
    chartData.push([data[i].name, data[i].entries, data[i].entries, data[i].exits, data[i].exits, data[i].total, data[i].total])
  }
  return (
  <>
    { data.length > 0 &&
      <Card>
        <Chart
          width={'100%'}
          // height={'300px'}
          chartType='ColumnChart' // 'Bar' material design
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            // Material design options
            // chart: {
            //   title: title,
            //   subtitle: 'Entries, Exits, and total transactions: ' + label,
            // },
            // bars: 'vertical',
            title: title,
            subtitle: 'Entries, Exits, and total transactions: ' + label,
            bar: { groupWidth: '60%' },
            height: 400,
            // colors: ['#1b9e77', '#d95f02', '#7570b3']
            hAxis: {
              title: 'Entries, Exits, and total transactions: ' + label,
              minValue: 0,
              textStyle: {
                bold: true,
                fontSize: 12,
                color: '#4d4d4d'
              },
              // titleTextStyle: {
              //   bold: true,
              //   fontSize: 18,
              //   color: '#4d4d4d'
              // }
            },
          }}
          // For tests
          rootProps={{ 'data-testid': '2' }}
        />
      </Card>
    }
  </>
)}

Stat.propTypes = {
  data: PropTypes.array.isRequired
}

export default Stat
