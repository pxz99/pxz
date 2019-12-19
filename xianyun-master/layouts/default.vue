<template>
  <div>
    <!-- 头部 -->
    <Header></Header>

    <nuxt />
    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
export default {
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="less" scoped>
</style>
