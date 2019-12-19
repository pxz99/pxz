<template>
  <div class="hotel_tab">
    <div id="container"></div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <div id="panel"></div>
      <el-tab-pane
        :label="item.label"
        :name="item.name"
        v-for="(item, index) in tabItem"
        :key="index"
      >
        <!-- <div id="trafficItem" v-for="(item,index) in list" :key="index">
          <span class="trafficName">{{item.name}}</span>
          <span class="distance">0.{{item.distance}}公里</span>
        </div>-->
      </el-tab-pane>

      <!-- <el-tab-pane class="traffic" label="交通" name="traffic">
        <div id="trafficItem" v-for="(item,index) in list" :key="index">
         <span class="trafficName">{{item.name}}</span>
          <span class="distance">0.{{item.distance}}公里</span>
        </div>
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: ["city", "location"],
  data() {
    return {
      activeName: "scenery",
      list: [],

      center: {
        longitude: "" - 0,
        latitude: "" - 0
      },
      tabItem: [
        { label: "风景", name: "scenery" },
        { label: "交通", name: "traffic" }
      ]
    };
  },
  mounted() {
    console.log(this.location);
    console.log(this.city);
    console.log(this.$refs);

    window.onLoad = () => {
      this.init("风景名胜");
    };

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=a20769a83d0d8f458bc9ba293ac91558&callback=onLoad&callback=onLoad&plugin=AMap.Geolocation,AMap.PlaceSearch,AMap.Marker";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab);
      let type = "";
      let arr = [];

      if (tab.name === "traffic") {
        type = "交通设施服务|公交站|公交站相关";
      } else if (tab.name === "scenery") {
        type = "风景名胜";
      }
      this.init(type);
    },

    init(type, arr) {
      // var map = new AMap.Map("container", {
      //   // zoom: 11, //级别
      //   // center: [116.397428, 39.90923], //中心点坐标
      //   // viewMode: "3D" //使用3D视图
      // });

      var map = new AMap.Map("container", {
        resizeEnable: true
        // center: [this.center.longitude, this.center.latitude], //中心点坐标
        // offset: (-10, -34)
      });

      //构造地点查询类
      var placeSearch = new AMap.PlaceSearch({
        type, // 兴趣点类别
        pageSize: 10, // 单页显示结果条数
        pageIndex: 1, // 页码
        city: this.city.code, // 兴趣点城市
        citylimit: true, //是否强制限制在设置的城市内搜索
        map: map, // 展现结果的地图实例
        panel: "panel", // 结果列表将在此容器中进行展示。
        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      });
      var cpoint = [this.location.longitude, this.location.latitude]; //中心点坐标
      placeSearch.searchNearBy("", cpoint, 2000, (status, result) => {
        console.log(result);
        this.list = result.poiList.pois;
      });
    }
  }
};
</script>

<style lang="less" scoped>
#container {
  width: 650px;
  height: 360px;
}
#panel {
  // display: none;
  position: relative;
  background-color: white;
  height: 100%;
  overflow-y: auto;
  top: 0px;
  right: 0px;
  width: 100%;
}

.hotel_tab {
  width: 1000px;
  display: flex;
  padding: 40px 0;
  position: relative;
  .el-tabs {
    position: relative;
    flex: 1;
    padding-left: 20px;
    height: 360px;
    overflow: auto;

    color: #666;
    word-spacing: 1px;

    #trafficItem {
      display: flex;
      font-size: 12px;
      justify-content: space-between;
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>
