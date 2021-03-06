import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import { Modal, Form, Button, DatePicker, Radio } from 'antd'
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
  onChange = (date, dateString) => {
    console.log(date, dateString)
  }
  render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
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
            disabled={hasErrors(getFieldsError())}
            onClick={() => this.props.onConfirm(range.value[0], range.value[1], filter.value)}
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
              </RadioGroup>
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

// const QueryModal = connect((state) => {
//   // const { history } = state
//   // return history.modal
//   console.log('redux state:', state)
//   return state
// })(Form.create({
//   mapPropsToFields (props) {
//     return {
//       range: Form.createFormField({
//         ...props.data.range,
//         value: props.data.range.value
//       }),
//       filter: Form.createFormField({
//         ...props.data.filter,
//         value: props.data.filter.value
//       })
//     }
//   },
//   onFieldsChange (props, fields) {
//     console.log('onFieldsChange', props, fields)
//     props.onChange(fields)
//   }
// })(HistoryQueryForm))

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
      })
    }
  },
  onFieldsChange (props, fields) {
    console.log('onFieldsChange', props, fields)
    props.onChange(fields)
  }
})(HistoryQueryForm)

export default QueryModal
