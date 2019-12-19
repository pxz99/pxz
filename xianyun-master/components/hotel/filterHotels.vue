<template>
  <div class="filter_head">
    <div class="inputs">
      <el-form :model="filterForm" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-autocomplete
            class="inline-input"
            v-model="cityName"
            :fetch-suggestions="querySearch"
            placeholder="目的地"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="daterange"
            v-model="filterForm.enterTime"
            range-separator="-"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="人数未定" suffix-icon="iconfont iconuser" @focus="isShow = true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="check">查看价格</el-button>
        </el-form-item>
        <el-form-item class="selectPersonNum" v-show="isShow">
          <el-card class="box-card" style="width: 310px;">
            <div slot="header" class="clearfix personNum">
              <span>每间</span>
              <div class="select">
                <el-select multiple placeholder="请选择" style="width: 100px;" size="small">
                  <el-option
                    v-for="item in ['1人','2人','3人','4人']"
                    :key="item.value"
                    v-model="person1"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>

                <el-select
                  multiple
                  collapse-tags
                  style="margin-left: 4px; width:100px;"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option
                    v-for="item in ['1人','2人','3人','4人']"
                    :key="item.value"
                    v-model="person2"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="btn">
              <el-button style="float: right;" size="mini" type="primary">确定</el-button>
              <el-button style="float: right;" size="mini" type="primary" @click="cancel">取消</el-button>
            </div>
          </el-card>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value6: "",
      isShow: false,
      options: ["1", "2"],
      cityName: "",
      filterForm: {
        city: "",
        enterTime: "",
        leftTime: ""
      },
      person1: "",
      person2: ""
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    querySearch(queryString, cb) {
      this.$axios
        .get("/cities", {
          params: {
            name: queryString
          }
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            let cities = res.data.data;
            cities.forEach(v => {
              v.value = v.name;
            });
            cb(cities);
          }
        });
    },
    // createFilter(queryString) {
    //   return restaurant => {
    //     return (
    //       restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
    //       0
    //     );
    //   };
    // },
    handleSelect(item) {
      console.log(item);
      this.filterForm.city = item.id;
      this.$emit("getCityName", item.name);
    },
    check() {
      if (this.filterForm.enterTime.length > 0) {
        let enterTime = this.filterForm.enterTime[0];
        let leftTime = this.filterForm.enterTime[1];
        this.filterForm.enterTime = enterTime;
        this.filterForm.leftTime = leftTime;
      }
      console.log(this.filterForm);

      this.$emit("getHotels", this.filterForm);
    },
    cancel() {
      this.isShow = false;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.filter_head {
  position: relative;
  display: flex;
  justify-content: space-between;
  .inputs {
    .selectPersonNum {
      position: absolute;
      right: 103px;
      top: 56px;
      z-index: 99;
      .personNum {
        display: flex;
        justify-content: space-between;
      }
      .btn {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0;
      }
    }
  }
}
</style>