<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-btn" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }

        // 上面的代码不能简化为下面这种
        // this.cartList.forEach(item => item.checked = !this.isSelectAll)
      },
      calcClick() {
        if(!this.isSelectAll) {
          this.$toast.show('请选择要购买的商品', 1200)
        }
      }
    },
    computed: {
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      ...mapGetters([
          'cartList'
      ]),
      isSelectAll() {
        if(this.cartList.length === 0) return false
        // return !(this.cartList.filter(item => !item.checked).length)
        return !this.cartList.find(item => !item.checked)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 8px;
    width: 60px;
  }

  .check-btn {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 6px;
  }

  .price {
    margin-left: 23px;
    flex: 1;
  }

  .calculate {
    right: 0px;
    width: 110px;
    text-align: center;
    background-color: #ff6700;
    color: #fff;
  }
</style>
