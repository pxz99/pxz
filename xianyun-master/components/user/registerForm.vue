<template>
  <div class="register">
    <el-form :model="resgisterForm" :rules="rules" ref="resgisterForm" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input placeholder="用户名手机" v-model="resgisterForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input placeholder="请输入验证码" v-model="resgisterForm.captcha" style="cursor: pointer;">
          <template slot="append">
            <span @click="sendCaptcha">发送验证码</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input placeholder="昵称" v-model="resgisterForm.nickname"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" v-model="resgisterForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input placeholder="确认密码" v-model="resgisterForm.checkPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="register-btn" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resgisterForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      resgisterForm: {
        username: "13800138000",
        captcha: "000000",
        nickname: "13800138000",
        password: "123456",
        checkPassword: "123456"
      },
      rules: {
        username: [
          { required: true, message: "用户名手机不能为空", trigger: "blur" },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 18, message: "密码长度为6~18位", trigger: "blur" }
        ],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    sendCaptcha() {
      let tel = this.resgisterForm.username;
      console.log(tel);

      this.$axios
        .post("/captchas", { tel })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success("发送成功");
          }
        })
        .catch(err => {
          console.log(res);
        });
    },
    // 注册
    register() {
      this.$refs.resgisterForm.validate(valid => {
        if (valid) {
          // 删除checkPassword这个属性，resForm是registerForm中剩下的属性
          let { checkPassword, ...resForm } = this.resgisterForm;
          console.log(resForm);
          this.$axios
            .post("/accounts/register", resForm)
            // headers: { "Content-Type": "application/x-www-form-urlencoded" },
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$message.success("注册成功");
                setTimeout(() => {
                  this.$router.push("/user/login/0");
                }, 1000);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  .register-btn {
    width: 100%;
  }
}
</style>