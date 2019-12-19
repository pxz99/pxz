<template>
  <!-- 推荐文章组件 (相关攻略)-->
  <div class="recommend">
    <div
      class="list"
      v-for="(item,index) in recommends.data"
      :key="index"
      @click="goToPostsDetail(item.id)"
    >
      <div class="img">
        <img :src="item.images[0]" alt />
      </div>
      <div class="content">
        <div class="postsTitle">{{item.title}}</div>
        <div class="date">
          {{item.created_at | dateformat}}&nbsp;&nbsp;
          阅读:
          <span>{{item.watch}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateformat from "../../plugins/filters";
export default {
  props: {
    recommends: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    console.log(this.recommends);
  },
  methods: {
    goToPostsDetail(id) {
      // 发射事件，传递变化的id给父组件刷新页面
      this.$emit("recommendsId", id);
      this.$router.push("/post/detail?id=" + id);
    }
  },
  filters: {
    // 时间过滤器
    dateformat
  }
};
</script>

<style lang='less' scoped>
.list {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
    padding-left: 10px;
  }

  .img {
    width: 100px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .date {
    display: flex;
    font-size: 12px;
    color: #999;
  }
}

.postsTitle {
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; //显示文字的行数
  overflow: hidden;
  word-break: break-all;
}
</style>
