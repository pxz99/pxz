<template>
  <div class="login-form">
    <el-form :model="loginForm" ref="loginForm" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input placeholder="用户名手机" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "13800138000",
        password: "123456"
      },
      token: ""
    };
  },
  methods: {
    login() {
      let data = this.loginForm;
      // this.$axios
      //   .post("/accounts/login", this.loginForm)
      //   .then(res => {
      //     console.log(res);
      //     if (res.status === 200) {
      //       this.$message.success("登录成功");
      //       setTimeout(() => {
      //         this.$router.push("/");
      //       }, 1000);
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      this.$store.dispatch("users/setUserInfo", data).then(res => {
        console.log(res);
        if (res.status) {
          this.$message.success("登录成功");
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        }
      });
      // .catch(err => {
      //   this.$message.error("登录失败，请检查用户名和密码");
      // });
    }
  },
  mounted() {}
  // computed: {
  //   token() {
  //     return this.$store.state.users.userInfo.token;
  //   }
  // }
};
</script>

<style lang="less" scoped>
.login-form {
  .login-btn {
    width: 100%;
  }
}
</style>