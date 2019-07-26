import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Button, Input, InputNumber } from 'antd'
import intl from 'react-intl-universal'

const FormItem = Form.Item

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class OperationRequestForm extends Component {
  componentDidMount () {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
    console.log('componentDidMount', hasErrors(this.props.form.getFieldsError()))
  }
  render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const inputStyle = {
      width: '80%'
    }
    // Only show error after a field is touched.
    const cardError = isFieldTouched('card') && getFieldError('card')
    // const toError = isFieldTouched('dateTo') && getFieldError('dateTo')
    // const inputNumberStyle = {
    //   width: '100%'
    // }
    // console.log('>>>>>>', this.props.data)
    const { card, operationId, visible } = this.props.data
    // console.log(card)
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 8 }
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 }
    //   }
    // }
    // const rangeConfig = {
    //   rules: [{ type: 'array', required: true, message: 'Please select time!' }]
    // }
    // const filterConfig = {
    //   rules: [{ type: 'array', required: true, message: 'Please select time!' }]
    // }
    return (
      <Modal
        // style={{ minWidth: 640 }}
        title={intl.get('OPERATION_REQUEST')}
        visible={visible}
        footer={[
          <Button
            key='back'
            onClick={this.props.onCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            disabled={hasErrors(getFieldsError())}
            type='primary'
            onClick={() => this.props.onConfirm(card.value, operationId.value)}
          >
            {operationId.value === 0 ? <span>{intl.get('EXIT')}</span> : <span>{intl.get('ENTRY')}</span>}
          </Button>
        ]}
      >
        <Form layout='horizontal'>
          <FormItem
            validateStatus={cardError ? 'error' : 'success'}
            help={cardError || ''}
            label={intl.get('CARD_NUMBER')}
          >
            {getFieldDecorator('card', {
              // initialValue: {card},
              rules: [{
                required: true,
                type: 'integer',
                min: card.min,
                max: card.max,
                message: `${intl.get('INSERT_VALID_CARD')}` }]
            })(
              <InputNumber
                style={inputStyle}
                placeholder={intl.get('INSERT_CARD')}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('operationId', {
              initialValue: 0,
              rules: [{
                required: true,
                type: 'integer' }]
            })(
              <Input
                type='hidden'
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

OperationRequestForm.propTypes = {
  form: PropTypes.object
}

const OperationModal = Form.create({
  mapPropsToFields (props) {
    // console.log('mapPropsToFields', props)
    return {
      // card: Form.createFormField(props.data.card),
      // operationId: Form.createFormField(props.data.operationId)
      card: Form.createFormField({
        ...props.data.card,
        value: props.data.card.value
      }),
      operationId: Form.createFormField({
        ...props.data.operationId,
        value: props.data.operationId.value
      })
    }
  },
  onFieldsChange (props, fields) {
    console.log('onFieldsChange', props, fields)
    props.onChange(fields)
  }
})(OperationRequestForm)

// const OperationModal = Form.create()(OperationRequestForm)

export default OperationModal
