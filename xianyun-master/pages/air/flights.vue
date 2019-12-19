<template>
  <div class="flights">
    <!-- 版心开始 -->
    <div class="flights-container">
      <!-- 正文内容开始-->
      <div class="flights-main">
        <!-- 筛选开始 -->
        <filterFlights
          v-if="flightsData.flights.length"
          :flightsInfo="flightsData.info"
          :flightsOptions="flightsData.options"
          @selectChange="selectChange"
        ></filterFlights>
        <!-- 筛选结束 -->
        <!-- 机票列表开始 -->
        <flightsHead></flightsHead>
        <flightsItem :flightsItem="item" v-for="item in flightsPagition" :key="item.id"></flightsItem>
        <!-- 机票列表结束 -->
        <!-- 分页器开始 -->
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.pageIndex"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
        <!-- 分页器结束 -->
      </div>
      <!-- 正文内容结束 -->
      <!-- 侧边栏开始 -->
      <div class="flights-side">
        <history v-if="historyList.length" :historyList="historyList"></history>
      </div>
    </div>
    <!-- 侧边栏结束 -->
    <!-- 版心结束 -->
  </div>
</template>

<script>
import filterFlights from "@/components/air/filterFlights.vue";
import flightsItem from "@/components/air/flightsList_item.vue";
import flightsHead from "@/components/air/flightsList_head.vue";
import history from "@/components/air/history.vue";
export default {
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 分页器数据
      pagination: {
        pageIndex: 1,
        pageSizes: [2, 4, 6, 8],
        pageSize: 8,
        total: "" - 0
      },
      // 用来分页的数据，即flightsData中的flights数组
      flightsList: [],
      // 被分页后的数据，就是每页显示的数据
      flightsPagition: [],
      historyList: []
    };
  },
  mounted() {
    this.init(true);
    this.historyList = JSON.parse(localStorage.getItem("air_history"));
  },
  components: {
    filterFlights,
    flightsItem,
    flightsHead,
    history
  },
  methods: {
    // 分页
    init(isFirst) {
      if (isFirst) {
        this.$axios
          .get("/airs", { params: this.$route.query })
          .then(res => {
            if (res.status === 200) {
              console.log(res);
              this.flightsData = res.data;
              this.flightsList = res.data.flights;
              this.pagination.total = this.flightsList.length;
              // 分页
              this.flightsPagition = this.flightsList.slice(
                (this.pagination.pageIndex - 1) * this.pagination.pageSize,
                this.pagination.pageSize * this.pagination.pageIndex
              );
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.pagination.total = this.flightsList.length;
        this.flightsPagition = this.flightsList.slice(
          (this.pagination.pageIndex - 1) * this.pagination.pageSize,
          this.pagination.pageSize * this.pagination.pageIndex
        );
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagination.pageIndex = val;
      this.init();
    },
    selectChange(filter) {
      // console.log(filter);
      this.flightsList = this.flightsData.flights.filter(v => {
        // 筛选起飞机场
        let ok1 =
          filter.airport === "" || v.org_airport_name === filter.airport;
        let ok2 = filter.company === "" || v.airline_name === filter.company;
        let ok3 = filter.sizes === "" || v.plane_size === filter.sizes;
        let from = +filter.flightTimes.split("|")[0];
        let to = +filter.flightTimes.split("|")[1];
        let depFrom =
          +v.dep_time.split(":")[0] + +v.dep_time.split(":")[1] / 60;
        let ok4 =
          filter.flightTimes === "" || (depFrom >= from && depFrom <= to);
        return ok1 && ok2 && ok3 && ok4;
      });
      // this.flightsList = flightsList;
      console.log(this.flightsList);
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
.flights-container {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  .flights-main {
    flex: 3;
    padding-right: 16px;
    .pagination {
      padding: 10px 0 10px 36px;
    }
  }
  .flights-side {
    flex: 1;
    margin-top: 120px;
  }
}
</style>