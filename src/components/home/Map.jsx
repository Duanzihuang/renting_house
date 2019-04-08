import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

import {
    Map,
    Base,
} from 'rc-bmap';
  
const { Point } = Base;

export default class MyMap extends Component {
  constructor() {
    super()

    this.state = {
      // 地图上的点
      list: [
        {
          id: 1,
          x: '116.43244',
          y: '39.929986',
          type: 1
        },
        {
          id: 2,
          x: '116.424355',
          y: '39.92982',
          type: 1
        },
        {
          id: 3,
          x: '116.423349',
          y: '39.935214',
          type: 1
        },
        {
          id: 4,
          x: '116.350444',
          y: '39.931645',
          type: 1
        },
        {
          id: 5,
          x: '116.351684',
          y: '39.91867',
          type: 1
        },
        {
          id: 6,
          x: '116.353983',
          y: '39.913855',
          type: 1
        },
        {
          id: 7,
          x: '116.357253',
          y: '39.923152',
          type: 1
        },
        {
          id: 8,
          x: '116.349168',
          y: '39.923152',
          type: 1
        },
        {
          id: 9,
          x: '116.354954',
          y: '39.935767',
          type: 1
        },
        {
          id: 10,
          x: '116.36232',
          y: '39.938339',
          type: 1
        },
        {
          id: 11,
          x: '116.374249',
          y: '39.94625',
          type: 1
        },
        {
          id: 12,
          x: '116.380178',
          y: '39.953053',
          type: 1
        }
      ]
    }
  }

  componentDidMount() {
    /** 
    var BMap = window.BMap
    //1.创建地图实例
    var map = new BMap.Map('container')
    //2.设置中心点坐标
    var point = new BMap.Point(116.404, 39.915)
    //3.地图初始化，同时设置地图展示级别，级别越大，越清晰
    map.centerAndZoom(point, 15)
    //4.添加覆盖物
    map.addControl(new BMap.NavigationControl())
    map.addControl(new BMap.ScaleControl())
    //5.添加标注
    this.state.list.forEach(item => {
      var point = new BMap.Point(item.x, item.y)
      var marker = new BMap.Marker(point) // 创建标注
      map.addOverlay(marker)
    })
    */
  }

  render() {
    return (
      <div className="map-house">
        <div className="map-house-title">
          <Icon onClick={this.props.hideMap} name="angle left" size="large" />
          地图找房
        </div>
        {/* <div className="map-house-content" id="container" /> */}
        <div className="map-house-content">
            <Map
            ak="WAeVpuoSBH4NswS30GNbCRrlsmdGB5Gv"
            scrollWheelZoom
            zoom={16}
            >
                <Point name="center" lng="116.332782" lat="40.007978" />
            </Map>
        </div>
      </div>
    )
  }
}
