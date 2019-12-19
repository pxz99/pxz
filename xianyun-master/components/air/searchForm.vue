<template>
  <div class="air-from">
    <div class="air-form-title">
      <div
        v-for="(item, index) in ['单程', '往返']"
        :key="index"
        :class="{'title-item': true, 'active': currentIndex === index}"
        @click="changeIndex(index)"
      >{{item}}</div>
    </div>
    <div class="air-form-inputs">
      <el-form label-width="80px" size="mini">
        <!-- 出发城市 -->
        <el-form-item label="出发城市">
          <el-autocomplete
            size="medium"
            class="inline-input"
            v-model="searchForm.departCity"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelectDepart"
          ></el-autocomplete>
        </el-form-item>
        <!-- 出发城市 -->
        <!-- 换 -->
        <div class="change">
          <span class="change-btn" @click="changeCity">换</span>
        </div>
        <!-- 换 -->
        <!-- 到达城市 -->
        <el-form-item label="到达城市">
          <el-autocomplete
            size="medium"
            class="inline-input"
            v-model="searchForm.destCity"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelectDest"
          ></el-autocomplete>
        </el-form-item>
        <!-- 到达城市 -->
        <!-- 选择日期 -->
        <el-form-item label="选择日期">
          <el-col :span="24">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="searchForm.departDate"
              size="medium"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <!-- 选择日期 -->
        <el-form-item size="large">
          <el-button type="primary" style="width: 100%; margin: 10px 0 0 -18px;" @click="search">搜索</el-button>
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
      searchForm: {
        departCity: "北京",
        departCode: "BJS",
        destCity: "上海",
        destCode: "SHA",
        departDate: "2019-11-28"
      }
    };
  },
  methods: {
    querySearch(queryString, callback) {
      // querySearch(queryString, cb)，在该方法中你可以在你的输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中。
      // queryString 输入框中输入的字符串
      this.$axios
        .get("/airs/city", {
          params: {
            name: queryString
          }
        })
        .then(res => {
          console.log(res);
          let cityArr = res.data.data;
          cityArr.forEach(v => {
            v.value = v.name.replace("市", "");
          });
          callback(cityArr);
        })
        .catch(err => {
          console.log(err);
        });
      // var restaurants = this.restaurants;
      // var results = queryString
      //   ? restaurants.filter(this.createFilter(queryString))
      //   : restaurants;
      // // 调用 callback 返回建议列表的数据
      // cb(results);
    },
    handleSelectDepart(item) {
      // console.log(item);
      this.searchForm.departCode = item.sort;
    },
    handleSelectDest(item) {
      this.searchForm.destCode = item.sort;
    },
    changeCity() {
      // 交换出发城市和到达城市
      [
        this.searchForm.departCity,
        this.searchForm.departCode,
        this.searchForm.destCity,
        this.searchForm.destCode
      ] = [
        this.searchForm.destCity,
        this.searchForm.destCode,
        this.searchForm.departCity,
        this.searchForm.departCode
      ];
    },
    search() {
      console.log(this.searchForm);
      this.$router.push({ path: "/air/flights", query: this.searchForm });
      let history = localStorage.getItem("air_history");
      let historyArr = JSON.parse(history);
      historyArr = historyArr || [];

      console.log(historyArr);

      let index = historyArr.findIndex(v => {
        return JSON.stringify(v) === JSON.stringify(this.searchForm);
      });
      if (index !== -1) {
        historyArr.splice(index, 1);
      }
      if (historyArr.length > 6) {
        historyArr.splice(-1, 1);
      }
      historyArr.unshift(this.searchForm);
      let historyStr = JSON.stringify(historyArr);
      localStorage.setItem("air_history", historyStr);
    },
    changeIndex(index) {
      this.currentIndex = index;
      if (index === 1) {
        this.$alert("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        this.currentIndex = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.air-from {
  width: 360px;
  height: 350px;
  border: 1px solid #ddd;
  .air-form-title {
    display: flex;
    height: 48px;
    background-color: #eee;
    justify-content: space-around;
    align-items: center;
    .title-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 100%;
      cursor: pointer;
    }
    .active {
      background-color: #fff;
      position: relative;
      &::before {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: 100%;
        height: 2px;
        background-color: orange;
      }
    }
  }
  .air-form-inputs {
    padding: 40px 50px 0 15px;
    .el-form-item {
      margin-bottom: 22px;
      width: 100%;
      .el-form-item__label {
        line-height: 32px;
        .inline-input {
          width: 100%;
          height: 40px;
        }
      }
    }
    .change {
      position: relative;
      .change-btn {
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background-color: #999;
        border-radius: 2px;
        position: absolute;
        right: -34px;
        top: -22px;
        cursor: pointer;
        &::before {
          content: "";
          position: absolute;
          left: -25px;
          top: -20px;
          width: 36px;
          height: 20px;
          border: none;
          border-top: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-radius: 2px;
        }
        &::after {
          content: "";
          position: absolute;
          left: -25px;
          bottom: -20px;
          width: 36px;
          height: 20px;
          border: none;
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>