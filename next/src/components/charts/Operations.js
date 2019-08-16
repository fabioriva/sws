import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { Chart } from 'react-google-charts'

const Stat = ({ data, label, title }) => {
  const chartData = [['Transactions', 'Entries', 'Exits', 'Total']]
  for (let i = 0; i < data.length; i += 1) {
    chartData.push([data[i].name, data[i].entries, data[i].exits, data[i].total])
  }
  console.log(chartData)
  return (
  <>
    { data.length > 0 &&
      <Card>
        <Chart
          width={'80%'}
          height={'300px'}
          chartType='Bar'
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            // Material design options
            chart: {
              title: title,
              subtitle: 'Entries, Exits, and total transactions: ' + label,
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
