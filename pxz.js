var kits = {}
kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num
}

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

kits.randomInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n)
}

kits.getId = function () {
  let date = new Date()
  let time = date.getTime()
  let r = this.randomInt(100000, 999999)
  let id = time + '' + r
  return id
}

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