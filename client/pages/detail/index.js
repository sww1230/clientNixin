// pages/detail/index.js
let util = require('../../utils/util.js')
let config = require('../../config');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    proId:'',
    userId:'',
    dataLogs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ proId: options.proId, userId: options.userId })
    this.getRowsInfo(options.userId, options.proId);
  },
  getRowsInfo: function (userId, id) {
    let that = this;
    wx.request({
      url: config.service.queryUserOneProductList,
      data: { product_id: id, supply_id: userId, desc:true },
      method: 'post',
      success(result) {
        result.data.data.forEach(row=>{
          row.monthDay = util.formatTime(new Date(row.create_time),'m/d');
          row.year = util.formatTime(new Date(row.create_time), 'Y');
          if (row.images){
            row.images = row.images.split(',');
          }else{
            row.images = [];
          }
        });
        console.log(result.data.data);
        that.setData({
          dataLogs: result.data.data
        });
      },
      fail(error) {
        util.showModel('消息', '行数据查找失败')
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  onGoBack(){
    wx.navigateBack({
      delta: 1
    })
  }
})