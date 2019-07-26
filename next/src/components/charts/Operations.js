import React from 'react'
import PropTypes from 'prop-types'
import { Empty } from 'antd'
import {
  BarChart,
  Bar,
  CartesianGrid,
  Label,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const Chart = ({ data, label }) => (
  <div>
    { data.length !== 0 ? (
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout='horizontal' margin={{ top: 5, right: 5, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' height={100} interval={0} angle={-90} textAnchor='end'>
              <Label value={label} offset={0} position='insideBottom' />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Legend verticalAlign='top' />
            <Bar dataKey='entries' stackId='a' fill='#00ff00' barSize={32}>
              <LabelList dataKey='entries' position='inside' />
            </Bar>
            <Bar dataKey='exits' stackId='a' fill='#ff0000' barSize={32}>
              <LabelList dataKey='exits' position='inside' />
            </Bar>
            <Bar dataKey='total' stackId='c' fill='#ffff00' barSize={32}>
              <LabelList dataKey='total' position='inside' />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
  </div>
)

Chart.propTypes = {
  data: PropTypes.array.isRequired
}

export default Chart
