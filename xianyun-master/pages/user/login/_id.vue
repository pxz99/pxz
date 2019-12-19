<template>
  <div class="login">
    <div class="login-box">
      <div class="login-title">
        <span
          v-for="(item, index) in ['登录', '注册']"
          :key="index"
          @click="$router.push('/user/login/' + index)"
          :class="{active: currentIndex === index}"
        >{{item}}</span>
      </div>
      <div class="login-inputs">
        <div v-if="currentIndex === 0">
          <login></login>
        </div>
        <div v-if="currentIndex === 1">
          <register></register>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import register from "@/components/user/registerForm.vue";
import login from "@/components/user/loginForm.vue";
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  components: {
    register,
    login
  },
  mounted() {
    this.currentIndex = this.$route.params.id - 0;
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 700px;
  min-width: 1000px;
  background: url(http://127.1:1337/assets/images/th03.jfif) center center;
  position: relative;

  .login-box {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    .login-title {
      height: 50px;
      display: flex;
      line-height: 50px;
      text-align: center;
      background-color: #eee;
      color: #666;
      span {
        flex: 1;
        &.active {
          color: orange;
          position: relative;
          background-color: #fff;
          font-weight: 600;
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: orange;
          }
        }
      }
    }
    .login-inputs {
      padding: 30px 30px 10px 30px;
    }
  }
}
</style>