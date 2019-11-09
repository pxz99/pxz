<template>
  <div class="city">
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      // 5  js 加载完毕了！！！
      var map = new AMap.Map("container", {
        // 地图的缩放倍数
        zoom: 12,
        // 要显示的经纬度[经度，纬度]
        center: [116.39, 39.9]
      });

      // 6 使用插件
      var toolbar = new AMap.ToolBar();
      // map.plugin(toolbar);
      map.addControl(toolbar);

      // 7  创建一个 点标记
      // var marker = new AMap.Marker({
      //   // 点标记的坐标
      //   position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      //   // 鼠标移入的时候的提示
      //   title: "北京"
      // });
      // map.add(marker);

      // 8 自定义内容 点标记
      // var content =
      //   '<div style="background:red;" class="marker-route marker-marker-bus-from">😄</div>';

      // var marker = new AMap.Marker({
      //   content: content, // 自定义点标记覆盖物内容
      //   position: [116.397428, 39.90923], // 基点位置
      //   offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
      // });
      // map.add(marker);

      // 9 使用 驾车规划
      var driving = new AMap.Driving({
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        policy: AMap.DrivingPolicy.LEAST_TIME,
        // 让地图使用上驾车规划
        map: map
      });

      // var startLngLat = [116.379028, 39.865042];
      // var endLngLat = [116.427281, 39.903719];

      var points = [
        { keyword: "吉山幼儿园（公交站）", city: "广州" },
        { keyword: "广州塔", city: "广州" }
      ];

      driving.search(points, function(status, result) {
        // 未出错时，result即是对应的路线规划方案
      });
    };

    // 1 定义 高度地图 js 路径  同时下载了插件
    //  同时下载了 其他插件
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=b329f3568c3769213b6cc011593bf89d&callback=onLoad&plugin=AMap.ToolBar,AMap.Driving";
    // 2 手动创建了一个script标签
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    // 3 定义 script标签的 引入地址
    jsapi.src = url;
    // 4 把script标签 放入到 html标签的 head标签的中
    document.head.appendChild(jsapi);
  }
};
</script>

<style>
.city {
  width: 1000px;
  margin: 0 auto;
}
#container {
  width: 1000px;
  height: 600px;
}
</style>