<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
    mounted() {
      // 创建BScroll对象
      this.scroll = new BScroll((this.$refs.wrapper), {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动得位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          // console.log(position)
          this.$emit('scroll', position)
        })
      }

      // 监听scroll滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // console.log('监听到了')
          this.$emit('loadMore')
        })
      }

      // console.log(this.scroll)
      // this.scroll.refresh() // 重新计算高度，拒绝bug
    }
  }
</script>

<style scoped>

</style>
