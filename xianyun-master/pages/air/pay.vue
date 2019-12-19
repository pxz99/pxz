<template>
  <div class="pay">
    <div class="pay_view">
      <div class="pay_price">
        支付总金额:
        <span>￥{{bills.price}}</span>
      </div>
      <div class="pay_content">
        <div class="pay_title">微信支付</div>
        <div class="pay_main">
          <div class="pay_code">
            <canvas id="canvas"></canvas>
            <!-- 支付的图片 -->
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay_img">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let QRCode = require("qrcode");
export default {
  data() {
    return {
      bills: {}
    };
  },
  mounted() {
    console.log(this.$route.query);
    const token = this.$store.state.users.userInfo.token;
    this.$axios
      .get("/airorders/" + this.$route.query.id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res);
        this.bills = res.data;
        let canvas = document.getElementById("canvas");
        QRCode.toCanvas(canvas, res.data.payInfo.code_url, function(error) {
          if (error) console.error(error);
          console.log("success!");
        });

        let timeId = setInterval(() => {
          this.$axios
            .post(
              "/airorders/checkpay",
              {
                id: res.data.id,
                nonce_str: res.data.payInfo.nonce_str,
                out_trade_no: res.data.payInfo.order_no
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )
            .then(res => {
              console.log(res);
              if (res.data.trade_state === "SUCCESS") {
                clearInterval(timeId);
                this.$message.success(res.data.statusTxt);
              }
            });
        }, 3000);
      });
  }
};
</script>

<style scoped lang="less">
.pay {
  height: 690px;
  background-color: #f5f5f5;
}
.pay_view {
  width: 1000px;
  margin: 0 auto;
}
.pay_price {
  padding: 20px 0 10px 0;
  font-size: 25px;
  text-align: right;
  font-size: 16px;
  span {
    font-size: 28px;
    color: #ff4500;
  }
}
.pay_content {
  background-color: #fff;
  height: 580px;
  border-top: 5px solid orange;

  .pay_title {
    padding: 26px;
    font-size: 28px;
  }
  .pay_main {
    display: flex;
    justify-content: space-around;
    align-items: center;
    // padding: 0 111px;

    .pay_code {
      border: 1px solid #ccc;
      padding: 20px;
      text-align: center;
    }
  }
}
</style>