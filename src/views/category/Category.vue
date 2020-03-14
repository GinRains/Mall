<template>
  <div>
    <nav-bar class="category-nav">
      <template  v-slot:center>
        <div class="category">商品分类</div>
      </template>
    </nav-bar>
    <Scroll>
      <title-item :titles="titles"/>
    </Scroll>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TitleItem from './childComps/TitleItem'
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList"

  import Scroll from 'components/common/Scroll/Scroll'
  import {getCategory} from "network/category";

  export default {
    name: "Category",
    data() {
      return {
        lists: null,
        titles: []
      }
    },
    methods: {
      getCategory() {
        getCategory().then(res => {
          const data = res.data
          console.log(data)
          this.lists = data.category.list

          // 1. 获取商品列表
          data.category.list.forEach(item => {
            this.titles.push(item.title)
          })
        })
      }
    },
    created() {
      this.getCategory()
    },
    components: {
      TitleItem,
      NavBar,
      TabControl,
      GoodsList,
      Scroll
    }
  }
</script>

<style scoped>
  .wrapper {
    height: calc(100vh - 49px - 42px);
    background-color: #fff;
    overflow: hidden;
  }

  .category-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 600;
  }
</style>
