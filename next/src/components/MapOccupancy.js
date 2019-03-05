import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'

const COLORS = ['#00ff00', '#ff0000', '#ff00ff']

const Occupancy = ({ data }) => (
  <Card title='Map Occupancy'>
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
)

Occupancy.propTypes = {
  data: PropTypes.array.isRequired
}

export default Occupancy
