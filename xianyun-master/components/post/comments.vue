<template>
  <!-- 递归评论组件 -->
  <div class="comments">
    <div class="list" @mouseover="mouseOver" @mouseleave="mouseLeave">
      <!-- 用户信息 -->
      <div class="user">
        <!-- 用户名，发表时间 -->
        <div class="userInfo">
          <img :src="$axios.defaults.baseURL+comment.account.defaultAvatar" alt />
          {{comment.nickname}}
          <span>{{comment.created_at | dateformat}}</span>
        </div>
        <!-- 回复层级 -->
        <span>{{comment.level}}</span>
      </div>
      <!-- 评论内容 -->
      <div class="commentsContent">{{comment.content}}</div>
      <!-- 评论的图片 -->
      <div class="commentsImg" v-if="comment.pics.length !== 0">
        <img
          :src="$axios.defaults.baseURL+imgs.url"
          alt
          v-for="(imgs,index1) in comment.pics"
          :key="index1"
        />
      </div>

      <!-- 递归 -->
      <comments v-if="comment.parent" :comment="comment.parent"></comments>

      <!-- 回复 -->
      <div class="replay">
        <a href="javascript:void(0)" v-show="isShow" @click="replayIt">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
import dateformat from "../../plugins/filters";
import bus from "../../plugins/eventBus";

export default {
  name: "comments",
  props: {
    //评论列表
    comment: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // 回复的显示与隐藏状态
      isShow: false
      // 评论列表
    };
  },
  mounted() {
    console.log(this.comment);
  },
  methods: {
    //   鼠标移入，显示回复按钮
    mouseOver() {
      this.isShow = true;
    },
    // 鼠标移出，隐藏回复
    mouseLeave() {
      this.isShow = false;
    },
    replayIt() {
      // this.$emit("sendCommentsInfo");
      // 发射总线事件,传递给父组件评论的数据
      // 直接发射事件的话,会导致递归组件的数据发送到当前组件页中
      bus.$emit("sendCommentsInfo", this.comment);
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
  border: 1px solid #ccc;
  border-bottom: 1px dashed #ccc;
  border-top: none;
  padding: 10px;
  margin-top: 10px;
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
</style>
