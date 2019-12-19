<template>
  <div class="air">
    <div class="container">
      <div class="air-title">
        <i class="iconfont iconfeiji"></i> 国内机票
      </div>
      <div class="air-content">
        <div class="air-search">
          <search></search>
        </div>
        <div class="air-img">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from "../../components/air/searchForm.vue";
export default {
  components: {
    search
  }
};
</script>

<style lang="less" scoped>
.air {
  .container {
    width: 1000px;
    margin: 0 auto;
    .air-title {
      font-size: 20px;
      color: orange;
      padding: 16px 0;
      i {
        font-size: inherit;
      }
    }
    .air-content {
      display: flex;
      justify-content: space-between;
      .air-search {
      }
      .air-img {
      }
    }
  }
}
</style>