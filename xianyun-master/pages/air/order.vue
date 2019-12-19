<template>
  <div class="order">
    <div class="order_main">
      <div class="order_form">
        <orderForm v-if="orderDetail.airline_name" :order="orderDetail" @price="price"></orderForm>
      </div>
      <div class="order_price">
        <orderBills v-if="orderDetail.airline_name" :order="orderDetail" :priceData="priceData"></orderBills>
      </div>
    </div>
  </div>
</template>

<script>
import orderForm from "@/components/air/orderForm.vue";
import orderBills from "@/components/air/orderBills.vue";
export default {
  data() {
    return {
      orderDetail: {},
      priceData: {}
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.$axios
      .get(`/airs/${this.$route.query.id}`, {
        params: {
          seat_xid: this.$route.query.seat_xid
        }
      })
      .then(res => {
        console.log(res);
        this.orderDetail = res.data;
        console.log(this.orderDetail);
      });
  },
  components: {
    orderForm,
    orderBills
  },
  methods: {
    price(data) {
      console.log(data);
      this.priceData = data;
    }
  }
};
</script>

<style lang="less" scoped>
.order_main {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  .order_form {
    flex: 2;
  }
  .order_price {
    flex: 1;
    padding: 20px 0;
  }
}
</style>