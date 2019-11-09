<template>
  <div class="search_form">
    <div class="search_title">
      <div
        class="title_item"
        v-for="(item,index) in ['单程','往返']"
        :key="index"
        :class="currentIndex===index?'active':''"
      >{{item}}</div>
    </div>
    <div class="search_content">
      <el-form label-width="80px">
        <el-form-item label="出发城市">
          <el-autocomplete
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect1"
            v-model="form.departCity"
          > </el-autocomplete>
        </el-form-item>
        <!-- 换 -->
        <div
          class="city_change"
          @click="handleCityChange"
        >换</div>
        <!-- 换 -->
        <el-form-item label="到达城市">
          <el-autocomplete
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect2"
            v-model="form.destCity"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="出发时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
            v-model="form.departDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%;"
            type="primary"
            @click="handleGetTicket"
          >搜索</el-button>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      form: {
        //  出发城市
        departCity: "北京",
        // 出发城市 编码
        departCode: "BJS",
        // 到达城市
        destCity: "上海",
        // 到达城市 编码
        destCode: "SHA",
        // 出发时间
        departDate: "2019-11-28"
      }
    };
  },
  methods: {
    // 1 搜索建议的输入 事件
    querySearchAsync(queryString, callback) {
      // 1 queryString  =  当前输入框的值
      // 2 把关键字 “广”  发送请求
      // callback();
      // console.log(queryString);
      if (queryString) {
        this.$axios
          .get("/airs/city", { params: { name: queryString } })
          .then(res => {
            let cityArr = res.data.data;
            cityArr.forEach(v => {
              // 把 广州市  “市” 移除 因为 后台不需要 “市”
              v.name = v.name.replace("市", "");
              v.value = v.name;
            });
            callback(cityArr);
          });
      }
    },
    // 2 点击  出发城市
    handleSelect1(item) {
      this.form.departCode = item.sort;
    },
    // 2 点击 到达城市
    handleSelect2(item) {
      this.form.destCode = item.sort;
    },
    // 3 “换”  交换城市和编码
    handleCityChange() {
      // 简单的 对象 深拷贝 有小弊端： 对象中如果有 属性 = 函数格式 导致 属性丢失！！！！
      // let form=JSON.parse(JSON.stringify(this.form));
      // this.form.departCity=form.destCity;
      // this.form.departCode=form.destCode;
      // // ================
      // this.form.destCity=form.departCity;
      // this.form.destCode=form.departCode;

      // low-----------------------
      // es6 交换
      [
        this.form.departCity,
        this.form.departCode,
        this.form.destCity,
        this.form.destCode
      ] = [
        this.form.destCity,
        this.form.destCode,
        this.form.departCity,
        this.form.departCode
      ];
    },
    // 4 点击搜索
    handleGetTicket() {
      // 把当前机票城市信息 存到 本地存贮中
      // 1 获取 旧的数据 [{dename:"广州},{dename:"上海"}];
      let cityStr = localStorage.getItem("city");
      let arr = [];
      if (cityStr) {
        arr = JSON.parse(cityStr);
      }

      // 去重
      // JSON.stringify(this.form) === JSON.stringify(v)
      // this.form= {name:"123"}==={name:"123"}
      const index = arr.findIndex(
        v => JSON.stringify(this.form) === JSON.stringify(v)
      );
      if (index !== -1) {
        // 找到
        arr.splice(index, 1);
      }
      arr.unshift(this.form);

      // arr.push(this.form)

      localStorage.setItem("city", JSON.stringify(arr));

      // 要做一个表单验证
      this.$router.push({ path: "/air/flights", query: this.form });
    }
  }
};
</script>

<style lang="less" scoped>
.search_form {
}

.search_title {
  height: 50px;
  background-color: #fff;
  display: flex;
  .title_item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
  }
  .active {
    background-color: #fff;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 3px;
      top: 0;
      left: 0;
      background-color: orange;
    }
  }
}
.search_content {
  padding: 20px 50px 20px 25px;
  position: relative;
  .city_change {
    position: absolute;
    background-color: #666;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 13px;
    right: 11px;
    top: 59px;
    cursor: pointer;
    &::before {
      content: "";
      width: 30px;
      height: 19px;
      border: 1px solid #ccc;
      border-left: none;
      border-bottom: none;
      position: absolute;
      top: -20px;
      left: -20px;
    }
    &::after {
      content: "";
      width: 30px;
      height: 19px;
      border: 1px solid #ccc;
      border-left: none;
      border-top: none;
      position: absolute;
      bottom: -20px;
      left: -20px;
    }
  }
}
</style>