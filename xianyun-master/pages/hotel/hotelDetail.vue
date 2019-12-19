<template>
  <div class="hotelDetail">
    <div class="contain">
      <!-- 面包屑 -->
      <div class="detail_nav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/hotel' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/hotel' }">{{infoList.city.name}}酒店</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/hotel' }">{{infoList.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 头标题 -->
      <div class="detailHeader">
        <p>
          {{ infoList.name }}
          <span class="iconfont iconhuangguan" style="color:#ff9900" />
        </p>
        <p>{{ infoList.alias }}</p>
        <p>
          <span class="iconfont iconlocation" />
          {{ infoList.address }}
        </p>
      </div>
      <!-- 头标题 -->
      <div class="detail_main">
        <DetailImg v-if="info.length" :infolist="infoList" />
      </div>
      <!-- 地图 -->
      <div class="map">
        <div class="map_info">
          <hotelMap v-if="info.length" :city="city" :location="infoList.location" />
        </div>
      </div>
      <div class="hotelInfo">
        <hotelInfo :infolist="infoList" />
      </div>
    </div>
  </div>
</template>

<script>
import DetailImg from "@/components/hotel/DetailImg";
import hotelInfo from "@/components/hotel/hotelInfo";
import hotelMap from "@/components/hotel/hotelTab";

export default {
  components: {
    DetailImg,
    hotelInfo,
    hotelMap
  },
  data() {
    return {
      id: this.$route.query.id,
      infoList: {
        city: {}
      },
      info: [],
      // 城市景点
      city: {}
    };
  },
  mounted() {
    const id = this.id;
    this.$axios.get("/hotels?id=" + id).then(res => {
      console.log(res);

      this.city = res.data.data[0].city;
      this.infoList = res.data.data[0];
      this.info = res.data.data;
    });
  }
};
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}
.hotelDetail {
  .contain {
    width: 1000px;
    margin: 0 auto;
    .detail_nav {
      padding: 10px 0;
    }
    .detailHeader {
      p:nth-child(1) {
        font-size: 25px;
        font-weight: 500;
        span {
          padding: 0px 5px;
        }
      }
      p:nth-child(2) {
        font-size: 14px;
        color: #666666;
      }
      p:nth-child(3) {
        color: #666666;
      }
    }
  }
  .map {
    display: flex;
    margin: 10px 0px;
    .map_tab {
      flex: 1;
      margin: 0 20px;
    }
  }
}
</style>
