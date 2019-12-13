var context = null;
Page({
  data: {
    save: false,
    src: '',
    url: '',
  },
  onLoad: function (options) {
    this.data.src = '/images/share1.png'
    
    console.log(options.url)
    this.setData({
      url: options.url
    })
    this.drawAvatar() 
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
    context = wx.createCanvasContext('myAvatar1', this);
    context.clearRect(0, 0, 300, 450)
    context.drawImage(p.src, 0, 0, 300, 450);
    context.draw(true);
    context.save();
    context.drawImage(p.url, 125, 280, 50, 50);
    context.draw(true);
    context.save();
    this.setData({
      save: true
    })
  },

  // 保存图片
  saveImg() {
    wx.canvasToTempFilePath({
      canvasId: 'myAvatar1',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '赶紧去分享吧~~~'
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
  }
  

})