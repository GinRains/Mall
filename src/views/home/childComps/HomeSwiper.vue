<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      imageLoad() {
        if(!this.isLoad) {
          // console.log('---')
          this.$emit('swiperImgLoad')
          this.isLoad = true
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>

</style>
