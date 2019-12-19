<template>
  <div class="caogao">
    <div class="title">
      <p>草稿箱({{ titleObj.length}})</p>
      <div v-for="(item,index) in titleObj" :key="index" class="content">
        <span>{{ item.title }}</span>
        <i class="el-icon-edit" @click="change" />
        <div>{{ new Date()|getNowFormatDate }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    getNowFormatDate () {
      const date = new Date()
      const seperator1 = '-'
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      const currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    }
  },
  data () {
    return {
      titleObj: []
    }
  },
  mounted () {

    this.titleObj = localStorage.getItem('title')?JSON.parse(localStorage.getItem('title')):[];
    console.log(this.titleObj)
    // localStorage.setItem('title', JSON.stringify(this.titleObj))
  },
  methods: {
    change () {
    }
  }
}
</script>

<style lang='less' scoped>
.caogao {
  margin-left: 50px;
  margin-top: 15px;
  padding-left: 10px;
  width: 200px;
  border: 1px solid #ccc;
  p {
    color: #666666;
  }
  .content {
    padding-bottom: 18px;
    span {
      font-size: 14px;
    }
    div {
      color: #ccc;
      font-size: 13px;
    }

  }
  .content:hover {
      color: orange;
    }
}
</style>
