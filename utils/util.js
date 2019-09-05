function convertToStarsArray(stars){
  var num = stars.toString().substring(0,1);
  var array = [];
  for(var i = 1;i<=5;i++){
    if(i<=num){
      array.push(1);
    }else{
      array.push(0);
    }
  }
  return array;
}

function http(url,callBack) {
  // var that = this;
  wx.request({
    url: url,
    data: {
      // "start": 0,
      // "count": 3,
      "apikey": "0b2bdeda43b5688921839c8ecb20399b"
    },
    method: 'GET',
    header: {
      "content-type": "application/xml"
    },
    success: function (res) {
      // console.log("111");
      // console.log(res);
      callBack(res.data);
     
    },
    fail: function () {
      console.log(error);
    }
  })
}

function convertToCastString(casts){
  var castsjoin = "";
  for(var idx in casts){
    castsjoin = castsjoin+casts[idx].name+"/";
  }
  return castsjoin.substring(0,castsjoin.length-2);
}

function convertToCastInfos(casts){
  var castsArray = [];
  for(var idx in casts){
    var cast = {
      img:casts[idx].avatars?casts[idx].avatars.large:"",
      name:casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray:convertToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}