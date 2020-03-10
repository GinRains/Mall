<template>
  <div class="goods">
    <GoodsListItem class="goods-list" v-for="(item, index) in goods"
        :key="index"
        :GoodsItem="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    components: {GoodsListItem},
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      },
      components: {
        GoodsListItem
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
