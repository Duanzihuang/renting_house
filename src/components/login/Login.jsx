import React, { Component } from 'react'

import './Login.css'

import { Button, InputItem, Toast } from 'antd-mobile'

import axios from 'axios'

export default class Login extends Component {
  constructor() {
    super()

    this.state = {
      uname: '',
      pwd: ''
    }
  }

  changeUname = val => {
    this.setState({
      uname: val
    })
  }

  changePwd = val => {
    this.setState({
      pwd: val
    })
  }

  login = () => {
    axios.post('users/login', this.state).then(response => {
      if (response.data.meta.status === 200) {
        // 保存token及uid到本地
        localStorage.setItem('mytoken', response.data.data.token)
        localStorage.setItem('uid', response.data.data.uid)

        // 跳转到布局组件
        this.props.history.push('/layout')
      } else {
        Toast.info(response.data.meta.msg)
      }
    })
  }

  render() {
    const { uname, pwd } = this.state
    return (
      <div className="login-container">
        <div className="login-title">登录</div>
        <div className="login-form">
          <InputItem
            name="uname"
            value={uname}
            onChange={this.changeUname}
            placeholder="请输入用户名"
          />
          <InputItem
            name="pwd"
            value={pwd}
            onChange={this.changePwd}
            type="password"
            placeholder="请输入密码"
          />
          <Button style={{ marginTop: 20 }} onClick={this.login} type="primary">
            登录
          </Button>
        </div>
      </div>
    )
  }
}
