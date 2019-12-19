<template>
  <div class="order_form">
    <div class="airperson">
      <input type="text" :value="price" />
      <h2>乘机人</h2>
      <div class="type_inputs">
        <el-form
          ref="orderForm"
          :model="orderForm.users"
          :rules="rules"
          class="demo-ruleForm"
          label-position="top"
        >
          <div class="person_item" v-for="(item, index) in orderForm.users" :key="index">
            <div class="input_item">
              <p>乘机人类型</p>
              <el-form-item size="medium" class="types">
                <el-row>
                  <el-col :span="4">
                    <el-select placeholder="成人">
                      <el-option label="成人" value="成人"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="20">
                    <el-input v-model="item.username" placeholder="姓名" value="username"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
            <span class="decrease" v-if="index !== 0" @click="decreaseUser(index)">-</span>
            <div class="input_item">
              <p>证件类型</p>
              <el-form-item size="medium" class="types">
                <el-row>
                  <el-col :span="4">
                    <el-select placeholder="身份证">
                      <el-option label="身份证" value="id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item prop="id">
                      <el-input v-model="item.id" placeholder="证件号码"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
          </div>
          <el-button type="primary" @click="addUser">添加乘机人</el-button>
        </el-form>
      </div>
    </div>

    <div class="insurance">
      <h2>保险</h2>
      <div class="insurance_checkbox">
        <div class="insurance_item" v-for="item in order.insurances" :key="item.id">
          <el-checkbox
            label="备选项1"
            border
            @change="changeInsurances(item.id)"
          >{{item.type}}：￥{{item.price}}/1份，最高赔付{{item.compensation}}元</el-checkbox>
        </div>
      </div>
    </div>
    <div class="contact">
      <h2>联系人</h2>
      <div class="contact_form">
        <el-form ref="form" :rules="rules" label-width="80px" :model="orderForm">
          <el-form-item label="姓名" style="width: 50%;" prop="contactName">
            <el-input placeholder="请输入姓名" v-model="orderForm.contactName"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 20px; width: 50%;" label="手机" prop="contactPhone">
            <el-input placeholder="请输入手机" v-model="orderForm.contactPhone">
              <template slot="append">
                <span @click="sendCaptcha">发送验证码</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-top: 20px; width: 50%;" label="验证码" prop="captcha">
            <el-input placeholder="请输入验证码" v-model="orderForm.captcha"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-button type="warning" class="submit" @click="handlerSubmit">提交订单</el-button>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {
      orderForm: {
        users: [{ username: "csq", id: "12345678" }],
        insurances: [],
        contactName: "csq",
        contactPhone: "13800138000",
        captcha: "",
        invoice: false,
        seat_xid: this.$route.query.seat_xid,
        air: +this.$route.query.id
      },
      rules: {
        contactName: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "联系手机不能为空", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "联系手机不能为空", trigger: "blur" }
        ],
        username: [
          { required: true, message: "联系手机不能为空", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    console.log(this.order);
  },
  methods: {
    addUser() {
      console.log(123);
      this.orderForm.users.push({ username: "", id: "" });
    },
    decreaseUser(index) {
      this.orderForm.users.splice(index, 1);
    },

    changeInsurances(id) {
      console.log(id);
      const index = this.orderForm.insurances.findIndex(v => v === id);
      if (index === -1) {
        this.orderForm.insurances.push(id);
      } else {
        this.orderForm.insurances.splice(index, 1);
      }
      // this.order.insurances.forEach(v => {
      //   if (v.id === id) {
      //     this.orderForm.insurances.push(id);
      //   }
      // });
    },
    sendCaptcha() {
      this.$axios
        .post("/captchas", { tel: this.orderForm.contactPhone })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success(`您的验证码为：${res.data.code}`);
          }
        });
    },
    handlerSubmit() {
      let { insurances, invoice, ...resForm } = this.orderForm;
      console.log(resForm);
      // 乘机人信息验证
      let isOk = true;
      this.orderForm.users.forEach(v => {
        if (v.username === "" || v.id === "") {
          this.$message.warning("乘机人信息输入不正确，请重新输入");
          isOk = false;
        }
      });
      if (!isOk) {
        return;
      }

      for (const key in resForm) {
        if (resForm[key] === "") {
          this.$message.warning("联系人信息输入不正确，请重新输入");
          isOk = false;
          break;
        }
      }

      if (!isOk) {
        return;
      } else {
        // console.log(this.orderForm);
        const token = this.$store.state.users.userInfo.token;
        this.$axios
          .post("/airorders", this.orderForm, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.data.message);
              setTimeout(() => {
                this.$router.push({
                  path: "/air/pay",
                  query: {
                    id: res.data.data.id
                  }
                });
              }, 1000);
            }
          });
      }
    }
  },
  computed: {
    price() {
      let price = 0;
      price += this.order.seat_infos.settle_price;
      price += this.order.airport_tax_audlet;
      // this.order.insurances.forEach((v, i) => {
      //   if (v.id === this.orderForm.insurances[i]) {
      //     price += v.price;
      //   }
      // });
      this.orderForm.insurances.forEach((v, i) => {
        const index = this.order.insurances.findIndex(vv => vv.id === v);
        price += this.order.insurances[index].price;
      });
      price *= this.orderForm.users.length;
      this.$emit("price", { price, personNum: this.orderForm.users.length });
      return price;
    }
  }
};
</script>

<style lang="less" scoped>
.order_form {
  .airperson {
    padding: 0 50px 0 0;
    h2 {
      font-weight: 400;
    }
    .type_inputs {
      border-bottom: 1px solid #eee;
      padding-bottom: 24px;
      .person_item {
        position: relative;
        .decrease {
          position: absolute;
          top: 106px;
          right: -18px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          text-align: center;
          line-height: 16px;
          background-color: #ddd;
          color: #fff;
          cursor: pointer;
        }
        border-top: 1px solid #eee;
        padding: 10px;
        .input_item {
          > p {
            font-size: 14px;
            color: #606266;
          }
        }
      }
    }
  }
  .insurance {
    padding-bottom: 30px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    h2 {
      font-weight: 400;
    }
    .insurance_item {
      margin-top: 18px;
    }
  }
  .submit {
    width: 40%;
    margin: 30px 0 30px 150px;
  }
}
</style>