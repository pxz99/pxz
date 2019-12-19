<template>
  <!-- 文章列表页结构-->
  <div class="postsLIst">
    <div v-for="(item,index) in postsList" :key="index">
      <!-- 三张图的结构 -->
      <div class="threeImgs" v-if="item.images.length >= 3">
        <!-- 标题 -->
        <div class="title" @click="$router.push('/post/detail?id='+item.id)">{{item.title}}</div>
        <!-- 文章内容 -->
        <div
          class="content"
          v-html="item.summary"
          @click="$router.push('/post/detail?id='+item.id)"
        ></div>
        <!-- 图片展示 -->
        <div class="imgs">
          <img
            :src="value"
            alt
            v-for="(value,index1) in item.images.slice(0,3)"
            :key="index1"
            @click="$router.push('/post/detail?id='+item.id)"
          />
        </div>
        <!-- 作者信息 -->
        <div class="authorInfo">
          <!-- 左边模块 -->
          <div class="authorInfo_item1">
            <!-- 作者坐标 -->
            <div class="local">
              <i class="el-icon-location-outline"></i>
              <span>{{item.cityName}}</span>
            </div>
            <!-- 作者用户名 -->
            <div class="username">
              <span>by</span>
              <div class="infos">
                <!-- 头像 -->
                <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
                <!-- 用户名 -->
                <span>{{item.account.nickname}}</span>
              </div>
            </div>
            <!-- 浏览数 -->
            <div class="looks">
              <i class="el-icon-view"></i>
              <span>{{item.watch}}</span>
            </div>
          </div>

          <!-- 右边模块 -->
          <div class="authorInfo_item2">
            <!-- 点赞 -->
            <div class="good">
              <span>{{item.like == null ? 0 :item.like}}</span> 赞
            </div>
          </div>
        </div>
      </div>

      <!-- 一张图或没有图的结构 -->
      <div class="oneImg" v-if=" item.images.length < 3">
        <!-- 封面图片 -->
        <div class="fontImg">
          <img :src="item.images[0]" @click="$router.push('/post/detail?id='+item.id)" />
        </div>
        <!-- 内容模块 -->
        <div class="posts">
          <!-- 标题 -->
          <div class="title" @click="$router.push('/post/detail?id='+item.id)">{{item.title}}</div>
          <div
            class="content"
            v-html="item.summary"
            @click="$router.push('/post/detail?id='+item.id)"
          ></div>
          <!-- 作者信息 -->
          <div class="authorInfo">
            <!-- 左边模块 -->
            <div class="authorInfo_item1">
              <!-- 作者坐标 -->
              <div class="local">
                <i class="el-icon-location-outline"></i>
                <span>{{item.cityName}}</span>
              </div>
              <!-- 作者用户名 -->
              <div class="username">
                <span>by</span>
                <div class="infos">
                  <!-- 头像 -->
                  <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
                  <!-- 用户名 -->
                  <span>{{item.account.nickname}}</span>
                </div>
              </div>
              <!-- 浏览数 -->
              <div class="looks">
                <i class="el-icon-view"></i>
                <span>{{item.watch}}</span>
              </div>
            </div>

            <!-- 右边模块 -->
            <div class="authorInfo_item2">
              <!-- 点赞 -->
              <div class="good">
                <span>{{item.like === null ? 0 : item.like}}</span> 赞
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "../../plugins/eventBus";
export default {
  props: {
    postsList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      list: []
    };
  },
  mounted() {
    console.log();
    eventBus.$on("getcitylist", cityList => {
      console.log(cityList);
      // this.postsList=cityList.cityArr
    });
  }
};
</script>

<style lang='less' scoped>
.postsLIst {
  box-sizing: border-box;
  .threeImgs {
    border-bottom: 1px solid #ccc;
    padding: 20px 0;

    .imgs {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      img {
        width: 210px;
        height: 150px;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
  .authorInfo {
    display: flex;
    justify-content: space-between;
    padding: 10px 0 0 0;
    font-size: 12px;
    color: #999;
    .authorInfo_item1 {
      display: flex;
      justify-content: space-evenly;
      align-content: center;

      .local {
        padding-top: 2px;
      }
      .username {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        > span {
          padding-top: 2px;
          font-size: 12px;
        }
        img {
          display: block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 5px;
        }
        .infos {
          display: flex;
          align-items: center;
          padding: 0 5px 0 5px;
          span {
            color: orange;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      .looks {
        padding-top: 2px;
      }
    }

    .authorInfo_item2 {
      font-size: 16px;
      color: orange;
    }
  }

  .title {
    padding: 5px 0;
    -o-text-overflow: ellipsis; /*兼容opera*/
    text-overflow: ellipsis; /*这就是省略号喽*/
    overflow: hidden; /*设置超过的隐藏*/
    white-space: nowrap; /*设置不折行*/

    &:hover {
      cursor: pointer;
      color: orange;
    }
  }

  .posts {
    width: 65%;
  }
  .content {
    height: 70px;
    font-size: 14px;
    color: #999;
    line-height: 26px;
    padding-bottom: 10px;
    padding: 10px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; //显示文字的行数
    overflow: hidden;
    word-break: break-all;
    cursor: pointer;
  }
  .oneImg {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 20px 0;

    .fontImg {
      padding-right: 10px;
      img {
        width: 210px;
        height: 150px;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
}
</style>
