<template>
  <div class="hotel">
    <div class="bread_head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item v-if="cityName">{{cityName}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="areaName">{{areaName}}</el-breadcrumb-item>
        <el-breadcrumb-item>酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="filter_inputs">
      <filterHotels @getHotels="getHotels" @getCityName="getCityName"></filterHotels>
    </div>
    <div class="hotel_cities">
      <div class="cities_text">
        <div class="tip" v-if="cities.total == 0">先选择一个你喜欢的城市吧~</div>
        <hotelCities
          v-if="cities.total"
          :cities="cities.data[0]"
          :hotelsData="hotelLocation"
          @handlerArea="handlerArea"
        ></hotelCities>
      </div>
      <div class="cities_map">
        <hotelMap :location="hotelLocation"></hotelMap>
      </div>
    </div>
    <div class="filter_dorpdowns">
      <hotelOptions @changeOptions="changeOptions"></hotelOptions>
    </div>
    <div class="hotel_list">
      <hotelItem :hotelInfo="fliterList"></hotelItem>
    </div>
    <!-- 分页器 -->
    <div class="paging">
      <el-pagination
        :current-page="paging.pageIndex"
        :page-sizes="[2,4, 6, 10]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import filterHotels from "@/components/hotel/filterHotels.vue";
import hotelCities from "@/components/hotel/hotelCities.vue";
import hotelMap from "@/components/hotel/hotelMap.vue";
import hotelOptions from "@/components/hotel/hotelOptions.vue";
import hotelItem from "@/components/hotel/houtelItem.vue";
export default {
  data() {
    return {
      cities: {
        data: [],
        total: ""
      },
      cityName: "",
      hotels: {
        city: "",
        enterTime: "",
        leftTime: ""
      },
      // 用于酒店列表的数据展示和地图的经纬度展示
      hotelLocation: {
        data: []
      },
      // 分页开始
      paging: {
        // 当前页码
        pageIndex: 1,
        pageSize: 10,
        total: 0
      }, // 过滤后的数组
      fliterList: [],
      urlPramas: "",
      areaName: ""
    };
  },
  mounted() {
    this.init();
  },
  components: {
    filterHotels,
    hotelCities,
    hotelMap,
    hotelOptions,
    hotelItem
  },
  methods: {
    getHotels(data) {
      // this.hotels.enterTime = data.enterTime;
      // this.hotels.leftTime = data.leftTime;
      this.hotels.city = data.city;
      console.log(this.hotels);

      // console.log(data);
      // this.$axios.get("/hotels", { params: data }).then(res => {
      //   console.log(res);
      //   if (res.status === 200) {
      //     this.hotelLocation = res.data;
      //   }
      // });
    },
    getCityName(name) {
      this.cityName = name;
      this.init2();
    },
    changeOptions(params) {
      console.log(params);
      this.urlPramas = params;
      console.log(this.urlPramas);

      // options.hotellevel = this.hotels.hotellevel;
      // if (options.hotellevel.length > 0) {
      //   options.hotellevel.forEach(e => {
      //     this.hotels.hotellevel = e;
      //   });
      // }
      // this.hotels.hotellevel = 3;
      // if (options.price_in !== 0) {
      //   this.hotels.price_in = options.price_in;
      // }
      this.$message.success("正在为您查询");
      console.log(this.hotels);

      this.init();
    },
    handleSizeChange(value) {
      this.paging.pageSize = value;

      this.init();
    },
    handleCurrentChange(value) {
      console.log(value);
      this.paging.pageIndex = value;
      // 点击下一页后要继续发送hoteltype这个参数

      this.init();
    },
    init2() {
      this.$axios
        .get("/cities", {
          params: { name: this.cityName }
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.cities = res.data;
            this.hotels.city = res.data.data[0].id;
            this.paging.pageIndex = 0;
            this.$axios.get("/hotels", { params: this.hotels }).then(res2 => {
              console.log(res2);
              this.hotelLocation = res2.data;
              this.fliterList = res2.data.data;
              this.paging.total = res2.data.total;
              console.log(this.hotelLocation);
            });
          }
        });
    },

    init() {
      let params = `_start=${this.paging.pageIndex}&_limit=${this.paging.pageSize}`;
      if (this.hotels.city) {
        params += `&city=${this.hotels.city}`;
      }
      if (this.urlPramas) {
        params += this.urlPramas;
      }

      this.$axios.get(`/hotels?` + params).then(res => {
        this.fliterList = res.data.data;
        console.log(res);
        // 赋值,全部值
        this.hotelLocation = res.data;
        // 总条数
        this.paging.total = res.data.total;
      });
    },
    handlerArea(name) {
      this.areaName = name;
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
.hotel {
  width: 1000px;
  margin: 0 auto;
  .bread_head {
    font-weight: 400;
    color: #606266;
    padding: 20px 0;
  }
  .hotel_cities {
    display: flex;
    .cities_text {
      flex: 4;
      .tip {
        height: 100%;
        font-size: 20px;
        color: orange;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .cities_map {
      flex: 3;
    }
  }
  .filter_dorpdowns {
    width: 100%;
    margin: 20px 0;
  }
}
</style>