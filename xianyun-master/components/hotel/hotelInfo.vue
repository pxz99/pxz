<template>
  <div class="hotelInfo">
    <div class="main_basic">
      <p class="info">价格来源</p>
      <p>入住时间:14:00</p>
      <p>离店时间"12:00之前</p>
      <p>{{ infolist.renovat_time }}</p>
      <p>酒店规模：{{ infolist.roomCount }}间客房</p>
    </div>
    <div class="main_facility">
      <span>主要设施</span>
      <p>外币兑换</p>
      <p>电梯</p>
      <p>洗衣服务</p>
      <p>热水壶</p>
    </div>
    <div class="main_basic">
      <p class="info">停车服务</p>
    </div>
    <div class="main_basic">
      <p class="info">品牌信息</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["infolist"]
};
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}
.info {
  color: #000;
  font-weight: 400;
}
.hotelInfo {
  .main_basic {
    display: flex;
    justify-content: space-between;
    color: #898989;
    padding: 20px 10px;
    border-bottom: 1px solid #cccccc;
  }
  .main_facility {
    display: flex;
    color: #898989;
    // padding: 20px 10px;
    border-bottom: 1px solid #cccccc;
    align-items: center;
    span {
      width: 200px;
      padding: 0 10px;
      color: #000;
    }
    p {
      padding: 5px 8px;
      font-size: 14px;
      border-radius: 10px;
      border-bottom: 1px solid #cccccc;
      background-color: #eeeeee;
      text-align: center;
      margin: 20px;
    }
  }
}
</style>
