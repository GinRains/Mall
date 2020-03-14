<template>
  <div class="title">
    <div v-for="item in titles">{{item}}</div>
  </div>
</template>

<script>
  export default {
    name: "TitleItem",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

  .title {
    width: 90px;
    text-align: center;
  }

  .title div {
    background-color: #f6f6f6;
    height: 41px;
    line-height: 41px;
  }
</style>
