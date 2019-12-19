<template>
  <div class="hoter_map">
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  props: {
    location: Object,
    default: {}
  },
  data() {
    return {};
  },
  mounted() {},
  watch: {
    location() {
      console.log(this.location.data);
      // 1.异步加载 JS API
      window.onLoad = () => {
        var map = new AMap.Map("container", {
          zoom: 14
          // center: [118.8718107, 31.32846821]
        });
  
        var markerList = [];
        this.location.data.forEach(e => {
          markerList.push(
            new AMap.Marker({
              position: new AMap.LngLat(
                e.location.longitude,
                e.location.latitude
              ),
              title: e.name
            })
          );
        });
     
        map.add(markerList);
        // 自动适配到合适视野范围
        // 无参数，默认包括所有覆盖物的情况
        map.setFitView();
      };

      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=a20769a83d0d8f458bc9ba293ac91558&callback=onLoad&plugins=AMap.ToolBar,AMap.MassMarks";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }
  }
};
</script>

<style leng="less" scoped>
.hoter_map {
  padding: 10px;
  height: 100%;
}
#container {
  width: 420px;
  height: 260px;
}
</style>