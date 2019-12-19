<template>
  <div class="history">
    <div class="history_head">
      <span>历史查询</span>
    </div>
    <div class="history_list">
      <div class="history_item" v-for="(item,index) in historyList" :key="index">
        <div class="history_content">
          <p>{{item.departCity}} - {{item.destCity}}</p>
          <span>{{item.departDate}}</span>
        </div>
        <el-button class="selectBtn" type="warning" size="mini">选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["historyList"],
  mounted() {
    console.log(this.historyList);
  }
};
</script>

<style lang="less" scoped>
.history {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  .history_head {
    font-size: 16px;
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  .history_list {
    > div {
      &:last-child {
        border-bottom: none;
      }
    }
    .history_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;

      .history_content {
        span {
          font-size: 12px;
          color: #666;
        }
        p {
          margin-bottom: 4px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>