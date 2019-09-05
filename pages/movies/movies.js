var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResult:{},
    containerShow:true,
    searchPannel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = "https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=3";
    var comingSoonUrl = "https://api.douban.com/v2/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=3";
    var top250Url = "https://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=3";

    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣Top250");
  },

  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url:"more-movie/more-movie?category="+category
    });
  },

  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "movie-detail/movie-detail?id=" + movieId
    });
  },


  getMovieListData: function (url, settedKey, categoryTitle){
    var that = this;
    wx.request({
      url:url,
      // data:{
      //   "start":0,
      //   "count":3,
      //   "apikey":"0b2bdeda43b5688921839c8ecb20399b"
      // },
      method: 'GET',
      header: {
        "content-type":"application/xml"
      },
      success:function (res) {
        // console.log("111");
        // console.log(res);
        that.processDoubanData(res.data, settedKey,categoryTitle);
      },
      fail:function(){
        console.log(error);
      }
    })
  },

  onCancelImgTap:function(event){
    this.setData({
      containerShow:true,
      searchPannel:false,
      searchResult:{}
    });
  },

  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPannel:true
    });
  },

  onBindChange:function(event){
    var text = event.detail.value;
    var searchUrl = "https://api.douban.com/v2/movie/search?apikey=0b2bdeda43b5688921839c8ecb20399b&q=" + text;
    this.getMovieListData(searchUrl,"searchUrl","");
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle){
    var movies = [];
    for(var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length>=6){
        title = title.substring(0,6)+"...";
      }
      var temp = {
        stars:util.convertToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies:movies
    };
    this.setData(readyData);
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
  // onPullDownRefresh: function () {
    
  // },

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