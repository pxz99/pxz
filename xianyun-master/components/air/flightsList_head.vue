<template>
  <div class="flights_list_head">
    <span class="flights_head_item">航空信息</span>
    <span class="flights_head_item">起飞时间</span>
    <span class="flights_head_item">到达时间</span>
    <span class="flights_head_item">价格</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.flights_list_head {
  background-color: #f6f6f6;
  height: 35px;
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 13px;
  border: 1px solid #ddd;
  color: #666;
  .flights_head_item {
    flex: 1;
  }
}
</style>