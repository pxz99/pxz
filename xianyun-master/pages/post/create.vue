<template>
  <div class="inputs">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <div class="title">
            <p>发表新攻略</p>
            <span>分享你的个人游记，让更多人看到噢！</span>
          </div>
          <el-form ref="text" :model="text" label-width="80px">
            <el-input v-model="text.title" placeholder="请输入标题" />
            <div id="app">
              <VueEditor ref="vueEditor" :config="config" />
            </div>
            <div class="clooseCity">
              <span>选择城市</span>
              <el-autocomplete
                v-model="city"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入游玩城市"
                @select="Select"
              />
            </div>
            <div class="post">
              <el-form-item>
                <el-button type="primary" @click="add">发布</el-button>
                <i>或者</i>
                <span @click="keep">保存到草稿</span>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple" />
        <draft />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draft from "../../components/post/draft";
import "quill/dist/quill.snow.css";
let VueEditor = null;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "App",

  components: {
    VueEditor,
    draft
  },

  data() {
    //  this.text.title = (rule, value, callback) => {
    //     if (!value) {
    //       return callback(new Error('标题不能为空'));
    //     }
    return {
      text: {
        // 文章内容
        content: "",
        // 文章标题
        title: "",
        // 城市id | 城市名称
        city: ""
      },
      city: "",
      cityId: "",
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
            console.log(res);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          }
        }
      },
      input: ""
    };
  },
  methods: {
    add() {
      // 获取token
      const token = this.$store.state.user.userinfo.token;
      console.log(this.$store.state);
      console.log(this.$store.state.user.userinfo.token);
      this.$axios
        .post("/posts", this.text, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          this.text = res.data.data;
          this.$message.success("新增成功");
          // 上传成功以后清空
          this.text = "";
          this.$refs.vueEditor.editor.root.innerHTML = "";
          console.log(res);
        });
      // 获取富文本框内容
      // eslint-disable-next-line no-unused-vars
      this.text.content = this.$refs.vueEditor.editor.root.innerHTML;
      console.log(this.$refs.vueEditor.editor.root.innerHTML);
    },
    // 输入框改变的时候被调用
    querySearchAsync(queryString, cb) {
      // queryString当前输入框的值
      if (queryString) {
        this.$axios
          .get("/cities", { params: { name: queryString } })
          .then(res => {
            const city = res.data.data;
            // eslint-disable-next-line no-unused-vars
            // this.cityId = res.data.data[0].id
            this.cityId = res.data.data[0].id;
            console.log(res.data.data[0].id);
            city.forEach(v => {
              v.value = v.name;
            });
            cb(city);
          });
      } else {
        this.$message.warning("请选择正确的城市名称");
      }
    },
    Select() {
      this.text.city = this.cityId;
      console.log(this.text.city);
    },
    keep() {
      // 本地存储
      this.text.content = this.$refs.vueEditor.editor.root.innerHTML;
      const title = localStorage.getItem("title") || "[]";
      //  = localStorage.setItem('biaoti')
      // if (title)

      // eslint-disable-next-line no-const-assign
      const obj = JSON.parse(title);
      console.log(obj.length);

      if (obj.length >= 5) {
        obj.splice(obj.length - 1, 1);
      }
      obj.unshift(this.text);

      localStorage.setItem("title", JSON.stringify(obj));
      // }
    }
  }
};
</script>
<style lang='less' scoped>
.inputs {
  height: 800px;
  width: 1000px;
  margin: 0 auto;
  .title {
    height: 75px;
    padding-bottom: 10px;
  }
  p {
    font-size: 23px;
  }
  span {
    margin: 10px, 0;
    color: #cccccc;
    font-size: 12px;
  }
  .el-input {
    margin-bottom: 20px;
  }
  .clooseCity {
    position: relative;
    top: 84px;
  }
  .post {
    position: relative;
    top: 118px;
    left: -82px;
    i {
      font-style: normal;
    }
    span {
      font-size: 13px;
      color: rgb(238, 147, 28);
    }
    span:hover {
      text-decoration: underline;
      cursor: pointer;
      font-size: 13px;
      color: rgb(238, 147, 28);
    }
  }
}
#vue-editor-wrapper[data-v-60ce3aab] {
  position: relative;
  height: 400px;
}
</style>
