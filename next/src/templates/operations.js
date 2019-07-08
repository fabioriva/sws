import React from 'react'
import classnames from 'classnames'
import fetch from 'isomorphic-unfetch'
import { Row, Col, Steps, Card, Icon, List, Popover, Tooltip } from 'antd'
import Layout from 'src/components/Layout'
import Panel from 'src/components/ArrowsPanel'

const { Step } = Steps
const { Grid } = Card

const gridStyle = {
  width: '50%',
  textAlign: 'center'
}

// const customDot = (dot, { status, index }) => (
//   <Popover
//     content={
//       <span>
//         step {index} status: {status}
//       </span>
//     }
//   >
//     {dot}
//   </Popover>
// )

export default (def, role) => {
  const { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } = def
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  return class extends React.Component {
    static async getInitialProps () {
      const props = {
        activeItem: '8',
        pageRole: role
      }
      // if diagnostic is not active fetch data
      const res = await fetch(`${BACKEND_URL}/aps/${APS}/overview`)
      const json = await res.json()
      return {
        ...props,
        overview: json
      }
    }
    constructor (props) {
      super(props)
      this.state = {
        isFetching: true,
        overview: props.overview
      }
    }
    componentDidMount () {
      const { diagnostic } = this.props
      this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
      this.ws.onerror = e => console.log(e)
      this.ws.onmessage = e => {
        const data = JSON.parse(e.data)
        Object.keys(data).forEach((key) => {
          if (!diagnostic && key === 'overview') {
            this.setState({
              isFetching: false,
              overview: data[key]
            })
          }
        })
      }
    }
    componentWillUnmount () {
      this.ws.close()
    }
    render () {
      const { devices } = this.state.overview
      const { id, name, card, mode, operation, size, stall, step } = devices[0].a

      // console.log(devices[0].e)

      const pos = []
      devices[0].b.forEach((b, i) => {
        pos.push(
          <Grid
            style={gridStyle}
            key={i}
          >
            <span className='grid-title'>
              {b.name}
            </span>
            <div className='grid-value'>
              <span>{b.position}<Icon style={{ margin: '0 6px' }} type='arrow-right' />{b.destination}</span>
            </div>
          </Grid>
        )
      })

      const alarm = devices[0].c[2].status

      const description =
        <Card
          // style={{ width: 320 }}
        >
          <Grid style={gridStyle}><span className='grid-title'>Card</span><div className='grid-value'>{card}</div></Grid>
          <Grid style={gridStyle}><span className='grid-title'>Destination</span><div className='grid-value'>{stall}</div></Grid>
          { pos }
        </Card>

      const silomat =
        <Card
          title='Silomat'
          // style={{ width: 320 }}
        >
          {
            devices[0].f.map((item, key) =>
              <Tooltip
                title={item.info}
                key={key}
              >
                <Grid
                  style={gridStyle}
                  // key={item}
                >
                  <span className='grid-title'>{item.label}</span>
                  <div className='grid-value'>
                    <Icon
                      theme='filled'
                      type='check-circle'
                      className={classnames({
                        'lamp lamp-ready-on': item.status,
                        'lamp lamp-ready-off': !item.status
                      })}
                    />
                    {/* <span className='lamp-label'>{item.label}</span> */}
                  </div>
                </Grid>
              </Tooltip>
            )
          }
        </Card>

      // const silomat = <Card
      //   style={{ width: 600 }}
      // >
      //   <List
      //     grid={{ gutter: 0, column: 8 }}
      //     dataSource={devices[0].f}
      //     renderItem={item => (
      //       <Tooltip title={item.info}>
      //         <List.Item>
      //           <Icon
      //             theme='filled'
      //             type='check-circle'
      //             className={classnames({
      //               'lamp lamp-ready-on': item.status,
      //               'lamp lamp-ready-off': !item.status
      //             })}
      //           /><span className='lamp-label'>{item.label}</span>
      //         </List.Item>
      //       </Tooltip>
      //     )}
      //   />
      // </Card>

      const steps = devices[0].e.map(s =>
        <Step
          title={s.info}
          // description={s.id === step && (s.type === 0 ? description : silomat)}
          icon={s.id !== 0 && s.id === step && <Icon type='loading' />}
          key={s.id}
        />
      )

      const slides = devices[0].e.map((s, key) =>
        <div
          className='slides-content'
          key={key}
        >
          {/* <Row type='flex' justify='space-around' align='middle'>
            {(s.type === 0 ? description : s.data)}
          </Row> */}
          {
            s.type === 0 && description
          }
          {
            s.type === 1 && silomat
          }
          {
            s.type === 2 && <Panel data={s.data} />
          }
        </div>
      )

      return (
        <Layout
          aps={APS_TITLE}
          pageTitle='Operations'
          sidebarMenu={SIDEBAR_MENU}
          socket={`${WEBSOCK_URL}?channel=ch2`}
        >
          {/* <div style={{ width: '80%' }}>
            <Steps
              size='small'
              current={step}
              direction='vertical'
            >
              {steps}
            </Steps>
          </div> */}

          <Row gutter={32}>
            <Col span={6}>
              <Steps
                size='small'
                current={step}
                direction='vertical'
              >
                {steps}
              </Steps>
            </Col>
            <Col span={18}>
              {slides[step]}
            </Col>
          </Row>

          {/* <div style={{ width: '80%' }}>
            <Steps
              // size='small'
              current={step}
              // direction='vertical'
              progressDot={customDot}
            >
              {steps}
            </Steps>
          </div> */}

          <style jsx global>{`
            .ant-card-grid {
              padding: 3px!important;
            }
            .ant-list-grid .ant-list-item {
              margin-bottom: 6px;
            }
            .grid-title {
              font-size: 14px;
            }
            .grid-value {
              font-size: 14px;
              font-weight: bold;
              color: #364d79;
            }
            .lamp-label {
              margin: 0 6px;
              font-weight: bold;
            }
            .lamp-ready-on {
              color: #00a854;
            }
            .lamp-ready-off {
              color: #e9e9e9;
            }
            .slides-content {
              margin-top: 16px;
              border: 1px dashed #e9e9e9;
              border-radius: 6px;
              text-align: center;
              {/* background-color: #00ff00; */}
              {/* min-height: 480px; */}
              {/* padding-top: 80px; */}
            }
          `}</style>
        </Layout>
      )
    }
  }
}