<template>
  <div>
    <CityItem :list="list" />
  </div>
</template>

<script>
import CityItem from "@/components/CityItem";
export default {
  components: {
    CityItem
  },
  data() {
    return {
      list: [
        {
          text: "广东",
          list: [
            {
              text: "广州",
              list: [
                { text: "天河", list: [{ text: "珠吉" }, { text: "岗顶" }] },
                { text: "番禺" }
              ]
            },
            { text: "深圳", list: [{ text: "宝安" }, { text: "南山" }] }
          ]
        },
        {
          text: "湖南",
          list: [
            { text: "长沙", list: [{ text: "芙蓉" }, { text: "天心" }] },
            { text: "衡阳", list: [{ text: "衡阳111" }, { text: "衡阳222" }] }
          ]
        }
      ]
    };
  },
  mounted() {
 
  }
};
</script>

<style>
</style>