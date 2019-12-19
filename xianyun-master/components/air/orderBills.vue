<template>
  <div class="order_bills">
    <div class="air-info">
      <div class="info-top">
        <span>{{order.dep_date}}</span>
        <span>{{order.org_city_name}} - {{order.dst_city_name}}</span>
      </div>
      <div class="info-step">
        <div class="flight-airport">
          <div>{{order.dep_time}}</div>
          <span>{{order.org_airport_name}}{{order.org_airport_quay}}</span>
        </div>
        <div class="flight-time">
          <div>--- 3时5分 ---</div>
          <span>{{order.airline_name}}{{order.flight_no}}</span>
        </div>
        <div class="flight-airport">
          <div>{{order.arr_time}}</div>
          <span>{{order.dst_airport_name}}{{order.dst_airport_quay}}</span>
        </div>
      </div>
    </div>
    <div class="info-bar">
      <span>订单总价</span>
      <span>金额</span>
      <span>数量</span>
    </div>
    <div class="info-bar">
      <span>成人机票</span>
      <span>￥{{order.seat_infos.settle_price}}</span>
      <span>x{{priceData.personNum}}</span>
    </div>
    <div class="info-bar">
      <span>机建＋燃油</span>
      <span>¥{{order.airport_tax_audlet}}/人/单程</span>
      <span>x{{priceData.personNum}}</span>
    </div>
    <div class="info-bar">
      <span>应付总额：</span>
      <span class="price">￥{{priceData.price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order", "priceData"]
};
</script>

<style lang="less" scoped>
.order_bills {
  width: 350px;
  border: 1px solid #ddd;
  .air-info {
    padding: 15px;
    .info-top {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 14px;
    }
    .info-step {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .flight-airport {
        color: #999;
        font-size: 12px;
        > div {
          font-size: 22px;
          color: #000;
          font-size: 400;
          padding: 6px 0;
        }
      }
      .flight-time {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .info-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px dashed #ddd;
    padding: 10px 15px;
    font-size: 14px;
    color: #666;
    .price {
      font-size: 28px;
      color: orange;
    }
  }
}
</style>