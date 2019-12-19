<template>
  <div class="flights_list_main">
    <div class="flights_item">
      <div class="item_main" @click="isShow = !isShow">
        <div
          class="item_name"
        >{{flightsItem.airline_name}} {{flightsItem.flight_no}} {{flightsItem.plane_size}}</div>
        <div class="item_depart_date">
          <p>{{flightsItem.dep_time}}</p>
          <p>&nbsp;&nbsp;{{flightsItem.org_airport_name}}{{flightsItem.org_airport_quay}}</p>
        </div>
        <div class="duration">{{duration}}</div>
        <div class="item_dest_date">
          <p>{{flightsItem.arr_time}}</p>
          <p>{{flightsItem.dst_airport_name}}{{flightsItem.dst_airport_quay}}</p>
        </div>
        <div class="item_price">
          <p>
            ￥
            <span>{{flightsItem.base_price * 0.6}}</span>&nbsp;起
          </p>
        </div>
      </div>
      <!-- 低价推荐开始 -->
      <div class="item_info" v-show="isShow">
        <div class="item_low">低价推荐</div>
        <div class="item_seat">
          <div class="seat_row" v-for="(value, index) in flightsItem.seat_infos" :key="index">
            <div class="seat_row_name">
              <span>{{value.name}}</span>
              | {{value.supplierName}}
            </div>
            <div class="seat_row_price">￥{{value.settle_price}}</div>
            <div class="seat_row_btns">
              <div>
                <el-button
                  type="warning"
                  size="mini"
                  @click="bookFlight(value.seat_xid,flightsItem.id)"
                >选定</el-button>
                <p>剩余{{value.discount}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 低价推荐结束 -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["flightsItem"],
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    // console.log(this.flightsItem.dep_datetime);
    // console.log(this.startDate);
  },
  computed: {
    // 处理时间间隔
    duration() {
      let startTime = this.flightsItem.dep_datetime;
      let endTime = this.flightsItem.arr_datetime;
      let startDate = new Date(startTime);
      let endDate = new Date(endTime);
      let duration = endDate - startDate;
      let hour = parseInt(duration / 1000 / 60 / 60);
      let minutes = duration / 1000 / 60 - hour * 60;
      return `${hour}时${minutes}分`;
    }
  },

  methods: {
    bookFlight(seat_xid, id) {
      this.$router.push({ path: "/air/order", query: { seat_xid, id } });
    }
  }
};
</script>

<style lang="less" scoped>
.flights_list_main {
  .flights_item {
    border: 1px solid #ddd;
    margin: 10px 0;
    .item_main {
      height: 80px;
      background-color: #fff;
      display: flex;
      position: relative;
      > div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .item_name {
        font-size: 13px;
      }

      .item_depart_date,
      .item_dest_date {
        text-align: center;
        p:nth-child(1) {
          font-size: 24px;
          font-weight: 400;
          margin: 0;
        }
        p:nth-child(2) {
          font-size: 12px;
          color: #999;
          margin: 6px 0 0;
        }
      }

      .item_price {
        font-size: 14px;
        span {
          color: orange;
          font-size: 24px;
        }
      }
      .duration {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 12px;
        color: #666;
        padding-bottom: 8px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .item_info {
    background-color: #f6f6f6;
    display: flex;
    .item_low {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
    }
    .item_seat {
      flex: 5;
      .seat_row {
        display: flex;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }
        > div {
          display: flex;
          align-items: center;
        }
        .seat_row_name {
          flex: 5;
          font-size: 13px;
          span {
            color: green;
            padding-right: 6px;
          }
        }
        .seat_row_price {
          flex: 2;
          font-size: 18px;
          color: orange;
        }
        .seat_row_btns {
          text-align: center;
          color: #666;
          flex: 1;
          font-size: 14px;
          p {
            margin: 0;
            margin-bottom: 10px;
          }
          .el-button {
            margin: 12px 0 8px;
          }
        }
      }
    }
  }
}
</style>