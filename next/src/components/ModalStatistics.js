import { Modal, Form, Button, DatePicker, Radio } from 'antd'
import intl from 'react-intl-universal'

const { RangePicker } = DatePicker

const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

const ModalQuery = props => {
  const { getFieldDecorator, getFieldsError } = props.form
  const { filter, range, visible } = props.data
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
  return (
    <Modal
      style={{ minWidth: 640 }}
      title={intl.get('QUERY_FILTERS')}
      visible={visible}
      footer={[
        <Button
          key='back'
          onClick={props.onCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          disabled={hasErrors(getFieldsError())}
          onClick={() => props.onConfirm(range.value[0], range.value[1], filter.value)}
        >
          {intl.get('CONFIRM')}
        </Button>
      ]}
    >
      <Form layout='vertical'>
        <Form.Item
          {...formItemLayout}
          label={intl.get('FROM_TO')}
        >
          {getFieldDecorator('range', rangeConfig)(
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format='YYYY-MM-DD HH:mm'
              placeholder={[intl.get('START'), intl.get('END')]}
            />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={intl.get('FILTERS')}
        >
          {getFieldDecorator('filter')(
            <Radio.Group>
              <Radio value='a'>{intl.get('ALL')}</Radio>
              <Radio value='b'>{intl.get('ALARMS')}</Radio>
            </Radio.Group>
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create({
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
})(ModalQuery)
