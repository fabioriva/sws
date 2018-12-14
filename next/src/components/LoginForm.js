import cookie from 'cookie'
import redirect from 'src/lib/redirect'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

const dev = process.env.NODE_ENV !== 'production'
const ROOT_URL = dev ? process.env.BACKEND_URL : 'https://www.sotefinservice.com'
const COOKIE_MAX_AGE = 1 * 24 * 60 * 60 // 1 day

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch(`${ROOT_URL}/authentication`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values })
        })
        .then(res => res.json())
	      .then(res => {
          if (res.success) {
            const { token, aps } = res
            const options = { maxAge: COOKIE_MAX_AGE }
            document.cookie = cookie.serialize('token', token, options)
            // document.cookie = cookie.serialize('user', JSON.stringify(user), options)
            // document.cookie = cookie.serialize('userContext', user.aps[0], options)
            // if (aps !== undefined && aps.length == 1 ) {
            //   redirect({}, `/${aps[0]}/overview`)
            // } else {
            //   // TODO: aps selection
            //   redirect({}, `/muse/overview`)
            // }
            redirect({}, `/${aps}/overview`)         
          } else {
            this.props.form.setFields({
              username: {
                value: values.username,
                errors: [new Error(res.message)]
              },
              password: {
                value: '',
                errors: [new Error(res.message)]
              },
            })
            this.setState({ message: res.message })
          }
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input className='login-form-input' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input className='login-form-input' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox disabled>Remember me</Checkbox>
          )}
          <a className='login-form-forgot' href='mailto:info@sotefin.ch'>Forgot password</a>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Log in
          </Button>
          <div>Or <a href='mailto:info@sotefin.ch'>register now!</a></div>
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
          .login-form-forgot {
            float: right;
          }
          .login-form-button {
            width: 100%;
          }
        `}</style>
      </Form>
    )
  }
}

export default Form.create()(NormalLoginForm)
