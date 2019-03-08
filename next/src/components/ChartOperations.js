import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Empty } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend } from 'recharts'

const Chart = ({ data, label, showModal }) => (
  <Card
    actions={[
      // <Icon type='reload' onClick={() => showModal()} />,
      <Icon type='search' onClick={() => showModal()} />
    ]}
    style={{ width: 680 }}
  >
    { data.length !== 0 ? (
      <BarChart width={640} height={480} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' height={100} interval={0} angle={-90} textAnchor='end'>
          <Label value={label} offset={0} position='insideBottom' />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend verticalAlign='top' />
        <Bar dataKey='entries' stackId='a' fill='#00ff00' barSize={32} label />
        <Bar dataKey='exits' stackId='a' fill='#ff0000' label />
      </BarChart>
    ) : <Empty />
    }
  </Card>
)

Chart.propTypes = {
  data: PropTypes.array.isRequired
}

export default Chart
