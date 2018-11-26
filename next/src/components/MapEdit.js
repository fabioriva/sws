import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, InputNumber } from 'antd'
import intl from 'react-intl-universal'

class Edit extends React.Component {
  render () {
    const style = {
      display: 'block',
      margin: '12px 0',
      width: '60%'
    }
    const { cards, stalls, stallStatus, data } = this.props
    return (
      <Modal
        title={intl.get('EDIT_STALL')}
        visible={data.visible}
        onOk={() => this.props.onConfirm(data.stall, data.value)}
        onCancel={this.props.onCancel}
        footer={[
          <Button key='back' size='large' onClick={this.props.onCancel}>
            Cancel
          </Button>,
          <Button
            key='card'
            type='primary'
            size='large'
            onClick={() => this.props.onConfirm(data.stall, data.value)}
            disabled={data.value < 1 || data.value > cards}
          >
            {intl.get('CARD')}
          </Button>,
          <Button key='canc' type='primary' size='large' onClick={() => this.props.onConfirm(data.stall, stallStatus.FREE)}>
            {intl.get('CLEAR')}
          </Button>,
          <Button key='lock' type='primary' size='large' onClick={() => this.props.onConfirm(data.stall, stallStatus.LOCK)}>
            {intl.get('LOCK')}
          </Button>
        ]}
      >
        <label style={style} htmlFor='stall-nr'>{intl.get('STALL_NUMBER')}</label>
        <InputNumber
          id='stall-nr'
          style={style}
          min={1}
          max={stalls}
          defaultValue={data.stall}
          value={data.stall}
          onChange={(e) => this.props.onChange(e, data.value)}
        />
        <label style={style} htmlFor='card-nr'>{intl.get('CARD_NUMBER')}</label>
        <InputNumber
          id='card-nr'
          style={style}
          min={1}
          max={cards}
          defaultValue={data.value}
          value={data.value}
          onChange={(e) => this.props.onChange(data.stall, e)}
          disabled={data.isFixedMap}
        />
      </Modal>
    )
  }
}

Edit.propTypes = {
  data: PropTypes.object.isRequired
}

export default Edit
