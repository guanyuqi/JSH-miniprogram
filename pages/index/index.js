var context = null;
Page({
  data: {
    save: false,
    src: '',
    url: '',
    hat: [{
      url: '/pages/img/1.png',
      w: 256,
      h: 256,
      x: 0,
      y: 0,
      b: 1,
    },
    {
      url: '/pages/img/2.png',
      w: 256,
      h: 256,
      x: 0,
      y: 0,
      b: 1,
    },
    {
      url: '/pages/img/3.png',
      w: 256,
      h: 256,
      x: 0,
      y: 0,
      b: 1,
    },
    {
      url: '/pages/img/4.png',
      w: 256,
      h: 256,
      x: 0,
      y: 0,
      b: 1,
      }, {
        url: '/pages/img/1.png',
        w: 256,
        h: 256,
        x: 0,
        y: 0,
        b: 1,
      },
      {
        url: '/pages/img/2.png',
        w: 256,
        h: 256,
        x: 0,
        y: 0,
        b: 1,
      },
      {
        url: '/pages/img/3.png',
        w: 256,
        h: 256,
        x: 0,
        y: 0,
        b: 1,
      },
      {
        url: '/pages/img/5.png',
        w: 256,
        h: 256,
        x: 0,
        y: 0,
        b: 1,
      }],
    normal: {
      url: '/pages/img/normal.png',
      w: 256,
      h: 256,
      x: 0,
      y: 0,
      b: 1,
    },
      hatIndex: 0,
  },
  onLoad: function() {
        this.data.src = '/pages/img/default.jpg'
        this.drawAvatar() 
  },

  //选择边框
  choseBoder(event){
    this.data.hatIndex = event.currentTarget.dataset.index
    console.log(this.data.hatIndex)
    if (this.data.hatIndex == 7){
      this.drawAvatar(35,35,140,140) 
    }else{
      this.drawAvatar() 
    }
    
  },

  // 上传头像图片
  upload() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        console.log(res)
        that.setData({
          src: res.tempFilePaths[0]
        })
        that.drawAvatar()
      }
    })
  },

  //获取用户头像
  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    console.log(e.detail.userInfo);
    //接下来写业务代码
    //console.log(e.detail.userInfo.avatarUrl)
    let avatarUrl = e.detail.userInfo.avatarUrl
    avatarUrl = avatarUrl.replace('/132', '/0');
    console.log(avatarUrl)
    that.data.url = avatarUrl
    this.handleUrl()
    //最后，记得返回刚才的页面
    wx.navigateBack({
      delta: 1
    })
  },

  //处理用户头像URL
  handleUrl(){
    let that = this
    wx.downloadFile({
      url: that.data.url,
      success: res => {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          console.log(res)
          this.setData({
            url: res.tempFilePath//将下载下来的地址给data中的变量变量
          });
          this.data.src = this.data.url
          console.log(this.data.url)
          console.log(this.data.src)
          if (this.data.hatIndex==7){
            this.drawAvatar(35, 35, 140, 140)
          }else{
            this.drawAvatar()
          }
          
        }
      }, fail: res => {
        console.log(res);
      }
    })
  },

  // 绘制头像背景
  drawAvatar(x,y,x1,y1) {
    x = x || 0;
    y = y || 0;
    x1 = x1 || 210;
    y1 = y1 || 210;
    let index = this.data.hatIndex
    var that = this;
    var p = that.data;
    context = wx.createCanvasContext('myAvatar', this);
    context.clearRect(0, 0, 210, 210)
    context.drawImage(p.src, x, y, x1, y1);
    context.draw(true);
    context.save();
    context.drawImage(p.hat[index].url, 0, 0, 210, 210);
    context.draw(true);
    context.save();
    this.setData({
      save: true
    })
  },

  // 保存图片
  saveImg() {
    wx.canvasToTempFilePath({
      canvasId: 'myAvatar',
      success(res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功'
            })
          },
          fail(res) {
            wx.showToast({
              title: '取消保存...',
              icon: 'none'
            })
          }
        })
      }
    })
  },

  //分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '送给你个圣诞节头像哦！进来领取吧~',
      path: 'pages/index/index',
      imageUrl: '../../images/share.png'
    }
  },

  //路由跳转
  share(){
    wx.canvasToTempFilePath({
      canvasId: 'myAvatar',
      success(res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功'
            })
          },
          fail(res) {
            wx.showToast({
              title: '取消保存...',
              icon: 'none'
            })
          }
        })
        let url = res.tempFilePath
        wx.navigateTo({
          url: '/pages/share/share?url=' + url,
        })
      }
    })
  }
  

})