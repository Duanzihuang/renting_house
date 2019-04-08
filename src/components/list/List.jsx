import React, { Component } from 'react'
import axios from 'axios'
import { Icon, Item } from 'semantic-ui-react'

export default class List extends Component {
  constructor() {
    super()

    this.state = {
      menuName: '', // 房屋类型
      list: [] // 房屋列表
    }
  }

  async componentWillMount() {
    // const { menuName, home_type } = this.props.location.state
    // HashBrowser query方式传值
    const { menuName, home_type } = this.props.location.query

    const result = await axios.post(`homes/list`, {
      home_type
    })

    if (result.data.meta.status === 200) {
      this.setState({
        menuName,
        list: result.data.data
      })
    }
  }

  render() {
    const { menuName, list } = this.state
    return (
      <div className="house-list">
        {/* 标题 */}
        <div className="house-list-title">
          <Icon
            onClick={() => {
              this.props.history.goBack()
            }}
            size="large"
            name="angle left"
          />
          <span>{menuName}</span>
        </div>
        {/* 内容部分 */}
        <div className="house-list-content">
          <Item.Group unstackable>
            {list.map(item => {
              return (
                <Item key={item.id}>
                  <Item.Image src="http://47.96.21.88:8086/public/home.png" />
                  <Item.Content>
                    <Item.Header>{item.home_name}</Item.Header>
                    <Item.Meta>{item.home_desc}</Item.Meta>
                    <Item.Description>{item.home_tags}</Item.Description>
                    <Item.Description>{item.home_price}</Item.Description>
                  </Item.Content>
                </Item>
              )
            })}
          </Item.Group>
        </div>
      </div>
    )
  }
}
