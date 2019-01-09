import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Button, Icon, Input, InputNumber, TimePicker } from 'antd'
import moment from 'moment'

const FormItem = Form.Item

const inputStyle = {
  // display: 'block',
  // margin: '12px 0',
  width: '100%'
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CardEditForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  checkTimeFrom = (rule, value, callback) => {
    const { validateFields } = this.props.form;
    validateFields(['timeTo'], {
      force: true,
    });
    callback();
  }
  checkTimeTo = (rule, value, callback) => {
    const end = value;
    const { getFieldValue } = this.props.form;
    const start = getFieldValue('timeFrom');
    if (!end || !start) {
      callback('please select both start and end time');
    } else if (end.valueOf() < start.valueOf()) {
      callback('start time should be less than end time');
    } else {
      callback();
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const { card, code, timeFrom, timeTo, visible } = this.props.data
    // Only show error after a field is touched.
    const cardError = isFieldTouched('card') && getFieldError('card')
    const codeError = isFieldTouched('code') && getFieldError('code')
    const timeFromError = isFieldTouched('timeFrom') && getFieldError('timeFrom')
    const timeToError = isFieldTouched('timeTo') && getFieldError('timeTo')
    return (
      <Modal
        title='Edit Card'
        visible={this.props.data.visible}
        footer={[
          <Button
            key='back'
            onClick={this.props.onCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            disabled={hasErrors(getFieldsError())}
            // onClick={() => this.props.onOk(card.value, code.value, timeFrom.value, timeTo.value)}
            onClick={() => this.props.onOk(card.value, code.value, timeFrom.value.format('HH:mm:ss'), timeTo.value.format('HH:mm:ss'))}
          >
            Confirm request
          </Button>
        ]}
      >
        <Form layout='horizontal' onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={cardError ? 'error' : 'success'}
            help={cardError || ''}
            label='Card number'
          >
            {getFieldDecorator('card', {
              // initialValue: 1,
              rules: [{
                required: true,
                type: 'integer',
                min: 1,
                max: this.props.cards,
                message: 'Please insert a valid card number!' }],
            })(
              <InputNumber
                style={inputStyle}
                placeholder='Insert card number here'
                disabled
              />
            )}
          </FormItem>
          <FormItem
            validateStatus={codeError ? 'error' : 'success'}
            help={codeError || ''}
            label='Card PIN code'
          >
            {getFieldDecorator('code', {
              // initialValue: '000',
              rules: [{
                required: true,
                type: 'string',
                len: 3,
                pattern: '^[a-fA-F0-9]{3}$',
                message: 'Please insert a valid pin code!' }],
            })(
              <Input
                style={inputStyle}
                placeholder='Insert pin code here'
              />
            )}
          </FormItem>
          <FormItem
            validateStatus={timeFromError ? 'error' : 'success'}
            help={timeFromError || ''}
            label='From Time'
          >
            {getFieldDecorator('timeFrom', {
              rules: [{
                required: true,
                type: 'object', // moment object
                message: 'Please insert a valid time!' }, this.checkTimeFrom],
            })(
              <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            )}
          </FormItem>
          <FormItem
            validateStatus={timeToError ? 'error' : 'success'}
            help={timeToError || ''}
            label='To Time'
          >
            {getFieldDecorator('timeTo', {
              rules: [{
                required: true,
                type: 'object', // moment object
                message: 'Please insert a valid time!' }, this.checkTimeTo],
            })(
              <TimePicker defaultOpenValue={moment('23:59:59', 'HH:mm:ss')} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const CardModal = connect((state) => {

  // console.log('redux state:', state)
  // const { cards } = state
  return state
})(Form.create({
  mapPropsToFields (props) {
    // console.log(props.data)
    // props = props.data
    return {
      card: Form.createFormField({
        ...props.data.card,
        value: props.data.card.value
      }),
      code: Form.createFormField({
        ...props.data.code,
        value: props.data.code.value
      }),
      timeFrom: Form.createFormField({
        ...props.data.timeFrom,
        value: props.data.timeFrom.value  //moment(props.data.timeFrom.value, 'HH:mm:ss')
      }),
      timeTo: Form.createFormField({
        ...props.data.timeTo,
        value: props.data.timeTo.value  //moment(props.data.timeTo.value, 'HH:mm:ss')
      })
    }
  },
  onFieldsChange (props, fields) {
    // console.log('onFieldsChange', props.data, fields)
    props.onChange(fields)
  }
})(CardEditForm))

export default CardModal
