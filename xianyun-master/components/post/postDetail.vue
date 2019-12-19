<template>
  <div class="postDetail">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 文章内容模块 -->
    <div class="posts" v-for="(item,index) in post.data" :key="index">
      <!-- 标题 -->
      <div class="title">{{item.title}}</div>

      <!-- 时间 和 阅读量-->
      <div class="timeAndNum">
        <div class="time">
          攻略：
          <span>{{item.city.created_at}}</span>
        </div>
        <div class="read">
          阅读：
          <span>{{item.watch}}</span>
        </div>
      </div>

      <!-- 文章内容 -->
      <div class="content" v-html="item.content"></div>

      <!-- 评论、收藏、分享、点赞 -->
      <div class="goods">
        <div class="comment">
          <i class="iconfont iconpinglun"></i>
          <p>
            评论(
            <span>{{total}}</span> )
          </p>
        </div>

        <div class="star" @click="start(item.id)">
          <i class="iconfont iconstar1"></i>
          <p>收藏</p>
        </div>

        <div class="share">
          <i class="iconfont iconfenxiang"></i>
          <p>分享</p>
        </div>

        <div class="like" @click="like(item.id)">
          <i class="iconfont iconding"></i>
          <p>
            点赞(
            <span>{{likes}}</span> )
          </p>
        </div>
      </div>

      <!-- 发表评论 -->
      <div class="comment">
        <div class="commentTitle">评论</div>

        <!-- 显示回复的评论用户 -->
        <div class="replayUser" style="margin-bottom:10px">
          <el-tag
            closable
            :disable-transitions="false"
            type="info"
            @close="handleClose"
            v-if="dynamicTags.length > 0 "
          >@{{dynamicTags[0].account.nickname}}</el-tag>
        </div>

        <!-- 评论内容 -->
        <div class="commentsContent">
          <el-input type="textarea" :rows="2" placeholder="说点什么吧..." v-model="textarea"></el-input>
        </div>
        <!-- 上传图片、提交评论 -->
        <div class="sendComments">
          <!-- 上传图片 -->
          <div class="file">
            <el-upload
              name="files"
              :limit="3"
              action="http://127.0.0.1:1337/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :on-exceed="overLimit"
              ref="uploads"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>

          <!-- 点击提交 -->
          <div class="subBtn">
            <el-button type="primary" size="mini" @click="submitCommetns">提交</el-button>
          </div>
        </div>
      </div>

      <!-- 评论列表 -->
      <div class="postsCommentsLists">
        <div class="comments">
          <div
            class="list"
            @mouseover="mouseOver"
            @mouseleave="mouseLeave"
            v-for="(item,index) in commentsList.data"
            :key="index"
          >
            <!-- 用户信息 -->
            <div class="user">
              <!-- 用户名，发表时间 -->
              <div class="userInfo">
                <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
                {{item.account.nickname}}
                <span>{{item.created_at | dateformat}}</span>
              </div>
              <!-- 回复层级 -->
              <span>{{item.level}}</span>
            </div>
            <!-- 评论内容 -->
            <div class="commentsContent">{{item.content}}</div>
            <!-- 评论的图片 -->
            <div class="commentsImg" v-if="item.pics.length !== 0">
              <img
                :src="$axios.defaults.baseURL+imgs.url"
                alt
                v-for="(imgs,index1) in item.pics"
                :key="index1"
              />
            </div>

            <!-- 调用嵌套评论组件 -->
            <comments v-if="item.parent" :comment="item.parent"></comments>

            <!-- 回复 -->
            <div class="replay">
              <a href="javascript:void(0)" v-show="isShow" @click="replayUserComments(item)">回复</a>
            </div>
          </div>
        </div>
      </div>

      <!-- 评论分页器 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import comments from "@/components/post/comments";
import dateformat from "../../plugins/filters";
import bus from "../../plugins/eventBus";

export default {
  components: { comments },
  props: {
    post: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      token: this.$store.state.user.userinfo.token,
      // 点赞数量
      likes: this.post.data[0].like === null ? 0 : this.post.data[0].like,
      // 评论内容
      textarea: "",
      // 回复的显示与隐藏状态
      isShow: false,
      // 评论列表
      commentsList: "",
      // 当前页码
      currentPage: 1,
      // 总条数
      total: 0,
      // 页容量
      pageSize: 2,
      // 图片预览地址
      dialogImageUrl: "",
      // 上传图片预览
      dialogVisible: false,
      // 上传的图片数组
      imgLIst: [],
      // tag标签数组
      dynamicTags: []
    };
  },
  mounted() {
    // 初始化
    this.init();
    // 接收评论组件发射回来的总线事件
    // 赋值给tag标签数组
    bus.$on("sendCommentsInfo", commentInfo => {
      this.dynamicTags = [commentInfo];
    });
  },
  watch: {
    // 监听文章id的变化，刷新页面数据
    post(newN, oldN) {
      // 刷新页面
      this.init();
      // console.log(this.id);
    }
  },
  methods: {
    // 获取评论列表数据
    init() {
      // 获取当前文章Id
      // console.log(this.post);
      console.log(this.post.data[0].comments.length);
      let id = this.post.data[0].id;
      // console.log(id);
      // 发送请求，获取文章的评论列表
      this.$axios
        .get("/posts/comments", {
          params: {
            post: id,
            _limit: this.pageSize,
            _start: (this.currentPage - 1) * this.pageSize
          }
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.commentsList = res.data;
            console.log(this.commentsList);
            // 评论总条数;
            this.total = res.data.total;
          }
        });
    },
    // 点击收藏文章
    start(id) {
      // 发起收藏文章请求
      // console.log(id);
      // let token = this.$store.state.user.userinfo.token;
      this.$axios
        .get("/posts/star", {
          params: { id },
          headers: { Authorization: `Bearer ${this.token}` }
        })
        .then(res => {
          if (res.status === 200) {
            this.$message.success(res.data.message);
          }
        });
    },
    // 点赞文章
    like(id) {
      // console.log(id);
      // 发送点赞请求
      this.$axios
        .get("/posts/like", {
          params: { id },
          headers: { Authorization: `Bearer ${this.token}` }
        })
        .then(result => {
          // console.log(result);
          if (result.status === 200) {
            this.$message.success(result.data.message);
            // 增加页面点赞数量
            this.likes++;
          }
        });
    },
    //   鼠标移入，显示回复按钮
    mouseOver() {
      this.isShow = true;
    },
    // 鼠标移出，隐藏回复
    mouseLeave() {
      this.isShow = false;
    },
    // 改变页容量
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.init();
    },
    // 改变页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.init();
    },
    // 移除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传成功
    uploadSuccess(res, file, fileList) {
      // console.log(res);
      // 把图片id放到数组里面
      this.imgLIst.push(res[0].id);
      // console.log(this.imgLIst);
    },
    // 图片数量超额
    overLimit() {
      this.$message.warning("上传的图片超出数量");
    },
    // 提交评论
    submitCommetns() {
      if (this.textarea.trim().length !== 0) {
        console.log(this.imgLIst);
        let commentForm = {
          // 评论内容
          content: this.textarea,
          // 文章id
          post: this.post.data[0].id,
          // 图片列表
          pics: this.imgLIst,
          // 回复id
          follow: this.dynamicTags[0] && this.dynamicTags[0].id
        };
        // 发起提交评论的请求
        this.$axios
          .post("/comments", commentForm, {
            headers: { Authorization: `Bearer ${this.token}` }
          })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.data.message);
              // 清空文本内容
              this.textarea = "";
              // console.log(this.$refs.uploads[0]);
              // 清空页面文件图片
              this.$refs.uploads[0].clearFiles();
              // 清空存储图片的数组
              this.imgLIst = [];
              // 刷新评论页
              this.init();
            }
          });
      } else {
        this.$message.warning("评论内容不能为空");
      }
    },
    // 关闭tag标签
    handleClose() {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      // 清空数组内容
      this.dynamicTags = [];
    },
    // 点击回复评论
    replayUserComments(commentInfo) {
      // 获取评论的对象给该数组,发送回复评论请求时可获得id
      this.dynamicTags = [commentInfo];
      console.log(this.dynamicTags);
    }
  },
  filters: {
    // 时间过滤器
    dateformat
  }
};
</script>

<style lang='less' scoped>
.title {
  font-size: 32px;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  margin-top: 5px;
}
.timeAndNum {
  display: flex;
  font-size: 15px;
  color: #ccc;
  float: right;
  padding: 20px;
  div {
    padding-left: 25px;
  }
}

.content {
  clear: both;
  line-height: 25px;
  /deep/img {
    max-width: 100%;
  }
}

.goods {
  display: flex;
  justify-content: center;
  div {
    width: 100px;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    color: #999;
    cursor: pointer;

    i {
      font-size: 30px;
      color: orange;
    }
  }
}

.postsCommentsLists {
  margin-bottom: 15px;
}

.comment {
  .commentTitle {
    padding: 15px 0;
  }

  .sendComments {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
}

/deep/.el-upload--picture-card {
  width: 120px;
  height: 120px;
  line-height: 120px;
}

/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 120px;
  height: 120px;
}

.commentsImg {
  display: flex;
  img {
    display: block;
    width: 100px;
    height: 100px;
    border: 1px dashed #eee;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 5px;
  }
}

.list {
  border: 1px solid #ccc;
  border-bottom: 1px dashed #ccc;
  border-top: none;
  padding: 10px;
  &:first-child {
    border-top: 1px solid #ccc;
  }
  &:last-child {
    border-bottom: 1px solid#ccc;
  }
  .user {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding-bottom: 10px;
    span {
      color: #999;
      margin-left: 5px;
    }
    .userInfo {
      display: flex;
      img {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
  .commentsContent {
    padding: 10px 0;
  }
  .replay {
    height: 20px;
    line-height: 29px;
    font-size: 12px;
    text-align: right;
    a {
      text-decoration: none;
      color: #1e50a2;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
