<template>
  <div class="index">
    <!-- 轮播图开始 -->
    <div class="carousel">
      <el-carousel height="700px">
        <el-carousel-item v-for="(item,index) in carouselList" :key="index">
          <div
            :style="`background: url(${$axios.defaults.baseURL + item.url}) center center; height: 700px;`"
          ></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图结束 -->
    <!-- 中间tab栏开始 -->
    <tabs></tabs>
    <!-- 中间tabs结束 -->
  </div>
</template>

<script>
import tabs from "../components/index/tabs.vue";
export default {
  data() {
    return {
      carouselList: []
    };
  },
  components: {
    tabs
  },
  mounted() {
    this.$axios
      .get("/scenics/banners")
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.carouselList = res.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
.index {
  .carousel {
    min-width: 1000px;
    margin: 0 auto;
    position: relative;

    /deep/ .el-carousel__container {
      height: 700px;
    }

    .banner-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
