<template>
  <!-- 旅游攻略 -->
  <div class="post">
    <el-row :gutter="20">
      <!-- 城市导航 -->
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <cityNavigation></cityNavigation>
        </div>
      </el-col>

      <!-- 文章详情 -->
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <div class="deatil">
            <Strategy />
            <div class="suggest">推荐攻略</div>
            <div class="wirte">
              <posts />
            </div>
          </div>
          <postsLIst v-if="postsList[0]" :postsList="postsList"></postsLIst>
          <div class="block" style="margin:10px">
            <span class="demonstration"></span>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.currentPage"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            ></el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 搜索框
import Strategy from "../../components/post/Strategy";
import cityNavigation from "../../components/post/cityNavigation";
import postsLIst from "../../components/post/postsLIst";
// 写游记
import posts from "../../components/post/posts";
import bus from "../../plugins/eventBus";
export default {
  components: { cityNavigation, postsLIst, posts, Strategy },
  data() {
    return {
      postsList: [],
      page: {
        // 当前页码
        currentPage: 1,
        // 当前页容量
        pageSize: 2,
        // 总数
        total: 0
      },
      params: ""
    };
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 获取路由的城市信息
      let city = this.$route.query.city;

      console.log(city);

      // 判断城市是否为空
      city = city ? `?city=${city}` : "";
      // console.log(this.params);
      console.log(city);

      if (!city) {
        city = this.params;
      }
      // let params = this.params ?`?city=${this.params}`:""

      // 获取文章列表数据
      this.$axios
        .get("/posts" + city, {
          params: {
            _limit: this.page.pageSize,
            _start: (this.page.currentPage - 1) * this.page.pageSize
          }
        })
        .then(res => {
          if (res.status === 200) {
            // 获取搜索数据
            // const cityArr=res.data.data
            // this.cityList=cityArr
            let city = this.city;
            console.log(res.data);
            // 获取文章总数
            this.page.total = res.data.total;
            // 分页操作
            this.postsList = res.data.data;
          }
        });
    },
    // 改变当前页容量
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      // 刷新页面
      this.init();
      bus.$emit("sizeChange", val);
    },
    // 改变当前页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      // 刷新页面
      this.init();
      bus.$emit("indexChange", val);
    }
  }
};
</script>

<style lang='less' secoped>
.post {
  width: 1000px;
  margin: 0 auto;
  padding-top: 10px;
  .deatil {
    position: relative;
    .suggest {
      width: 90px;
      color: orange;
      font-size: 20px;
      border-bottom: 2px solid orange;
      padding-bottom: 21px;
      top: 88px;
      left: 0px;
      position: absolute;
    }
    .wirte {
      color: #ffffff;
      top: 40px;
      right: 0px;
      position: absolute;
      .el-button {
        span {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
