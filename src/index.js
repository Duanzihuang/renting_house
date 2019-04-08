import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.jsx'

import axios from 'axios'
axios.defaults.baseURL = 'http://47.96.21.88:8086/'

// axios 的拦截器
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    if (localStorage.getItem('mytoken')) {
        config.headers.Authorization = localStorage.getItem('mytoken')
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

ReactDOM.render(<App />, document.getElementById('root'))
