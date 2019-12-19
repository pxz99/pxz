<template>
  <div class="postsDetail">
    <!-- 文章详情模块 -->
    <el-row :gutter="20">
      <el-col :span="17">
        <div class="grid-content bg-purple">
          <postDetail v-if="postDetails.data" :post="postDetails"></postDetail>
        </div>
      </el-col>
      <!-- 相关攻略模块 -->
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <div class="title">相关攻略</div>
          <!-- 推荐文章列表 -->
          <!-- 文章推荐 -->
          <recommend
            v-if="recommendList.data"
            :recommends="recommendList"
            @recommendsId="recommendsId"
          ></recommend>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import postDetail from "@/components/post/postDetail";
import recommend from "@/components/post/postRecommend";

export default {
  components: {
    postDetail,
    recommend
  },
  data() {
    return {
      // 文章详情数据
      postDetails: {},
      // 推荐的文章数据
      recommendList: {},
      id: this.$route.query.id
    };
  },
  mounted() {
    // console.log(this.id);
    this.init();
    // 发起获取推荐文章的请求，获取推荐文章数据
    // console.log(this.$route.query.id);
    this.$axios
      .get("/posts/recommend", { params: { id: this.id } })
      .then(result => {
        // console.log(result);
        if (result.status === 200) {
          this.recommendList = result.data;
        }
      });
  },
  watch: {
    // 监听文章id的变化，刷新页面数据
    id(newN, oldN) {
      // 刷新页面
      this.init();
      // console.log(this.id);
    }
  },
  methods: {
    init() {
      // 发起获取文章数据的请求
      this.$axios.get("/posts", { params: { id: this.id } }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.postDetails = res.data;
          console.log(this.postDetails);
        }
      });
    },
    recommendsId(id) {
      // 接收子组件传过来的变化的id
      this.id = id;
    }
  }
};
</script>

<style lang='less' scoped>
.postsDetail {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}
.title {
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
