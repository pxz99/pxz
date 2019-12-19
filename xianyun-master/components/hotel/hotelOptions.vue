<template>
  <div class="hotel_options">
    <div class="option_item br">
      <div class="option_head">
        <span>价格</span>
        <span>0 - {{options.price_in}}</span>
      </div>
      <div class="block">
        <el-slider v-model="options.price_in" :max="4000" @change="handlerPriceChange"></el-slider>
      </div>
    </div>
    <div class="option_item br">
      <div class="option_head">
        <span>住宿等级</span>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <span v-if="options.hotellevel.length === 0">不限</span>
          <span v-else>已选{{options.hotellevel.length}}项</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-checkbox-group v-model="options.hotellevel">
            <div
              style="width: 120px; margin: 20px 0 0 20px;"
              v-for="(item,index) in optionsData.levels"
              :key="item.id"
            >
              <el-checkbox
                :label="optionsData.levels[index].id"
                @change="handlerLevelChange(item.id)"
              >{{item.name}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="option_item br">
      <div class="option_head">
        <span>住宿类型</span>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <span v-if="options.hoteltype.length === 0">不限</span>
          <span v-else>已选{{options.hoteltype.length}}项</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-checkbox-group v-model="options.hoteltype">
            <div
              style="width: 120px; margin: 20px 0 0 20px;"
              v-for="(item,index) in optionsData.types"
              :key="item.id"
            >
              <el-checkbox
                :label="optionsData.types[index].id"
                @change="handlerTypeChange(item.id)"
              >{{item.name}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="option_item br">
      <div class="option_head">
        <span>酒店设施</span>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <span v-if="options.hotelasset.length === 0">不限</span>
          <span v-else>已选{{options.hotelasset.length}}项</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-checkbox-group v-model="options.hotelasset">
            <div
              style="width: 120px; margin: 20px 0 0 20px;"
              v-for="(item,index) in optionsData.assets"
              :key="item.id"
            >
              <el-checkbox
                :label="optionsData.assets[index].id"
                @change="handlerAssetChange(item.id)"
              >{{item.name}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="option_item">
      <div class="option_head">
        <span>酒店品牌</span>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <span v-if="options.hotelbrand.length === 0">不限</span>
          <span v-else>已选{{options.hotelbrand.length}}项</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-checkbox-group v-model="options.hotelbrand">
            <div
              style="width: 120px; margin: 20px 0 0 20px;"
              v-for="(item,index) in optionsData.brands"
              :key="item.id"
            >
              <el-checkbox
                :label="optionsData.brands[index].id"
                @change="handlerBrandChange(item.id)"
              >{{item.name}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 传给父组件的数据
      options: {
        price_in: 0,
        hotellevel: [],
        hoteltype: [],
        hotelbrand: [],
        hotelasset: []
      },

      optionsData: {
        levels: [],
        types: [],
        assets: [],
        brands: []
      }
    };
  },
  mounted() {
    this.$axios.get("/hotels/options").then(res => {
      console.log(res);
      if (res.status === 200) {
        this.optionsData = res.data.data;
      }
    });
  },
  methods: {
    handlerPriceChange() {
      this.handlerOptions();
    },
    handlerLevelChange(value) {
      this.handlerArr(this.options.hotellevel, value);
      this.handlerOptions();
    },
    handlerTypeChange(value) {
      this.handlerArr(this.options.hoteltype, value);
      this.handlerOptions();
    },
    handlerAssetChange(value) {
      this.handlerOptions(this.options.hotelasset, value);
    },
    handlerBrandChange(value) {
      this.handlerOptions(this.options.hotelbrand, value);
    },
    handlerArr(arr, value) {
      let index = arr.findIndex(v => v === value);
      let arr1 = [];
      if (index !== -1) {
        arr1.splice(index, 1);
      } else {
        arr1.push(value);
      }
      return arr1;
    },
    handlerOptions() {
      // console.log(this.options);
      // let index = arr.find(v => v === value);
      // if (index !== -1) {
      //   arr.splice(index, 1);
      // }

      let paramsStr = "";
      // if (this.options.price_in) {
      //   paramsStr += `&peice_in=${this.options.price_in}`;
      // }
      if (this.options.hotellevel.length > 0) {
        this.options.hotellevel.forEach(e => {
          paramsStr += `&hotellevel=${e}`;
        });
      }
      if (this.options.hoteltype.length > 0) {
        this.options.hoteltype.forEach(e => {
          paramsStr += `&hoteltype=${e}`;
        });
      }
      if (this.options.hotelbrand.length > 0) {
        this.options.hotelbrand.forEach(e => {
          paramsStr += `&hotelbrand=${e}`;
        });
      }
      if (this.options.hotelasset.length > 0) {
        this.options.hotelasset.forEach(e => {
          paramsStr += `&hotelasset=${e}`;
        });
      }
      // let index = paramsStr.lastIndexOf("&");
      // // console.log(index);
      // paramsStr = paramsStr.substring(0, index);
      // // console.log(paramsStr);
      console.log(paramsStr);

      this.$emit("changeOptions", paramsStr);
    }
  }
};
</script>

<style lang="less" scoped>
.hotel_options {
  border: 1px solid #ddd;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  .option_item {
    &:first-child {
      width: 25%;
    }
    width: 18%;
    padding: 10px 20px;
    font-size: 14px;
    color: #666;
    .option_head {
      display: flex;
      justify-content: space-between;
    }
    .el-dropdown {
      width: 100%;
      .el-dropdown-link {
        width: 100%;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .br {
    border-right: 1px solid #ddd;
  }
}
</style>