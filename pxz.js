// 小于10以下表达时前面加0
var kits = {}
kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num
}
// 求出当前的年月日时分秒
kits.formatDate = function () {
  var date = new Date()
  var year = date.getFullYear()
  var month = this.dispatchZero(date.getMonth())
  var day = this.dispatchZero(date.getDate())
  var hour = this.dispatchZero(date.getHours())
  var minute = this.dispatchZero(date.getMinutes())
  var second = this.dispatchZero(date.getSeconds())
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}
// 求一个随机整数
kits.randomInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n)
}
// 获取id
kits.getId = function () {
  let date = new Date()
  let time = date.getTime()
  let r = this.randomInt(100000, 999999)
  let id = time + '' + r
  return id
}
// 判断是否单击
function tap(element,fn){
  let startTime
  let startX,startY
  element.addEventListener('touchstart',function(e){
    if(e.touches.length !== 1){
      return;
    }
    startTime = Date.now()
    startX = e.touches[0].pageX
    startY = e.touches[0].pageY
  })
  element.addEventListener('touchend',function(e){
    let endTime = Date.now()
    if(endTime - startTime > 150){
      return;
    }
    let endX =e.changedTouches[0].pageX
    let endY =e.changedTouches[0].pageY
    if(Math.abs(endX - startX) > 50 || Math.abs(endY - startY) > 50){
      return;
    }
    fn && fn();
  })
}
// 获取一个随机的rgb格式的颜色
function randomColor(){
  var r = Math.floor(Math.random()*256);
  var g = Math.floor(Math.random()*256);
  var b = Math.floor(Math.random()*256);
  return "rgb("+r+","+g+","+b+")";
}

//获取一个随机的十六进制的颜色
function randomColor1(){
  var r = Math.floor(Math.random()*256);
  var g = Math.floor(Math.random()*256);
  var b = Math.floor(Math.random()*256);
   
  if(r < 16){
      r = "0"+r.toString(16);
  }else{
      r = r.toString(16);
  }
  if(g < 16){
      g = "0"+g.toString(16);
  }else{
      g = g.toString(16);
  }
  if(b < 16){
      b = "0"+b.toString(16);
  }else{
      b = b.toString(16);
  }
   
  return "#"+r+g+b;
}