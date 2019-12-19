<template>
  <div class="hotel_item">
    <div v-for="(item,index) in hotelInfo " :key="index" class="item_contain">
      <div class="item_img">
        <img :src="item.photos" alt @click="headleToLink(item.id)" />
      </div>
      <div class="item_main">
        <div class="item_center">
          <p class="item_title">{{ item.name }}</p>
          <div class="item_icon">
            <span>{{ item.alias }}</span>
            <span class="iconfont iconhuangguan" style="color:#ff9900" />
            <span class="iconfont iconhuangguan" style="color:#ff9900" />
            <span class="iconfont iconhuangguan" style="color:#ff9900" />
            <span>{{ item.hoteltype.name }}</span>
          </div>
          <div class="item_grade">
            <div class="grade">
              <span
                v-for="(i,index) in Math.floor(item.stars)"
                :key="index"
                class="el-rate__icon el-icon-star-on"
                style="color:#ff9900"
              />
              <span>{{ item.stars }}分</span>
            </div>
            <span>
              <span class="context">{{ item.all_remarks }}</span> 条评论
            </span>
            <span>
              <span class="context">{{ item.roomCount }}</span>篇游记
            </span>
          </div>
          <p class="location">
            <span class="iconfont iconlocation" />
            {{ item.address }}
          </p>
        </div>
      </div>
      <div class="item_recommend">
        <div v-for="(e,index) in item.products" :key="index" class="recommend_row">
          <!-- <p></p> -->
          <router-link to="#" style="color:#666">{{ e.name }}</router-link>
          <p>
            ￥{{ e.price }}
            <span>起&nbsp;></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotelInfo"],
  data() {
    return {
      // hotelInfo: []
    };
  },
  mounted() {
    console.log(this.hotelInfo);
  },
  methods: {
    headleToLink(id, location) {
      this.$router.push({
        path: "/hotel/hotelDetail",
        query: { id }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.hotel_item {
  a {
    text-decoration: none;
  }
  * {
    margin: 0;
    padding: 0;
  }
  .item_contain {
    display: flex;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    .item_img {
      flex: 3;
      img {
        cursor: pointer;
        width: 100%;
        height: 200px;
      }
    }
    .item_main {
      flex: 4;
      padding: 10px;
      .item_center {
        box-sizing: border-box;
        .item_title {
          font-size: 25px;
          font-weight: 500;
          padding: 0 10px;
        }
        .item_icon {
          color: #9e9e9e;
          padding: 10px;
        }
        .item_grade {
          display: flex;
          justify-content: space-between;
          padding: 0 30px 0 10px;
          align-items: center;
          .context {
            color: #f7ba2a;
          }
        }
        .location {
          padding: 10px;
          font-size: 14px;
          color: #666666;
        }
      }
    }
    .item_recommend {
      flex: 3;
      .recommend_row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        font-size: 13px;
        color: #666;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        p:nth-child(2) {
          color: #f7ba2a;
        }
      }
    }
  }
}
</style>
