<template>
  <div class="city">
    <div
      v-for="(item1,index1) in list"
      :key="index1"
    >
      <span>{{item1.text}} </span>
      <!-- 组件调用自己 -->
      <CityItem
        :list="item1.list"
        v-if="item1.list"
      />
    </div>
  </div>
</template>

<script>
import CityItem from "@/components/CityItem";
export default {
  // 声明一个name属性 否则会报错  CityItem
  name: "CityItem",
  components: {
    CityItem
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  }
};
</script>

<style>
.city {
  width: 1000px;
  margin: 0 auto;
  padding: 30px 0;
}
div {
  padding: 20px;
}
</style>