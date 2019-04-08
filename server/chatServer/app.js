const WebSocket = require('ws')

// ws的服务端
const wss = new WebSocket.Server({ port: 8081 })

// ws 是指具体连接到我服务器的某一个客户端
wss.on('connection', function connection(ws) {
  // 该客户端给我服务器发送了消息
  ws.on('message', function incoming(message) {
    // console.log('received: %s', message)
    if (message === '你好') {
      ws.send('你也好...')
    } else if (message === '你吃了吗?') {
      ws.send('我吃了，你呢?')
    } else {
      ws.send('你说的是啥，我听不懂哦~')
    }
  })

  // 服务器给客户端发送消息
  ws.send('欢迎您的访问!')
})
