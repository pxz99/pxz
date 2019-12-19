<template>
  <div class="wirte">
    <el-form label-width="80px">
      <el-form-item>
        <el-button type="primary" class="el-icon-edit" @click="onsumit">
写游记
</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    onsumit () {
      this.$router.push('/post/create')
    }
  }
}
</script>

<style>
</style>
