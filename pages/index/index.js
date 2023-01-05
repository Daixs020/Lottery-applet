// index.js
// 获取应用实例
const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog';
Page({
  data: {
    items: null,
    motto: 'Hello World',
    userInfo: {},
    lkl:'stop',
    mor:"start",
    lpl:'start',
    current:0, 
    ok_user:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  start() {
    wx.request({
      //获取地址
      url: 'xxx/index/Customer/getokuser', //请求接口的url
      method: 'get', //请求方式
      success: res => {

            // 启动定时器，每隔一段时间随机切换一次文字
    this.interval = setInterval(() => {
      this.setData({
        current: Math.floor(Math.random() * res.data.length)
      });
    }, 100);

            this.setData({
              items: res.data,
              mor:"stop",
              lkl: "start",
              lpl:"stop"
            })

  
          // }
        }
    });


  },
  stops() {
    // 停止定时器
    clearInterval(this.interval);

    Dialog.alert({
      title: this.data.items[this.data.current],
      message: "恭喜你！中奖啦！",
    }).then(() => {
      // on close
    });

    wx.request({
      //获取地址
      url: 'xxx/index/Customer/iosoks', //请求接口的url
      method: 'get', //请求方式
      data:{
        'username':this.data.items[this.data.current]
      },
      success: res => {
            this.setData({
              items: res.data,
              lkl: "stop",
              mor:"start"
            })
        }
    });

  },

  onLoad() {


    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
