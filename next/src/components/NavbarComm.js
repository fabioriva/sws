import { Layout } from 'antd'

const { Header } = Layout

export default (props) => {
  return (
    <Header
      className='app-comm'
    >
      <div className='bar-comm' />
      <style jsx global>{`
        .app-comm {
          background: #fff!important;
          height: 3px;
        }
        .bar-comm {
          background: #87d068;
          height: 3px;
          width: ${props.percent}%;
        }
      `}</style>
    </Header>
  )
}
