//index.js
//获取应用实例
// const app = getApp()

Page({
 onTap:function(event){
  //  wx.redirectTo({
  //    url: '../posts/post'
  //  });
  // console.log("111");
   wx.navigateTo({
     url: '../posts/post'
   });
 }
})
