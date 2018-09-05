import cookie from 'cookie'
import redirect from '../lib/redirect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navbarSetUser } from '../store'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item
const COOKIE_MAX_AGE = 1 * 24 * 60 * 60 // 1 day

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('https://www.sotefinservice.com/signin', {
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
            const { token, user } = res
            console.log('From Login Form:', token, user, typeof user.roles, user.roles)
            this.props.navbarSetUser(user)
            document.cookie = cookie.serialize('token', token, { COOKIE_MAX_AGE })
            document.cookie = cookie.serialize('user', JSON.stringify(user), { COOKIE_MAX_AGE })
            document.cookie = cookie.serialize('userContext', user.roles, { COOKIE_MAX_AGE })
            // TODO: check roles
            redirect({}, '/muse/overview')
          } else {
            this.setState({ message: 'Wrong username or password' })
          }
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input className='login-form-input' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input className='login-form-input' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className='login-form-forgot' href=''>Forgot password</a>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Log in
          </Button>
          <div>Or <a href=''>register now!</a></div>
        </FormItem>
        <p style={{ color: 'red', fontSize: 20, textAlign: 'center' }}>{this.state.message}</p>
        <style jsx global>{`
          .login-form {
            max-width: 300px
          }
          .login-form-forgot {
            float: right
          }
          .login-form-button {
            width: 100%
          }
        `}</style>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

// export default WrappedNormalLoginForm

const mapStateToProps = ({ navbar }) => ({ navbar })

const mapDispatchToProps = (dispatch) => {
  return {
    navbarSetUser: bindActionCreators(navbarSetUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
