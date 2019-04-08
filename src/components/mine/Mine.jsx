import React, { Component } from 'react'
import './Mine.css'
import axios from 'axios'

import { Button, Grid, Icon, Modal } from 'semantic-ui-react'

import AvatarEditor from 'react-avatar-editor'

/**
 * 裁剪图片模态框组件
 */
class CropImageModal extends Component {
  constructor() {
    super()

    this.state = {
      scale: 1
    }
  }

  changeScale = e => {
    this.setState({
      scale: parseFloat(e.target.value)
    })
  }

  upload = async () => {
    if (this.editor) {
      //1、拿到图片的base64编码
      const imgBase64 = this.editor.getImageScaledToCanvas().toDataURL()

      //2、上传头像到后台
      const result = await axios.post('my/avatar', {
        avatar: imgBase64
      })

      if (result.data.meta.status === 200) {
        this.props.onCropImageClose(imgBase64)
      }
    }
  }

  render() {
    const { isOpenCropImageModal, avatar, onCropImageClose } = this.props

    return (
      <Modal
        size="small"
        open={isOpenCropImageModal}
        onClose={() => {
          onCropImageClose(null)
        }}
      >
        <Modal.Header>裁剪图片</Modal.Header>
        <Modal.Content>
          <AvatarEditor
            ref={editor => {
              this.editor = editor
            }}
            image={avatar}
            borderRadius={90}
            width={180}
            height={180}
            border={50}
            color={[0, 0, 0, 0.55]} // RGBA
            scale={this.state.scale}
            rotate={0}
          />
          <div>
            <span className="avatar-zoom">缩放:</span>
            <input
              type="range"
              onChange={this.changeScale}
              value={this.state.scale}
              min="1"
              max="2"
              step="0.01"
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            onClick={this.upload}
            labelPosition="right"
            content="确定"
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

/**
 * 选择图片模态框组件
 */
class SelectImageModal extends Component {
  constructor() {
    super()

    this.fileRef = React.createRef()
  }

  // 点了确定
  selectImage = () => {
    const file = this.fileRef.current.files[0]

    if (file) {
      this.props.onSelectImageClose(file)
    } else {
      this.props.onSelectImageClose(null)
    }
  }

  render() {
    const { isOpenImageModal, onSelectImageClose } = this.props
    return (
      <Modal
        size="small"
        open={isOpenImageModal}
        onClose={() => {
          onSelectImageClose(null)
        }}
      >
        <Modal.Header>请选择图片</Modal.Header>
        <Modal.Content>
          <input ref={this.fileRef} type="file" />
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={this.selectImage}
            positive
            icon="checkmark"
            labelPosition="right"
            content="确定"
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default class Mine extends Component {
  constructor() {
    super()

    this.state = {
      avatar: null, // 选择图片模态框选择的图片
      avatarPath: '', //头像路径
      username: '',
      isOpenImageModal: false, // 是否打开选择图片的模态框
      isOpenCropImageModal: false //是否打开裁剪图片的模态框
    }
  }

  async componentWillMount() {
    const result = await axios.post('my/info', {
      user_id: localStorage.getItem('uid')
    })

    if (result.data.meta.status === 200) {
      this.setState({
        username: result.data.data.username,
        avatarPath: result.data.data.avatar
      })
    }
  }

  onSelectImageClose = file => {
    // 关闭第一个模态框
    this.setState({
      isOpenImageModal: false
    })

    if (file) {
      //打开第二个裁剪图片的模态窗口
      this.state.avatar = file
      this.setState({
        isOpenCropImageModal: true
      })
    }
  }

  onCropImageClose = imgBase64 => {
    this.setState({
      isOpenCropImageModal: false
    })

    if (imgBase64) {
      this.setState({
        avatarPath: imgBase64
      })
    }
  }

  render() {
    const {
      avatarPath,
      username,
      isOpenImageModal,
      isOpenCropImageModal,
      avatar
    } = this.state
    return (
      <div className="my-container">
        {/* 图片选择的模态框 */}
        <SelectImageModal
          isOpenImageModal={isOpenImageModal}
          onSelectImageClose={this.onSelectImageClose}
        />
        {/* 裁剪图片的模态框 */}
        <CropImageModal
          avatar={avatar}
          isOpenCropImageModal={isOpenCropImageModal}
          onCropImageClose={this.onCropImageClose}
        />
        <div className="my-title">
          <img src="http://47.96.21.88:8086/public/my-bg.png" alt="" />
          <div className="info">
            <div className="myicon">
              <img
                src={avatarPath}
                onClick={() => {
                  this.setState({ isOpenImageModal: true })
                }}
                alt=""
              />
            </div>
            <div className="name">{username}</div>
            <Button positive size="mini">
              已认证
            </Button>
            <div className="edit">编辑资料</div>
          </div>
        </div>
        <Grid padded className="my-menu">
          <Grid.Row columns={3}>
            <Grid.Column>
              <Icon name="clock outline" size="large" />
              <div>看房记录</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="yen sign" size="big" />
              <div>我的订单</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="bookmark outline" size="big" />
              <div>我的收藏</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="user outline" size="big" />
              <div>个人资料</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="home" size="big" />
              <div>身份认证</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="microphone" size="big" />
              <div>联系我们</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="my-ad">
          <img src="http://47.96.21.88:8086/public/ad.png" alt="" />
        </div>
      </div>
    )
  }
}
