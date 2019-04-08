import React, { Component } from 'react'

import { Route, Link } from 'react-router-dom'

import { Grid, Icon } from 'semantic-ui-react'

// 导入子组件
import Home from '../home/Home.jsx'
import Info from '../info/Info.jsx'
import Chat from '../chat/Chat.jsx'
import Mine from '../mine/Mine.jsx'

// 导入Layout.css
import './Layout.css'

const Menu = ({ menuName, iconName, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        return (
          <Link to={to}>
            {/* <div className={match ? 'placeholder active' : 'placeholder '}> */}
            <div className={`placeholder ${match ? 'active' : ''}`}>
              <Icon name={iconName} />
              <div>{menuName}</div>
            </div>
          </Link>
        )
      }}
    />
  )
}

export default class Layout extends Component {
  render() {
    return (
      <div>
        {/* 1.0 路由部分 */}
        <div className="main-content">
          <Route exact path="/layout" component={Home} />
          <Route path="/layout/info" component={Info} />
          <Route path="/layout/chat" component={Chat} />
          <Route path="/layout/mine" component={Mine} />
        </div>
        {/* 2.0 自定义Link部分 */}
        <div className="main-menu">
          <Grid centered padded>
            <Grid.Row divided columns={4}>
              <Grid.Column>
                <Menu
                  to="/layout"
                  activeOnlyWhenExact={true}
                  menuName="首页"
                  iconName="user secret"
                />
              </Grid.Column>
              <Grid.Column>
                <Menu
                  to="/layout/info"
                  menuName="咨询"
                  iconName="window restore"
                />
              </Grid.Column>
              <Grid.Column>
                <Menu to="/layout/chat" menuName="微聊" iconName="microchip" />
              </Grid.Column>
              <Grid.Column>
                <Menu
                  to="/layout/mine"
                  menuName="我的"
                  iconName="window maximize"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    )
  }
}
