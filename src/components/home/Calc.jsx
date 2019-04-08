import React, { Component } from 'react'
import { Icon, Tab, Grid, Dropdown, Input, Button } from 'semantic-ui-react'
import ReactEcharts from 'echarts-for-react'

class MyEcharts extends Component {
  getOption = () => {
    const { chartData } = this.props

    return {
      title: {
        text: '贷款数据统计',
        // subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{c}'
        // formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['贷款总额', '利息']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          // data:[
          //   {value:335, name:'贷款总额'},
          //   {value:310, name:'支付利息'},
          //   {value:200, name:'利息'}
          // ],
          data: chartData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  getOption2 = () => {
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
  }

  render() {
    return <ReactEcharts option={this.getOption()} />
  }
}

class First extends Component {
  constructor() {
    super()

    this.state = {
      type: 1, //默认的贷款方式是1
      year: 1, //默认选中10年
      total: 0, //贷款的总数
      rate: 1, //默认贷款利率为4.9
      //贷款方式
      types: [
        { key: 1, value: 1, text: '按贷款总额' },
        { key: 2, value: 2, text: '按房间总额' }
      ],
      //贷款年限
      years: [
        { key: 1, value: 1, text: '10年' },
        { key: 2, value: 2, text: '20年' },
        { key: 3, value: 3, text: '30年' }
      ],
      // 贷款利率
      rates: [
        { key: 1, text: '基准利率(4.9%)', value: 1 },
        { key: 2, text: '基准利率9.5折', value: 2 },
        { key: 3, text: '基准利率9折', value: 3 },
        { key: 4, text: '基准利率8.5折', value: 4 }
      ],
      chartData: [
        { value: 335, name: '贷款总额' },
        { value: 310, name: '利息' }
      ]
    }
  }

  calc = () => {
    this.setState({
      chartData: [
        { value: 500, name: '贷款总额' },
        { value: 100, name: '利息' }
      ]
    })
  }

  render() {
    const {
      type,
      types,
      total,
      year,
      years,
      rate,
      rates,
      chartData
    } = this.state
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={6}>贷款方式</Grid.Column>
          <Grid.Column width={10}>
            <Dropdown
              placeholder="请选择贷款方式"
              onChange={(e, data) => {
                this.setState({ type: data.value })
              }}
              selection
              options={types}
              value={type}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>贷款总额(万元)</Grid.Column>
          <Grid.Column width={10}>
            <Input
              value={total}
              onChange={e => {
                this.setState({ total: e.target.value })
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>贷款年限</Grid.Column>
          <Grid.Column width={10}>
            <Dropdown
              placeholder="请选择贷款年限"
              onChange={(e, data) => {
                this.setState({ year: data.value })
              }}
              selection
              options={years}
              value={year}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>贷款利率</Grid.Column>
          <Grid.Column width={10}>
            <Dropdown
              placeholder="请选择贷款利率"
              onChange={(e, data) => {
                this.setState({ rate: data.value })
              }}
              selection
              options={rates}
              value={rate}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Button onClick={this.calc} positive fluid>
              计算
            </Button>
          </Grid.Column>
        </Grid.Row>
        <div className="calc-chart">
          <MyEcharts chartData={chartData} />
        </div>
      </Grid>
    )
  }
}

export default class Calc extends Component {
  render() {
    const panes = [
      {
        menuItem: '商业贷款',
        render: () => (
          <Tab.Pane>
            <First />
          </Tab.Pane>
        )
      },
      { menuItem: '公积金贷款', render: () => <Tab.Pane>公积金贷款</Tab.Pane> },
      { menuItem: '组合贷款', render: () => <Tab.Pane>组合贷款</Tab.Pane> }
    ]

    return (
      <div className="home-calc">
        <div className="home-calc-title">
          <Icon onClick={this.props.hideCalc} name="angle left" size="large" />
          贷款利率
        </div>
        <Tab panes={panes} />
      </div>
    )
  }
}
