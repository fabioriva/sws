import React, { Component } from 'react'
import { Row, Col, Card, Carousel, Button, Icon, Modal } from 'antd'

const confirm = Modal.confirm

// function showConfirm (card, index) {
//   confirm({
//     title: 'Do you want to delete this item ?',
//     content: `Deleting card ${card} from the exit queue`,
//     onOk () {
//       return new Promise((resolve, reject) => {
//         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
//       }).catch(() => console.log('Oops errors!'))
//     },
//     onCancel () {}
//   })
// }

// class Slide extends Component {
//   render () {
//     const { card, id } = this.props
//     return (
//       <div className='queue-slide'>
//         <p className='queue-title'>
//           { id === 0 ? <span>Next</span> : <span>Position {id + 1}</span> }
//         </p> 
//         <p className='queue-value'>
//           <Button style={{ marginRight: 16 }} type='default' icon='delete' shape='circle' onClick={() => this.props.onDelete(card, id)} />
//           <Icon style={{ marginRight: 16 }} type='car' />
//           {card}
//         </p>
//       </div>
//     )
//   }
// }

class Slide extends Component {
  render () {
    const { card, id } = this.props
    return (
      <Card.Grid style={{ width: '100%', margin: 1, textAlign: 'center' }}>
        {/* <Row>
          <Col span={6}>
            { id === 0 ? <span>Next</span> : <span>Position {id + 1}</span> }
          </Col>
          <Col span={6}>
            <Button style={{ marginRight: 16 }} type='default' icon='delete' shape='circle' onClick={() => this.props.onDelete(card, id)} disabled/>
            <Icon style={{ marginRight: 16 }} type='car' />
            {card}
          </Col>
        </Row> */}
        <span>
          {/* { id === 0 ? <span>Next</span> : <span>Position {id + 1}</span> } */}
          <Button style={{ marginRight: 16 }} type='default' icon='delete' size='small' shape='circle' onClick={() => this.props.onDelete(card, id)} disabled/>
          <Icon style={{ marginRight: 16 }} type='car' />
          {card}
        </span>
      </Card.Grid>
    )
  }
}

class Queue extends Component {
  handleDelete = (card, index) => {
    console.log(card, index)
    confirm({
      title: 'Do you want to delete this item ?',
      content: `Deleting card ${card} from the exit queue`,
      onOk () {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
      },
      onCancel () {}
    })
  }
  render () {
    const {
      queueList,
      exitButton,
    } = this.props.exitQueue
    const queue = []
    queueList.forEach((item, i) => {
      if (item.card !== 0) queue.push(<div key={i}><Slide card={item.card} id={i} onDelete={this.handleDelete} /></div>)
    })
    const button =
      <Button
        style={{ width: '100%' }}
        type='default'
        disabled={!exitButton.disabled.status}
        icon='logout'
        onClick={() => this.props.showModal(0)}
      >
        Exit Car
      </Button>
    return (
      <div>
        <Card
          title='Exit Queue'
          actions={[button]}
          style={{ width: '100%' }}
        >
          {/*
          <Carousel autoplay={queue.length > 1} autoplayInterval={3000}> */}
            {queue.length > 0 ? queue : <div className='queue-slide'><p style={{ verticalAlign: 'middle', lineHeight: '98px' }}>Empty</p></div>}
          {/* </Carousel> */}
          {/*
          <div className='queue-footer'>
            {button}
          </div> */}
        </Card>
        <style jsx global>{`
          .queue-slide {
            text-align: center;
            height: 98px!important;
          }
          .queue-value {
            font-size: 18px;
            color: #364d79;
            padding-top: 8px;
          }
          .queue-footer {
            border: 1px solid #e9e9e9;
            padding: 8px;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}

export default Queue
