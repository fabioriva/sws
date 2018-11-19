import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd'

const dev = process.env.NODE_ENV !== 'production'
const ROOT_URL = dev ? process.env.BACKEND_URL : 'https://www.sotefinservice.com'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ChangePasswordForm extends React.Component {
  state = {
    confirmDirty: false,
    message: ''
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Password does not match!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // const { username, oldPassword, newPassword, confirmPassword } = values
        // if (newPassword === confirmPassword) {
          fetch(`${ROOT_URL}/password`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ values })
          })
        // } else {
        //   this.setState({ message: `Password doesn't match` })
        // }
      }
    })
  }
  render () {
    const { getFieldDecorator, getFieldsError } = this.props.form
    const { user } = this.props.navbar
    // console.log(user)
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue: user.username,
            rules: [{
              required: true,
              type: 'string' }]
          })(
            <Input
              type='hidden'
            />
          )}
        </Form.Item>
        <Form.Item label='Default password'>
          {getFieldDecorator('oldPassword', {
            rules: [{
              required: true,
              message: 'Insert default password'
            }],
          })(
            <Input className='login-form-input' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Default password' />
          )}
        </Form.Item>
        <Form.Item label='New password'>
          {getFieldDecorator('newPassword', {
            rules: [{
              required: true,
              message: 'Insert new password'
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input className='login-form-input' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='New password' />
          )}
        </Form.Item>
        <Form.Item label='Confirm password'>
          {getFieldDecorator('confirmPassword', {
            rules: [{
              required: true,
              message: 'Confirm new password'
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input className='login-form-input' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Confirm password' />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            disabled={hasErrors(getFieldsError())}
          >
            Change password
          </Button>
        </Form.Item>
        {/* <p style={{ color: 'red', fontSize: 20, textAlign: 'center' }}>{this.state.message}</p> */}
        <style jsx global>{`
          .login-form {
            width: 100%;
            max-width: 330px;
            padding: 15px;
            margin: auto!important;
            text-align: left;
          }
          .login-form-button {
            width: 100%;
          }
        `}</style>
      </Form>
    )
  }
}

export default connect(state => state)(Form.create()(ChangePasswordForm))
