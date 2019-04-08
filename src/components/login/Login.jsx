import React, { Component } from 'react'

import './Login.css'

import { Form } from 'semantic-ui-react'

import axios from 'axios'

export default class Login extends Component {
  constructor() {
    super()

    this.state = {
      uname: '',
      pwd: ''
    }
  }

  changeValue = event => {
    this.setState({
        [event.target.name]:event.target.value
    })
  }

  login = () => {
      // console.log(this.state)
      axios.post('users/login',this.state).then(response=>{
        if (response.data.meta.status === 200){
          // 保存token及uid到本地
          localStorage.setItem('mytoken',response.data.data.token)
          localStorage.setItem('uid',response.data.data.uid)

          // 跳转到布局组件
          this.props.history.push('/layout')
        }
      })
  }

  render() {
      const {uname,pwd} = this.state
    return (
      <div className="login-container">
        <div className="login-title">登录</div>
        <div className="login-form">
          <Form onSubmit={this.login}>
            <Form.Field>
              <Form.Input
                required
                icon="user"
                size="big"
                name="uname"
                iconPosition="left"
                value={uname}
                onChange={this.changeValue}
                placeholder="请输入用户名"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                required
                type="password"
                icon="lock"
                size="big"
                name="pwd"
                value={pwd}
                onChange={this.changeValue}
                iconPosition="left"
                placeholder="请输入密码"
              />
            </Form.Field>
            <Form.Button positive content="登录" />
          </Form>
        </div>
      </div>
    )
  }
}
