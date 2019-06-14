import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Statistic } from 'antd'
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'

const COLORS = ['#00ff00', '#ff0000', '#ff00ff']

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
      <PieChart width={360} height={240}>
        <Pie data={data} dataKey='value' outerRadius={80} fill='#8884d8' legendType='square' isAnimationActive={false} label>
          {
            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index} />)
          }
        </Pie>
        <Tooltip />
        <Legend layout='vertical' verticalAlign='top' align='left' />
      </PieChart>
    </Card>
  </div>
)

Occupancy.propTypes = {
  data: PropTypes.array.isRequired
}

export default Occupancy
