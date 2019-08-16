import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Statistic } from 'antd'
import { Chart } from 'react-google-charts'

const Occupancy = ({ data }) => (
  <div>
    <Card title='Occupancy'>
      <Card.Grid>
        <Card bordered={false}>
          <Statistic
            title='Vacant'
            value={data[0].value}
            valueStyle={{ color: '#3f8600' }}
            prefix={<Icon type='arrow-down' />}
          />
        </Card>
      </Card.Grid>
      <Card.Grid>
        <Card bordered={false}>
          <Statistic
            title='Busy'
            value={data[1].value}
            valueStyle={{ color: '#cf1322' }}
            prefix={<Icon type='arrow-up' />}
          />
        </Card>
      </Card.Grid>
      <Card.Grid>
        <Card bordered={false}>
          <Statistic
            title='Locked'
            value={data[2].value}
            valueStyle={{ color: '#9c27b0' }}
            prefix={<Icon type='lock' />}
          />
        </Card>
      </Card.Grid>
    </Card>
    <Card>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['1', '2'],
          [data[0].name, data[0].value],
          [data[1].name, data[1].value],
          [data[2].name, data[2].value]
        ]}
        options={{
          title: 'Map occupancy',
          is3D: true,
          colors: ['#00ff00', '#ff0000', '#ff00ff']
        }}
        rootProps={{ 'data-testid': '3' }}
      />
    </Card>
  </div>
)

Occupancy.propTypes = {
  data: PropTypes.array.isRequired
}

export default Occupancy
