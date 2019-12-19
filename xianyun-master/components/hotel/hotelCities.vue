<template>
  <div class="cities_content">
    <div class="cities_area common">
      <span class="title">区域：</span>
      <div class="text">
        <span class="area_all">全部</span>
        <span
          class="area_item"
          v-for="item in cities.scenics"
          :key="item.id"
          @click="handlerArea(item.name)"
        >{{item.name}}</span>

        <div>
          <i class="el-icon-d-arrow-right"></i>
          等{{ cities.scenics.length}}个区域
        </div>
      </div>
    </div>
    <div class="cities_post common">
      <span class="title">攻略：</span>
      <div
        class="text"
      >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</div>
    </div>
    <div class="avg_price common">
      <div class="title">
        均价：
        <div class="top mark">
          <el-tooltip
            class="item"
            effect="dark"
            content="等级均价由平日价格计算得出，节假日价格有上浮。"
            placement="top-end"
          >
            <i>?</i>
          </el-tooltip>
        </div>
      </div>

      <div class="text">
        <el-tooltip
          class="item"
          effect="dark"
          content="等级评价是针对房价、设施和服务等各方面水平的综合评价。"
          placement="bottom-start"
          v-for="(item, index) in hotelsData.data"
          :key="index"
        >
          <span class="price_item">
            <i
              class="iconfont iconhuangguan"
              v-for="(i,index) in Math.floor(item.stars)"
              :key="index"
            ></i>
            {{item.price * 5}}
          </span>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cities: Object,
    default: {},
    hotelsData: Object,
    default: {}
  },

  mounted() {
    console.log(this.cities);
  },
  methods: {
    handlerArea(name) {
      this.$emit("handlerArea", name);
    }
  }
};
</script>

<style lang="less" scoped>
.cities_content {
  .common {
    line-height: 22px;
    display: flex;
    padding: 10px 0;
    color: #666;
    font-size: 14px;
    .title {
      flex: 1;
    }
    .text {
      flex: 7;
    }
  }
  .cities_area {
    .area_all {
      background: #eee;
      color: #999;
      border-radius: 5px;
    }
    .area_item {
      padding: 0 8px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: #0094ff;
      }
    }
    .el-icon-d-arrow-right {
      transform: rotate(270deg);
      color: #f90;
    }
  }
  .avg_price {
    .title {
      position: relative;
      .mark {
        i {
          position: absolute;
          right: 22px;
          top: -4px;
          width: 14px;
          height: 14px;
          line-height: 16px;
          font-style: normal;
          font-size: 12px;
          background-color: #fff;
          background-color: #ccc;
          color: #fff;
          text-align: center;
          border-radius: 100%;
        }
      }
    }

    .price_item {
      padding-right: 20px;
      .iconhuangguan {
        color: #f90;
      }
    }
  }
}
</style>