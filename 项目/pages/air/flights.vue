<template>
  <div class="flights">
    <!-- 正文 开始 -->
    <div class="flights_main">
      <!-- 1 筛选模块 开始 -->
      <FlightsFilter
        v-if="flightsData.flights.length"
        :info="flightsData.info"
        :options="flightsData.options"
        @filterChange="filterChange"
      />
      <!-- 1 筛选模块 结束 -->

      <!-- 2 表单的头部 开始 -->
      <FlightsHead />
      <!-- 2 表单的头部 结束 -->

      <!-- 3 机票列表 开始 -->
      <div class="air_list">
        <FlightsItem
          v-for="(item) in currentFlights"
          :key="item.id"
          :data="item"
        />
      </div>
      <!-- 3 机票列表 结束 -->

      <!-- 4 分页组件 开始 -->
      <div>
        <!-- 
          :current-page  当前的页码 
          :page-sizes= 页容量 数组 
          :page-size  当前 页容量 
          @size-change 页容量改变事件 
          @current-change 页码改变事件 
         -->
        <el-pagination
          :current-page="page.currentPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
      <!-- 4 分页组件 结束 -->
    </div>
    <!-- 正文 结束 -->

    <!-- 侧边栏 开始 -->
    <div class="flights_aside">
      <div class="history">
        <div class="history_title">历史搜索</div>
        <div class="history_content">
          <div
            class="history_row"
            v-for="(item,index) in historyList"
            :key="index"
          >
            <div class="his_left">
              <p>{{item.departCity}} - {{item.destCity}} </p>
              <p>{{item.departDate}}</p>
            </div>
            <div class="his_right">
              <el-button
                size="mini"
                type="warning"
              >选择</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 侧边栏 结束 -->

  </div>
</template>

<script>
import FlightsFilter from "@/components/air/FlightsFilter";
import FlightsHead from "@/components/air/FlightsHead";
import FlightsItem from "@/components/air/FlightsItem";
export default {
  components: {
    FlightsFilter,
    FlightsHead,
    FlightsItem
  },
  data() {
    return {
      flightsData: {
        // 机票列表数组
        flights: [],
        info: {},
        options: {}
      },

      // 筛选后的数据源 第一次加载页面的时候  值 === 总的数据源
      filterList: [],

      // 被分页后的 机票列表
      currentFlights: [],

      // 分页对象
      page: {
        // 当前页码
        currentPage: 1,
        // 页容量数组
        pageSizes: [1, 2, 5, 10, 20, 100],
        // 页容量
        pageSize: 10,
        // 总条数
        total: 1
      },
      // 历史 记录
      historyList: []
    };
  },
  methods: {
    // 1 获取机票数据
    getList(isFirst) {
      if (isFirst) {
        let form = this.$route.query;
        this.$axios.get("/airs", { params: form }).then(res => {
          // 定义 所有的数据源
          this.flightsData = res.data;
          // 定义 过滤后 数组 数据源
          this.filterList = this.flightsData.flights;
          // 定义 总条数
          this.page.total = this.filterList.length;
          // 分页使用
          this.currentFlights = this.filterList.slice(
            (this.page.currentPage - 1) * this.page.pageSize, // 0
            this.page.currentPage * this.page.pageSize // 2
          );
        });
      } else {
        // 定义总条数 （属于过滤后的 总条数）
        this.page.total = this.filterList.length;
        // 分页
        this.currentFlights = this.filterList.slice(
          (this.page.currentPage - 1) * this.page.pageSize, // 0
          this.page.currentPage * this.page.pageSize // 2
        );
      }
    },
    handleSizeChange(value) {
      this.page.pageSize = value;
      this.getList();
    },
    handleCurrentChange(value) {
      this.page.currentPage = value;
      this.getList();
    },
    filterChange(filterObj) {
      // {airport: "首都机场", flightTimes: "6|12", company: "国航", sizes: "M"}
      // {airport: "", flightTimes: "", company: "国航", sizes: ""}

      console.log(filterObj);

      // 1 先过滤 第一个条件 航空公司
      // 2 当 航空公司 等于 空字符串的时候 表示 不用过滤
      let filterList = this.flightsData.flights.filter(v => {
        // 1 航空公司的条件
        let isOk1 =
          filterObj.company === "" || v.airline_name === filterObj.company;

        // 2 起飞机场
        let isOk2 =
          filterObj.airport === v.org_airport_name || filterObj.airport === "";

        // 3 机型
        let isOk3 = filterObj.sizes === v.plane_size || filterObj.sizes === "";

        // 4 起飞时间 只拿完整数据中 起飞时间（dep_time） 和 筛选条件中的 from | to 做比较即可 (6|12)
        // 4.1 获取 条件中的 开始时间
        // 4.2 格式要注意 字符串的格式 加减运算
        let from = +filterObj.flightTimes.split("|")[0];
        let to = +filterObj.flightTimes.split("|")[1];

        // 4.3 把 6:30 => 6.5 格式
        let hour = +v.dep_time.split(":")[0] + +v.dep_time.split(":")[1] / 60;

        // debugger
        // 4.4 开始做比较
        let isOk4 =
          filterObj.flightTimes === "" || (hour >= from && hour <= to);

        return isOk1 && isOk2 && isOk3 && isOk4;
      });
      this.filterList = filterList;
      this.getList();
    }
  },
  mounted() {
    this.getList(true);

    this.historyList = JSON.parse(localStorage.getItem("city"));
  }
};
</script>

<style lang="less" scoped>
.flights {
  width: 1000px;
  margin: 0 auto;
  display: flex;
}
.flights_main {
  flex: 5;
}
.flights_aside {
  flex: 2;
}
.history {
  border: 1px solid #ccc;
  padding: 20px;
  .history_title {
    font-size: 26px;
    padding: 20px 0;
  }

  .history_content {
    .history_row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .his_left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: left;
        p:nth-child(1) {
          font-size: 18px;
        }
        p:nth-child(2) {
          color: #666;
          font-size: 13px;
        }

      }

      .his_right {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>