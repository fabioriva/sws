import React from 'react'
import { Modal, Button, InputNumber } from 'antd'
import intl from 'react-intl-universal'

const Edit = props => {
  const style = {
    display: 'block',
    margin: '12px 0',
    width: '60%'
  }
  const { cards, stalls, stallStatus, data } = props
  return (
    <Modal
      title={intl.get('EDIT_STALL')}
      visible={data.visible}
      onOk={() => props.onConfirm(data.stall, data.value)}
      onCancel={props.onCancel}
      footer={[
        <Button key='back' size='large' onClick={props.onCancel}>
          Cancel
        </Button>,
        <Button
          key='card'
          type='primary'
          size='large'
          onClick={() => props.onConfirm(data.stall, data.value)}
          disabled={typeof data.value !== 'number' || data.value < 1 || data.value > cards}
        >
          {intl.get('CARD')}
        </Button>,
        <Button key='canc' type='primary' size='large' onClick={() => props.onConfirm(data.stall, stallStatus.FREE)}>
          {intl.get('CLEAR')}
        </Button>,
        <Button key='lock' type='primary' size='large' onClick={() => props.onConfirm(data.stall, stallStatus.LOCK)}>
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
        onChange={(e) => props.onChange(e, data.value)}
        disabled
      />
      <label style={style} htmlFor='card-nr'>{intl.get('CARD_NUMBER')}</label>
      <InputNumber
        id='card-nr'
        style={style}
        min={0}
        max={cards}
        defaultValue={0}
        value={data.value}
        onChange={(e) => props.onChange(data.stall, e)}
        disabled={data.isFixedMap}
      />
    </Modal>
  )
}

export default Edit