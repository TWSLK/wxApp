var postsData = require("../../../data/posts-data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.data.postData = postData;
    this.setData({
      postData: postsData.postList[postId]
    });
    // console.log(postId);
    // console.log(this.data.postData);
    // wx.setStorageSync("key", "data");
    // wx.setStorageSync("key", {
    //   game:"风暴",
    //   developer:""
    // })

    // var postsCollected = {
    //   1:"true",
    //   2:"false"
    // }

    var postsCollected = wx.getStorageSync("posts_collected")
    if(postsCollected){
      var postsCollected = postsCollected[postId];
    //   this.setData({
    //     collected: postsCollected
    //   })
    // }else{
    //   var postsCollected = {};
    //   postsCollected[postId] = false;
    //   wx.setStorageSync("posts_collected", postsCollected)
    // }
      if (!postsCollected) {
        this.setData({
          collected: false
        })
      } else {
        this.setData({
          collected: postsCollected
        })
      }
    }
    var that = this;
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        isPlayingMusic:true
      });
    }); 
    
    wx.onBackgroundAudioPause(function(){
      that.setData({
        isPlayingMusic: false
      });
    });
  },

  onCollectionTap:function(event){
    // var postsCollected = wx.getStorageSync("posts_collected");
    // var postCollected = postsCollected[this.data.currentPostId];
    //收藏变未收藏 反之亦然
    // postCollected = !postCollected;
    // postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否收藏的缓存值
    // wx.setStorageSync("posts_collected", postsCollected);
    //更新数据绑定变量 从而实现切换图片
    // this.setData({
    //   collected:postCollected
    // });
    // this.showModal(postsCollected, postCollected);
    this.getPostsCollectedSyc();
    // this.getPostsCollectedAsy();
  },

  getPostsCollectedSyc:function(){
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏变未收藏 反之亦然
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否收藏的缓存值
    // wx.setStorageSync("posts_collected", postsCollected);
    //更新数据绑定变量 从而实现切换图片
    // this.setData({
    //   collected:postCollected
    // });
    this.showModal(postsCollected, postCollected);
  },

  getPostsCollectedAsy:function(){
    var that = this;
    wx.getStorage({
      key:"posts_collected",
      success:function(res){
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        //收藏变未收藏 反之亦然
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showModal(postsCollected, postCollected);
      }
    })
  },

  showToast: function (postsCollected, postCollected){
     // wx.showToast({
    //   title: postCollected?"收藏成功":"取消收藏"
    // })
  },

  showModal: function (postsCollected, postCollected){
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected?'收藏该文章？':'取消收藏该文章？',
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success:function(res){
        if(res.confirm){
          wx.setStorageSync("posts_collected", postsCollected);
          that.setData({
            collected: postCollected
          });
        }
      }
    })
  },

  onShareTap:function(event){
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    // wx.removeStorageSync("key");
    //缓存的上限最大不能超过10MB
    // wx.clearStorageSync();
    wx.showActionSheet({
      itemList:itemList,
      itemColor:"#405f80",
      success:function(res){
        // res.cancel 用户是不是点击了取消
        // res.tapIndex 数组元素的序号 从0开始
        wx.showModal({
          title: '用户'+itemList[res.tapIndex],
          content:'用户是否取消？'+res.cancel+ '现在无法实现分享功能',
        })
      }
    }) 
  },

  onMusicTap:function(event){
    var currentPostId = this.data.currentPostId;
    var pData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      });
      // this.data.isPlayingMusic = false;
    }else{
      wx.playBackgroundAudio({
        dataUrl: pData.music.url,
        title: pData.music.title,
        coverImgUrl: pData.music.coverImgUrl
      });
      this.setData({
        isPlayingMusic: true
      });
      // this.data.isPlayingMusic = true;
    }
    
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
    
  }
})