import React, { Component } from 'react'
import axios from 'axios'
import { Item, Button, Icon, Modal, TextArea } from 'semantic-ui-react'
import Tloader from 'react-touch-loader'
import './Loader.css'

export default class Loader extends Component {
  constructor(props) {
    super()

    this.state = {
      initializing: 1,
      hasMore: true, //是否还有数据
      type: props.type,
      pagenum: 0, //开始的条数
      pagesize: 2, //每页多少条
      list: [],
      open: false, //模态窗口的开关
      content: ''
    }
  }

  // 当父组件给子组件传递的props发生了改变
  componentWillReceiveProps(nextProps) {
    this.state.type = nextProps.type

    // 重置，然后根据type去加载该type的第一页数据
    this.setState(
      {
        pagenum: 0,
        pagesize: 2,
        hasMore: true,
        list: []
      },
      () => {
        this.loadData()
      }
    )
  }

  componentWillMount() {
    this.loadData()
  }

  // 加载数据
  loadData = async resolve => {
    const result = await axios.post('infos/list', {
      type: this.state.type,
      pagenum: this.state.pagenum, // 开始索引  limit 0,2
      pagesize: this.state.pagesize
    })

    if (result.data.meta.status === 200) {
      const newArray = this.state.list.concat(result.data.data.list.data)
      this.setState(
        {
          list: newArray,
          hasMore: newArray.length < result.data.data.list.total
        },
        () => {
          resolve && resolve()
        }
      )
    }
  }

  close = () => {
    this.setState({
      open: false
    })
  }

  // 提交内容
  submitComment = async () => {
    if (this.state.content.trim().length === 0) {
      return
    }

    console.log(this.state.content)
    const res = await axios.post('infos/question', {
      question: this.state.content,
      question_time: new Date()
    })

    console.log(res)
    this.setState({
      content: '',
      open: false
    })
  }

  renderListView = () => {
    const { type, list, open, content } = this.state
    if (type === 1 || type === 2) {
      //咨询、头条
      return (
        <Item.Group divided unstackable>
          {list.map(item => {
            return (
              <Item key={item.id}>
                <Item.Image src="http://47.96.21.88:8086/public/1.png" />
                <Item.Content>
                  <Item.Header className="info-title">
                    {item.info_title}
                  </Item.Header>
                  <Item.Meta>$1200 1 Month</Item.Meta>
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
      )
    } else {
      // 问答
      return (
        <div>
          {/* 模态窗口 */}
          <Modal size="small" open={open}>
            <Modal.Header>发表提问</Modal.Header>
            <Modal.Content>
              <TextArea
                value={content}
                onChange={e => {
                  this.setState({ content: e.target.value })
                }}
                style={{ width: '100%', border: 0 }}
                rows={5}
                placeholder="请输入要提问的内容"
              />
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.close} negative>
                取消
              </Button>
              <Button
                positive
                icon="check"
                onClick={this.submitComment}
                labelPosition="right"
                content="发表"
              />
            </Modal.Actions>
          </Modal>
          <div className="info-ask-btn">
            <Button
              onClick={() => {
                this.setState({ open: true })
              }}
              fluid
              positive
            >
              快速提问
            </Button>
          </div>
          <ul className="info-ask-list">
            {list.map(item => {
              return (
                <li key={item.id}>
                  <div className="title">
                    <Icon color="green" name="users" size="small" />
                    {item.question_name}
                  </div>
                  <div className="user">
                    <Icon name="users" size="small" />
                    {item.username} 的回答
                  </div>
                  <div className="info">{item.answer_content}</div>
                  <div className="tag">
                    {item.question_tag &&
                      item.question_tag.split(',').map((subitem, index) => {
                        return <span key={index}>{subitem}</span>
                      })}
                    <span>{item.qnum ? item.qnum : 0}个回答</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  }

  // 把之前的内容都重置，然后加载第一页的数据
  handleRefresh = resolve => {
    this.state.pagenum = 0
    this.state.pagesize = 2
    this.setState(
      {
        list: [],
        hasMore: true
      },
      () => {
        this.loadData(resolve)
      }
    )
  }

  // 加载更多
  handleLoadMore = resolve => {
    //1 0 1
    //2 2 3
    //4 4 5
    this.state.pagenum = this.state.pagenum + this.state.pagesize

    this.loadData(resolve)
  }

  render() {
    const { initializing, hasMore } = this.state
    return (
      <div>
        <Tloader
          initializing={initializing}
          onRefresh={this.handleRefresh}
          hasMore={hasMore}
          onLoadMore={this.handleLoadMore}
          className="main"
        >
          {this.renderListView()}
        </Tloader>
      </div>
    )
  }
}
