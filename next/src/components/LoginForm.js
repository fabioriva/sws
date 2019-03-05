import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { login } from 'src/lib/auth'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

class NormalLoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = { error: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (event) {
    event.preventDefault()
    const url = this.props.apiUrl

    this.props.form.validateFields(async (err, credentials) => {
      if (!err) {
        const { username, password } = credentials

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          })
          console.log(response)
          if (response.ok) {
            const { token, aps } = await response.json()
            login({ token, aps })
          } else {
            const { message } = await response.json()
            this.setState({ error: message })
            console.log(this.state.error)
            this.props.form.setFields({
              username: {
                value: username,
                errors: [new Error(message)]
              },
              password: {
                value: '',
                errors: [new Error(message)]
              }
            })
          }
        } catch (error) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error
          )
          throw new Error(error)
        }
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input className='login-form-input' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }]
          })(
            <Input className='login-form-input' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox disabled>Remember me</Checkbox>
          )}
          <a className='login-form-forgot' href='mailto:info@sotefin.ch'>Forgot password</a>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Log in
          </Button>
          <div>Or <a href='mailto:info@sotefin.ch'>register now!</a></div>
        </Form.Item>
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
