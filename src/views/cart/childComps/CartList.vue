<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <Cart-list-item v-for="(item, index) in cartList" :key="index"
                      :item-info="item"/>
    </Scroll>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";
  import Scroll from 'components/common/Scroll/Scroll'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      CartListItem,
      Scroll
    },
    computed: {
      ...mapGetters([
        'cartList'
      ])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
