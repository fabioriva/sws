import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend } from 'recharts'

const Chart = ({ title, data }) => (
  <Card title={title}>
    <BarChart width={600} height={480} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' height={100} interval={0} angle={-90} textAnchor='end'>
        <Label value='Operations' offset={0} position='insideBottom' />
      </XAxis>
      <YAxis />
      <Tooltip />
      <Legend verticalAlign='top' />
      <Bar dataKey='entries' stackId='a' fill='#00ff00' barSize={32} label />
      <Bar dataKey='exits' stackId='a' fill='#ff0000' label />
    </BarChart>
  </Card>
)

Chart.propTypes = {
  data: PropTypes.array.isRequired
}

export default Chart
