import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import { Modal, Form, Button, DatePicker, InputNumber, Radio } from 'antd'
// import moment from 'moment'
import intl from 'react-intl-universal'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { RangePicker } = DatePicker

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class HistoryQueryForm extends Component {
  componentDidMount () {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }
  render () {
    const { getFieldDecorator, getFieldsError, getFieldError, getFieldValue, isFieldTouched } = this.props.form
    // Only show error after a field is touched.
    // const fromError = isFieldTouched('dateFrom') && getFieldError('dateFrom')
    // const toError = isFieldTouched('dateTo') && getFieldError('dateTo')
    // const inputNumberStyle = {
    //   width: '100%'
    // }
    const { filter, range, visible } = this.props.data
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }]
    }
    // const filterConfig = {
    //   rules: [{ type: 'array', required: true, message: 'Please select time!' }]
    // }
    const c = 'Insert card number'
    const d = 'Insert stall number'
    const e = 'Insert alarm id'
    const inputLabel = getFieldValue('filter') === 'c' ? c : getFieldValue('filter') === 'd' ? d : getFieldValue('filter') === 'e' ? e : 'Not used'
    return (
      <Modal
        style={{ minWidth: 640 }}
        title={intl.get('QUERY_FILTERS')}
        visible={visible}
        footer={[
          <Button
            key='back'
            onClick={this.props.onCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            disabled={hasErrors(getFieldsError())}
            onClick={() => this.props.onConfirm(this.props.data)} //range.value[0], range.value[1], filter.value, number.value)}
          >
            {intl.get('CONFIRM')}
          </Button>
        ]}
      >
        <Form layout='vertical'>
          <FormItem
            {...formItemLayout}
            label={intl.get('FROM_TO')}
          >
            {getFieldDecorator('range', rangeConfig)(
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format='YYYY-MM-DD HH:mm'
                placeholder={[intl.get('START'), intl.get('END')]}
                onChange={this.onChange}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('FILTERS')}
          >
            {getFieldDecorator('filter')(
              <RadioGroup>
                <Radio value='a'>{intl.get('ALL')}</Radio>
                <Radio value='b'>{intl.get('ALARMS')}</Radio>
                <Radio value='c'>Card</Radio>
                <Radio value='d'>Stall</Radio>
                <Radio value='e'>Alarm</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={inputLabel}
            style={{ display: getFieldValue('filter') === 'a' ? 'none' : getFieldValue('filter') === 'b' ? 'none' : 'block' }}
          >
            {getFieldDecorator('number', {
              // initialValue: 1,
              rules: [{
                required: true,
                type: 'integer',
                min: 1,
                max: 10,
                message: 'Please insert a valid number!' }],
            })(
              <InputNumber
                // style={inputStyle}
                placeholder='Insert number here'
                disabled={getFieldValue('filter') === 'a' || getFieldValue('filter') === 'b'}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

HistoryQueryForm.propTypes = {
  form: PropTypes.object
}

const QueryModal = Form.create({
  mapPropsToFields (props) {
    return {
      range: Form.createFormField({
        ...props.data.range,
        value: props.data.range.value
      }),
      filter: Form.createFormField({
        ...props.data.filter,
        value: props.data.filter.value
      }),
      number: Form.createFormField({
        ...props.data.number,
        value: props.data.number.value
      })
    }
  },
  onFieldsChange (props, fields) {
    props.onChange(fields)
  }
})(HistoryQueryForm)

export default QueryModal
