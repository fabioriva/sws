import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Empty } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend } from 'recharts'

const Chart = ({ data, label, showModal }) => (
  <Card
    // actions={[
    //   <Icon type='setting' onClick={() => showModal()} disabled />,
    //   <Icon type='reload' onClick={() => showModal()} disabled />,
    //   <Icon type='search' onClick={() => showModal()} />
    // ]}
    extra={<Icon type='search' style={{ fontSize: '16px' }} onClick={() => showModal()} />}
    headStyle={{ background: '#fafafa', borderBottom: '1px solid #e8e8e8' }}
  >
    { data.length !== 0 ? (
      <BarChart width={480} height={320} data={data} layout='horizontal' margin={{ top: 5, right: 5, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' height={100} interval={0} angle={-90} textAnchor='end'>
          <Label value={label} offset={0} position='insideBottom' />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend verticalAlign='top' />
        <Bar dataKey='entries' stackId='a' fill='#00ff00' barSize={32} label />
        <Bar dataKey='exits' stackId='a' fill='#ff0000' barSize={32} label />
      </BarChart>
    ) : <Empty />
    }
  </Card>
)

Chart.propTypes = {
  data: PropTypes.array.isRequired
}

export default Chart
