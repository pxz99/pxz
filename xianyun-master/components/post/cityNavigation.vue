<template>
  <div class="cityNavigation">
    <!-- 导航 -->
    <div class="navigation">
      <div class="hot navigation_item" v-for="(item,index) in cityList.data" :key="index">
        <div class="text">
          <span>{{item.type}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="detail">
          <div v-for="(value,index1) in item.children" :key="index1">
            <span>{{index1 + 1}}</span>
            <span @click="changeCity(value.city)">{{value.city}}</span>
            <span @click="changeCity(value.city)">{{value.desc}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐城市 -->
    <div class="recommendCitys">
      <p>推荐城市</p>
      <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityList: {}
    };
  },
  mounted() {
    // 获取城市菜单列表
    this.$axios.get("/posts/cities").then(res => {
      if (res.status === 200) {
        this.cityList = res.data;
        console.log(this.cityList);
      }
    });
  },
  methods: {
    // 点击城市，发送城市名字或id，让父组件筛选相关文章
    changeCity(city) {
      console.log(city);
      // 发射事件给父组件
      // this.$emit("cityName", city);
      // 跳转页面
      this.$router.push("/post?city=" + city);
    }
  }
};
</script>

<style lang='less' scoped>
.cityNavigation {
  display: flex;
  flex-direction: column;
  width: 300px;

  .navigation {
    z-index: 100;
    border: 1px solid #ccc;

    .navigation_item {
      position: relative;
      border-bottom: 1px solid #ccc;
      padding: 10px 20px;
      .detail {
        width: 330px;
        position: absolute;
        top: -1px;
        right: -352px;
        border: 1px solid #ccc;
        background-color: #fff;
        padding: 10px 20px 10px 0;
        display: none;

        div {
          height: 40px;
          &:hover {
            cursor: pointer;
          }
        }

        span {
          color: orange;
          &:hover {
            text-decoration: underline;
          }
          &:first-child {
            font-size: 24px;
            font-style: italic;
            text-decoration: none;
            padding: 0 10px;
          }
          &:last-child {
            font-size: 14px;
            color: #999;
            padding-left: 8px;
          }
        }
      }

      &:hover {
        .detail {
          display: block;
        }
      }

      .text {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        i {
          font-size: 24px;
          color: #ccc;
        }
        &:hover {
          color: orange;
          i {
            color: orange;
          }
        }
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .recommendCitys {
    p {
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
    }
    img {
      width: 300px;
    }
  }
}
</style>
