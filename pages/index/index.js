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
        url: '/pages/img/4.png',
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
    this.drawAvatar() 
  },


  // 选择头像图片
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

  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    console.log(e.detail.userInfo);
    //接下来写业务代码

    //最后，记得返回刚才的页面
    wx.navigateBack({
      delta: 1
    })
  },


  test(){
    /* console.log(this.data.src)
    console.log(this.data.url) */
    let that = this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        avatarUrl = avatarUrl.replace('/132', '/0');
        that.data.url = avatarUrl
        console.log('老子获取到了')
      }
    })
    console.log(that.data.url)
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
          this.drawAvatar()
        }
      }, fail: res => {
        console.log(res);
      }
    })
    

  },

  // 绘制头像背景
  drawAvatar() {
    let index = this.data.hatIndex
    var that = this;
    var p = that.data;
    context = wx.createCanvasContext('myAvatar', this);
    context.clearRect(0, 0, 210, 210)
    context.drawImage(p.src, 0, 0, 210, 210);
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
  }


})