<template>
  <div class="flights_filter">
    <div class="filter_main">
      <div
        class="main_path"
      >单程：{{flightsInfo.departCity}} - {{flightsInfo.destCity}} / {{flightsInfo.departDate}}</div>
      <div class="main_selects">
        <div class="select_item">
          <el-select
            v-model="filterData.airport"
            placeholder="起飞机场"
            size="mini"
            @change="handlerChange"
          >
            <el-option
              v-for="item in filterOptions.airport"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select_item">
          <el-select
            v-model="filterData.flightTimes"
            placeholder="起飞时间"
            size="mini"
            @change="handlerChange"
          >
            <el-option
              v-for="item in filterOptions.flightTimes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select_item">
          <el-select
            v-model="filterData.company"
            placeholder="航空公司"
            size="mini"
            @change="handlerChange"
          >
            <el-option
              v-for="item in filterOptions.company"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select_item">
          <el-select
            v-model="filterData.sizes"
            placeholder="机型"
            size="mini"
            @change="handlerChange"
          >
            <el-option
              v-for="item in filterOptions.sizes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="filters_btns">
      筛选：
      <el-button type="primary" round size="mini">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["flightsInfo", "flightsOptions"],
  data() {
    return {
      filterData: {
        airport: "",
        flightTimes: "",
        company: "",
        sizes: ""
      }
    };
  },
  computed: {
    // console.log(this.flightsInfo);
    // 过滤选项
    filterOptions() {
      // 起飞机场 airport
      let airport = [];
      this.flightsOptions.airport.forEach(v => {
        v && airport.push({ value: v, label: v });
      });
      // let airport = this.flightsOptions.airport.map(v => ({
      //   value: v,
      //   label: v
      // }));
      // console.log(airport);

      // 起飞时间
      let flightTimes = this.flightsOptions.flightTimes.map(v => ({
        label: `${v.from}:00 - ${v.to}:00`,
        value: v.from + "|" + v.to
      }));

      // 航空公司
      let company = this.flightsOptions.company.map(v => ({
        value: v,
        label: v
      }));

      // 机型
      let sizes = [
        { value: "L", label: "大" },
        { value: "M", label: "中" },
        { value: "S", label: "小" }
      ];
      return { airport, flightTimes, company, sizes };
    }
  },
  methods: {
    handlerChange() {
      console.log(this.filterData);
      this.$emit("selectChange", this.filterData);
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.flights_filter {
  .filter_main {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .main_path {
      font-size: 13px;
    }
    .main_selects {
      display: flex;
      .select_item {
        width: 120px;
        margin-left: 10px;
      }
    }
  }
  .filters_btns {
    padding: 0 0 20px;
    font-size: 14px;
    button {
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
      &:hover {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
}
</style>